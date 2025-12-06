import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const BirthdayStep = () => {
  const { data, updateData, setStep } = useOnboarding();
  const [selectedYear, setSelectedYear] = useState(data.birthYear || 1995);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const years = Array.from({ length: 80 }, (_, i) => 2010 - i);

  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = years.indexOf(selectedYear);
      const itemHeight = 56;
      scrollRef.current.scrollTop = selectedIndex * itemHeight - 56;
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const itemHeight = 56;
      const index = Math.round((scrollTop + 56) / itemHeight);
      if (years[index] !== selectedYear) {
        setSelectedYear(years[index]);
      }
    }
  };

  const handleContinue = () => {
    updateData({ birthYear: selectedYear });
    setStep(13);
  };

  return (
    <OnboardingLayout category="Dados Corporais">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Quando é o seu aniversário?
        </h1>
        <p className="text-gray-500 mb-8">
          Compartilhar sua idade nos ajudará a personalizar seu plano exclusivo
        </p>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-xs">
            {/* Selection highlight */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-14 bg-emerald-100 rounded-2xl border-2 border-emerald-500 pointer-events-none z-0" />
            
            {/* Scroll container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="h-[168px] overflow-y-auto scrollbar-hide relative z-10"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              <div className="h-14" /> {/* Spacer top */}
              {years.map((year) => (
                <div
                  key={year}
                  className="h-14 flex items-center justify-center"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <span className={`text-2xl font-semibold transition-all ${
                    year === selectedYear ? 'text-emerald-700 scale-110' : 'text-gray-300'
                  }`}>
                    {year}
                  </span>
                </div>
              ))}
              <div className="h-14" /> {/* Spacer bottom */}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 safe-area-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-emerald-500/30"
        >
          Próximo
        </motion.button>
      </div>
    </OnboardingLayout>
  );
};
