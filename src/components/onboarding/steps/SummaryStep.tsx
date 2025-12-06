import { motion } from 'framer-motion';
import { Target, Scale, Flame, Calendar } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const SummaryStep = () => {
  const { data, setStep } = useOnboarding();

  const getGoalText = () => {
    const goals: Record<string, string> = {
      lose: 'Perder peso',
      maintain: 'Manter peso',
      gain: 'Ganhar peso',
      muscle: 'Ganhar músculos',
    };
    return goals[data.mainGoal] || 'Melhorar saúde';
  };

  const weightDiff = data.targetWeight - data.currentWeight;
  const isLoss = weightDiff < 0;
  const weeksToGoal = Math.abs(weightDiff) / 0.5; // Assuming 0.5kg/week

  const calculateCalories = () => {
    const age = data.birthday 
      ? new Date().getFullYear() - new Date(data.birthday).getFullYear() 
      : 30;
    
    let bmr: number;
    if (data.gender === 'male') {
      bmr = 88.362 + (13.397 * data.currentWeight) + (4.799 * data.height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * data.currentWeight) + (3.098 * data.height) - (4.330 * age);
    }

    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9,
    };

    const tdee = bmr * (activityMultipliers[data.activityLevel] || 1.4);
    
    if (data.mainGoal === 'lose') return Math.round(tdee - 500);
    if (data.mainGoal === 'gain' || data.mainGoal === 'muscle') return Math.round(tdee + 300);
    return Math.round(tdee);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-6">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Seu plano está pronto! 🎉
        </h2>
        <p className="text-white/70 text-center mb-6">
          Baseado nas suas respostas
        </p>

        <div className="space-y-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Objetivo</p>
                <p className="text-gray-900 font-semibold">{getGoalText()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Scale className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm">Peso</p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-semibold">{data.currentWeight} kg</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-emerald-600 font-semibold">{data.targetWeight} kg</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Meta diária</p>
                <p className="text-gray-900 font-semibold">{calculateCalories()} kcal</p>
              </div>
            </div>
          </motion.div>

          {weightDiff !== 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Previsão</p>
                  <p className="text-gray-900 font-semibold">
                    ~{Math.round(weeksToGoal)} semanas para o objetivo
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-auto pb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(24)}
            className="w-full bg-white text-emerald-600 font-semibold py-4 rounded-2xl shadow-lg"
          >
            Continuar
          </motion.button>
        </div>
      </div>
    </OnboardingLayout>
  );
};
