import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const LanguageStep = () => {
  const { data, updateData, setStep } = useOnboarding();

  const handleSelect = (code: string) => {
    updateData({ language: code });
    setTimeout(() => setStep(3), 300);
  };

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Escolha seu idioma
        </h2>
        <p className="text-white/70 text-center mb-8">
          Choose your language
        </p>

        <div className="space-y-3">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                data.language === lang.code
                  ? 'bg-white shadow-lg'
                  : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{lang.flag}</span>
                <span className={`font-medium ${
                  data.language === lang.code ? 'text-emerald-600' : 'text-white'
                }`}>
                  {lang.name}
                </span>
              </div>
              {data.language === lang.code && (
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
