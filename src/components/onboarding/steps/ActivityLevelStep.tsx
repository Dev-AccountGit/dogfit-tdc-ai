import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const levels = [
  { id: 'sedentary', label: 'Sedentário', description: 'Passo a maior parte do dia sentado', emoji: '🪑' },
  { id: 'light', label: 'Pouco ativo', description: 'Trabalho em pé, movendo-se ao longo do dia', emoji: '🚶' },
  { id: 'active', label: 'Ativo', description: 'Minha rotina diária inclui exercícios', emoji: '🏃' },
  { id: 'very_active', label: 'Muito ativo', description: 'Fisicamente ativo na maior parte do dia', emoji: '💪' },
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Como é o seu estilo de vida?
        </h1>
        <p className="text-gray-500 mb-6">
          Sem contar os exercícios - perguntaremos sobre eles separadamente
        </p>

        <div className="space-y-3">
          {levels.map((level, index) => (
            <motion.button
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(level.id)}
              className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                data.activityLevel === level.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl mt-1">{level.emoji}</span>
              <div>
                <p className={`font-semibold ${
                  data.activityLevel === level.id ? 'text-emerald-700' : 'text-gray-700'
                }`}>
                  {level.label}
                </p>
                <p className={`text-sm ${
                  data.activityLevel === level.id ? 'text-emerald-600' : 'text-gray-500'
                }`}>
                  {level.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
