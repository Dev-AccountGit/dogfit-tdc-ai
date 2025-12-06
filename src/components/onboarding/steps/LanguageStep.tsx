import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export const LanguageStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (code: string) => {
    updateData({ language: code });
    setTimeout(() => setStep(3), 200);
  };

  return (
    <OnboardingLayout showProgress={false}>
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Idioma da Interface
        </h1>

        <div className="space-y-3">
          {languages.map((lang, index) => {
            const isSelected = data.language === lang.code;
            return (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className={`font-medium ${
                    isSelected ? 'text-foreground' : 'text-foreground'
                  }`}>
                    {lang.name}
                  </span>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};
