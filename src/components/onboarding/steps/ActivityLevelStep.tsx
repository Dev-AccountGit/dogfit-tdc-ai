import { motion } from 'framer-motion';
import { Check, Armchair, Footprints, Bike, Flame } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const levels = [
  { 
    id: 'sedentary', 
    label: 'Sedentário', 
    description: 'Passo a maior parte do dia sentado', 
    icon: Armchair,
    color: 'text-slate-500',
    bg: 'bg-slate-50'
  },
  { 
    id: 'light', 
    label: 'Pouco ativo', 
    description: 'Trabalho em pé, movimento leve', 
    icon: Footprints,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  { 
    id: 'active', 
    label: 'Ativo', 
    description: 'Exercícios regulares na rotina', 
    icon: Bike,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  { 
    id: 'very_active', 
    label: 'Muito ativo', 
    description: 'Fisicamente ativo o dia todo', 
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
];

export const ActivityLevelStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ activityLevel: id });
    setTimeout(() => setStep(19), 300);
  };

  return (
    <OnboardingLayout category="Estilo de Vida">
      <div className="flex-1 flex flex-col px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[26px] font-bold text-foreground mb-2 tracking-tight"
        >
          Qual seu nível de atividade?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-[15px] mb-6"
        >
          Sem contar exercícios específicos
        </motion.p>

        <div className="space-y-3 flex-1">
          {levels.map((level, index) => {
            const Icon = level.icon;
            const isSelected = data.activityLevel === level.id;
            
            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.08, ease: [0.32, 0.72, 0, 1] }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(level.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-border bg-white hover:border-primary/30 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl ${level.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${level.color}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-semibold text-[16px] ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {level.label}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {level.description}
                  </p>
                </div>
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: isSelected ? 1 : 0.8,
                    opacity: isSelected ? 1 : 0
                  }}
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};
