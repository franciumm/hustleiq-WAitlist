import StarBackground from '@/components/StarBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FloatingSteps from '@/components/FloatingSteps';
import WhyUs from '@/components/WhyUs';
import BentoGrid from '@/components/BentoGrid';
import NetworkSection from '@/components/NetworkSection';
import AppPreview from '@/components/AppPreview';
import ComingSoon from '@/components/ComingSoon';
import UrgencyBanner from '@/components/UrgencyBanner';
import TwoPaths from '@/components/TwoPaths';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div id="top" className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated star background */}
      <StarBackground />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <FloatingSteps />
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

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
