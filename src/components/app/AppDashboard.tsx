import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Droplets, Footprints, Plus, ChevronRight, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getTodayStats, 
  getTodayMeals, 
  getProfile, 
  addWater,
  deleteMeal,
  type DailyStats,
  type Meal,
  type Profile
} from "@/services/appService";
import { useToast } from "@/hooks/use-toast";

const mealTypeEmojis: Record<string, string> = {
  breakfast: "🍳",
  lunch: "🍝",
  dinner: "🍽️",
  snack: "🍎",
};

const mealTypeNames: Record<string, string> = {
  breakfast: "Café da manhã",
  lunch: "Almoço",
  dinner: "Jantar",
  snack: "Lanche",
};

const AppDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DailyStats | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [statsData, mealsData, profileData] = await Promise.all([
        getTodayStats(user.id),
        getTodayMeals(user.id),
        getProfile(user.id),
      ]);
      setStats(statsData);
      setMeals(mealsData);
      setProfile(profileData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWater = async () => {
    if (!user) return;
    try {
      await addWater(user.id);
      toast({ title: "Água adicionada!", description: "+1 copo de água" });
      loadData();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível adicionar água", variant: "destructive" });
    }
  };

  const handleDeleteMeal = async (mealId: string) => {
    try {
      await deleteMeal(mealId);
      toast({ title: "Refeição removida!" });
      loadData();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível remover", variant: "destructive" });
    }
  };

  const dailyGoal = profile?.daily_calorie_goal || 2000;
  const consumed = stats?.total_calories || 0;
  const remaining = Math.max(0, dailyGoal - consumed);
  const progress = Math.min(100, (consumed / dailyGoal) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Olá! 👋</h1>
          <p className="text-muted-foreground text-sm">Vamos atingir suas metas hoje</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-lg">🐕</span>
        </div>
      </div>

      {/* Main Calorie Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-primary-foreground/70 text-sm">Calorias restantes</p>
            <p className="text-4xl font-bold">{remaining}</p>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${progress * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary-foreground/20">
          <div className="text-center">
            <p className="text-2xl font-bold">{consumed}</p>
            <p className="text-xs text-primary-foreground/70">Consumidas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{dailyGoal}</p>
            <p className="text-xs text-primary-foreground/70">Meta</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{remaining}</p>
            <p className="text-xs text-primary-foreground/70">Restantes</p>
          </div>
        </div>
      </motion.div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-4 border border-border"
        >
          <div className="w-8 h-8 rounded-full bg-health-red/20 flex items-center justify-center mb-2">
            <div className="w-3 h-3 rounded-full bg-health-red" />
          </div>
          <p className="text-lg font-bold">{stats?.total_protein?.toFixed(0) || 0}g</p>
          <p className="text-xs text-muted-foreground">Proteína</p>
          <div className="h-1 bg-secondary rounded-full mt-2">
            <div 
              className="h-full bg-health-red rounded-full transition-all" 
              style={{ width: `${Math.min(100, ((stats?.total_protein || 0) / (profile?.daily_protein_goal || 120)) * 100)}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-4 border border-border"
        >
          <div className="w-8 h-8 rounded-full bg-health-yellow/20 flex items-center justify-center mb-2">
            <div className="w-3 h-3 rounded-full bg-health-yellow" />
          </div>
          <p className="text-lg font-bold">{stats?.total_carbs?.toFixed(0) || 0}g</p>
          <p className="text-xs text-muted-foreground">Carbos</p>
          <div className="h-1 bg-secondary rounded-full mt-2">
            <div 
              className="h-full bg-health-yellow rounded-full transition-all" 
              style={{ width: `${Math.min(100, ((stats?.total_carbs || 0) / (profile?.daily_carbs_goal || 250)) * 100)}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-4 border border-border"
        >
          <div className="w-8 h-8 rounded-full bg-health-green/20 flex items-center justify-center mb-2">
            <div className="w-3 h-3 rounded-full bg-health-green" />
          </div>
          <p className="text-lg font-bold">{stats?.total_fat?.toFixed(0) || 0}g</p>
          <p className="text-xs text-muted-foreground">Gordura</p>
          <div className="h-1 bg-secondary rounded-full mt-2">
            <div 
              className="h-full bg-health-green rounded-full transition-all" 
              style={{ width: `${Math.min(100, ((stats?.total_fat || 0) / (profile?.daily_fat_goal || 65)) * 100)}%` }}
            />
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          onClick={handleAddWater}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-4 flex items-center gap-3 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-xl font-bold">{stats?.water_glasses || 0}/{profile?.daily_water_goal || 8}</p>
            <p className="text-xs text-muted-foreground">Copos de água</p>
          </div>
        </motion.button>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-orange-50 dark:bg-orange-950/30 rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Footprints className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-xl font-bold">{(stats?.steps || 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Passos hoje</p>
          </div>
        </motion.div>
      </div>

      {/* Today's Meals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Refeições de hoje</h2>
        </div>

        <div className="space-y-3">
          {meals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma refeição registrada hoje</p>
              <p className="text-sm">Toque no + para adicionar</p>
            </div>
          ) : (
            meals.map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                  {mealTypeEmojis[meal.meal_type] || "🍽️"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{meal.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {mealTypeNames[meal.meal_type] || meal.meal_type} • {new Date(meal.logged_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="text-right mr-2">
                  <p className="font-bold">{meal.calories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
                <button
                  onClick={() => handleDeleteMeal(meal.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppDashboard;
