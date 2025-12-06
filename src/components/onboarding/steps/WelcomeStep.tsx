import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { Flame, Apple, Beef, Droplets } from 'lucide-react';

export const WelcomeStep = () => {
  const { setStep } = useOnboarding();

  const nutritionItems = [
    { label: 'Calorias', value: '240', unit: 'kcal', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Carbos', value: '20', unit: 'g', icon: Apple, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Proteína', value: '30', unit: 'g', icon: Beef, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'Gordura', value: '20', unit: 'g', icon: Droplets, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white flex flex-col">
      {/* Language selector */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-14 right-5"
      >
        <button className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-foreground shadow-sm border border-border/50">
          🇧🇷 PT
        </button>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-4">
        {/* Food image mockup with glassmorphism */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="relative w-72 h-72 mb-6"
        >
          {/* Main food card */}
          <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 flex items-center justify-center shadow-2xl shadow-orange-200/50 overflow-hidden">
            <motion.span 
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="text-[120px]"
            >
              🍳
            </motion.span>
          </div>
          
          {/* Floating nutrition card */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="absolute -bottom-6 left-3 right-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 p-4 border border-white/50"
          >
            <div className="grid grid-cols-4 gap-2">
              {nutritionItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`w-8 h-8 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-1`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <p className="text-[10px] text-muted-foreground font-medium">{item.label}</p>
                    <p className="text-sm font-bold text-foreground">{item.value}<span className="text-xs font-normal text-muted-foreground ml-0.5">{item.unit}</span></p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-[28px] font-bold text-foreground text-center mb-3 mt-10 tracking-tight"
        >
          Contador de Calorias por IA
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-muted-foreground text-center mb-8 max-w-[300px] leading-relaxed text-[15px]"
        >
          Tire uma foto de sua refeição para registrar alimentos instantaneamente.{' '}
          <span className="font-semibold text-foreground">Sem entrada manual!</span>
        </motion.p>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-10 safe-area-bottom">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(2)}
          className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 text-[17px] active:shadow-md transition-shadow"
        >
          Isso é bom!
        </motion.button>
      </div>
    </div>
  );
};
