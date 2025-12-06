import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const MealTimingInfoStep = () => {
  const { setStep } = useOnboarding();

  return (
    <OnboardingLayout category="Hábitos Alimentares">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-8"
        >
          <Clock className="w-10 h-10 text-emerald-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 text-center mb-4"
        >
          Como comemos é tão importante quanto quando comemos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-center max-w-xs leading-relaxed"
        >
          Programar bem as refeições ajuda nosso corpo a funcionar melhor, controlar a fome e gerenciar a energia ao longo do dia.
        </motion.p>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(30)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
