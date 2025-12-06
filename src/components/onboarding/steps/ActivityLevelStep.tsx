import { motion } from 'framer-motion';
import { Armchair, Footprints, Bike, Flame, Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const levels = [
  { id: 'sedentary', label: 'Sedentário', description: 'Passo a maior parte do dia sentado', icon: Armchair, color: 'hsl(var(--ios-gray-dark))' },
  { id: 'light', label: 'Pouco ativo', description: 'Trabalho em pé, movendo-se ao longo do dia', icon: Footprints, color: 'hsl(var(--ios-blue))' },
  { id: 'active', label: 'Ativo', description: 'Minha rotina diária inclui exercícios', icon: Bike, color: 'hsl(var(--ios-orange))' },
  { id: 'very_active', label: 'Muito ativo', description: 'Fisicamente ativo na maior parte do dia', icon: Flame, color: 'hsl(var(--ios-red))' },
];

export const ActivityLevelStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ activityLevel: id });
    setTimeout(() => setStep(19), 200);
  };

  return (
    <OnboardingLayout category="Estilo De Vida">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Como é o seu estilo de vida?
        </h1>
        <p className="text-muted-foreground mb-6">
          Sem contar os exercícios - perguntaremos sobre eles separadamente
        </p>

        <div className="space-y-3">
          {levels.map((level, index) => {
            const Icon = level.icon;
            const isSelected = data.activityLevel === level.id;
            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(level.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:bg-secondary'
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${level.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: level.color }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {level.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {level.description}
                  </p>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};
