import { motion } from 'framer-motion';
import { Lightbulb, Camera, Sparkles } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const HealthyEatingStep = () => {
  const { setStep } = useOnboarding();

  return (
    <OnboardingLayout showProgress={false}>
      <div className="flex-1 flex flex-col">
        {/* Cards preview */}
        <div className="bg-gradient-to-b from-emerald-50 to-white px-6 pt-8 pb-12">
          <div className="flex justify-center gap-3">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-4 w-28"
            >
              <Camera className="w-6 h-6 text-emerald-500 mb-2" />
              <p className="text-xs text-gray-600">Food scan</p>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-4 w-28"
            >
              <Sparkles className="w-6 h-6 text-purple-500 mb-2" />
              <p className="text-xs text-gray-600">Nutrition Coach</p>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-4 w-28"
            >
              <Lightbulb className="w-6 h-6 text-orange-500 mb-2" />
              <p className="text-xs text-gray-600">Reach your goal</p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 text-center mb-4"
          >
            Torne a Alimentação Saudável Fácil
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center max-w-xs"
          >
            A IA transforma a nutrição complexa em passos simples e práticos que você pode seguir
          </motion.p>
        </div>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(27)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Entendi
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
