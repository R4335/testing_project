import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

const GlitchText = ({ children, className, as: Component = 'span' }: GlitchTextProps) => {
  return (
    <Component className={cn('relative inline-block', className)}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 -z-10 text-secondary opacity-70"
        style={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          transform: 'translate(-2px, -1px)',
          animation: 'glitch 2s infinite'
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 -z-10 text-accent opacity-70"
        style={{ 
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          transform: 'translate(2px, 1px)',
          animation: 'glitch 2s infinite reverse'
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </Component>
  );
};

export default GlitchText;
