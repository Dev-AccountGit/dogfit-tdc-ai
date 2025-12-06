import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useOnboarding } from './OnboardingContext';

interface OnboardingLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  showProgress?: boolean;
  showClose?: boolean;
  category?: string;
}

export const OnboardingLayout = ({ 
  children, 
  showBack = true, 
  showProgress = true,
  showClose = false,
  category,
}: OnboardingLayoutProps) => {
  const { step, setStep, totalSteps } = useOnboarding();
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center justify-between mb-5">
          {showBack && step > 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(step - 1)}
              className="w-10 h-10 rounded-full bg-secondary/50 backdrop-blur-sm flex items-center justify-center border border-border/50"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
          ) : (
            <div className="w-10" />
          )}
          
          {showClose && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-secondary/50 backdrop-blur-sm flex items-center justify-center border border-border/50"
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>
          )}
        </div>

        {showProgress && (
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
            />
          </div>
        )}

        {category && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary text-sm font-semibold mt-5 tracking-wide"
          >
            {category}
          </motion.p>
        )}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
