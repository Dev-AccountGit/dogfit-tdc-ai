import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
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
      {/* iOS-style Header */}
      <div className="px-5 pt-14 pb-2 safe-area-top">
        <div className="flex items-center justify-between mb-5">
          {showBack && step > 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setStep(step - 1)}
              className="w-10 h-10 rounded-full bg-muted/60 backdrop-blur-sm flex items-center justify-center active:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" strokeWidth={2.5} />
            </motion.button>
          ) : (
            <div className="w-10" />
          )}
          
          <div className="w-10" />
        </div>

        {showProgress && (
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        )}

        {category && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary text-sm font-semibold mt-5 tracking-wide uppercase"
          >
            {category}
          </motion.p>
        )}
      </div>

      {/* Content with page transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ 
            duration: 0.35, 
            ease: [0.32, 0.72, 0, 1]
          }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
