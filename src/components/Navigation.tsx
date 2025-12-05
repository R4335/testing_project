import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', isSection: true },
    { label: 'Skills', href: '#skills', isSection: true },
    { label: 'Portfolio', href: '#portfolio', isSection: true },
    { label: 'Projects', href: '/projects', isSection: false },
    { label: 'Services', href: '#services', isSection: true },
    { label: 'Contact', href: '#contact', isSection: true },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      if (!isHomePage) {
        window.location.href = '/' + href;
        return;
      }
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <Terminal className="w-6 h-6 text-primary group-hover:animate-pulse" />
            <span className="font-cyber font-bold text-lg neon-text">R4335</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.isSection ? (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "text-muted-foreground hover:text-primary transition-colors font-mono text-sm relative group",
                    location.pathname === item.href && "text-primary"
                  )}
                >
                  {item.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all",
                    location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              )
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-80 pb-4' : 'max-h-0'
        )}>
          <div className="flex flex-col gap-2 pt-2">
            {navItems.map((item) => (
              item.isSection ? (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors font-mono text-sm rounded"
                >
                  {'>'} {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-left px-4 py-2 hover:bg-muted/50 transition-colors font-mono text-sm rounded",
                    location.pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {'>'} {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
