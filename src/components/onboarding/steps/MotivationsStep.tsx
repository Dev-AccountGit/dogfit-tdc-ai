import { motion } from 'framer-motion';
import { Check, Sparkles, Heart, Zap, PartyPopper, Shield, Brain, Leaf, Dumbbell } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const motivations = [
  { id: 'appearance', label: 'Aparência Melhor', icon: Sparkles, color: 'hsl(var(--ios-purple))' },
  { id: 'confidence', label: 'Mais Confiante', icon: Dumbbell, color: 'hsl(var(--ios-orange))' },
  { id: 'occasion', label: 'Ocasião Especial', icon: PartyPopper, color: 'hsl(var(--ios-pink))' },
  { id: 'health', label: 'Melhorar a Saúde', icon: Heart, color: 'hsl(var(--ios-red))' },
  { id: 'energy', label: 'Aumentar Energia', icon: Zap, color: 'hsl(var(--ios-yellow))' },
  { id: 'immune', label: 'Sistema Imunológico', icon: Shield, color: 'hsl(var(--ios-blue))' },
  { id: 'mental', label: 'Clareza Mental', icon: Brain, color: 'hsl(var(--ios-purple))' },
  { id: 'detox', label: 'Desintoxicar', icon: Leaf, color: 'hsl(var(--primary))' },
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
        <h1 className="text-2xl font-bold text-foreground mb-6">
          O que te motiva a seguir em direção à sua meta?
        </h1>

        <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pb-4">
          {motivations.map((item, index) => {
            const Icon = item.icon;
            const isSelected = data.motivations?.includes(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleMotivation(item.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all min-h-[100px] ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:bg-secondary'
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <span className="text-sm font-medium text-center text-foreground">
                  {item.label}
                </span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-10 pt-4 safe-area-bottom">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(9)}
          disabled={!canContinue}
          className={`w-full font-semibold py-4 rounded-2xl transition-all ${
            canContinue
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
