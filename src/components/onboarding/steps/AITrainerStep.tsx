import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const AITrainerStep = () => {
  const { setStep } = useOnboarding();

  return (
    <OnboardingLayout showProgress={false}>
      <div className="flex-1 flex flex-col">
        {/* Header with AI chat preview */}
        <div className="bg-gradient-to-b from-emerald-50 to-white px-6 pt-8 pb-12">
          <div className="bg-white rounded-3xl shadow-xl p-4 max-w-xs mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Nutrition Coach</span>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-3 mb-2">
              <p className="text-sm text-emerald-800">Pick a meal to ask about</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <span>🥗</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">285 kcal</p>
                <p className="text-sm font-medium text-gray-700">Grilled Chicken Salad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
          >
            <Sparkles className="w-8 h-8 text-emerald-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 text-center mb-4"
          >
            Treinamento Personalizado Que Se Adapta a Você
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center max-w-xs"
          >
            Um Treinador AI 24/7 que cresce com suas metas, rotinas e estilo de vida
          </motion.p>
        </div>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(18)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Parece Bom
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
