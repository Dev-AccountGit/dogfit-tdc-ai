import { motion } from 'framer-motion';
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Como você se identifica?
        </h1>
        <p className="text-gray-500 mb-8">
          Isso ajudará a encontrar dicas relacionadas à sua fisiologia
        </p>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-3">
            {genders.map((gender, index) => (
              <motion.button
                key={gender.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelect(gender.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                  data.gender === gender.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-3xl">{gender.emoji}</span>
                <span className={`font-medium text-lg ${
                  data.gender === gender.id ? 'text-emerald-700' : 'text-gray-700'
                }`}>
                  {gender.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};
