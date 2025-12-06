import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const genders = [
  { id: 'male', label: 'Masculino', emoji: '👨' },
  { id: 'female', label: 'Feminino', emoji: '👩' },
  { id: 'other', label: 'Prefiro não responder', emoji: '🙂' },
];

export const GenderStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ gender: id });
    setTimeout(() => setStep(12), 200);
  };

  return (
    <OnboardingLayout category="Dados Corporais">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Como você se identifica?
        </h1>
        <p className="text-muted-foreground mb-8">
          Isso ajudará a encontrar dicas relacionadas à sua fisiologia
        </p>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            {genders.map((gender, index) => {
              const isSelected = data.gender === gender.id;
              return (
                <motion.button
                  key={gender.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(gender.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{gender.emoji}</span>
                    <span className="font-semibold text-lg text-foreground">
                      {gender.label}
                    </span>
                  </div>
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
