import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const ProgressSpeedStep = () => {
  const { data, updateData, setStep } = useOnboarding();
  const [speed, setSpeed] = useState(data.progressSpeed || 0.5);

  const getSpeedLabel = () => {
    if (speed <= 0.3) return 'Lento';
    if (speed <= 0.6) return 'Ótimo';
    return 'Rápido';
  };

  const handleContinue = () => {
    updateData({ progressSpeed: speed });
    setStep(20);
  };

  const isLoss = data.mainGoal === 'lose';
  const speedText = isLoss ? 'perda' : 'ganho';

  return (
    <OnboardingLayout category="Estilo De Vida">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Com que rapidez você quer atingir seu objetivo?
        </h1>
        <p className="text-gray-500 mb-8">
          Taxa de {speedText} de peso por semana
        </p>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Speed display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-emerald-100 rounded-3xl p-6 mb-8 border-2 border-emerald-500"
          >
            <div className="text-center">
              <span className="text-emerald-600 text-sm font-medium">{getSpeedLabel()}</span>
              <p className="text-4xl font-bold text-emerald-700">{speed} kg</p>
            </div>
          </motion.div>

          {/* Slider */}
          <div className="w-full max-w-xs mb-6">
            <input
              type="range"
              min="0.25"
              max="1"
              step="0.25"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>0.25 kg</span>
              <span>1 kg</span>
            </div>
          </div>

          {/* Warning */}
          <p className="text-sm text-gray-500 text-center max-w-xs">
            {speedText === 'perda' 
              ? 'Perda de peso rápida (0.6-0.8 kg/semana) pode acelerar os resultados, mas pode não ser sustentável.'
              : 'Ganho de peso rápido (0.6-0.8 kg/semana) pode acelerar os resultados, mas pode aumentar o ganho de gordura.'}
          </p>
        </div>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
