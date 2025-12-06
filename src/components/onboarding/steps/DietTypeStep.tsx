import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const diets = [
  { id: 'balanced', title: 'Equilibrado', description: 'Aproveite tudo' },
  { id: 'lowcarb', title: 'Baixo carboidrato', description: 'Principalmente proteínas e gorduras, carboidratos restritos' },
  { id: 'keto', title: 'Cetogênica', description: 'Alto teor de gordura, um pouco de proteína, pouco carboidrato' },
  { id: 'highprotein', title: 'Alta proteína', description: 'Menos alimentos ricos em gordura' },
  { id: 'lowfat', title: 'Baixo teor de gordura', description: 'Primeiro alimentos ricos em proteínas' },
  { id: 'vegetarian', title: 'Vegetariano', description: 'Alimentos sem carne e sem peixe' },
];

export const DietTypeStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (id: string) => {
    updateData({ dietType: id });
    setTimeout(() => setStep(26), 200);
  };

  return (
    <OnboardingLayout category="Hábitos Alimentares">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Qual é o seu tipo de dieta?
        </h1>
        <p className="text-gray-500 mb-6">
          Isso será usado para calibrar seu plano personalizado
        </p>

        <div className="space-y-2">
          {diets.map((diet, index) => (
            <motion.button
              key={diet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelect(diet.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                data.dietType === diet.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <p className={`font-semibold ${
                data.dietType === diet.id ? 'text-emerald-700' : 'text-gray-700'
              }`}>
                {diet.title}
              </p>
              <p className={`text-sm ${
                data.dietType === diet.id ? 'text-emerald-600' : 'text-gray-500'
              }`}>
                {diet.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
