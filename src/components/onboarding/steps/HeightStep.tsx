import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const HeightStep = () => {
  const { data, updateData, setStep } = useOnboarding();
  const [height, setHeight] = useState(data.height || 170);

  const minHeight = data.units === 'metric' ? 100 : 40;
  const maxHeight = data.units === 'metric' ? 220 : 90;
  const unit = data.units === 'metric' ? 'cm' : 'in';

  const adjustHeight = (delta: number) => {
    const newHeight = Math.max(minHeight, Math.min(maxHeight, height + delta));
    setHeight(newHeight);
  };

  const handleContinue = () => {
    updateData({ height });
    setStep(12);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Qual sua altura?
        </h2>
        <p className="text-white/70 text-center mb-8">
          Usamos para calcular suas metas
        </p>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-6"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => adjustHeight(-1)}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Minus className="w-6 h-6 text-white" />
            </motion.button>

            <div className="bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-6">
              <div className="text-center">
                <span className="text-6xl font-bold text-white">{height}</span>
                <span className="text-2xl text-white/70 ml-2">{unit}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => adjustHeight(1)}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Plus className="w-6 h-6 text-white" />
            </motion.button>
          </motion.div>

          {/* Visual height indicator */}
          <div className="mt-8 h-32 w-2 bg-white/20 rounded-full relative overflow-hidden">
            <motion.div
              initial={{ height: '50%' }}
              animate={{ height: `${((height - minHeight) / (maxHeight - minHeight)) * 100}%` }}
              className="absolute bottom-0 w-full bg-white rounded-full"
            />
          </div>
        </div>

        <div className="pb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            className="w-full bg-white text-emerald-600 font-semibold py-4 rounded-2xl shadow-lg"
          >
            Continuar
          </motion.button>
        </div>
      </div>
    </OnboardingLayout>
  );
};
