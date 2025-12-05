import { useState } from 'react';
import { Folder, Star, Users, ExternalLink, Trophy } from 'lucide-react';
import GlitchText from '../GlitchText';
import ChallengeModal, { Challenge } from '../ChallengeModal';

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const categories = ['All', 'pwn', 'web', 'reversing', 'forensics', 'OSINT', 'cloud', 'crypto', 'AD'];

  const challenges: Challenge[] = [
    {
      name: 'Heap Overflow Master',
      category: 'pwn',
      difficulty: 'Insane',
      platform: 'HTB',
      description: 'Advanced heap exploitation challenge featuring tcache poisoning and house of force techniques.',
      fullDescription: 'This challenge tests advanced binary exploitation skills. Players must navigate through multiple heap protections including tcache, safe-linking, and ASLR. The vulnerability chain requires precise heap feng shui to achieve arbitrary write primitive, eventually leading to RCE through __free_hook overwrite.',
      tools: ['gdb', 'pwntools', 'libc-database', 'one_gadget'],
      techniques: ['Tcache Poisoning', 'House of Force', 'Heap Feng Shui', 'GOT Overwrite'],
      featured: true,
      solves: 127,
      link: '#'
    },
    {
      name: 'JWT Nightmare',
      category: 'web',
      difficulty: 'Hard',
      platform: 'TryHackMe',
      description: 'Complex JWT vulnerability chain including algorithm confusion and key injection attacks.',
      fullDescription: 'A multi-stage web exploitation challenge where players must identify and exploit multiple JWT vulnerabilities. Starting with algorithm confusion (RS256 to HS256), players progress to JKU header injection, and finally achieve admin access through a carefully crafted token chain.',
      tools: ['Burp Suite', 'jwt_tool', 'Python', 'jwt.io'],
      techniques: ['Algorithm Confusion', 'JKU Injection', 'Key Confusion', 'Token Forgery'],
      featured: true,
      solves: 342,
      link: '#'
    },
    {
      name: 'Kernel Panic',
      category: 'pwn',
      difficulty: 'Insane',
      platform: 'HTB',
      description: 'Linux kernel exploitation challenge with race conditions and privilege escalation.',
      fullDescription: 'Exploit a vulnerable kernel module to achieve root privileges. The challenge involves identifying a race condition in a custom char device driver, exploiting the TOCTOU vulnerability, and bypassing SMEP/SMAP protections.',
      tools: ['gdb', 'QEMU', 'ropr', 'vmlinux-to-elf'],
      techniques: ['Race Condition', 'TOCTOU', 'ROP in Kernel', 'ret2usr'],
      featured: false,
      solves: 89,
      link: '#'
    },
    {
      name: 'Cloud Breach',
      category: 'cloud',
      difficulty: 'Hard',
      platform: 'Corporate',
      description: 'AWS environment with IAM misconfiguration leading to full account takeover.',
      fullDescription: 'Navigate through a realistic AWS environment starting from leaked credentials. Enumerate IAM policies, discover overly permissive roles, and chain multiple misconfigurations to achieve full account compromise.',
      tools: ['AWS CLI', 'Pacu', 'ScoutSuite', 'enumerate-iam'],
      techniques: ['IAM Enumeration', 'Role Assumption', 'Lambda Persistence', 'CloudTrail Evasion'],
      featured: true,
      solves: 156,
      link: '#'
    },
    {
      name: 'RE: Obfuscated',
      category: 'reversing',
      difficulty: 'Medium',
      platform: 'TryHackMe',
      description: 'Heavily obfuscated binary with anti-debugging tricks and custom VM.',
      fullDescription: 'Reverse engineer a binary protected with multiple obfuscation layers. Bypass anti-debugging measures, understand the custom virtual machine architecture, and extract the flag from the VM bytecode.',
      tools: ['Ghidra', 'x64dbg', 'Binary Ninja', 'Frida'],
      techniques: ['Anti-Debug Bypass', 'VM Deobfuscation', 'Control Flow Flattening', 'Dynamic Analysis'],
      featured: false,
      solves: 512,
      link: '#'
    },
    {
      name: 'AD Domination',
      category: 'AD',
      difficulty: 'Hard',
      platform: 'HTB',
      description: 'Full Active Directory lab with realistic enterprise attack path.',
      fullDescription: 'Complete AD environment simulating a corporate network. Start from initial foothold, enumerate the domain, exploit delegation issues, and achieve Domain Admin through a realistic attack chain.',
      tools: ['BloodHound', 'Rubeus', 'Mimikatz', 'Impacket'],
      techniques: ['Kerberoasting', 'AS-REP Roasting', 'Constrained Delegation', 'DCSync'],
      featured: true,
      solves: 234,
      link: '#'
    },
    {
      name: 'SSTI Sandbox',
      category: 'web',
      difficulty: 'Medium',
      platform: 'TryHackMe',
      description: 'Server-side template injection with sandbox escape in Python Flask.',
      fullDescription: 'Discover and exploit SSTI in a Flask application. The challenge involves bypassing a WAF, escaping a restricted Jinja2 sandbox, and achieving RCE through Python introspection.',
      tools: ['Burp Suite', 'SSTImap', 'Python', 'Postman'],
      techniques: ['SSTI Detection', 'Sandbox Escape', 'MRO Chain', 'Blind RCE'],
      featured: false,
      solves: 678,
      link: '#'
    },
    {
      name: 'Container Escape',
      category: 'cloud',
      difficulty: 'Insane',
      platform: 'Corporate',
      description: 'Docker container breakout leading to host compromise.',
      fullDescription: 'Escape from a misconfigured Docker container to gain access to the host system. Exploit privileged container settings, mounted volumes, and kernel vulnerabilities to break out of the container isolation.',
      tools: ['Docker', 'deepce', 'CDK', 'LinPEAS'],
      techniques: ['Privileged Container', 'Socket Mount', 'Cgroup Escape', 'Kernel Exploit'],
      featured: false,
      solves: 67,
      link: '#'
    },
    {
      name: 'Crypto Chaos',
      category: 'crypto',
      difficulty: 'Hard',
      platform: 'HTB',
      description: 'Custom cryptographic implementation with subtle timing side-channel.',
      fullDescription: 'Analyze a custom encryption implementation and discover a timing side-channel vulnerability. Use statistical analysis to recover the secret key through careful timing measurements.',
      tools: ['Python', 'SageMath', 'NumPy', 'Wireshark'],
      techniques: ['Timing Attack', 'Statistical Analysis', 'Padding Oracle', 'Key Recovery'],
      featured: false,
      solves: 189,
      link: '#'
    },
    {
      name: 'Digital Footprint',
      category: 'OSINT',
      difficulty: 'Medium',
      platform: 'TryHackMe',
      description: 'Track down a threat actor through their digital breadcrumbs.',
      fullDescription: 'Use open-source intelligence techniques to identify and track a simulated threat actor. Correlate information across social media, domain registrations, and leaked databases to build a complete profile.',
      tools: ['Maltego', 'theHarvester', 'Shodan', 'SpiderFoot'],
      techniques: ['Social Media OSINT', 'Domain Recon', 'Email Tracing', 'Metadata Analysis'],
      featured: false,
      solves: 445,
      link: '#'
    },
    {
      name: 'Memory Forensics',
      category: 'forensics',
      difficulty: 'Hard',
      platform: 'HTB',
      description: 'Analyze memory dump to uncover malware artifacts and C2 communications.',
      fullDescription: 'Perform deep analysis of a Windows memory dump to identify malicious processes, extract malware samples, and discover command and control infrastructure.',
      tools: ['Volatility3', 'YARA', 'CyberChef', 'strings'],
      techniques: ['Process Analysis', 'DLL Injection Detection', 'Network Artifacts', 'Malware Extraction'],
      featured: true,
      solves: 203,
      link: '#'
    }
  ];

  const filteredChallenges = selectedCategory === 'All' 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-accent border-accent/30 bg-accent/10';
      case 'Medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'Hard': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      case 'Insane': return 'text-destructive border-destructive/30 bg-destructive/10';
      default: return 'text-muted-foreground border-muted/30 bg-muted/10';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      pwn: 'text-primary border-primary/30',
      web: 'text-secondary border-secondary/30',
      reversing: 'text-accent border-accent/30',
      cloud: 'text-neon-pink border-neon-pink/30',
      AD: 'text-orange-400 border-orange-400/30',
      crypto: 'text-yellow-400 border-yellow-400/30',
      forensics: 'text-emerald-400 border-emerald-400/30',
      OSINT: 'text-purple-400 border-purple-400/30',
    };
    return colors[category] || 'text-muted-foreground border-muted/30';
  };

  return (
    <section id="portfolio" className="relative py-24">
      <div className="cyber-grid absolute inset-0 opacity-5" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Folder className="w-6 h-6 text-accent" />
              <span className="text-muted-foreground font-mono text-sm">// CHALLENGE_DATABASE</span>
            </div>
            <h2 className="font-cyber text-3xl md:text-5xl font-bold">
              <GlitchText className="text-gradient-cyber">PORTFOLIO</GlitchText>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Featured challenges deployed across major platforms
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-mono text-sm border rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-muted-foreground border-border/50 hover:border-primary/50 hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Challenge grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge, index) => (
              <div 
                key={index}
                onClick={() => setSelectedChallenge(challenge)}
                className="cyber-card p-6 group relative overflow-hidden transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                {/* Featured badge */}
                {challenge.featured && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-primary/20 border border-primary/30 rounded text-primary text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Category & Difficulty */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 text-xs font-mono border rounded uppercase ${getCategoryColor(challenge.category)}`}>
                    {challenge.category}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-mono border rounded ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-cyber font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                  {challenge.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {challenge.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Trophy className="w-3 h-3" />
                    <span>{challenge.platform}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{challenge.solves} solves</span>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* View more */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary hover:bg-primary/10 transition-colors font-mono text-sm">
              <ExternalLink className="w-4 h-4" />
              View Full Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Challenge Modal */}
      <ChallengeModal 
        challenge={selectedChallenge}
        isOpen={!!selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
      />
    </section>
  );
};

export default PortfolioSection;
