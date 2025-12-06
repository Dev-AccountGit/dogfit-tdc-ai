import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const restrictions = [
  { id: 'lactose', label: 'Sem Lactose', emoji: '🥛' },
  { id: 'sugar', label: 'Sem Açúcar', emoji: '🍬' },
  { id: 'gluten', label: 'Sem Glúten', emoji: '🌾' },
  { id: 'nuts', label: 'Sem Nozes', emoji: '🥜' },
  { id: 'none', label: 'Nenhum', emoji: '✅' },
];

export const DietaryRestrictionsStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const toggleRestriction = (id: string) => {
    if (id === 'none') {
      updateData({ dietaryRestrictions: ['none'] });
      return;
    }
    
    const current = data.dietaryRestrictions?.filter(r => r !== 'none') || [];
    const updated = current.includes(id)
      ? current.filter(r => r !== id)
      : [...current, id];
    updateData({ dietaryRestrictions: updated });
  };

  return (
    <OnboardingLayout category="Hábitos Alimentares">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Você tem alguma restrição alimentar que devemos saber?
        </h1>

        <div className="space-y-3">
          {restrictions.map((item, index) => {
            const isSelected = data.dietaryRestrictions?.includes(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleRestriction(item.id)}
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
          onClick={() => setStep(28)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
