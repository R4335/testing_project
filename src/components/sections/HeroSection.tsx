import GlitchText from '../GlitchText';
import CyberButton from '../CyberButton';
import { Terminal, Shield, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scanline overlay */}
      <div className="scanline absolute inset-0 pointer-events-none z-10" />
      
      {/* Grid background */}
      <div className="cyber-grid absolute inset-0 opacity-30" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-transparent to-cyber-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />

      <div className="container relative z-20 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal-style prefix */}
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground font-mono text-sm">
              <span className="text-primary">root@ctf</span>:<span className="text-secondary">~</span>$ ./init_portfolio.sh
              <span className="terminal-cursor ml-1">▋</span>
            </span>
          </div>

          {/* Main title */}
          <h1 className="font-cyber text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <GlitchText className="neon-text">R4335</GlitchText>
          </h1>

          {/* Subtitle with roles */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs md:text-sm font-mono">
              CTF Challenge Developer
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="px-3 py-1 bg-secondary/10 border border-secondary/30 text-secondary text-xs md:text-sm font-mono">
              Cybersecurity Researcher
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="px-3 py-1 bg-accent/10 border border-accent/30 text-accent text-xs md:text-sm font-mono">
              Red-Team Lab Architect
            </span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Creating cutting-edge CTF challenges and cybersecurity labs for platforms like 
            <span className="text-primary"> HTB</span>, 
            <span className="text-secondary"> TryHackMe</span>, and 
            <span className="text-accent"> corporate CTF events</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <CyberButton variant="primary" size="lg" onClick={() => scrollToSection('portfolio')}>
              <Shield className="w-5 h-5" />
              View Portfolio
            </CyberButton>
            <CyberButton variant="outline" size="lg" onClick={() => scrollToSection('contact')}>
              Contact Me
            </CyberButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-8 border-t border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="font-cyber text-2xl md:text-4xl font-bold neon-text">50+</div>
              <div className="text-muted-foreground text-xs md:text-sm">Challenges Created</div>
            </div>
            <div className="text-center">
              <div className="font-cyber text-2xl md:text-4xl font-bold neon-text-purple">10K+</div>
              <div className="text-muted-foreground text-xs md:text-sm">Users Challenged</div>
            </div>
            <div className="text-center">
              <div className="font-cyber text-2xl md:text-4xl font-bold neon-text-green">6-7h</div>
              <div className="text-muted-foreground text-xs md:text-sm">Avg. Delivery Time</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
