import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const MealTimesStep = () => {
  const { data, updateData, setStep } = useOnboarding();
  const [firstMeal, setFirstMeal] = useState(data.firstMealTime || '09:00');
  const [lastMeal, setLastMeal] = useState(data.lastMealTime || '19:00');

  const handleContinue = () => {
    updateData({ firstMealTime: firstMeal, lastMealTime: lastMeal });
    setStep(33);
  };

  return (
    <OnboardingLayout category="Hábitos Alimentares">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Quando você geralmente come a primeira e a última refeição do dia?
        </h1>

        <div className="flex-1 flex flex-col justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-2xl p-4"
          >
            <label className="text-sm text-gray-500 mb-2 block">Primeira refeição</label>
            <input
              type="time"
              value={firstMeal}
              onChange={(e) => setFirstMeal(e.target.value)}
              className="w-full text-2xl font-bold text-gray-900 bg-transparent focus:outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-2xl p-4"
          >
            <label className="text-sm text-gray-500 mb-2 block">Última refeição</label>
            <input
              type="time"
              value={lastMeal}
              onChange={(e) => setLastMeal(e.target.value)}
              className="w-full text-2xl font-bold text-gray-900 bg-transparent focus:outline-none"
            />
          </motion.div>
        </div>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
