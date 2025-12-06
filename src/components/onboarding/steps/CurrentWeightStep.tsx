import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const CurrentWeightStep = () => {
  const { data, updateData, setStep } = useOnboarding();
  const [weight, setWeight] = useState(data.currentWeight || 70);
  const [decimal, setDecimal] = useState(0);

  const minWeight = data.units === 'metric' ? 30 : 66;
  const maxWeight = data.units === 'metric' ? 200 : 440;
  const unit = data.units === 'metric' ? 'kg' : 'lb';

  const adjustWeight = (delta: number) => {
    const newWeight = Math.max(minWeight, Math.min(maxWeight, weight + delta));
    setWeight(newWeight);
  };

  const adjustDecimal = (delta: number) => {
    let newDecimal = decimal + delta;
    if (newDecimal > 9) {
      newDecimal = 0;
      adjustWeight(1);
    } else if (newDecimal < 0) {
      newDecimal = 9;
      adjustWeight(-1);
    }
    setDecimal(newDecimal);
  };

  const handleContinue = () => {
    updateData({ currentWeight: weight + decimal / 10 });
    setStep(13);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Peso atual
        </h2>
        <p className="text-white/70 text-center mb-8">
          Não se preocupe, só você verá isso
        </p>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustWeight(1)}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Plus className="w-5 h-5 text-white" />
              </motion.button>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <span className="text-5xl font-bold text-white">{weight}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustWeight(-1)}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Minus className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            <span className="text-4xl text-white/50">.</span>

            <div className="flex flex-col items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustDecimal(1)}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Plus className="w-5 h-5 text-white" />
              </motion.button>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <span className="text-5xl font-bold text-white">{decimal}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustDecimal(-1)}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Minus className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            <span className="text-2xl text-white/70 ml-2">{unit}</span>
          </motion.div>
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
