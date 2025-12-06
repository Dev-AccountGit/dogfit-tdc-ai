import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Image, Zap, X, Check, RotateCcw } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    // Simulate capture with demo image
    setCapturedImage("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop");
    setMode("preview");
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
    // Simulate AI analysis - in production, this would call an edge function
    setTimeout(() => {
      setResult({
        name: "Prato Completo",
        meal_type: "lunch",
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
    }, 2000);
  };

  const handleAddToLog = async () => {
    if (!user || !result) return;
    
    setSaving(true);
    try {
      // Add meal to database
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

      // Update daily stats
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

  if (mode === "result" && result) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Análise Completa</h1>
          <button onClick={handleReset} className="p-2 rounded-full bg-secondary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Food Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={capturedImage!}
            alt="Food"
            className="w-full aspect-square object-cover"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Score: {result.healthScore}/10
          </div>
        </div>

        {/* Detected Items */}
        <div className="space-y-3">
          <h2 className="font-semibold">Alimentos Detectados</h2>
          {result.items.map((item: any, index: number) => (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-3 border border-border flex items-center justify-between"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground">{item.calories} kcal</span>
            </motion.div>
          ))}
        </div>

        {/* Total Nutrition */}
        <div className="bg-secondary rounded-2xl p-4">
          <h2 className="font-semibold mb-4">Total Nutricional</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{result.total.calories}</p>
              <p className="text-xs text-muted-foreground">kcal</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-health-red">{result.total.protein}g</p>
              <p className="text-xs text-muted-foreground">Proteína</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-health-yellow">{result.total.carbs}g</p>
              <p className="text-xs text-muted-foreground">Carbos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-health-green">{result.total.fat}g</p>
              <p className="text-xs text-muted-foreground">Gordura</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleReset}
            className="py-4 rounded-xl border border-border font-medium flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Nova foto
          </button>
          <button
            onClick={handleAddToLog}
            disabled={saving}
            className="py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Check className="w-5 h-5" />
            {saving ? "Salvando..." : "Adicionar"}
          </button>
        </div>
      </div>
    );
  }

  if (mode === "preview") {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 relative">
          <img
            src={capturedImage!}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleReset}
            className="absolute top-4 left-4 p-3 rounded-full bg-black/50 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 bg-background">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
                Analisando com IA...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Analisar com IA
              </>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Camera View Placeholder */}
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 relative flex items-center justify-center">
        <div className="absolute inset-8 border-2 border-white/30 rounded-3xl" />
        <div className="text-center text-white/70">
          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Aponte para sua refeição</p>
          <p className="text-sm opacity-70">A IA vai identificar os alimentos</p>
        </div>

        {/* Camera Controls Overlay */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-4 rounded-full bg-white/20 text-white"
          >
            <Image className="w-6 h-6" />
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCapture}
            className="w-20 h-20 rounded-full bg-white border-4 border-white/50 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-white" />
          </motion.button>
          <button className="p-4 rounded-full bg-white/20 text-white">
            <Zap className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppCamera;
