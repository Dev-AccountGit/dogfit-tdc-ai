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
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative w-28 h-28 mb-8"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            <Heart className="w-14 h-14 text-primary" fill="currentColor" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute -top-1 -right-1 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[28px] font-bold text-foreground text-center mb-4 tracking-tight"
        >
          Estamos aqui por você!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center max-w-[280px] leading-relaxed text-[16px]"
        >
          A jornada pode ser desafiadora, mas você não está sozinho. Estaremos com você a cada passo do caminho.
        </motion.p>
      </div>

      <div className="px-6 pb-10 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(10)}
          className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 text-[17px]"
        >
          Parece ótimo ✨
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
