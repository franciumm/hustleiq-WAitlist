import StarBackground from '@/components/StarBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FloatingSteps from '@/components/FloatingSteps';
import WhyUs from '@/components/WhyUs';
import BentoGrid from '@/components/BentoGrid';
import NetworkSection from '@/components/NetworkSection';
import ComingSoon from '@/components/ComingSoon';
import TwoPaths from '@/components/TwoPaths';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';
const HelmetProviderFixed = HelmetProvider as any;
const Index = () => {  
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HustleIQ",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered platform that finds your perfect business model and provides founder accountability.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder"
    }
  };

  // 💡 AEO TIP: Adding FAQ schema helps AI (Perplexity/ChatGPT) 
  // extract answers directly from your site.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What is HustleIQ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HustleIQ is an AI that finds your perfect business model and holds you accountable until you hit your first $1k in revenue."
      }
    }]
  };

  return (
    <div id="top" className="relative min-h-screen bg-background overflow-hidden">
      <HelmetProviderFixed>
        <title>HustleIQ | Stop Guessing. Start Executing.</title>
        <meta name="description" content="The AI that finds your perfect business model and holds you accountable until you hit $1k. Join the waitlist." />
        
        {/* Software Schema */}
        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
        
        {/* FAQ Schema for AI Engines */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </HelmetProviderFixed>

      <StarBackground />
      <Header />
      
      <main className="relative z-10">
        {/* 
           SEO TIP: Ensure Hero.tsx contains your <h1> tag. 
           There should only be ONE <h1> on this page. 
        */}
        <Hero />
        <FloatingSteps />
        <WhyUs />
        <BentoGrid />
        <NetworkSection />
        <ComingSoon />
        <TwoPaths />
        <FAQ />
        <Footer />
      </main>

      <Toaster />
    </div>
  );
};

export default Index;
