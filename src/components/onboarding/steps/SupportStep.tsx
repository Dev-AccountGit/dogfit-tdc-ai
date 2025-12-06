import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
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
          className="relative w-28 h-28 mb-8"
        >
          <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
            <Heart className="w-14 h-14 text-primary" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute -top-2 -right-2 w-10 h-10 bg-[hsl(var(--ios-purple))]/20 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-[hsl(var(--ios-purple))]" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-foreground text-center mb-4"
        >
          Estamos aqui por você!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-center max-w-xs leading-relaxed"
        >
          A jornada até sua meta pode ser desafiadora às vezes, mas estamos aqui para apoiá-lo a cada passo do caminho.
        </motion.p>
      </div>

      <div className="px-6 pb-10 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(10)}
          className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30"
        >
          Parece ótimo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
