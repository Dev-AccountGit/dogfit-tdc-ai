import { motion } from 'framer-motion';
import { Turtle, Rabbit, Zap } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const speeds = [
  { 
    id: 'slow', 
    title: 'Devagar e constante', 
    description: 'Perda gradual e sustentável',
    rate: '0.25-0.5 kg/semana',
    icon: Turtle,
    color: 'from-blue-400 to-cyan-400'
  },
  { 
    id: 'moderate', 
    title: 'Ritmo moderado', 
    description: 'Equilíbrio entre velocidade e conforto',
    rate: '0.5-0.75 kg/semana',
    icon: Rabbit,
    color: 'from-emerald-400 to-green-400'
  },
  { 
    id: 'fast', 
    title: 'Acelerado', 
    description: 'Resultados mais rápidos, mais esforço',
    rate: '0.75-1 kg/semana',
    icon: Zap,
    color: 'from-orange-400 to-red-400'
  },
];

export const ProgressSpeedStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ progressSpeed: id });
    setTimeout(() => setStep(17), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Velocidade do progresso
        </h2>
        <p className="text-white/70 text-center mb-8">
          Em que ritmo você quer alcançar seu objetivo?
        </p>

        <div className="space-y-4">
          {speeds.map((speed, index) => {
            const Icon = speed.icon;
            return (
              <motion.button
                key={speed.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(speed.id)}
                className={`w-full p-4 rounded-2xl transition-all ${
                  data.progressSpeed === speed.id
                    ? 'bg-white shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${speed.color} flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className={`font-semibold ${
                      data.progressSpeed === speed.id ? 'text-emerald-600' : 'text-white'
                    }`}>
                      {speed.title}
                    </p>
                    <p className={`text-sm ${
                      data.progressSpeed === speed.id ? 'text-gray-500' : 'text-white/70'
                    }`}>
                      {speed.description}
                    </p>
                    <p className={`text-xs mt-1 font-medium ${
                      data.progressSpeed === speed.id ? 'text-emerald-500' : 'text-white/50'
                    }`}>
                      {speed.rate}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};
