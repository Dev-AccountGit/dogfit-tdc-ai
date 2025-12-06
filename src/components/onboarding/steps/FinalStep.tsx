import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useState } from 'react';

export const FinalStep = () => {
  const { data, setStep } = useOnboarding();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Save onboarding data to profile
      if (user) {
        const calorieGoal = calculateCalories();
        
        await supabase
          .from('profiles')
          .update({
            daily_calorie_goal: calorieGoal,
            daily_protein_goal: Math.round(data.currentWeight * 1.6), // 1.6g per kg
            daily_carbs_goal: Math.round(calorieGoal * 0.45 / 4), // 45% from carbs
            daily_fat_goal: Math.round(calorieGoal * 0.25 / 9), // 25% from fat
            daily_water_goal: 8,
          })
          .eq('id', user.id);
      }

      // Save to localStorage that onboarding is complete
      localStorage.setItem('onboarding_complete', 'true');
      localStorage.setItem('onboarding_data', JSON.stringify(data));
      
      toast.success('Configuração concluída!');
      navigate('/app');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      toast.error('Erro ao salvar dados');
    } finally {
      setLoading(false);
    }
  };

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
    <OnboardingLayout showProgress={false} showBack={false}>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
            <CheckCircle className="w-20 h-20 text-emerald-500" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-white text-center mb-4"
        >
          Tudo pronto! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 text-center text-lg mb-8 max-w-xs"
        >
          Seu plano personalizado foi criado. Vamos começar sua jornada!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8 max-w-xs w-full"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70">Meta diária</span>
            <span className="text-white font-bold">{calculateCalories()} kcal</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70">Proteína</span>
            <span className="text-white font-bold">{Math.round(data.currentWeight * 1.6)}g</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Água</span>
            <span className="text-white font-bold">8 copos</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleComplete}
          disabled={loading}
          className="w-full max-w-xs bg-white text-emerald-600 font-semibold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Salvando...</span>
          ) : (
            <>
              Começar agora
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
