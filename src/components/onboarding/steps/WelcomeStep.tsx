import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';

// Simulated food image with nutrition info overlay
export const WelcomeStep = () => {
  const { setStep } = useOnboarding();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
      {/* Language selector */}
      <div className="absolute top-12 right-4">
        <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
          PT
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
        {/* Food image mockup */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-64 h-64 mb-8"
        >
          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-orange-200 to-yellow-100 flex items-center justify-center shadow-xl">
            <span className="text-8xl">🍳</span>
          </div>
          
          {/* Nutrition overlay */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-4 left-4 right-4 bg-white rounded-2xl shadow-lg p-3"
          >
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-500">Calorie</p>
                <p className="text-sm font-bold text-gray-800">240 kcal</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Carbs</p>
                <p className="text-sm font-bold text-gray-800">20 g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Protein</p>
                <p className="text-sm font-bold text-gray-800">30 g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Fat</p>
                <p className="text-sm font-bold text-gray-800">20 g</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-gray-900 text-center mb-3 mt-8"
        >
          Contador de Calorias por IA
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-center mb-8 max-w-xs leading-relaxed"
        >
          Tire uma foto de sua refeição para registrar alimentos instantaneamente, analisar calorias e macronutrientes.{' '}
          <span className="font-medium text-gray-900">Não é necessário entrada manual!</span>
        </motion.p>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(2)}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Isso é bom!
        </motion.button>
      </div>
    </div>
  );
};
