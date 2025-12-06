import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const options = [
  { id: 'all', title: 'Cada refeição', description: 'Planejo registrar tudo que eu como' },
  { id: 'main', title: 'Apenas refeições principais', description: 'Vou acompanhar apenas café da manhã, almoço e jantar' },
  { id: 'remember', title: 'Quando eu lembrar', description: 'Vou acompanhar às vezes, mas não de forma consistente' },
  { id: 'occasional', title: 'Ocasionalmente', description: 'Acompanharei minhas refeições de vez em quando, quando for necessário' },
];

export const TrackingFrequencyStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ trackingFrequency: id });
    setTimeout(() => setStep(23), 200);
  };

  return (
    <OnboardingLayout category="Estilo De Vida">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Como você planeja acompanhar suas refeições?
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
                data.trackingFrequency === option.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <p className={`font-semibold mb-1 ${
                data.trackingFrequency === option.id ? 'text-emerald-700' : 'text-gray-700'
              }`}>
                {option.title}
              </p>
              <p className={`text-sm ${
                data.trackingFrequency === option.id ? 'text-emerald-600' : 'text-gray-500'
              }`}>
                {option.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
