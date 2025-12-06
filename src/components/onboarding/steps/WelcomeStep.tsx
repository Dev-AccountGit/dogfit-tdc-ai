import { motion } from 'framer-motion';
import { Camera, Sparkles, Zap } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';

export const WelcomeStep = () => {
  const { setStep } = useOnboarding();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Language selector */}
      <div className="absolute top-14 right-5 z-10">
        <button className="px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full text-sm font-medium text-foreground border border-border/50">
          PT
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
        {/* Food image mockup with glassmorphism */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-72 h-72 mb-8"
        >
          {/* Main card */}
          <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl">
            <span className="text-8xl">🍳</span>
          </div>
          
          {/* Floating nutrition cards */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -left-4 top-8 bg-card/90 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--nutrition-calories))] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Calorias</p>
                <p className="text-sm font-bold text-foreground">240 kcal</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -right-4 top-20 bg-card/90 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--nutrition-protein))] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Proteína</p>
                <p className="text-sm font-bold text-foreground">30g</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--nutrition-carbs))] flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Escaneado</p>
                <p className="text-sm font-bold text-primary">por IA</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-foreground text-center mb-4 mt-8"
        >
          Contador de Calorias por IA
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-center mb-8 max-w-xs leading-relaxed"
        >
          Tire uma foto de sua refeição para registrar alimentos instantaneamente.{' '}
          <span className="font-semibold text-foreground">Não é necessário entrada manual!</span>
        </motion.p>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-10 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(2)}
          className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30"
        >
          Isso é bom!
        </motion.button>
      </div>
    </div>
  );
};
