import { Briefcase, Rocket, Target, Layers, Calendar, ArrowRight } from 'lucide-react';
import GlitchText from '../GlitchText';
import CyberButton from '../CyberButton';

const ServicesSection = () => {
  const services = [
    {
      icon: Target,
      title: 'CTF Challenge Creation',
      description: 'Custom challenges for HTB, TryHackMe, or your private platform. Full package includes Docker setup, storyline, and writeups.',
      features: ['Any difficulty level', 'All categories supported', '6-7 hour delivery', 'Full documentation'],
      color: 'primary'
    },
    {
      icon: Layers,
      title: 'Red-Team Training Labs',
      description: 'Realistic enterprise environments for red-team training. Complete with AD infrastructure, vulnerable services, and attack paths.',
      features: ['Active Directory labs', 'Cloud environments', 'Network pivoting', 'Custom scenarios'],
      color: 'secondary'
    },
    {
      icon: Rocket,
      title: 'Multi-Stage Challenges',
      description: 'Complex, interconnected challenges that tell a story. Perfect for advanced training or prestigious CTF events.',
      features: ['Chained vulnerabilities', 'Realistic scenarios', 'Progressive difficulty', 'Full storyline'],
      color: 'accent'
    },
    {
      icon: Calendar,
      title: 'Full CTF Event Design',
      description: 'End-to-end CTF event creation. From 3 challenges for a workshop to 50+ for a major competition.',
      features: ['3-50+ challenges', 'All categories', 'Scoring system', 'Event support'],
      color: 'primary'
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-transparent via-card/20 to-transparent">
      <div className="cyber-grid absolute inset-0 opacity-5" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground font-mono text-sm">// SERVICES_AVAILABLE</span>
            </div>
            <h2 className="font-cyber text-3xl md:text-5xl font-bold">
              <GlitchText className="text-gradient-cyber">HIRE ME</GlitchText>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Professional challenge development for platforms and organizations
            </p>
          </div>

          {/* Services grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="cyber-card p-8 relative overflow-hidden group"
                >
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-lg mb-6
                    ${service.color === 'primary' ? 'bg-primary/10 text-primary' : ''}
                    ${service.color === 'secondary' ? 'bg-secondary/10 text-secondary' : ''}
                    ${service.color === 'accent' ? 'bg-accent/10 text-accent' : ''}
                  `}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="font-cyber font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <ArrowRight className={`w-4 h-4
                          ${service.color === 'primary' ? 'text-primary' : ''}
                          ${service.color === 'secondary' ? 'text-secondary' : ''}
                          ${service.color === 'accent' ? 'text-accent' : ''}
                        `} />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-20 h-20 opacity-10
                    ${service.color === 'primary' ? 'bg-gradient-to-bl from-primary' : ''}
                    ${service.color === 'secondary' ? 'bg-gradient-to-bl from-secondary' : ''}
                    ${service.color === 'accent' ? 'bg-gradient-to-bl from-accent' : ''}
                  `} />

                  {/* Hover glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                    ${service.color === 'primary' ? 'bg-gradient-to-t from-primary/5' : ''}
                    ${service.color === 'secondary' ? 'bg-gradient-to-t from-secondary/5' : ''}
                    ${service.color === 'accent' ? 'bg-gradient-to-t from-accent/5' : ''}
                  `} />
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              Ready to create your next challenge?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CyberButton variant="primary" size="lg" onClick={scrollToContact}>
                Request a Challenge
              </CyberButton>
              <CyberButton variant="outline" size="lg" onClick={scrollToContact}>
                Get a Quote
              </CyberButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
