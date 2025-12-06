import { motion } from 'framer-motion';
import { Briefcase, Home, Car, Building } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const lifestyles = [
  { 
    id: 'office', 
    title: 'Trabalho de escritório', 
    description: 'Maior parte do dia sentado',
    icon: Briefcase 
  },
  { 
    id: 'home', 
    title: 'Trabalho em casa', 
    description: 'Home office ou trabalho remoto',
    icon: Home 
  },
  { 
    id: 'active_job', 
    title: 'Trabalho ativo', 
    description: 'Movimento constante no trabalho',
    icon: Building 
  },
  { 
    id: 'driving', 
    title: 'Motorista', 
    description: 'Passa muito tempo dirigindo',
    icon: Car 
  },
];

export const LifestyleStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ lifestyle: id });
    setTimeout(() => setStep(16), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Seu estilo de vida
        </h2>
        <p className="text-white/70 text-center mb-8">
          Como é seu dia a dia?
        </p>

        <div className="space-y-3">
          {lifestyles.map((item, index) => {
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
                  data.lifestyle === item.id
                    ? 'bg-white shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  data.lifestyle === item.id ? 'bg-emerald-500' : 'bg-white/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    data.lifestyle === item.id ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-semibold ${
                    data.lifestyle === item.id ? 'text-emerald-600' : 'text-white'
                  }`}>
                    {item.title}
                  </p>
                  <p className={`text-sm ${
                    data.lifestyle === item.id ? 'text-gray-500' : 'text-white/70'
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
