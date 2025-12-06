import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingProvider, useOnboarding } from '@/components/onboarding/OnboardingContext';

// Import all steps
import { WelcomeStep } from '@/components/onboarding/steps/WelcomeStep';
import { LanguageStep } from '@/components/onboarding/steps/LanguageStep';
import { ExperienceStep } from '@/components/onboarding/steps/ExperienceStep';
import { AIComparisonStep } from '@/components/onboarding/steps/AIComparisonStep';
import { GoalStep } from '@/components/onboarding/steps/GoalStep';
import { MotivationsStep } from '@/components/onboarding/steps/MotivationsStep';
import { SupportStep } from '@/components/onboarding/steps/SupportStep';
import { ObstaclesStep } from '@/components/onboarding/steps/ObstaclesStep';
import { GenderStep } from '@/components/onboarding/steps/GenderStep';
import { BirthdayStep } from '@/components/onboarding/steps/BirthdayStep';
import { UnitsStep } from '@/components/onboarding/steps/UnitsStep';
import { HeightStep } from '@/components/onboarding/steps/HeightStep';
import { CurrentWeightStep } from '@/components/onboarding/steps/CurrentWeightStep';
import { TargetWeightStep } from '@/components/onboarding/steps/TargetWeightStep';
import { AITrainerStep } from '@/components/onboarding/steps/AITrainerStep';
import { ActivityLevelStep } from '@/components/onboarding/steps/ActivityLevelStep';
import { ProgressSpeedStep } from '@/components/onboarding/steps/ProgressSpeedStep';
import { TrackingDaysStep } from '@/components/onboarding/steps/TrackingDaysStep';
import { HabitStep } from '@/components/onboarding/steps/HabitStep';
import { TrackingFrequencyStep } from '@/components/onboarding/steps/TrackingFrequencyStep';
import { CustomizeStep } from '@/components/onboarding/steps/CustomizeStep';
import { BadHabitsStep } from '@/components/onboarding/steps/BadHabitsStep';
import { DietTypeStep } from '@/components/onboarding/steps/DietTypeStep';
import { HealthyEatingStep } from '@/components/onboarding/steps/HealthyEatingStep';
import { DietaryRestrictionsStep } from '@/components/onboarding/steps/DietaryRestrictionsStep';
import { ExpertsStep } from '@/components/onboarding/steps/ExpertsStep';
import { MealTimingInfoStep } from '@/components/onboarding/steps/MealTimingInfoStep';
import { MealsPerDayStep } from '@/components/onboarding/steps/MealsPerDayStep';
import { FastingStep } from '@/components/onboarding/steps/FastingStep';
import { MealTimesStep } from '@/components/onboarding/steps/MealTimesStep';
import { EatingOutStep } from '@/components/onboarding/steps/EatingOutStep';
import { NotificationsStep } from '@/components/onboarding/steps/NotificationsStep';

const OnboardingSteps = () => {
  const { step } = useOnboarding();
  const navigate = useNavigate();

  useEffect(() => {
    const isComplete = localStorage.getItem('onboarding_complete');
    if (isComplete === 'true') {
      navigate('/app');
    }
  }, [navigate]);

  const renderStep = () => {
    switch (step) {
      case 1: return <WelcomeStep />;
      case 2: return <LanguageStep />;
      case 3: return <ExperienceStep />;
      case 4:
      case 5:
      case 6: return <AIComparisonStep />;
      case 7: return <GoalStep />;
      case 8: return <MotivationsStep />;
      case 9: return <SupportStep />;
      case 10: return <ObstaclesStep />;
      case 11: return <GenderStep />;
      case 12: return <BirthdayStep />;
      case 13: return <UnitsStep />;
      case 14: return <HeightStep />;
      case 15: return <CurrentWeightStep />;
      case 16: return <TargetWeightStep />;
      case 17: return <AITrainerStep />;
      case 18: return <ActivityLevelStep />;
      case 19: return <ProgressSpeedStep />;
      case 20: return <TrackingDaysStep />;
      case 21: return <HabitStep />;
      case 22: return <TrackingFrequencyStep />;
      case 23: return <CustomizeStep />;
      case 24: return <BadHabitsStep />;
      case 25: return <DietTypeStep />;
      case 26: return <HealthyEatingStep />;
      case 27: return <DietaryRestrictionsStep />;
      case 28: return <ExpertsStep />;
      case 29: return <MealTimingInfoStep />;
      case 30: return <MealsPerDayStep />;
      case 31: return <FastingStep />;
      case 32: return <MealTimesStep />;
      case 33: return <EatingOutStep />;
      case 34: return <NotificationsStep />;
      default: return <WelcomeStep />;
    }
  };

  return renderStep();
};

const OnboardingPage = () => {
  return (
    <OnboardingProvider>
      <OnboardingSteps />
    </OnboardingProvider>
  );
};

export default OnboardingPage;
