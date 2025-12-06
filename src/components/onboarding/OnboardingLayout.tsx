import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useOnboarding } from './OnboardingContext';

interface OnboardingLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  showProgress?: boolean;
  showClose?: boolean;
  category?: string;
  bgColor?: string;
}

export const OnboardingLayout = ({ 
  children, 
  showBack = true, 
  showProgress = true,
  showClose = false,
  category,
  bgColor = 'bg-white'
}: OnboardingLayoutProps) => {
  const { step, setStep, totalSteps } = useOnboarding();
  const progress = (step / totalSteps) * 100;

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col`}>
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          {showBack && step > 1 ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setStep(step - 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </motion.button>
          ) : (
            <div className="w-10" />
          )}
          
          {showClose && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
            >
              <X className="w-6 h-6 text-gray-600" />
            </motion.button>
          )}
        </div>

        {showProgress && (
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        )}

        {category && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-emerald-600 text-sm font-medium mt-4"
          >
            {category}
          </motion.p>
        )}
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
