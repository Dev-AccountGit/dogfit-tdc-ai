import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Barcode, Clock, Plus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recentSearches = [
  { id: 1, name: "Arroz branco", calories: 130, portion: "100g" },
  { id: 2, name: "Frango grelhado", calories: 165, portion: "100g" },
  { id: 3, name: "Banana", calories: 89, portion: "1 unidade" },
];

const popularFoods = [
  { id: 1, name: "Ovo cozido", calories: 78, portion: "1 unidade", emoji: "🥚" },
  { id: 2, name: "Pão integral", calories: 69, portion: "1 fatia", emoji: "🍞" },
  { id: 3, name: "Iogurte natural", calories: 59, portion: "100g", emoji: "🥛" },
  { id: 4, name: "Maçã", calories: 52, portion: "1 unidade", emoji: "🍎" },
  { id: 5, name: "Aveia", calories: 68, portion: "30g", emoji: "🥣" },
  { id: 6, name: "Peito de peru", calories: 104, portion: "100g", emoji: "🍗" },
];

const searchResults = [
  { id: 1, name: "Arroz branco cozido", brand: "Genérico", calories: 130, portion: "100g" },
  { id: 2, name: "Arroz integral", brand: "Genérico", calories: 111, portion: "100g" },
  { id: 3, name: "Arroz com feijão", brand: "Caseiro", calories: 150, portion: "100g" },
  { id: 4, name: "Arroz japonês", brand: "Sushi", calories: 140, portion: "100g" },
];

const AppSearch = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    setShowResults(value.length > 0);
  };

  const handleAddFood = (food: any) => {
    toast({
      title: "Alimento adicionado!",
      description: `${food.name} - ${food.calories} kcal`,
    });
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
          {searchResults.map((food, index) => (
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
                className="p-2 rounded-lg bg-primary text-primary-foreground"
              >
                <Plus className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          {/* Recent Searches */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <h2 className="font-semibold">Recentes</h2>
            </div>
            {recentSearches.map((food, index) => (
              <motion.div
                key={food.id}
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
                  className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

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
                  className="bg-card rounded-xl p-4 border border-border text-left hover:border-primary transition-colors"
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
