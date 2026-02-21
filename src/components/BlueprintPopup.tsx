import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileDown, X } from 'lucide-react';

const BlueprintPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // ⚡️ The 10-Second Rule
    const timer = setTimeout(() => {
      if (!localStorage.getItem('hustleiq_waitlist_user')) {
        setOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 
         FIX: 
         1. Removed 'animate-scale-in' (conflicts with built-in Dialog animation)
         2. Added 'z-[100]' to sit above overlay
         3. Added 'bg-[#050505]' to ensure visibility
      */}
      <DialogContent className="glass-card border-[#FACC15]/20 sm:max-w-md z-[100] bg-[#050505]">
        
        {/* Close Button Override */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4 text-white/50" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="space-y-4 pt-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#FACC15]/10 flex items-center justify-center border border-[#FACC15]/20 mb-2">
            <FileDown className="w-6 h-6 text-[#FACC15]" />
          </div>
          
          <DialogTitle className="text-2xl font-black text-center uppercase tracking-tighter text-white">
            Don't Leave <span className="text-[#FACC15]">Empty Handed</span>
          </DialogTitle>
          
          <DialogDescription className="text-center text-muted-foreground text-sm leading-relaxed">
            Stop guessing. Download the <strong>2026 Niche Discovery Blueprint</strong>. 
            Verified with live Q1 2026 market data.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="bg-secondary/30 p-3 rounded-lg border border-white/5">
            <div className="flex justify-between items-center text-[10px] uppercase font-mono text-white/40 mb-2">
              <span>Contents</span>
              <span>EST. VALUE: $97</span>
            </div>
            <ul className="space-y-2 text-xs font-medium text-white/80">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-[#FACC15] rounded-full" />
                The 4 "Silent Killers" of Momentum
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-[#FACC15] rounded-full" />
                2 Verified High-Margin Niches
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-[#FACC15] rounded-full" />
                The 6-Stage Operator Pipeline
              </li>
            </ul>
          </div>

          <Button 
            className="w-full bg-[#FACC15] text-black font-black uppercase tracking-widest hover:bg-[#FACC15]/90 py-6 text-xs shadow-[0_0_20px_rgba(250,204,21,0.3)]"
            onClick={() => {
              window.open('/2026_Niche_Discovery.pdf', '_blank');
              setOpen(false);
            }}
          >
            Download Blueprint (PDF)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlueprintPopup;