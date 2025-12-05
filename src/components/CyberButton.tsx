import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CyberButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

const CyberButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  onClick,
  href,
  disabled = false
}: CyberButtonProps) => {
  const baseStyles = `
    relative font-cyber font-semibold uppercase tracking-wider
    transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
    before:absolute before:inset-0 before:transition-all before:duration-500
    after:absolute after:inset-0 after:transition-all after:duration-500
    hover:scale-[1.08] active:scale-95
    overflow-hidden
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const variants = {
    primary: `
      bg-primary text-primary-foreground
      before:bg-primary/20 before:translate-x-[-100%] hover:before:translate-x-0
      shadow-[0_0_20px_hsl(var(--primary)/0.3)]
      hover:shadow-[0_0_40px_hsl(var(--primary)/0.5),inset_0_0_20px_hsl(var(--primary)/0.2)]
      border border-primary/50
    `,
    secondary: `
      bg-secondary text-secondary-foreground
      before:bg-secondary/20 before:translate-x-[-100%] hover:before:translate-x-0
      shadow-[0_0_20px_hsl(var(--secondary)/0.3)]
      hover:shadow-[0_0_40px_hsl(var(--secondary)/0.5),inset_0_0_20px_hsl(var(--secondary)/0.2)]
      border border-secondary/50
    `,
    outline: `
      bg-transparent text-primary border-2 border-primary
      hover:bg-primary/10
      shadow-[0_0_15px_hsl(var(--primary)/0.2)]
      hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        'inline-flex items-center justify-center gap-2',
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Corner decorations */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
    </Component>
  );
};

export default CyberButton;
