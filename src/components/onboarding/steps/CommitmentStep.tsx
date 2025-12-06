import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const commitments = [
  { id: '1', label: 'Vou tentar', emoji: '🤔', level: 1 },
  { id: '2', label: 'Vou me esforçar', emoji: '💪', level: 2 },
  { id: '3', label: 'Estou determinado', emoji: '🔥', level: 3 },
  { id: '4', label: 'Vou com tudo!', emoji: '🚀', level: 4 },
];

export const CommitmentStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ commitment: id });
    setTimeout(() => setStep(18), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Qual seu nível de comprometimento?
        </h2>
        <p className="text-white/70 text-center mb-8">
          Seja honesto - isso nos ajuda a te apoiar
        </p>

        <div className="space-y-3">
          {commitments.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                data.commitment === item.id
                  ? 'bg-white shadow-lg'
                  : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              <span className="text-4xl">{item.emoji}</span>
              <div className="flex-1 text-left">
                <p className={`font-semibold ${
                  data.commitment === item.id ? 'text-emerald-600' : 'text-white'
                }`}>
                  {item.label}
                </p>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 w-8 rounded-full ${
                        level <= item.level
                          ? data.commitment === item.id
                            ? 'bg-emerald-500'
                            : 'bg-white/80'
                          : data.commitment === item.id
                            ? 'bg-emerald-200'
                            : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
