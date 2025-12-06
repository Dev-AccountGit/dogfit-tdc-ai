import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Barcode, Clock, Plus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { addMeal, getTodayStats, updateDailyStats } from "@/services/appService";

const popularFoods = [
  { id: 1, name: "Ovo cozido", calories: 78, protein: 6, carbs: 0.6, fat: 5.3, portion: "1 unidade", emoji: "🥚" },
  { id: 2, name: "Pão integral", calories: 69, protein: 4, carbs: 12, fat: 1, portion: "1 fatia", emoji: "🍞" },
  { id: 3, name: "Iogurte natural", calories: 59, protein: 3.5, carbs: 4.7, fat: 3.2, portion: "100g", emoji: "🥛" },
  { id: 4, name: "Maçã", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, portion: "1 unidade", emoji: "🍎" },
  { id: 5, name: "Aveia", calories: 68, protein: 2.4, carbs: 12, fat: 1.4, portion: "30g", emoji: "🥣" },
  { id: 6, name: "Peito de frango", calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: "100g", emoji: "🍗" },
  { id: 7, name: "Arroz branco", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: "100g", emoji: "🍚" },
  { id: 8, name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, portion: "1 unidade", emoji: "🍌" },
];

const searchResults = [
  { id: 1, name: "Arroz branco cozido", brand: "Genérico", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: "100g" },
  { id: 2, name: "Arroz integral", brand: "Genérico", calories: 111, protein: 2.6, carbs: 23, fat: 0.9, portion: "100g" },
  { id: 3, name: "Arroz com feijão", brand: "Caseiro", calories: 150, protein: 5, carbs: 25, fat: 2, portion: "100g" },
  { id: 4, name: "Arroz japonês", brand: "Sushi", calories: 140, protein: 2.5, carbs: 31, fat: 0.2, portion: "100g" },
];

const AppSearch = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<typeof popularFoods>([]);
  const [adding, setAdding] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
    setShowResults(value.length > 0);
  };

  const handleAddFood = async (food: any) => {
    if (!user) return;
    
    setAdding(food.name);
    try {
      // Determine meal type based on current time
      const hour = new Date().getHours();
      let mealType = "snack";
      if (hour >= 5 && hour < 11) mealType = "breakfast";
      else if (hour >= 11 && hour < 15) mealType = "lunch";
      else if (hour >= 18 && hour < 22) mealType = "dinner";

      // Add meal
      await addMeal({
        user_id: user.id,
        name: food.name,
        meal_type: mealType,
        calories: food.calories,
        protein: food.protein || 0,
        carbs: food.carbs || 0,
        fat: food.fat || 0,
        logged_at: new Date().toISOString(),
      });

      // Update daily stats
      const stats = await getTodayStats(user.id);
      if (stats) {
        await updateDailyStats(stats.id, {
          total_calories: (stats.total_calories || 0) + food.calories,
          total_protein: Number(stats.total_protein || 0) + (food.protein || 0),
          total_carbs: Number(stats.total_carbs || 0) + (food.carbs || 0),
          total_fat: Number(stats.total_fat || 0) + (food.fat || 0),
        });
      }

      // Add to recent searches if not already there
      if (!recentSearches.find(r => r.name === food.name)) {
        setRecentSearches(prev => [food, ...prev].slice(0, 5));
      }

      toast({
        title: "Alimento adicionado!",
        description: `${food.name} - ${food.calories} kcal`,
      });
    } catch (error) {
      console.error("Error adding food:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o alimento.",
        variant: "destructive",
      });
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Search Header */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Buscar Alimentos</h1>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar alimento..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary border-0 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <button className="p-4 rounded-xl bg-primary text-primary-foreground">
            <Barcode className="w-6 h-6" />
          </button>
        </div>
      </div>

      {showResults ? (
        /* Search Results */
        <div className="space-y-3">
          <h2 className="font-semibold text-muted-foreground">Resultados</h2>
          {searchResults
            .filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
            .map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-xl p-4 border border-border flex items-center gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold">{food.name}</p>
                <p className="text-xs text-muted-foreground">
                  {food.brand} • {food.portion}
                </p>
              </div>
              <div className="text-right mr-2">
                <p className="font-bold">{food.calories}</p>
                <p className="text-xs text-muted-foreground">kcal</p>
              </div>
              <button
                onClick={() => handleAddFood(food)}
                disabled={adding === food.name}
                className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
              >
                {adding === food.name ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <h2 className="font-semibold">Recentes</h2>
              </div>
              {recentSearches.map((food, index) => (
                <motion.div
                  key={`${food.id}-recent`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-4 border border-border flex items-center gap-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{food.name}</p>
                    <p className="text-xs text-muted-foreground">{food.portion}</p>
                  </div>
                  <div className="text-right mr-2">
                    <p className="font-bold">{food.calories}</p>
                    <p className="text-xs text-muted-foreground">kcal</p>
                  </div>
                  <button
                    onClick={() => handleAddFood(food)}
                    disabled={adding === food.name}
                    className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
                  >
                    {adding === food.name ? (
                      <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Popular Foods */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-4 h-4" />
              <h2 className="font-semibold">Populares</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {popularFoods.map((food, index) => (
                <motion.button
                  key={food.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => handleAddFood(food)}
                  disabled={adding === food.name}
                  className="bg-card rounded-xl p-4 border border-border text-left hover:border-primary transition-colors disabled:opacity-50"
                >
                  <span className="text-2xl mb-2 block">{food.emoji}</span>
                  <p className="font-semibold text-sm">{food.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {food.calories} kcal • {food.portion}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AppSearch;
