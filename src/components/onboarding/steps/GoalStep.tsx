import { motion } from 'framer-motion';
import { TrendingDown, Scale, TrendingUp, Dumbbell } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const goals = [
  { 
    id: 'lose', 
    title: 'Perder peso', 
    description: 'Emagrecer de forma saudável',
    icon: TrendingDown,
    color: 'from-rose-500 to-pink-500'
  },
  { 
    id: 'maintain', 
    title: 'Manter peso', 
    description: 'Continuar no peso atual',
    icon: Scale,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'gain', 
    title: 'Ganhar peso', 
    description: 'Aumentar massa de forma saudável',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'muscle', 
    title: 'Ganhar músculos', 
    description: 'Foco em hipertrofia',
    icon: Dumbbell,
    color: 'from-purple-500 to-violet-500'
  },
];

export const GoalStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ mainGoal: id });
    setTimeout(() => setStep(6), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Qual é seu objetivo?
        </h2>
        <p className="text-white/70 text-center mb-8">
          Vamos criar um plano personalizado para você
        </p>

        <div className="space-y-3">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <motion.button
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(goal.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  data.mainGoal === goal.id
                    ? 'bg-white shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-semibold ${
                    data.mainGoal === goal.id ? 'text-emerald-600' : 'text-white'
                  }`}>
                    {goal.title}
                  </p>
                  <p className={`text-sm ${
                    data.mainGoal === goal.id ? 'text-gray-500' : 'text-white/70'
                  }`}>
                    {goal.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};
