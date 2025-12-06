import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const motivations = [
  { id: 'appearance', label: 'Aparência Melhor', emoji: '✨' },
  { id: 'confidence', label: 'Sentir-se Mais Confiante', emoji: '💪' },
  { id: 'occasion', label: 'Ocasião Especial', emoji: '🎉' },
  { id: 'health', label: 'Melhorar a Saúde', emoji: '❤️' },
  { id: 'energy', label: 'Aumentar Energia', emoji: '⚡' },
  { id: 'stress', label: 'Liberar Estresse', emoji: '🧘' },
  { id: 'immune', label: 'Melhorar Sistema Imunológico', emoji: '🛡️' },
  { id: 'mental', label: 'Melhorar Clareza Mental', emoji: '🧠' },
  { id: 'detox', label: 'Desintoxicar e Purificar', emoji: '🌿' },
];

export const MotivationsStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const toggleMotivation = (id: string) => {
    const current = data.motivations || [];
    const updated = current.includes(id)
      ? current.filter(m => m !== id)
      : [...current, id];
    updateData({ motivations: updated });
  };

  const canContinue = (data.motivations?.length || 0) > 0;

  return (
    <OnboardingLayout category="Meta & Foco">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          O que te motiva a seguir em direção à sua meta?
        </h1>

        <div className="space-y-2 flex-1 overflow-y-auto">
          {motivations.map((item, index) => {
            const isSelected = data.motivations?.includes(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => toggleMotivation(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className={`font-medium ${isSelected ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-8 pt-4 safe-area-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(9)}
          disabled={!canContinue}
          className={`w-full font-semibold py-4 rounded-full transition-all ${
            canContinue
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
