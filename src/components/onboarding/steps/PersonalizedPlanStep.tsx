import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const planItems = [
  'Analisando seu perfil...',
  'Calculando metabolismo...',
  'Definindo metas diárias...',
  'Personalizando recomendações...',
  'Preparando seu plano...',
];

export const PersonalizedPlanStep = () => {
  const { data, setStep } = useOnboarding();
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep(23), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [setStep]);

  useEffect(() => {
    planItems.forEach((_, index) => {
      setTimeout(() => {
        setCompletedItems(prev => [...prev, index]);
      }, (index + 1) * 800);
    });
  }, []);

  // Calculate daily calories based on user data
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
    <OnboardingLayout showProgress={false}>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Criando seu plano personalizado
        </h2>

        <div className="w-full max-w-xs space-y-3 mb-8">
          {planItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-3"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                completedItems.includes(index) 
                  ? 'bg-white' 
                  : 'bg-white/20'
              }`}>
                {completedItems.includes(index) && (
                  <Check className="w-4 h-4 text-emerald-500" />
                )}
              </div>
              <span className={`text-sm ${
                completedItems.includes(index) ? 'text-white' : 'text-white/50'
              }`}>
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="text-white/70 text-center mt-2 text-sm">
            {progress}%
          </p>
        </div>

        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center"
          >
            <p className="text-white font-semibold">Meta diária calculada:</p>
            <p className="text-3xl font-bold text-white">{calculateCalories()} kcal</p>
          </motion.div>
        )}
      </div>
    </OnboardingLayout>
  );
};
