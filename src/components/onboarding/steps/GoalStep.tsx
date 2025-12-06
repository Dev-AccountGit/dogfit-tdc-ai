import { motion } from 'framer-motion';
import { TrendingDown, Scale, TrendingUp, Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const goals = [
  { 
    id: 'lose', 
    label: 'Perder Peso', 
    description: 'Queimar gordura e emagrecer',
    icon: TrendingDown, 
    gradient: 'from-rose-500 to-pink-500',
    bg: 'bg-gradient-to-br from-rose-50 to-pink-50',
    iconBg: 'bg-rose-100'
  },
  { 
    id: 'maintain', 
    label: 'Manter Peso', 
    description: 'Manter o peso atual',
    icon: Scale, 
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    iconBg: 'bg-blue-100'
  },
  { 
    id: 'gain', 
    label: 'Ganhar Peso', 
    description: 'Aumentar massa muscular',
    icon: TrendingUp, 
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    iconBg: 'bg-emerald-100'
  },
];

export const GoalStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ mainGoal: id });
    setTimeout(() => setStep(8), 300);
  };

  return (
    <OnboardingLayout category="Meta & Foco">
      <div className="flex-1 flex flex-col px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[26px] font-bold text-foreground mb-2 tracking-tight"
        >
          Qual é sua meta?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-[15px] mb-8"
        >
          Escolha seu objetivo principal
        </motion.p>

        <div className="flex-1 flex flex-col justify-center -mt-10">
          <div className="space-y-4">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              const isSelected = data.mainGoal === goal.id;
              
              return (
                <motion.button
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.1, ease: [0.32, 0.72, 0, 1] }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(goal.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                      : 'border-border bg-white hover:border-primary/30 hover:shadow-md'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${goal.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 bg-gradient-to-br ${goal.gradient} bg-clip-text`} style={{ color: goal.gradient.includes('rose') ? '#f43f5e' : goal.gradient.includes('blue') ? '#3b82f6' : '#10b981' }} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold text-[17px] ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {goal.label}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {goal.description}
                    </p>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: isSelected ? 1 : 0.8,
                      opacity: isSelected ? 1 : 0
                    }}
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};
