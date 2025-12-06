import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const days = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'];

export const HabitStep = () => {
  const { setStep } = useOnboarding();

  return (
    <OnboardingLayout category="Estilo De Vida">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-50 rounded-3xl p-6 mb-8 w-full max-w-xs"
        >
          <p className="text-xs text-gray-500 font-medium mb-3 text-center">HABIT</p>
          <div className="flex justify-between">
            {days.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i < 4 ? 'bg-emerald-500' : 'bg-gray-200'
                }`}>
                  {i < 4 && <span className="text-white text-sm">✓</span>}
                </div>
                <span className="text-xs text-gray-400">{day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 text-center mb-4"
        >
          A consistência cria o hábito
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-center max-w-xs"
        >
          Para atingir suas metas e manter o peso, estabeleça uma rotina e crie hábitos saudáveis. Desafie-se e trabalhe nisso todos os dias.
        </motion.p>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(22)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
