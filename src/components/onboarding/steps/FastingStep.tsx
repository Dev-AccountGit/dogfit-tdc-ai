import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const options = [
  { id: 'doing', label: 'Sim, estou fazendo agora' },
  { id: 'tried', label: 'Sim, tentei, mas não mais' },
  { id: 'interested', label: 'Não, mas parece interessante' },
  { id: 'unknown', label: 'Não, não faço ideia do que é' },
  { id: 'not_interested', label: 'Não, e não estou interessado' },
];

export const FastingStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ fastingExperience: id });
    setTimeout(() => setStep(32), 200);
  };

  return (
    <OnboardingLayout category="Hábitos Alimentares">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Você já tentou o jejum intermitente?
        </h1>

        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(option.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                data.fastingExperience === option.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className={`font-medium ${
                data.fastingExperience === option.id ? 'text-emerald-700' : 'text-gray-700'
              }`}>
                {option.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
