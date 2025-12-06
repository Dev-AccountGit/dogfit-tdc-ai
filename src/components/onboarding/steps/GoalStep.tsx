import { motion } from 'framer-motion';
import { TrendingDown, Scale, TrendingUp, Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const goals = [
  { id: 'lose', label: 'Perder Peso', icon: TrendingDown, color: 'hsl(var(--ios-red))' },
  { id: 'maintain', label: 'Manter o Peso', icon: Scale, color: 'hsl(var(--ios-blue))' },
  { id: 'gain', label: 'Ganhar Peso', icon: TrendingUp, color: 'hsl(var(--primary))' },
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
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Qual meta você planeja alcançar?
        </h1>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              const isSelected = data.mainGoal === goal.id;
              return (
                <motion.button
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(goal.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:bg-secondary'
                  }`}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${goal.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: goal.color }} />
                  </div>
                  <span className={`font-semibold text-lg flex-1 text-left ${
                    isSelected ? 'text-foreground' : 'text-foreground'
                  }`}>
                    {goal.label}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};
