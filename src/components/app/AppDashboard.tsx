import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Droplets, Footprints, Plus, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const meals = [
  { id: 1, name: "Café da manhã", calories: 450, time: "08:30", emoji: "🍳" },
  { id: 2, name: "Almoço", calories: 680, time: "12:45", emoji: "🍝" },
  { id: 3, name: "Lanche", calories: 150, time: "16:00", emoji: "🍎" },
];

const AppDashboard = () => {
  const { t } = useTranslation();
  const [dailyGoal] = useState(2000);
  const [consumed] = useState(1280);
  const [water] = useState(6);
  const [steps] = useState(7234);

  const remaining = dailyGoal - consumed;
  const progress = (consumed / dailyGoal) * 100;

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
          <p className="text-lg font-bold">85g</p>
          <p className="text-xs text-muted-foreground">Proteína</p>
          <div className="h-1 bg-secondary rounded-full mt-2">
            <div className="h-full w-[70%] bg-health-red rounded-full" />
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
          <p className="text-lg font-bold">156g</p>
          <p className="text-xs text-muted-foreground">Carbos</p>
          <div className="h-1 bg-secondary rounded-full mt-2">
            <div className="h-full w-[60%] bg-health-yellow rounded-full" />
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
          <p className="text-lg font-bold">42g</p>
          <p className="text-xs text-muted-foreground">Gordura</p>
          <div className="h-1 bg-secondary rounded-full mt-2">
            <div className="h-full w-[55%] bg-health-green rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-xl font-bold">{water}/8</p>
            <p className="text-xs text-muted-foreground">Copos de água</p>
          </div>
        </motion.div>

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
            <p className="text-xl font-bold">{steps.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Passos hoje</p>
          </div>
        </motion.div>
      </div>

      {/* Today's Meals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Refeições de hoje</h2>
          <button className="text-sm text-primary font-medium flex items-center gap-1">
            Ver todas <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                {meal.emoji}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{meal.name}</p>
                <p className="text-xs text-muted-foreground">{meal.time}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{meal.calories}</p>
                <p className="text-xs text-muted-foreground">kcal</p>
              </div>
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-full py-4 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar refeição</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AppDashboard;
