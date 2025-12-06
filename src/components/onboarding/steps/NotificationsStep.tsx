import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useState } from 'react';

export const NotificationsStep = () => {
  const { data, updateData } = useOnboarding();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const calculateCalories = () => {
    const age = new Date().getFullYear() - data.birthYear;
    
    let bmr: number;
    if (data.gender === 'male') {
      bmr = 88.362 + (13.397 * data.currentWeight) + (4.799 * data.height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * data.currentWeight) + (3.098 * data.height) - (4.330 * age);
    }

    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      active: 1.55,
      very_active: 1.725,
    };

    const tdee = bmr * (activityMultipliers[data.activityLevel] || 1.4);
    
    if (data.mainGoal === 'lose') return Math.round(tdee - 500);
    if (data.mainGoal === 'gain') return Math.round(tdee + 300);
    return Math.round(tdee);
  };

  const handleComplete = async (enableNotifications: boolean) => {
    setLoading(true);
    updateData({ notificationsEnabled: enableNotifications });
    
    try {
      if (user) {
        const calorieGoal = calculateCalories();
        
        await supabase
          .from('profiles')
          .update({
            daily_calorie_goal: calorieGoal,
            daily_protein_goal: Math.round(data.currentWeight * 1.6),
            daily_carbs_goal: Math.round(calorieGoal * 0.45 / 4),
            daily_fat_goal: Math.round(calorieGoal * 0.25 / 9),
            daily_water_goal: 8,
          })
          .eq('id', user.id);
      }

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

  return (
    <OnboardingLayout showProgress={false} showBack={false}>
      <div className="flex-1 flex flex-col">
        {/* App notification preview */}
        <div className="bg-gradient-to-b from-gray-100 to-white px-6 pt-8 pb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-4 max-w-xs mx-auto"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-lg">🍎</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">AI CALORIE COUNTER</p>
                <p className="text-sm font-medium text-gray-800">Got a sec to log your meal?</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Take a moment to log what you had - every meal you track brings you closer to your goal.
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
          >
            <Bell className="w-8 h-8 text-emerald-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 text-center mb-4"
          >
            Alcance seu objetivo mais rápido e fácil
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center max-w-xs"
          >
            Ative as notificações para nunca esquecer de acompanhar suas calorias. É a maneira mais fácil de criar hábitos saudáveis e atingir suas metas!
          </motion.p>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleComplete(true)}
          disabled={loading}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          {loading ? 'Salvando...' : 'Permitir Notificações'}
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleComplete(false)}
          disabled={loading}
          className="w-full text-gray-500 font-medium py-3"
        >
          Agora não
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
