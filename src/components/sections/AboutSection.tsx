import { User, Zap, Clock, Code } from 'lucide-react';
import GlitchText from '../GlitchText';
const AboutSection = () => {
  const expertise = [{
    icon: Code,
    label: 'Binary Exploitation (pwn)',
    color: 'primary'
  }, {
    icon: Code,
    label: 'Reverse Engineering',
    color: 'secondary'
  }, {
    icon: Code,
    label: 'Advanced Web Exploitation',
    color: 'accent'
  }, {
    icon: Code,
    label: 'Active Directory Labs',
    color: 'primary'
  }, {
    icon: Code,
    label: 'Cloud Security (AWS/Azure)',
    color: 'secondary'
  }, {
    icon: Code,
    label: 'Forensics & Incident Response',
    color: 'accent'
  }];
  return <section id="about" className="relative py-24 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-10" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <User className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground font-mono text-sm">// ABOUT_ME</span>
            </div>
            <h2 className="font-cyber text-3xl md:text-5xl font-bold">
              <GlitchText className="text-gradient-cyber">WHO AM I?</GlitchText>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Avatar / Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                {/* Animated border */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow" />
                <div className="absolute inset-2 rounded-full border border-secondary/20" />
                <div className="absolute inset-4 rounded-full border border-accent/10" />
                
                {/* Avatar container */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="font-cyber text-6xl md:text-8xl font-bold neon-text">
                      ​R
                    </div>
                    <div className="text-muted-foreground font-mono text-xs mt-2">
                      v3.0.1
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 px-3 py-1 bg-card border border-primary/30 text-primary text-xs font-mono animate-float">
                  0x41414141
                </div>
                <div className="absolute -bottom-4 -left-4 px-3 py-1 bg-card border border-secondary/30 text-secondary text-xs font-mono animate-float" style={{
                animationDelay: '0.5s'
              }}>
                  pwned!
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="cyber-card p-6">
                <p className="text-foreground/90 leading-relaxed mb-4">
                  I specialize in crafting <span className="text-primary font-semibold">complex, realistic cybersecurity challenges</span> that 
                  push hackers to their limits. With expertise spanning from low-level binary exploitation to cloud infrastructure attacks, 
                  I create immersive learning experiences.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My challenges have been featured on major platforms and corporate training programs, 
                  helping thousands of security professionals sharpen their skills.
                </p>
              </div>

              {/* Speed metric */}
              <div className="flex items-center gap-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-foreground font-semibold">Rapid Development</div>
                  <div className="text-muted-foreground text-sm">
                    Complete challenges in 6-7 hours including Docker/VM setup, storyline, solution path, and writeups.
                  </div>
                </div>
              </div>

              {/* Expertise tags */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground font-mono">EXPERTISE_AREAS:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((item, index) => <span key={index} className={`px-3 py-1 text-xs font-mono border rounded transition-all hover:scale-105 cursor-default
                        ${item.color === 'primary' ? 'bg-primary/5 border-primary/30 text-primary' : ''}
                        ${item.color === 'secondary' ? 'bg-secondary/5 border-secondary/30 text-secondary' : ''}
                        ${item.color === 'accent' ? 'bg-accent/5 border-accent/30 text-accent' : ''}
                      `}>
                      {item.label}
                    </span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;