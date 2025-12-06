import { motion } from 'framer-motion';
import { Camera, Search, Sparkles, Clock, Zap, Brain } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const AIComparisonStep = () => {
  const { setStep } = useOnboarding();

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-4">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Por que usar IA?
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Tradicional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-5 h-5 text-white/60" />
              <span className="text-white/60 text-sm font-medium">Tradicional</span>
            </div>
            <ul className="space-y-2 text-white/60 text-xs">
              <li className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>Busca manual lenta</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 flex items-center justify-center">📝</span>
                <span>Digitar tudo</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 flex items-center justify-center">❌</span>
                <span>Estimativas imprecisas</span>
              </li>
            </ul>
          </motion.div>

          {/* Com IA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-4 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span className="text-emerald-600 text-sm font-medium">Com IA</span>
            </div>
            <ul className="space-y-2 text-gray-600 text-xs">
              <li className="flex items-center gap-2">
                <Camera className="w-3 h-3 text-emerald-500" />
                <span>Foto instantânea</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-emerald-500" />
                <span>Reconhecimento automático</span>
              </li>
              <li className="flex items-center gap-2">
                <Brain className="w-3 h-3 text-emerald-500" />
                <span>Precisão inteligente</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">80% mais rápido</p>
              <p className="text-white/80 text-sm">que métodos tradicionais</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-auto pb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(5)}
            className="w-full bg-white text-emerald-600 font-semibold py-4 rounded-2xl shadow-lg"
          >
            Continuar
          </motion.button>
        </div>
      </div>
    </OnboardingLayout>
  );
};
