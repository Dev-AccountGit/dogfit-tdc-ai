import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const experiences = [
  { id: 'tried', label: 'Eu tentei, mas parei', emoji: '😅' },
  { id: 'never', label: 'Nunca. Parece complexo', emoji: '🤔' },
  { id: 'doing', label: 'Sim, e ainda estou fazendo', emoji: '💪' },
];

export const ExperienceStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ calorieCountingExperience: id });
    setTimeout(() => setStep(4), 200);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-foreground mb-8">
          Você já contou calorias antes?
        </h1>

        <div className="space-y-4">
          {experiences.map((exp, index) => {
            const isSelected = data.calorieCountingExperience === exp.id;
            return (
              <motion.button
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(exp.id)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{exp.emoji}</span>
                  <span className={`font-medium text-left ${
                    isSelected ? 'text-foreground' : 'text-foreground'
                  }`}>
                    {exp.label}
                  </span>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};
