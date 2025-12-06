import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const CurrentWeightStep = () => {
  const { data, updateData, setStep } = useOnboarding();
  const [weight, setWeight] = useState(data.currentWeight || 70);
  const [decimal, setDecimal] = useState(0);

  const unit = data.units === 'metric' ? 'kg' : 'lb';
  const minWeight = data.units === 'metric' ? 30 : 66;
  const maxWeight = data.units === 'metric' ? 200 : 440;

  const adjustWeight = (delta: number) => {
    const newWeight = Math.max(minWeight, Math.min(maxWeight, weight + delta));
    setWeight(newWeight);
  };

  const handleContinue = () => {
    updateData({ currentWeight: weight + decimal / 10 });
    setStep(16);
  };

  return (
    <OnboardingLayout category="Dados Corporais">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Qual é o seu peso?
        </h1>
        <p className="text-gray-500 mb-8">
          Especifique seu peso o mais próximo possível
        </p>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => adjustWeight(-1)}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </motion.button>

            <div className="bg-emerald-100 rounded-2xl px-8 py-4 border-2 border-emerald-500">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-emerald-700">{weight}.{decimal}</span>
                <span className="text-xl text-emerald-500">{unit}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => adjustWeight(1)}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Decimal selector */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button
              key={d}
              onClick={() => setDecimal(d)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                decimal === d
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              .{d}
            </button>
          ))}
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
