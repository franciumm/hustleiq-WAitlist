const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5 bg-[#0b0f0a]">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          <img src="/logo.png" alt="HustleIQ" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
          
          {/* The Hidden "About Us" / Authority Statement */}
          <p className="text-[10px] font-mono text-white/30 max-w-md uppercase tracking-[0.2em] leading-loose">
            HustleIQ is an execution-first platform built by a collective of builders who have shipped 100+ products. 
            We don't sell dreams; we build engines.
          </p>

          <div className="flex gap-8 text-[10px] font-mono text-white/20 uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy_Protocol</a>
            <a href="#" className="hover:text-primary transition-colors">Terms_Of_Service</a>
            <a href="mailto:ops@hustleiq.ai" className="hover:text-primary transition-colors">Contact_Support</a>
          </div>
          
          <p className="text-[9px] font-mono text-white/10">
            © {new Date().getFullYear()} HUSTLEIQ_SYSTEMS_v1.0.4
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;