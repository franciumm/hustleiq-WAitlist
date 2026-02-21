import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import StarBackground from '@/components/StarBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// ⚡️ Lazy load the Popup for performance
const BlueprintPopup = lazy(() => import('@/components/BlueprintPopup'));
const FloatingSteps = lazy(() => import('@/components/FloatingSteps'));
const TwoPaths = lazy(() => import('@/components/TwoPaths'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

const HelmetFixed = Helmet as any;

const Index = () => {  

  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralCode(ref);
      localStorage.setItem('referredBy', ref);
    }
  }, [searchParams]);

  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-transparent">
      <HelmetFixed>
        <title>HustleIQ | Stop Guessing. Start Executing.</title>
        <meta name="description" content="The AI Co-founder that kills distraction. Launch your $10k/mo business." />
      </HelmetFixed>
      
      <StarBackground />
      <Header />
      
      <main className="relative z-10 bg-transparent">
        <Hero referralCode={referralCode || localStorage.getItem('referredBy')} />
        
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-white/5" />}>
          <FloatingSteps />
          <TwoPaths />
          <FAQ />
          <Footer />
          <BlueprintPopup />
        </Suspense>
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;