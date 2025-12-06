import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import logo from '@/assets/logo.png';

export const WelcomeStep = () => {
  const { setStep } = useOnboarding();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="mb-8"
      >
        <img src={logo} alt="DogFitTdc Ai" className="w-32 h-32 rounded-3xl shadow-2xl" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl font-bold text-white text-center mb-4"
      >
        🐕 DogFitTdc Ai
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-white/80 text-center text-lg mb-12 max-w-xs"
      >
        Seu assistente inteligente para uma vida mais saudável
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
      >
        <Sparkles className="w-5 h-5 text-yellow-300" />
        <span className="text-white text-sm">Powered by AI</span>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setStep(2)}
        className="w-full max-w-xs bg-white text-emerald-600 font-semibold py-4 rounded-2xl shadow-lg"
      >
        Começar
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/60 text-xs mt-6 text-center"
      >
        Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
      </motion.p>
    </div>
  );
};
