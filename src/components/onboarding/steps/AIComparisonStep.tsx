import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const comparisons = [
  {
    title: 'Digitalização direta e simples de alimentos, não apenas escaneamento de códigos de barras!',
    traditional: 'Disponível apenas para alimentos com código de barras',
    ai: 'Basta tirar uma foto do alimento para obter detalhes',
    icon: '📸'
  },
  {
    title: 'Dê adeus à entrada manual, o reconhecimento por IA é mais rápido',
    traditional: 'Registrar manualmente',
    ai: 'Uma simples digitalização revela instantaneamente suas porções de comida',
    icon: '⚡'
  },
  {
    title: 'Não consegue encontrar sua refeição? O Contador AI identifica cada refeição',
    traditional: 'Apenas um número limitado de grupos de alimentos pode ser reconhecido',
    ai: 'Identifica com precisão todos os componentes alimentares',
    icon: '🔍'
  },
];

export const AIComparisonStep = () => {
  const { setStep, step } = useOnboarding();
  const [currentComparison, setCurrentComparison] = useState(0);

  const handleNext = () => {
    if (currentComparison < comparisons.length - 1) {
      setCurrentComparison(prev => prev + 1);
    } else {
      setStep(step + 1);
    }
  };

  const comparison = comparisons[currentComparison];

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6">
        <motion.h1
          key={currentComparison}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-gray-900 mb-8 leading-tight"
        >
          {comparison.title}
        </motion.h1>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-100 rounded-2xl p-4"
          >
            <p className="text-xs text-gray-500 mb-2 font-medium">Contador Tradicional</p>
            <div className="h-32 bg-gray-200 rounded-xl mb-3 flex items-center justify-center">
              <span className="text-4xl opacity-50">📋</span>
            </div>
            <p className="text-sm text-gray-600">{comparison.traditional}</p>
          </motion.div>

          {/* AI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200"
          >
            <p className="text-xs text-emerald-600 mb-2 font-medium">Contador de Calorias por IA</p>
            <div className="h-32 bg-emerald-100 rounded-xl mb-3 flex items-center justify-center">
              <span className="text-4xl">{comparison.icon}</span>
            </div>
            <p className="text-sm text-emerald-700">{comparison.ai}</p>
          </motion.div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {comparisons.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentComparison ? 'bg-emerald-500 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
