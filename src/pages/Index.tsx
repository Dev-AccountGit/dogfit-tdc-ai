import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InfluencersSection from "@/components/InfluencersSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import DarkModeSection from "@/components/DarkModeSection";
import ReviewsSection from "@/components/ReviewsSection";
import RatingsSection from "@/components/RatingsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <InfluencersSection />
        <FeaturesSection />
        <WhyChooseSection />
        <DarkModeSection />
        <ReviewsSection />
        <RatingsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
