import { motion } from 'framer-motion';
import { Check, Sparkles, Heart, Zap, Brain, Shield, Leaf, Calendar, Smile } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const motivations = [
  { id: 'appearance', label: 'Aparência Melhor', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'confidence', label: 'Mais Confiança', icon: Smile, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 'occasion', label: 'Ocasião Especial', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'health', label: 'Melhorar Saúde', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'energy', label: 'Aumentar Energia', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'mental', label: 'Clareza Mental', icon: Brain, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'immune', label: 'Sistema Imunológico', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'detox', label: 'Desintoxicar', icon: Leaf, color: 'text-green-500', bg: 'bg-green-50' },
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
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[26px] font-bold text-foreground mb-2 tracking-tight"
        >
          O que te motiva?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-[15px] mb-6"
        >
          Selecione todas as opções que se aplicam
        </motion.p>

        <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pb-4">
          {motivations.map((item, index) => {
            const Icon = item.icon;
            const isSelected = data.motivations?.includes(item.id);
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.04, ease: [0.32, 0.72, 0, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleMotivation(item.id)}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                    : 'border-border bg-white hover:border-primary/30'
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
                <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <span className={`font-medium text-sm text-center ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-10 pt-4 safe-area-bottom">
        <motion.button
          whileHover={{ scale: canContinue ? 1.02 : 1 }}
          whileTap={{ scale: canContinue ? 0.98 : 1 }}
          onClick={() => setStep(9)}
          disabled={!canContinue}
          className={`w-full font-semibold py-4 rounded-2xl transition-all text-[17px] ${
            canContinue
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          Continuar
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
