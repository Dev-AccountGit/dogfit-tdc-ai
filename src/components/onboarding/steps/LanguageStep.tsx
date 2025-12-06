import { motion } from 'framer-motion';
import { Check, Globe } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const languages = [
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const LanguageStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (code: string) => {
    updateData({ language: code });
    setTimeout(() => setStep(3), 300);
  };

  return (
    <OnboardingLayout showProgress={false}>
      <div className="flex-1 flex flex-col px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
        >
          <Globe className="w-8 h-8 text-primary" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[26px] font-bold text-foreground mb-2 tracking-tight"
        >
          Idioma da Interface
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-[15px] mb-6"
        >
          Selecione seu idioma preferido
        </motion.p>

        <div className="space-y-2 overflow-y-auto flex-1">
          {languages.map((lang, index) => {
            const isSelected = data.language === lang.code;
            
            return (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.04, ease: [0.32, 0.72, 0, 1] }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className={`font-medium text-[16px] ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {lang.name}
                  </span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: isSelected ? 1 : 0.8,
                    opacity: isSelected ? 1 : 0
                  }}
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};
