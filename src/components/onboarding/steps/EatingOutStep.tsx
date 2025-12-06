import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const options = [
  { id: 'home', label: 'Apenas em casa', emoji: '🏠' },
  { id: 'sometimes', label: 'Às vezes', emoji: '🍽️' },
  { id: 'often', label: 'Frequentemente', emoji: '🍔' },
];

export const EatingOutStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ eatingOutFrequency: id });
    setTimeout(() => setStep(34), 200);
  };

  return (
    <OnboardingLayout category="Hábitos Alimentares">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Você come fora?
        </h1>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-3">
            {options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelect(option.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                  data.eatingOutFrequency === option.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className={`font-medium text-lg ${
                  data.eatingOutFrequency === option.id ? 'text-emerald-700' : 'text-gray-700'
                }`}>
                  {option.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};
