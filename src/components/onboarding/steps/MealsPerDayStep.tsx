import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const options = [
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4+' },
];

export const MealsPerDayStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (value: number) => {
    updateData({ mealsPerDay: value });
    setTimeout(() => setStep(31), 200);
  };

  return (
    <OnboardingLayout category="Hábitos Alimentares">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Quantas refeições você faz por dia?
        </h1>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex gap-4">
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelect(option.value)}
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold border-2 transition-all ${
                  data.mealsPerDay === option.value
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(31)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
