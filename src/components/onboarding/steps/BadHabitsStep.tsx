import { motion } from 'framer-motion';
import { Coffee, Wine, Candy, Pizza, Moon, Cigarette } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const habits = [
  { id: 'coffee', label: 'Café em excesso', icon: Coffee },
  { id: 'alcohol', label: 'Bebidas alcoólicas', icon: Wine },
  { id: 'sweets', label: 'Doces frequentes', icon: Candy },
  { id: 'fastfood', label: 'Fast food', icon: Pizza },
  { id: 'late_eating', label: 'Comer tarde', icon: Moon },
  { id: 'smoking', label: 'Fumar', icon: Cigarette },
];

export const BadHabitsStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const toggleHabit = (id: string) => {
    const current = data.badHabits || [];
    const updated = current.includes(id)
      ? current.filter(h => h !== id)
      : [...current, id];
    updateData({ badHabits: updated });
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Hábitos a melhorar
        </h2>
        <p className="text-white/70 text-center mb-8">
          Selecione os que se aplicam (opcional)
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {habits.map((item, index) => {
            const Icon = item.icon;
            const isSelected = data.badHabits?.includes(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleHabit(item.id)}
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
            onClick={() => setStep(20)}
            className="w-full bg-white text-emerald-600 font-semibold py-4 rounded-2xl shadow-lg"
          >
            Continuar
          </motion.button>
        </div>
      </div>
    </OnboardingLayout>
  );
};
