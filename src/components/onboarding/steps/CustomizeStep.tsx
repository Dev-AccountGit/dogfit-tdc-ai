import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const CustomizeStep = () => {
  const { setStep } = useOnboarding();

  return (
    <OnboardingLayout showProgress={false}>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-8"
        >
          <Settings className="w-10 h-10 text-emerald-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 text-center mb-4"
        >
          AI Calorie Counter sua escolha final
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-center max-w-xs leading-relaxed"
        >
          Como todos são únicos, recomendamos fortemente que você personalize seu plano para atender às suas necessidades específicas.
        </motion.p>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(24)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Personalizar
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
