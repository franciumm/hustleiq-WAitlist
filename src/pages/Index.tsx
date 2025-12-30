import StarBackground from '@/components/StarBackground';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import BentoGrid from '@/components/BentoGrid';
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
        <Footer />
      </main>
    </div>
  );
};

export default Index;
