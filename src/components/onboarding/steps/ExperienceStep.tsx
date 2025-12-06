import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const experiences = [
  { id: 'tried', label: 'Eu tentei, mas parei', emoji: '😅', description: 'Comecei mas não mantive' },
  { id: 'never', label: 'Nunca. Parece complexo', emoji: '🤔', description: 'Nunca experimentei antes' },
  { id: 'doing', label: 'Sim, ainda estou fazendo', emoji: '💪', description: 'Atualmente conto calorias' },
];

export const ExperienceStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ calorieCountingExperience: id });
    setTimeout(() => setStep(4), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[26px] font-bold text-foreground mb-2 tracking-tight"
        >
          Você já contou calorias antes?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-[15px] mb-8"
        >
          Isso nos ajuda a personalizar sua experiência
        </motion.p>

        <div className="flex-1 flex flex-col justify-center -mt-10">
          <div className="space-y-3">
            {experiences.map((exp, index) => {
              const isSelected = data.calorieCountingExperience === exp.id;
              
              return (
                <motion.button
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.1, ease: [0.32, 0.72, 0, 1] }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(exp.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                      : 'border-border bg-white hover:border-primary/30 hover:shadow-md'
                  }`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center"
                  >
                    <span className="text-3xl">{exp.emoji}</span>
                  </motion.div>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold text-[16px] ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {exp.label}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {exp.description}
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
