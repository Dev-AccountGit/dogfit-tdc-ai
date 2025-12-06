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
  ChevronDown,
  Lightbulb,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { addMeal, getTodayStats, updateDailyStats } from "@/services/appService";
import { supabase } from "@/integrations/supabase/client";

interface FoodItem {
  name: string;
  portion?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface AnalysisResult {
  name: string;
  items: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  healthScore: number;
  tips?: string;
}

const AppCamera = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [mode, setMode] = useState<"camera" | "preview" | "result">("camera");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [isFocusing, setIsFocusing] = useState(false);
  const [mealType, setMealType] = useState("lunch");
  const [showMealTypeSelector, setShowMealTypeSelector] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
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
        setCameraError("Permissão da câmera negada. Ative nas configurações.");
      } else if (error.name === "NotFoundError") {
        setCameraError("Nenhuma câmera encontrada.");
      } else {
        setCameraError("Erro ao acessar a câmera.");
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
    return () => stopCamera();
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

      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      setCapturedImage(imageData);
      setMode("preview");
      setIsFocusing(false);
    }, 300);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Compress image before processing
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = 1024;
          let { width, height } = img;
          
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          setCapturedImage(canvas.toDataURL("image/jpeg", 0.7));
          setMode("preview");
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!capturedImage) return;
    
    setAnalyzing(true);
    setAnalysisProgress(0);
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => Math.min(prev + Math.random() * 15, 90));
    }, 500);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-food", {
        body: { image: capturedImage }
      });

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      if (error) {
        throw new Error(error.message || "Erro ao analisar");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult({
        name: data.name || "Refeição",
        items: data.items || [],
        total: data.total || { calories: 0, protein: 0, carbs: 0, fat: 0 },
        healthScore: data.healthScore || 5,
        tips: data.tips,
      });
      
      setMode("result");
    } catch (error: any) {
      console.error("Error analyzing food:", error);
      clearInterval(progressInterval);
      
      toast({
        title: "Erro na análise",
        description: error.message || "Não foi possível analisar a imagem.",
        variant: "destructive",
      });
      
      setAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const handleAddToLog = async () => {
    if (!user || !result) return;
    
    setSaving(true);
    try {
      await addMeal({
        user_id: user.id,
        name: result.name,
        meal_type: mealType,
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
    setAnalyzing(false);
    setAnalysisProgress(0);
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
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h1 className="text-lg font-bold">Análise IA</h1>
          </div>
          <div className="w-9" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Food Image with Score */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={capturedImage!}
              alt="Food"
              className="w-full aspect-video object-cover pointer-events-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
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

          {/* Tips */}
          {result.tips && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/10 rounded-xl p-4 border border-primary/20"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-foreground/80">{result.tips}</p>
              </div>
            </motion.div>
          )}

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
                <p className="text-lg font-bold">{Math.round(item.value)}</p>
                <p className="text-xs text-muted-foreground">{item.unit}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Detected Items */}
          {result.items.length > 0 && (
            <div className="space-y-2">
              <h2 className="font-semibold text-sm text-muted-foreground px-1">ALIMENTOS DETECTADOS</h2>
              {result.items.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-card rounded-xl p-4 border border-border flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.portion && `${item.portion} • `}P: {Math.round(item.protein)}g • C: {Math.round(item.carbs)}g • G: {Math.round(item.fat)}g
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{Math.round(item.calories)}</span>
                    <span className="text-xs text-muted-foreground ml-1">kcal</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {result.items.length === 0 && (
            <div className="bg-muted/50 rounded-xl p-6 text-center">
              <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Nenhum alimento identificado com precisão.</p>
              <p className="text-sm text-muted-foreground mt-1">Tente uma foto mais clara.</p>
            </div>
          )}
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
              disabled={saving || result.items.length === 0}
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
            className="w-full h-full object-contain pointer-events-auto"
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

          {/* Analysis Progress Overlay */}
          <AnimatePresence>
            {analyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary mb-4"
                />
                <p className="text-white text-lg font-medium mb-2">Analisando com IA...</p>
                <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <p className="text-white/60 text-sm mt-2">{Math.round(analysisProgress)}%</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
          >
            <Sparkles className="w-6 h-6" />
            <span>Analisar com IA</span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Camera Screen
  return (
    <div className="h-full flex flex-col bg-black relative">
      <canvas ref={canvasRef} className="hidden" />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

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

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 border-2 border-white/20 rounded-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
                <Focus className="w-full h-full text-white/30" />
              </div>
            </div>

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

      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex items-center justify-center gap-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          >
            <Image className="w-6 h-6 text-white" />
          </motion.button>

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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-full border-2 border-dashed border-primary/50"
            />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMealTypeSelector(!showMealTypeSelector)}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          >
            <span className="text-2xl">{mealTypes.find(m => m.value === mealType)?.icon}</span>
          </motion.button>
        </div>

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
