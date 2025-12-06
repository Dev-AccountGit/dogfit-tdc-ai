import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const trainingItems = [
  'Configurando IA para reconhecer alimentos...',
  'Treinando para suas preferências...',
  'Ajustando para seu idioma...',
  'Otimizando recomendações...',
];

export const TrainingStep = () => {
  const { setStep } = useOnboarding();
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep(26), 500);
          return 100;
        }
        return prev + 2.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [setStep]);

  useEffect(() => {
    trainingItems.forEach((_, index) => {
      setTimeout(() => {
        setCompletedItems(prev => [...prev, index]);
      }, (index + 1) * 1000);
    });
  }, []);

  return (
    <OnboardingLayout showProgress={false}>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </motion.div>
        </motion.div>

        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Preparando sua experiência
        </h2>

        <div className="w-full max-w-xs space-y-3 mb-8">
          {trainingItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-3"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                completedItems.includes(index) 
                  ? 'bg-white' 
                  : 'bg-white/20'
              }`}>
                {completedItems.includes(index) && (
                  <Check className="w-4 h-4 text-emerald-500" />
                )}
              </div>
              <span className={`text-sm ${
                completedItems.includes(index) ? 'text-white' : 'text-white/50'
              }`}>
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="text-white/70 text-center mt-2 text-sm">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};
