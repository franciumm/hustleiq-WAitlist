import StarBackground from '@/components/StarBackground';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import BentoGrid from '@/components/BentoGrid';
import NetworkSection from '@/components/NetworkSection';
import AppPreview from '@/components/AppPreview';
import ComingSoon from '@/components/ComingSoon';
import TwoPaths from '@/components/TwoPaths';
import UrgencyBanner from '@/components/UrgencyBanner';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div id="top" className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated star background */}
      <StarBackground />
      
      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <WhyUs />
        <BentoGrid />
        <NetworkSection />
        <AppPreview />
        <ComingSoon />
        <UrgencyBanner />
        <TwoPaths />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
