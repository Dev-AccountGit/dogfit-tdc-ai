import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { OnboardingLayout } from '../OnboardingLayout';

export const HeightStep = () => {
  const { data, updateData, setStep } = useOnboarding();
  const [selectedHeight, setSelectedHeight] = useState(data.height || 170);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const minHeight = data.units === 'metric' ? 120 : 48;
  const maxHeight = data.units === 'metric' ? 220 : 84;
  const heights = Array.from({ length: maxHeight - minHeight + 1 }, (_, i) => minHeight + i);
  const unit = data.units === 'metric' ? 'cm' : 'in';

  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = heights.indexOf(selectedHeight);
      const itemHeight = 56;
      scrollRef.current.scrollTop = selectedIndex * itemHeight - 56;
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const itemHeight = 56;
      const index = Math.round((scrollTop + 56) / itemHeight);
      if (heights[index] !== undefined && heights[index] !== selectedHeight) {
        setSelectedHeight(heights[index]);
      }
    }
  };

  const handleContinue = () => {
    updateData({ height: selectedHeight });
    setStep(15);
  };

  return (
    <OnboardingLayout category="Dados Corporais">
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Qual é a sua altura?
        </h1>
        <p className="text-gray-500 mb-8">
          Especifique sua altura o mais próximo possível
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
              <div className="h-14" />
              {heights.map((height) => (
                <div
                  key={height}
                  className="h-14 flex items-center justify-center gap-2"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <span className={`text-2xl font-semibold transition-all ${
                    height === selectedHeight ? 'text-emerald-700 scale-110' : 'text-gray-300'
                  }`}>
                    {height}
                  </span>
                  <span className={`text-lg transition-all ${
                    height === selectedHeight ? 'text-emerald-500' : 'text-gray-300'
                  }`}>
                    {unit}
                  </span>
                </div>
              ))}
              <div className="h-14" />
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
