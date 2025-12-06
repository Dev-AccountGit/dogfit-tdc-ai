import { motion } from 'framer-motion';
import { Utensils, Leaf, Fish, Wheat, Egg } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const diets = [
  { id: 'regular', title: 'Sem restrições', description: 'Como de tudo', icon: Utensils },
  { id: 'vegetarian', title: 'Vegetariano', description: 'Sem carne', icon: Leaf },
  { id: 'vegan', title: 'Vegano', description: 'Sem produtos animais', icon: Leaf },
  { id: 'pescatarian', title: 'Pescetariano', description: 'Apenas peixes', icon: Fish },
  { id: 'lowcarb', title: 'Low Carb', description: 'Baixo carboidrato', icon: Wheat },
  { id: 'keto', title: 'Cetogênica', description: 'Alta gordura, baixo carbo', icon: Egg },
];

export const DietTypeStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ dietType: id });
    setTimeout(() => setStep(21), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-6">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Tipo de alimentação
        </h2>
        <p className="text-white/70 text-center mb-6">
          Qual sua preferência alimentar?
        </p>

        <div className="space-y-2 overflow-y-auto flex-1">
          {diets.map((diet, index) => {
            const Icon = diet.icon;
            return (
              <motion.button
                key={diet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(diet.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  data.dietType === diet.id
                    ? 'bg-white shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  data.dietType === diet.id ? 'bg-emerald-500' : 'bg-white/20'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    data.dietType === diet.id ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-semibold text-sm ${
                    data.dietType === diet.id ? 'text-emerald-600' : 'text-white'
                  }`}>
                    {diet.title}
                  </p>
                  <p className={`text-xs ${
                    data.dietType === diet.id ? 'text-gray-500' : 'text-white/70'
                  }`}>
                    {diet.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};
