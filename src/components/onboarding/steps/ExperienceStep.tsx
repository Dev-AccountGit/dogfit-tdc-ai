import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const experiences = [
  { id: 'tried', label: 'Eu tentei, mas parei', emoji: '😅' },
  { id: 'never', label: 'Nunca. Parece complexo', emoji: '🤔' },
  { id: 'doing', label: 'Sim, e ainda estou fazendo', emoji: '💪' },
];

export const ExperienceStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ calorieCountingExperience: id });
    setTimeout(() => setStep(4), 200);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Você já contou calorias antes?
        </h1>

        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <motion.button
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(exp.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                data.calorieCountingExperience === exp.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{exp.emoji}</span>
              <span className={`font-medium text-left ${
                data.calorieCountingExperience === exp.id ? 'text-emerald-700' : 'text-gray-700'
              }`}>
                {exp.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
