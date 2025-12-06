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
import { ObstaclesStep } from '@/components/onboarding/steps/ObstaclesStep';
import { GenderStep } from '@/components/onboarding/steps/GenderStep';
import { BirthdayStep } from '@/components/onboarding/steps/BirthdayStep';
import { UnitsStep } from '@/components/onboarding/steps/UnitsStep';
import { HeightStep } from '@/components/onboarding/steps/HeightStep';
import { CurrentWeightStep } from '@/components/onboarding/steps/CurrentWeightStep';
import { TargetWeightStep } from '@/components/onboarding/steps/TargetWeightStep';
import { ActivityLevelStep } from '@/components/onboarding/steps/ActivityLevelStep';
import { LifestyleStep } from '@/components/onboarding/steps/LifestyleStep';
import { ProgressSpeedStep } from '@/components/onboarding/steps/ProgressSpeedStep';
import { CommitmentStep } from '@/components/onboarding/steps/CommitmentStep';
import { TrackingFrequencyStep } from '@/components/onboarding/steps/TrackingFrequencyStep';
import { BadHabitsStep } from '@/components/onboarding/steps/BadHabitsStep';
import { DietTypeStep } from '@/components/onboarding/steps/DietTypeStep';
import { EatingOutStep } from '@/components/onboarding/steps/EatingOutStep';
import { PersonalizedPlanStep } from '@/components/onboarding/steps/PersonalizedPlanStep';
import { SummaryStep } from '@/components/onboarding/steps/SummaryStep';
import { NotificationsStep } from '@/components/onboarding/steps/NotificationsStep';
import { TrainingStep } from '@/components/onboarding/steps/TrainingStep';
import { FinalStep } from '@/components/onboarding/steps/FinalStep';

const OnboardingSteps = () => {
  const { step } = useOnboarding();
  const navigate = useNavigate();

  // Check if onboarding is already complete
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
      case 4: return <AIComparisonStep />;
      case 5: return <GoalStep />;
      case 6: return <MotivationsStep />;
      case 7: return <ObstaclesStep />;
      case 8: return <GenderStep />;
      case 9: return <BirthdayStep />;
      case 10: return <UnitsStep />;
      case 11: return <HeightStep />;
      case 12: return <CurrentWeightStep />;
      case 13: return <TargetWeightStep />;
      case 14: return <ActivityLevelStep />;
      case 15: return <LifestyleStep />;
      case 16: return <ProgressSpeedStep />;
      case 17: return <CommitmentStep />;
      case 18: return <TrackingFrequencyStep />;
      case 19: return <BadHabitsStep />;
      case 20: return <DietTypeStep />;
      case 21: return <EatingOutStep />;
      case 22: return <PersonalizedPlanStep />;
      case 23: return <SummaryStep />;
      case 24: return <NotificationsStep />;
      case 25: return <TrainingStep />;
      case 26: return <FinalStep />;
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
