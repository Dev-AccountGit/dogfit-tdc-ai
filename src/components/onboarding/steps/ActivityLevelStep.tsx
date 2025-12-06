import { motion } from 'framer-motion';
import { Sofa, Footprints, Bike, Dumbbell, Flame } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const levels = [
  { 
    id: 'sedentary', 
    title: 'Sedentário', 
    description: 'Pouco ou nenhum exercício',
    icon: Sofa 
  },
  { 
    id: 'light', 
    title: 'Levemente ativo', 
    description: 'Exercício leve 1-3x/semana',
    icon: Footprints 
  },
  { 
    id: 'moderate', 
    title: 'Moderadamente ativo', 
    description: 'Exercício moderado 3-5x/semana',
    icon: Bike 
  },
  { 
    id: 'active', 
    title: 'Muito ativo', 
    description: 'Exercício intenso 6-7x/semana',
    icon: Dumbbell 
  },
  { 
    id: 'extreme', 
    title: 'Extremamente ativo', 
    description: 'Atleta ou trabalho físico pesado',
    icon: Flame 
  },
];

export const ActivityLevelStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ activityLevel: id });
    setTimeout(() => setStep(15), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-6">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Nível de atividade
        </h2>
        <p className="text-white/70 text-center mb-6">
          Qual seu nível de atividade física?
        </p>

        <div className="space-y-2 overflow-y-auto flex-1">
          {levels.map((level, index) => {
            const Icon = level.icon;
            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(level.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  data.activityLevel === level.id
                    ? 'bg-white shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  data.activityLevel === level.id ? 'bg-emerald-500' : 'bg-white/20'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    data.activityLevel === level.id ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-semibold text-sm ${
                    data.activityLevel === level.id ? 'text-emerald-600' : 'text-white'
                  }`}>
                    {level.title}
                  </p>
                  <p className={`text-xs ${
                    data.activityLevel === level.id ? 'text-gray-500' : 'text-white/70'
                  }`}>
                    {level.description}
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
