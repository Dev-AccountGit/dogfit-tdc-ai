import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const genders = [
  { id: 'female', label: 'Feminino', emoji: '👩' },
  { id: 'male', label: 'Masculino', emoji: '👨' },
  { id: 'other', label: 'Outro', emoji: '🧑' },
];

export const GenderStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ gender: id });
    setTimeout(() => setStep(9), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Qual seu gênero?
        </h2>
        <p className="text-white/70 text-center mb-8">
          Isso nos ajuda a calcular suas necessidades
        </p>

        <div className="flex justify-center gap-4 mb-8">
          {genders.map((gender, index) => (
            <motion.button
              key={gender.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(gender.id)}
              className={`flex flex-col items-center gap-3 p-6 rounded-3xl transition-all ${
                data.gender === gender.id
                  ? 'bg-white shadow-lg scale-105'
                  : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              <span className="text-5xl">{gender.emoji}</span>
              <span className={`font-medium ${
                data.gender === gender.id ? 'text-emerald-600' : 'text-white'
              }`}>
                {gender.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
