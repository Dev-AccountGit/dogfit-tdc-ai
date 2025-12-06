import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const units = [
  { id: 'metric', label: 'Métrico', description: '(m, kg, ml)' },
  { id: 'imperial', label: 'Imperial', description: '(ft, lb, fl oz)' },
];

export const UnitsStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: 'metric' | 'imperial') => {
    updateData({ units: id });
    setTimeout(() => setStep(14), 200);
  };

  return (
    <OnboardingLayout category="Dados Corporais">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Quais são suas unidades?
        </h1>
        <p className="text-gray-500 mb-8">
          O sistema de medição que você selecionar será aplicado a todas as medições no aplicativo
        </p>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-3">
            {units.map((unit, index) => (
              <motion.button
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelect(unit.id as 'metric' | 'imperial')}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                  data.units === unit.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-lg ${
                    data.units === unit.id ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    {unit.label}
                  </span>
                  <span className={`text-sm ${
                    data.units === unit.id ? 'text-emerald-500' : 'text-gray-400'
                  }`}>
                    {unit.description}
                  </span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  data.units === unit.id 
                    ? 'border-emerald-500 bg-emerald-500' 
                    : 'border-gray-300'
                }`}>
                  {data.units === unit.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};
