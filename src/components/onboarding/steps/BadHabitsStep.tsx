import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const habits = [
  { id: 'chocolate', label: 'Eu amo chocolate e doces', emoji: '🍫' },
  { id: 'soda', label: 'Refrigerante é meu melhor amigo', emoji: '🥤' },
  { id: 'salty', label: 'Eu consumo muita comida salgada', emoji: '🧂' },
  { id: 'midnight', label: 'Eu sou um lanchador da meia-noite', emoji: '🌙' },
  { id: 'fastfood', label: 'Comida fast-food é meu prazer culposo', emoji: '🍔' },
  { id: 'emotional', label: 'Eu como sempre que me sinto mal', emoji: '😢' },
  { id: 'overeat', label: 'Tendo a comer demais', emoji: '🍽️' },
  { id: 'alcohol', label: 'Quero dizer não a uma bebida', emoji: '🍺' },
  { id: 'none', label: 'Nenhuma das opções acima', emoji: '✨' },
];

export const BadHabitsStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const toggleHabit = (id: string) => {
    if (id === 'none') {
      updateData({ badHabits: ['none'] });
      return;
    }
    
    const current = data.badHabits?.filter(h => h !== 'none') || [];
    const updated = current.includes(id)
      ? current.filter(h => h !== id)
      : [...current, id];
    updateData({ badHabits: updated });
  };

  return (
    <OnboardingLayout category="Hábitos Alimentares">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Todos nós temos alguns hábitos alimentares ruins. Quais são os seus?
        </h1>

        <div className="space-y-2 flex-1 overflow-y-auto mt-4">
          {habits.map((habit, index) => {
            const isSelected = data.badHabits?.includes(habit.id);
            return (
              <motion.button
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => toggleHabit(habit.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{habit.emoji}</span>
                  <span className={`text-sm font-medium ${isSelected ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {habit.label}
                  </span>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-8 pt-4 safe-area-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(25)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
