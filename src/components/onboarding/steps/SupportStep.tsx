import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const SupportStep = () => {
  const { setStep } = useOnboarding();

  return (
    <OnboardingLayout category="Meta & Foco">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8"
        >
          <Heart className="w-12 h-12 text-emerald-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 text-center mb-4"
        >
          Estamos aqui por você!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-center max-w-xs leading-relaxed"
        >
          A jornada até sua meta pode ser desafiadora às vezes, mas estamos aqui para apoiá-lo a cada passo do caminho. Você não precisará enfrentar isso sozinho.
        </motion.p>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(10)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Parece ótimo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
