import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const experts = [
  { name: 'Jordan Brooks', role: 'Health Specialist' },
  { name: 'Marcus Hale', role: 'Fitness Coach' },
  { name: 'Chloe Bennett', role: 'Nutrition Coach' },
  { name: 'Maya Alvare', role: 'Weight Management' },
  { name: 'Imani Davis', role: 'Nutrition Coach' },
  { name: 'Minjun Park', role: 'Healthy Habits Expert' },
  { name: 'Sofia Caruso', role: 'Yoga Teacher' },
];

export const ExpertsStep = () => {
  const { setStep } = useOnboarding();

  return (
    <OnboardingLayout showProgress={false}>
      <div className="flex-1 flex flex-col px-6 pt-8">
        {/* Experts grid */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {experts.slice(0, 4).map((expert, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mb-2" />
              <p className="text-xs text-gray-800 font-medium text-center leading-tight">{expert.name.split(' ')[0]}</p>
              <p className="text-[10px] text-gray-500 text-center">{expert.role.split(' ')[0]}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-8 px-8">
          {experts.slice(4).map((expert, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: (i + 4) * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mb-2" />
              <p className="text-xs text-gray-800 font-medium text-center leading-tight">{expert.name.split(' ')[0]}</p>
              <p className="text-[10px] text-gray-500 text-center">{expert.role.split(' ')[0]}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 text-center mb-4"
          >
            Formado por experiência do mundo real
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center max-w-xs"
          >
            Criado em conjunto com mais de 100 profissionais de fitness e nutrição que nos ajudaram a refinar cada passo
          </motion.p>
        </div>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(29)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Bom
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
