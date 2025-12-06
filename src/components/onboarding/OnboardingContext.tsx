import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OnboardingData {
  language: string;
  experienceLevel: string;
  mainGoal: string;
  motivations: string[];
  obstacles: string[];
  gender: string;
  birthday: string;
  units: 'metric' | 'imperial';
  height: number;
  currentWeight: number;
  targetWeight: number;
  activityLevel: string;
  lifestyle: string;
  progressSpeed: string;
  commitment: string;
  trackingFrequency: string;
  badHabits: string[];
  dietType: string;
  eatingOutFrequency: string;
  notificationsEnabled: boolean;
}

interface OnboardingContextType {
  step: number;
  setStep: (step: number) => void;
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  totalSteps: number;
}

const defaultData: OnboardingData = {
  language: 'pt',
  experienceLevel: '',
  mainGoal: '',
  motivations: [],
  obstacles: [],
  gender: '',
  birthday: '',
  units: 'metric',
  height: 170,
  currentWeight: 70,
  targetWeight: 65,
  activityLevel: '',
  lifestyle: '',
  progressSpeed: '',
  commitment: '',
  trackingFrequency: '',
  badHabits: [],
  dietType: '',
  eatingOutFrequency: '',
  notificationsEnabled: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(defaultData);
  const totalSteps = 26;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  return (
    <OnboardingContext.Provider value={{ step, setStep, data, updateData, totalSteps }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
