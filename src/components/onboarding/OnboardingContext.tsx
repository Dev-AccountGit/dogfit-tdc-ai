import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OnboardingData {
  language: string;
  calorieCountingExperience: string;
  mainGoal: string;
  motivations: string[];
  obstacles: string[];
  gender: string;
  birthYear: number;
  units: 'metric' | 'imperial';
  height: number;
  currentWeight: number;
  targetWeight: number;
  activityLevel: string;
  progressSpeed: number;
  trackingDays: number;
  trackingFrequency: string;
  badHabits: string[];
  dietType: string;
  dietaryRestrictions: string[];
  mealsPerDay: number;
  fastingExperience: string;
  firstMealTime: string;
  lastMealTime: string;
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
  calorieCountingExperience: '',
  mainGoal: '',
  motivations: [],
  obstacles: [],
  gender: '',
  birthYear: 1995,
  units: 'metric',
  height: 170,
  currentWeight: 70,
  targetWeight: 65,
  activityLevel: '',
  progressSpeed: 0.5,
  trackingDays: 30,
  trackingFrequency: '',
  badHabits: [],
  dietType: '',
  dietaryRestrictions: [],
  mealsPerDay: 3,
  fastingExperience: '',
  firstMealTime: '09:00',
  lastMealTime: '19:00',
  eatingOutFrequency: '',
  notificationsEnabled: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(defaultData);
  const totalSteps = 36;

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
