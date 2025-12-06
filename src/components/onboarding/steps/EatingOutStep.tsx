import { motion } from 'framer-motion';
import { Home, UtensilsCrossed } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const frequencies = [
  { id: 'rarely', title: 'Raramente', description: 'Como quase sempre em casa', emoji: '🏠' },
  { id: 'sometimes', title: 'Às vezes', description: '1-2 vezes por semana', emoji: '🍽️' },
  { id: 'often', title: 'Frequentemente', description: '3-5 vezes por semana', emoji: '🍔' },
  { id: 'always', title: 'Quase sempre', description: 'Maioria das refeições fora', emoji: '🥡' },
];

export const EatingOutStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ eatingOutFrequency: id });
    setTimeout(() => setStep(22), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Com que frequência come fora?
        </h2>
        <p className="text-white/70 text-center mb-8">
          Restaurantes, delivery, etc.
        </p>

        <div className="space-y-3">
          {frequencies.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                data.eatingOutFrequency === item.id
                  ? 'bg-white shadow-lg'
                  : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              <span className="text-3xl">{item.emoji}</span>
              <div className="text-left flex-1">
                <p className={`font-semibold ${
                  data.eatingOutFrequency === item.id ? 'text-emerald-600' : 'text-white'
                }`}>
                  {item.title}
                </p>
                <p className={`text-sm ${
                  data.eatingOutFrequency === item.id ? 'text-gray-500' : 'text-white/70'
                }`}>
                  {item.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
