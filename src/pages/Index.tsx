import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import StarBackground from '@/components/StarBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

const FloatingSteps = lazy(() => import('@/components/FloatingSteps'));
const TwoPaths = lazy(() => import('@/components/TwoPaths'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

const HelmetFixed = Helmet as any;

const Index = () => {  
  return (
    // bg-transparent ensures StarBackground is visible
    <div id="top" className="relative min-h-screen overflow-hidden bg-transparent">
      <HelmetFixed>
        <title>HustleIQ | Stop Guessing. Start Executing.</title>
        <meta name="description" content="The AI Co-founder that kills distraction. Launch your $10k/mo business." />
      </HelmetFixed>
      
      {/* Background is at z-0 */}
      <StarBackground />
      
      <Header />
      
      {/* Content is at z-10 */}
      <main className="relative z-10 bg-transparent">
        <Hero /> 
        
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-white/5" />}>
          <FloatingSteps />
          <TwoPaths />
          <FAQ />
          <Footer />
        </Suspense>
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;