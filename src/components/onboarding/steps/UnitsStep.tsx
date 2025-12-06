import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const units = [
  { 
    id: 'metric', 
    title: 'Métrico', 
    description: 'kg, cm',
    examples: ['70 kg', '170 cm']
  },
  { 
    id: 'imperial', 
    title: 'Imperial', 
    description: 'lb, ft/in',
    examples: ['154 lb', '5\'7"']
  },
];

export const UnitsStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: 'metric' | 'imperial') => {
    updateData({ units: id });
    setTimeout(() => setStep(11), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Sistema de medidas
        </h2>
        <p className="text-white/70 text-center mb-8">
          Escolha como prefere ver seus dados
        </p>

        <div className="space-y-4">
          {units.map((unit, index) => (
            <motion.button
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(unit.id as 'metric' | 'imperial')}
              className={`w-full p-5 rounded-2xl transition-all ${
                data.units === unit.id
                  ? 'bg-white shadow-lg'
                  : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className={`font-semibold text-lg ${
                    data.units === unit.id ? 'text-emerald-600' : 'text-white'
                  }`}>
                    {unit.title}
                  </p>
                  <p className={`text-sm ${
                    data.units === unit.id ? 'text-gray-500' : 'text-white/70'
                  }`}>
                    {unit.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  {unit.examples.map((ex, i) => (
                    <span 
                      key={i}
                      className={`px-3 py-1 rounded-full text-sm ${
                        data.units === unit.id 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
