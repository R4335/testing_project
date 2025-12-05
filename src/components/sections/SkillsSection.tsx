import { Cpu, Code, Bug, Globe, Cloud, Server, Box, Lock } from 'lucide-react';
import GlitchText from '../GlitchText';

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code,
      title: 'Programming',
      color: 'primary',
      skills: ['C', 'Python', 'Go', 'JavaScript', 'PHP', 'Bash', 'Assembly']
    },
    {
      icon: Bug,
      title: 'Exploit Development',
      color: 'secondary',
      skills: ['ROP Chains', 'Heap Exploitation', 'ASLR Bypass', 'Format Strings', 'Shellcode', 'Kernel Exploits']
    },
    {
      icon: Cpu,
      title: 'Reverse Engineering',
      color: 'accent',
      skills: ['Ghidra', 'IDA Pro', 'Frida', 'x64dbg', 'Binary Ninja', 'Radare2']
    },
    {
      icon: Globe,
      title: 'Web Security',
      color: 'primary',
      skills: ['SSTI', 'HTTP Smuggling', 'Deserialization', 'XSS/CSRF', 'SQL Injection', 'OAuth Exploits']
    },
    {
      icon: Cloud,
      title: 'Cloud Security',
      color: 'secondary',
      skills: ['IAM Attacks', 'SSRF to Metadata', 'Container Escape', 'AWS Pentesting', 'Azure AD Attacks']
    },
    {
      icon: Server,
      title: 'Infrastructure',
      color: 'accent',
      skills: ['AD Labs', 'Malware Labs', 'Lateral Movement', 'Pivoting', 'C2 Frameworks']
    },
    {
      icon: Box,
      title: 'Virtualization',
      color: 'primary',
      skills: ['Docker', 'VirtualBox', 'VMware', 'QEMU', 'Kubernetes', 'Podman']
    },
    {
      icon: Lock,
      title: 'Forensics',
      color: 'secondary',
      skills: ['Memory Analysis', 'Disk Forensics', 'Network Capture', 'Malware Analysis', 'Log Analysis']
    }
  ];

  return (
    <section id="skills" className="relative py-24 bg-gradient-to-b from-transparent via-card/30 to-transparent">
      <div className="cyber-grid absolute inset-0 opacity-5" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Cpu className="w-6 h-6 text-secondary" />
              <span className="text-muted-foreground font-mono text-sm">// SKILL_MATRIX</span>
            </div>
            <h2 className="font-cyber text-3xl md:text-5xl font-bold">
              <GlitchText className="text-gradient-cyber">ARSENAL</GlitchText>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Comprehensive toolkit for building realistic security challenges
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div 
                  key={index}
                  className="cyber-card p-6 group hover:border-primary/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg transition-colors
                      ${category.color === 'primary' ? 'bg-primary/10 text-primary group-hover:bg-primary/20' : ''}
                      ${category.color === 'secondary' ? 'bg-secondary/10 text-secondary group-hover:bg-secondary/20' : ''}
                      ${category.color === 'accent' ? 'bg-accent/10 text-accent group-hover:bg-accent/20' : ''}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-cyber font-semibold text-sm">{category.title}</h3>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full
                          ${category.color === 'primary' ? 'bg-primary' : ''}
                          ${category.color === 'secondary' ? 'bg-secondary' : ''}
                          ${category.color === 'accent' ? 'bg-accent' : ''}
                        `} />
                        <span className="font-mono text-xs">{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-8 h-8 opacity-20
                    ${category.color === 'primary' ? 'bg-gradient-to-bl from-primary' : ''}
                    ${category.color === 'secondary' ? 'bg-gradient-to-bl from-secondary' : ''}
                    ${category.color === 'accent' ? 'bg-gradient-to-bl from-accent' : ''}
                  `} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
