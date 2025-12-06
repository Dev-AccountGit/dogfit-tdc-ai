import { motion } from 'framer-motion';
import { TrendingDown, Scale, TrendingUp } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const goals = [
  { id: 'lose', label: 'Perder Peso', icon: TrendingDown, color: 'text-rose-500' },
  { id: 'maintain', label: 'Manter o Peso Atual', icon: Scale, color: 'text-blue-500' },
  { id: 'gain', label: 'Ganhar Peso', icon: TrendingUp, color: 'text-green-500' },
];

export const GoalStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ mainGoal: id });
    setTimeout(() => setStep(8), 200);
  };

  return (
    <OnboardingLayout category="Meta & Foco">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Qual meta você planeja alcançar?
        </h1>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-3">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <motion.button
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelect(goal.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                    data.mainGoal === goal.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center ${goal.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`font-medium text-lg ${
                    data.mainGoal === goal.id ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    {goal.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};
