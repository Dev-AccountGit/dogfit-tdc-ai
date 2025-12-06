import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Utensils, Flame, Clock } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  meal_type: string;
  logged_at: string;
  image_url: string | null;
}

const AppHistory = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMeals();
    }
  }, [user, selectedDate]);

  const fetchMeals = async () => {
    if (!user) return;

    setLoading(true);
    const start = startOfDay(selectedDate).toISOString();
    const end = endOfDay(selectedDate).toISOString();

    const { data, error } = await supabase
      .from("meals")
      .select("*")
      .eq("user_id", user.id)
      .gte("logged_at", start)
      .lte("logged_at", end)
      .order("logged_at", { ascending: false });

    if (!error && data) {
      setMeals(data);
    }
    setLoading(false);
  };

  const goToPreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };

  const goToNextDay = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (selectedDate < tomorrow) {
      setSelectedDate(prev => {
        const next = new Date(prev);
        next.setDate(next.getDate() + 1);
        return next;
      });
    }
  };

  const isToday = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

  const getMealTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      breakfast: "Café da manhã",
      lunch: "Almoço",
      dinner: "Jantar",
      snack: "Lanche",
    };
    return types[type] || type;
  };

  const getMealTypeEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      breakfast: "🌅",
      lunch: "☀️",
      dinner: "🌙",
      snack: "🍎",
    };
    return emojis[type] || "🍽️";
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
  const totalFat = meals.reduce((sum, meal) => sum + (meal.fat || 0), 0);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-foreground">Histórico</h1>

      {/* Date Selector */}
      <div className="flex items-center justify-between bg-card rounded-2xl p-4 border border-border">
        <button
          onClick={goToPreviousDay}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            {isToday ? "Hoje" : format(selectedDate, "EEEE", { locale: ptBR })}
          </p>
          <p className="text-sm text-muted-foreground">
            {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
          </p>
        </div>
        
        <button
          onClick={goToNextDay}
          disabled={isToday}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isToday ? "bg-muted/50 cursor-not-allowed" : "bg-muted"
          }`}
        >
          <ChevronRight className={`w-5 h-5 ${isToday ? "text-muted-foreground/50" : "text-foreground"}`} />
        </button>
      </div>

      {/* Daily Summary */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-semibold text-foreground">Resumo do dia</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">{totalCalories}</p>
            <p className="text-xs text-muted-foreground">kcal</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{totalProtein.toFixed(0)}g</p>
            <p className="text-xs text-muted-foreground">Proteína</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{totalCarbs.toFixed(0)}g</p>
            <p className="text-xs text-muted-foreground">Carbs</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{totalFat.toFixed(0)}g</p>
            <p className="text-xs text-muted-foreground">Gordura</p>
          </div>
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Refeições</span>
        </div>

        {loading ? (
          <div className="bg-card rounded-2xl p-8 border border-border text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-muted-foreground text-sm">Carregando...</p>
          </div>
        ) : meals.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 border border-border text-center">
            <p className="text-4xl mb-2">🍽️</p>
            <p className="text-muted-foreground">Nenhuma refeição registrada</p>
            <p className="text-muted-foreground text-sm">neste dia</p>
          </div>
        ) : (
          meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-card rounded-2xl p-4 border border-border"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getMealTypeEmoji(meal.meal_type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{meal.name}</p>
                    <span className="text-sm font-bold text-primary">{meal.calories} kcal</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{getMealTypeLabel(meal.meal_type)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(meal.logged_at), "HH:mm")}
                    </span>
                  </div>
                  {(meal.protein || meal.carbs || meal.fat) && (
                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                      {meal.protein && <span>P: {meal.protein}g</span>}
                      {meal.carbs && <span>C: {meal.carbs}g</span>}
                      {meal.fat && <span>G: {meal.fat}g</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppHistory;
