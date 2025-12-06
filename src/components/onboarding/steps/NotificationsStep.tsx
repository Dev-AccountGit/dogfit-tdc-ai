import { motion } from 'framer-motion';
import { Bell, BellOff } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const NotificationsStep = () => {
  const { updateData, setStep } = useOnboarding();

  const handleEnable = () => {
    updateData({ notificationsEnabled: true });
    setStep(25);
  };

  const handleSkip = () => {
    updateData({ notificationsEnabled: false });
    setStep(25);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8"
        >
          <Bell className="w-16 h-16 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white text-center mb-4"
        >
          Ativar notificações?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-center mb-8 max-w-xs"
        >
          Receba lembretes para registrar refeições, beber água e manter seus hábitos em dia
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xs space-y-3"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <span className="text-lg">🍽️</span>
            </div>
            <span className="text-white text-sm">Lembretes de refeições</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-lg">💧</span>
            </div>
            <span className="text-white text-sm">Hidratação</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
            <span className="text-white text-sm">Resumo diário</span>
          </div>
        </motion.div>

        <div className="mt-auto pb-8 w-full max-w-xs space-y-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnable}
            className="w-full bg-white text-emerald-600 font-semibold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <Bell className="w-5 h-5" />
            Ativar notificações
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkip}
            className="w-full text-white/70 font-medium py-3"
          >
            Agora não
          </motion.button>
        </div>
      </div>
    </OnboardingLayout>
  );
};
