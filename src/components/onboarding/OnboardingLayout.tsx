import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useOnboarding } from './OnboardingContext';

interface OnboardingLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  showProgress?: boolean;
  bgGradient?: string;
}

export const OnboardingLayout = ({ 
  children, 
  showBack = true, 
  showProgress = true,
  bgGradient = 'from-emerald-500 via-teal-500 to-cyan-500'
}: OnboardingLayoutProps) => {
  const { step, setStep, totalSteps } = useOnboarding();
  const progress = (step / totalSteps) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} flex flex-col`}>
      {/* Header */}
      <div className="safe-area-top px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          {showBack && step > 1 ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setStep(step - 1)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
          ) : (
            <div className="w-10" />
          )}
          
          {showProgress && (
            <div className="flex-1 mx-4">
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              <p className="text-white/70 text-xs text-center mt-1">
                {step} de {totalSteps}
              </p>
            </div>
          )}
          
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  );
};
