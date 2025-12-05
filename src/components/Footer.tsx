import { Terminal, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-8 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-cyber font-bold text-sm neon-text">R4335</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
            <span>© 2024</span>
            <span className="text-primary">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-destructive fill-current" /> & 
              <span className="text-accent">0xC0FFEE</span>
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-muted-foreground">Status: <span className="text-accent">Online</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
