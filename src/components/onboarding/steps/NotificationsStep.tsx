import { motion } from 'framer-motion';
import { Bell, BellRing, Sparkles } from 'lucide-react';
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
      
      toast.success('Tudo pronto! Vamos começar 🎉');
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
        {/* Notification preview */}
        <div className="bg-gradient-to-b from-muted/50 to-white px-6 pt-10 pb-16">
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-white rounded-3xl shadow-2xl shadow-black/10 p-5 max-w-[320px] mx-auto border border-border/50"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                <span className="text-2xl">🍎</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">AI Calorie Counter</p>
                <p className="text-[15px] font-semibold text-foreground">Hora de registrar sua refeição!</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cada refeição registrada te aproxima do seu objetivo. Vamos continuar? 💪
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="relative w-20 h-20 mb-6"
          >
            <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
              <BellRing className="w-10 h-10 text-primary" />
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute -top-1 -right-1 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[26px] font-bold text-foreground text-center mb-3 tracking-tight"
          >
            Alcance sua meta mais rápido
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-center max-w-[280px] text-[15px] leading-relaxed"
          >
            Ative as notificações para nunca esquecer de registrar suas refeições e criar hábitos saudáveis.
          </motion.p>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-3 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleComplete(true)}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 text-[17px] flex items-center justify-center gap-2"
        >
          <Bell className="w-5 h-5" />
          {loading ? 'Finalizando...' : 'Ativar Notificações'}
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleComplete(false)}
          disabled={loading}
          className="w-full text-muted-foreground font-medium py-3 text-[15px]"
        >
          Agora não
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
