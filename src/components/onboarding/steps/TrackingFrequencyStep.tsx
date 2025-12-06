import { motion } from 'framer-motion';
import { Calendar, CalendarDays, CalendarCheck } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const frequencies = [
  { 
    id: 'all', 
    title: 'Todas as refeições', 
    description: 'Acompanhamento completo',
    icon: CalendarCheck 
  },
  { 
    id: 'main', 
    title: 'Refeições principais', 
    description: 'Café, almoço e jantar',
    icon: CalendarDays 
  },
  { 
    id: 'sometimes', 
    title: 'Quando lembrar', 
    description: 'Sem pressão',
    icon: Calendar 
  },
];

export const TrackingFrequencyStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ trackingFrequency: id });
    setTimeout(() => setStep(19), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Com que frequência quer registrar?
        </h2>
        <p className="text-white/70 text-center mb-8">
          Quanto mais registrar, melhores os resultados
        </p>

        <div className="space-y-3">
          {frequencies.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  data.trackingFrequency === item.id
                    ? 'bg-white shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  data.trackingFrequency === item.id ? 'bg-emerald-500' : 'bg-white/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    data.trackingFrequency === item.id ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-semibold ${
                    data.trackingFrequency === item.id ? 'text-emerald-600' : 'text-white'
                  }`}>
                    {item.title}
                  </p>
                  <p className={`text-sm ${
                    data.trackingFrequency === item.id ? 'text-gray-500' : 'text-white/70'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};
