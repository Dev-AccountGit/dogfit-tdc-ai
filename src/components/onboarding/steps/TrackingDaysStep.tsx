import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const options = [
  { days: 50, label: '50 dias seguidos', badge: 'Excelente', color: 'bg-purple-100 text-purple-700' },
  { days: 30, label: '30 dias seguidos', badge: 'Incrível', color: 'bg-emerald-100 text-emerald-700' },
  { days: 14, label: '14 dias seguidos', badge: 'Ótimo', color: 'bg-blue-100 text-blue-700' },
  { days: 7, label: '7 dias seguidos', badge: 'Bom', color: 'bg-orange-100 text-orange-700' },
];

export const TrackingDaysStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (days: number) => {
    updateData({ trackingDays: days });
    setTimeout(() => setStep(21), 200);
  };

  return (
    <OnboardingLayout category="Estilo De Vida">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Quantos dias seguidos você consegue rastrear sua nutrição?
        </h1>
        <p className="text-gray-500 mb-8">
          Vamos ver por quanto tempo você consegue manter este hábito
        </p>

        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.button
              key={option.days}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(option.days)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                data.trackingDays === option.days
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className={`font-medium ${
                data.trackingDays === option.days ? 'text-emerald-700' : 'text-gray-700'
              }`}>
                {option.label}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${option.color}`}>
                {option.badge}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
