import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const BirthdayStep = () => {
  const { data, updateData, setStep } = useOnboarding();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleContinue = () => {
    if (day && month && year) {
      const birthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      updateData({ birthday });
      setStep(10);
    }
  };

  const isValid = day && month && year && 
    parseInt(day) >= 1 && parseInt(day) <= 31 &&
    parseInt(month) >= 1 && parseInt(month) <= 12 &&
    parseInt(year) >= 1920 && parseInt(year) <= 2010;

  return (
    <OnboardingLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Quando você nasceu?
        </h2>
        <p className="text-white/70 text-center mb-8">
          Usamos para calcular seu metabolismo
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mb-8"
        >
          <div className="flex flex-col items-center">
            <label className="text-white/70 text-sm mb-2">Dia</label>
            <input
              type="number"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="DD"
              min="1"
              max="31"
              className="w-20 h-16 bg-white/20 backdrop-blur-sm rounded-2xl text-center text-white text-2xl font-bold placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-white/70 text-sm mb-2">Mês</label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
              min="1"
              max="12"
              className="w-20 h-16 bg-white/20 backdrop-blur-sm rounded-2xl text-center text-white text-2xl font-bold placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-white/70 text-sm mb-2">Ano</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="AAAA"
              min="1920"
              max="2010"
              className="w-24 h-16 bg-white/20 backdrop-blur-sm rounded-2xl text-center text-white text-2xl font-bold placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </motion.div>

        <div className="mt-auto pb-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            disabled={!isValid}
            className={`w-full font-semibold py-4 rounded-2xl shadow-lg transition-all ${
              isValid
                ? 'bg-white text-emerald-600'
                : 'bg-white/30 text-white/50'
            }`}
          >
            Continuar
          </motion.button>
        </div>
      </div>
    </OnboardingLayout>
  );
};
