import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Image, 
  Zap, 
  X, 
  Check, 
  RotateCcw, 
  SwitchCamera, 
  Focus,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { addMeal, getTodayStats, updateDailyStats } from "@/services/appService";

const AppCamera = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [mode, setMode] = useState<"camera" | "preview" | "result">("camera");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  const [mealType, setMealType] = useState("lunch");
  const [showMealTypeSelector, setShowMealTypeSelector] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mealTypes = [
    { value: "breakfast", label: "Café da Manhã", icon: "☀️" },
    { value: "lunch", label: "Almoço", icon: "🍽️" },
    { value: "dinner", label: "Jantar", icon: "🌙" },
    { value: "snack", label: "Lanche", icon: "🍎" },
  ];

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error: any) {
      console.error("Camera error:", error);
      if (error.name === "NotAllowedError") {
        setCameraError("Permissão da câmera negada. Ative nas configurações do navegador.");
      } else if (error.name === "NotFoundError") {
        setCameraError("Nenhuma câmera encontrada no dispositivo.");
      } else {
        setCameraError("Erro ao acessar a câmera. Tente novamente.");
      }
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (mode === "camera") {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [mode, startCamera, stopCamera]);

  const switchCamera = () => {
    setFacingMode(prev => prev === "environment" ? "user" : "environment");
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsFocusing(true);
    
    setTimeout(() => {
      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      const context = canvas.getContext("2d");

      if (!context) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      const imageData = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedImage(imageData);
      setMode("preview");
      setIsFocusing(false);
    }, 300);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
        setMode("preview");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        name: "Prato Completo",
        meal_type: mealType,
        items: [
          { name: "Arroz", calories: 200, protein: 4, carbs: 45, fat: 0.5 },
          { name: "Feijão", calories: 120, protein: 8, carbs: 22, fat: 0.5 },
          { name: "Frango grelhado", calories: 180, protein: 35, carbs: 0, fat: 4 },
          { name: "Salada", calories: 30, protein: 1, carbs: 6, fat: 0.2 },
        ],
        total: { calories: 530, protein: 48, carbs: 73, fat: 5.2 },
        healthScore: 8,
      });
      setAnalyzing(false);
      setMode("result");
    }, 2500);
  };

  const handleAddToLog = async () => {
    if (!user || !result) return;
    
    setSaving(true);
    try {
      await addMeal({
        user_id: user.id,
        name: result.name,
        meal_type: result.meal_type,
        calories: result.total.calories,
        protein: result.total.protein,
        carbs: result.total.carbs,
        fat: result.total.fat,
        image_url: capturedImage || undefined,
        logged_at: new Date().toISOString(),
      });

      const stats = await getTodayStats(user.id);
      if (stats) {
        await updateDailyStats(stats.id, {
          total_calories: (stats.total_calories || 0) + result.total.calories,
          total_protein: Number(stats.total_protein || 0) + result.total.protein,
          total_carbs: Number(stats.total_carbs || 0) + result.total.carbs,
          total_fat: Number(stats.total_fat || 0) + result.total.fat,
        });
      }

      toast({
        title: "Refeição adicionada!",
        description: `${result.total.calories} kcal registradas no seu diário.`,
      });
      
      handleReset();
    } catch (error) {
      console.error("Error adding meal:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a refeição.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setMode("camera");
    setCapturedImage(null);
    setResult(null);
  };

  // Result Screen
  if (mode === "result" && result) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full bg-background flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={handleReset} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Análise Nutricional</h1>
          <div className="w-9" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Food Image with Score */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={capturedImage!}
              alt="Food"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="text-white/80 text-sm">Health Score</p>
                <p className="text-white text-3xl font-bold">{result.healthScore}/10</p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-3 h-3 rounded-full ${
                      i < Math.round(result.healthScore / 2) 
                        ? "bg-primary" 
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Nutrition Summary */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-4 gap-2"
          >
            {[
              { label: "Calorias", value: result.total.calories, unit: "kcal", color: "bg-primary" },
              { label: "Proteína", value: result.total.protein, unit: "g", color: "bg-red-500" },
              { label: "Carbos", value: result.total.carbs, unit: "g", color: "bg-yellow-500" },
              { label: "Gordura", value: result.total.fat, unit: "g", color: "bg-green-500" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-3 text-center"
              >
                <div className={`w-2 h-2 rounded-full ${item.color} mx-auto mb-2`} />
                <p className="text-lg font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.unit}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Detected Items */}
          <div className="space-y-2">
            <h2 className="font-semibold text-sm text-muted-foreground px-1">ALIMENTOS DETECTADOS</h2>
            {result.items.map((item: any, index: number) => (
              <motion.div
                key={item.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-card rounded-xl p-4 border border-border flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    P: {item.protein}g • C: {item.carbs}g • G: {item.fat}g
                  </p>
                </div>
                <span className="text-lg font-bold">{item.calories}</span>
                <span className="text-xs text-muted-foreground">kcal</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-border bg-background">
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="py-4 rounded-xl border border-border font-medium flex items-center justify-center gap-2 hover:bg-muted transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Nova Foto
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToLog}
              disabled={saving}
              className="py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
              ) : (
                <Check className="w-5 h-5" />
              )}
              {saving ? "Salvando..." : "Adicionar"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Preview Screen
  if (mode === "preview") {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col bg-black"
      >
        <div className="flex-1 relative">
          <img
            src={capturedImage!}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="absolute top-4 left-4 p-3 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Meal Type Selector */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowMealTypeSelector(!showMealTypeSelector)}
              className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20 flex items-center gap-2"
            >
              <span>{mealTypes.find(m => m.value === mealType)?.icon}</span>
              <span className="text-sm">{mealTypes.find(m => m.value === mealType)?.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            <AnimatePresence>
              {showMealTypeSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 bg-black/80 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
                >
                  {mealTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setMealType(type.value);
                        setShowMealTypeSelector(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors ${
                        mealType === type.value ? "bg-white/10" : ""
                      }`}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <span className="text-white text-sm">{type.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-3 shadow-lg"
          >
            {analyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
                <span>Analisando com IA...</span>
              </>
            ) : (
              <>
                <Zap className="w-6 h-6" />
                <span>Analisar Alimentos</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Camera Screen
  return (
    <div className="h-full flex flex-col bg-black relative">
      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden">
        {cameraError ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <Camera className="w-10 h-10 text-white/50" />
            </div>
            <p className="text-white text-lg mb-2">Câmera indisponível</p>
            <p className="text-white/60 text-sm mb-6">{cameraError}</p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center gap-2"
            >
              <Image className="w-5 h-5" />
              Selecionar da Galeria
            </motion.button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Focus Animation */}
            <AnimatePresence>
              {isFocusing && (
                <motion.div
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-24 h-24 border-2 border-primary rounded-lg">
                    <motion.div
                      animate={{ scale: [1, 0.9, 1] }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full border-2 border-primary rounded-lg"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Overlay Frame */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 border-2 border-white/20 rounded-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
                <Focus className="w-full h-full text-white/30" />
              </div>
            </div>

            {/* Top Controls */}
            <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => window.history.back()}
                className="p-3 rounded-full bg-black/40 backdrop-blur-sm text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>
              
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-white text-sm font-medium">IA Ativa</span>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={switchCamera}
                className="p-3 rounded-full bg-black/40 backdrop-blur-sm text-white"
              >
                <SwitchCamera className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-40 left-0 right-0 text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/80 text-base font-medium"
              >
                Aponte para sua refeição
              </motion.p>
              <p className="text-white/50 text-sm mt-1">
                A IA identificará os alimentos automaticamente
              </p>
            </div>
          </>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex items-center justify-center gap-8">
          {/* Gallery Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          >
            <Image className="w-6 h-6 text-white" />
          </motion.button>

          {/* Capture Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCapture}
            disabled={!!cameraError}
            className="relative"
          >
            <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 rounded-full bg-white"
              />
            </div>
            {/* Animated Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-full border-2 border-dashed border-primary/50"
            />
          </motion.button>

          {/* Meal Type Quick Select */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMealTypeSelector(!showMealTypeSelector)}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          >
            <span className="text-2xl">{mealTypes.find(m => m.value === mealType)?.icon}</span>
          </motion.button>
        </div>

        {/* Meal Type Selector Popup */}
        <AnimatePresence>
          {showMealTypeSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-lg rounded-2xl border border-white/20 p-2 flex gap-2"
            >
              {mealTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setMealType(type.value);
                    setShowMealTypeSelector(false);
                  }}
                  className={`flex flex-col items-center px-4 py-3 rounded-xl transition-colors ${
                    mealType === type.value ? "bg-primary text-primary-foreground" : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl mb-1">{type.icon}</span>
                  <span className="text-xs">{type.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppCamera;
