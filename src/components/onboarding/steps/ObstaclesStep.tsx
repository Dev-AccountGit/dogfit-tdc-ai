import { motion } from 'framer-motion';
import { Clock, Utensils, Dumbbell, Moon, Candy, Users } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const obstacles = [
  { id: 'time', label: 'Falta de tempo', icon: Clock },
  { id: 'cooking', label: 'Não sei cozinhar', icon: Utensils },
  { id: 'exercise', label: 'Não gosto de exercícios', icon: Dumbbell },
  { id: 'sleep', label: 'Problemas de sono', icon: Moon },
  { id: 'cravings', label: 'Vontade de doces', icon: Candy },
  { id: 'social', label: 'Eventos sociais', icon: Users },
];

export const ObstaclesStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const toggleObstacle = (id: string) => {
    const current = data.obstacles || [];
    const updated = current.includes(id)
      ? current.filter(o => o !== id)
      : [...current, id];
    updateData({ obstacles: updated });
  };

  const canContinue = (data.obstacles?.length || 0) > 0;

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Quais são seus obstáculos?
        </h2>
        <p className="text-white/70 text-center mb-8">
          Vamos te ajudar a superar
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {obstacles.map((item, index) => {
            const Icon = item.icon;
            const isSelected = data.obstacles?.includes(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleObstacle(item.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  isSelected
                    ? 'bg-white shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-orange-500' : 'bg-white/20'
                }`}>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white'}`} />
                </div>
                <span className={`text-sm font-medium text-center ${
                  isSelected ? 'text-orange-600' : 'text-white'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-auto pb-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(8)}
            disabled={!canContinue}
            className={`w-full font-semibold py-4 rounded-2xl shadow-lg transition-all ${
              canContinue
                ? 'bg-white text-emerald-600'
                : 'bg-white/30 text-white/50'
            }`}
          >
            Continuar
          </motion.button>
        </div>
      </div>
    </OnboardingLayout>
  );
};
