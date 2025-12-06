import { motion } from 'framer-motion';
import { Sparkles, Target, TrendingUp } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const experiences = [
  { 
    id: 'beginner', 
    title: 'Iniciante', 
    description: 'Primeira vez acompanhando alimentação',
    icon: Sparkles 
  },
  { 
    id: 'intermediate', 
    title: 'Intermediário', 
    description: 'Já tentei alguns apps antes',
    icon: Target 
  },
  { 
    id: 'advanced', 
    title: 'Avançado', 
    description: 'Acompanho há bastante tempo',
    icon: TrendingUp 
  },
];

export const ExperienceStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ experienceLevel: id });
    setTimeout(() => setStep(4), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Qual sua experiência?
        </h2>
        <p className="text-white/70 text-center mb-8">
          Isso nos ajuda a personalizar sua jornada
        </p>

        <div className="space-y-3">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.button
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(exp.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  data.experienceLevel === exp.id
                    ? 'bg-white shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  data.experienceLevel === exp.id ? 'bg-emerald-500' : 'bg-white/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    data.experienceLevel === exp.id ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-semibold ${
                    data.experienceLevel === exp.id ? 'text-emerald-600' : 'text-white'
                  }`}>
                    {exp.title}
                  </p>
                  <p className={`text-sm ${
                    data.experienceLevel === exp.id ? 'text-gray-500' : 'text-white/70'
                  }`}>
                    {exp.description}
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
