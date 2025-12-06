import { motion } from 'framer-motion';
import { Bell, Sparkles } from 'lucide-react';
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
        <div className="px-6 pt-8 pb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-card/90 backdrop-blur-xl rounded-2xl p-4 max-w-xs mx-auto border border-border/50 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-lg">🍎</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">AI CALORIE COUNTER</p>
                <p className="text-sm font-medium text-foreground">Hora de registrar sua refeição!</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Tire um momento para registrar o que você comeu - cada refeição te aproxima da sua meta.
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="relative w-20 h-20 mb-6"
          >
            <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
              <Bell className="w-10 h-10 text-primary" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-1 -right-1 w-8 h-8 bg-[hsl(var(--ios-orange))]/20 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--ios-orange))]" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-foreground text-center mb-4"
          >
            Alcance seu objetivo mais rápido
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center max-w-xs"
          >
            Ative as notificações para nunca esquecer de acompanhar suas calorias.
          </motion.p>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-3 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleComplete(true)}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30"
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
          className="w-full text-muted-foreground font-medium py-3"
        >
          Agora não
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
