import { useState } from 'react';
import { Mail, Github, Linkedin, MessageSquare, Send, Terminal } from 'lucide-react';
import GlitchText from '../GlitchText';
import CyberButton from '../CyberButton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters")
});

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', username: '@cyph3r' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', username: '/in/cyph3r' },
    { icon: MessageSquare, label: 'Discord', href: '#', username: 'cyph3r#1337' },
    { icon: Terminal, label: 'HTB Profile', href: '#', username: 'Cyph3r' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message Transmitted",
        description: "Your message has been sent successfully. I'll respond within 24 hours.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Transmission Failed",
        description: "Failed to send message. Please try again or email directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="cyber-grid absolute inset-0 opacity-5" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-6 h-6 text-secondary" />
              <span className="text-muted-foreground font-mono text-sm">// ESTABLISH_CONNECTION</span>
            </div>
            <h2 className="font-cyber text-3xl md:text-5xl font-bold">
              <GlitchText className="text-gradient-cyber">CONTACT</GlitchText>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Let's discuss your next challenge project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="cyber-card p-8">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-destructive/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-accent/80" />
                </div>
                <span className="text-muted-foreground font-mono text-xs ml-2">terminal://contact</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-2">
                      <span className="text-primary">$</span> name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 bg-background border border-border/50 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm"
                      placeholder="Enter your name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-2">
                      <span className="text-primary">$</span> email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      className="w-full px-4 py-3 bg-background border border-border/50 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">$</span> subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm"
                  >
                    <option value="">Select inquiry type...</option>
                    <option value="challenge">CTF Challenge Request</option>
                    <option value="lab">Training Lab Development</option>
                    <option value="event">Full CTF Event</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">$</span> message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={2000}
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm resize-none"
                    placeholder="Describe your project requirements..."
                  />
                </div>

                <CyberButton 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </CyberButton>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Email */}
              <div className="cyber-card p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground font-mono">Email</div>
                    <a href="mailto:cyph3r@hackermail.dev" className="text-foreground hover:text-primary transition-colors font-mono">
                      cyph3r@hackermail.dev
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="cyber-card p-6">
                <h3 className="font-cyber font-semibold mb-4 text-sm text-muted-foreground">
                  // SOCIAL_LINKS
                </h3>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={index}
                        href={link.href}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{link.label}</div>
                          <div className="text-xs text-muted-foreground font-mono">{link.username}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick info */}
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg">
                <h4 className="font-cyber font-semibold text-accent mb-2">Response Time</h4>
                <p className="text-muted-foreground text-sm">
                  Typical response within <span className="text-accent font-semibold">24 hours</span>. 
                  For urgent requests, mention "URGENT" in the subject.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
