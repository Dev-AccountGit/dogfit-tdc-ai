import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'pt', name: 'Português' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
  { code: 'it', name: 'Italiano' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'pl', name: 'Polski' },
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Idioma da Interface
        </h1>

        <div className="space-y-2">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                data.language === lang.code
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className={`font-medium ${
                data.language === lang.code ? 'text-emerald-700' : 'text-gray-700'
              }`}>
                {lang.name}
              </span>
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
