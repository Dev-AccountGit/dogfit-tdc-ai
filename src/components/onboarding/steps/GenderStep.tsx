import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const genders = [
  { id: 'male', label: 'Masculino', emoji: '👨', description: 'Ele/Dele' },
  { id: 'female', label: 'Feminino', emoji: '👩', description: 'Ela/Dela' },
  { id: 'other', label: 'Prefiro não dizer', emoji: '🙂', description: 'Não especificar' },
];

export const GenderStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ gender: id });
    setTimeout(() => setStep(12), 300);
  };

  return (
    <OnboardingLayout category="Dados Corporais">
      <div className="flex-1 flex flex-col px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[26px] font-bold text-foreground mb-2 tracking-tight"
        >
          Como você se identifica?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-[15px] mb-8"
        >
          Isso nos ajuda a personalizar suas metas
        </motion.p>

        <div className="flex-1 flex flex-col justify-center -mt-10">
          <div className="space-y-4">
            {genders.map((gender, index) => {
              const isSelected = data.gender === gender.id;
              
              return (
                <motion.button
                  key={gender.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.1, ease: [0.32, 0.72, 0, 1] }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(gender.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                      : 'border-border bg-white hover:border-primary/30 hover:shadow-md'
                  }`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center"
                  >
                    <span className="text-4xl">{gender.emoji}</span>
                  </motion.div>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold text-[18px] ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {gender.label}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {gender.description}
                    </p>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: isSelected ? 1 : 0.8,
                      opacity: isSelected ? 1 : 0
                    }}
                    className="w-7 h-7 rounded-full bg-primary flex items-center justify-center"
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
