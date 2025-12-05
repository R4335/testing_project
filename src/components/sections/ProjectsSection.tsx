import { useState } from 'react';
import { Code2, ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import GlitchText from '../GlitchText';

interface Project {
  id: number;
  name: string;
  summary: string;
  description: string;
  techStack: string[];
  codeSnippet: string;
  github?: string;
  demo?: string;
}

const ProjectsSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      name: 'CTF Platform',
      summary: 'Full-stack CTF hosting platform with dynamic scoring and container orchestration',
      description: 'A comprehensive platform for hosting CTF competitions. Features include dynamic scoring based on solve count, Docker container orchestration for challenge deployment, real-time leaderboard, team management, and an admin dashboard for challenge creation.',
      techStack: ['React', 'Node.js', 'Docker', 'PostgreSQL', 'Redis'],
      codeSnippet: `// Dynamic scoring algorithm
const calculatePoints = (solves: number, maxPoints: number = 500) => {
  const minPoints = 100;
  const decay = 0.08;
  return Math.max(
    minPoints,
    Math.floor(maxPoints * Math.exp(-decay * solves))
  );
};`,
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      name: 'Exploit Framework',
      summary: 'Modular binary exploitation framework with automatic gadget finding',
      description: 'A Python-based framework for developing exploits. Includes automatic ROP gadget discovery, format string payload generation, heap visualization, and integration with GDB for debugging. Supports multiple architectures including x86, x64, and ARM.',
      techStack: ['Python', 'C', 'Assembly', 'pwntools'],
      codeSnippet: `# Auto ROP chain builder
def build_rop_chain(binary, target_func):
    rop = ROP(binary)
    rop.raw(rop.find_gadget(['pop rdi', 'ret']))
    rop.raw(next(binary.search(b'/bin/sh')))
    rop.call(target_func)
    return rop.chain()`,
      github: '#'
    },
    {
      id: 3,
      name: 'Malware Sandbox',
      summary: 'Automated malware analysis sandbox with behavioral detection',
      description: 'A virtualized environment for safe malware analysis. Captures network traffic, filesystem changes, registry modifications, and API calls. Generates detailed reports with IOCs and YARA rule suggestions.',
      techStack: ['Python', 'QEMU', 'Volatility', 'Cuckoo'],
      codeSnippet: `# Behavioral hook example
@hook("kernel32.CreateFileW")
def on_create_file(args):
    filename = read_wstring(args[0])
    log_ioc("file_created", filename)
    return CONTINUE`,
      github: '#',
      demo: '#'
    },
    {
      id: 4,
      name: 'Network Scanner',
      summary: 'Async network reconnaissance tool with service fingerprinting',
      description: 'High-performance network scanner built with async I/O. Features include port scanning, service detection, banner grabbing, and vulnerability mapping. Outputs results in multiple formats including JSON and Nmap-compatible XML.',
      techStack: ['Go', 'Python', 'Nmap NSE', 'SQLite'],
      codeSnippet: `// Async port scan
func scanPorts(target string, ports []int) <-chan Result {
    results := make(chan Result, len(ports))
    var wg sync.WaitGroup
    for _, port := range ports {
        wg.Add(1)
        go func(p int) {
            defer wg.Done()
            results <- probePort(target, p)
        }(port)
    }
    go func() { wg.Wait(); close(results) }()
    return results
}`,
      github: '#'
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative py-24">
      <div className="cyber-grid absolute inset-0 opacity-5" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground font-mono text-sm">// PROJECT_REPOSITORY</span>
            </div>
            <h2 className="font-cyber text-3xl md:text-5xl font-bold">
              <GlitchText className="text-gradient-cyber">PROJECTS</GlitchText>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Open-source tools and frameworks for security research
            </p>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="cyber-card overflow-hidden transition-all duration-500"
              >
                {/* Collapsed View */}
                <div
                  onClick={() => toggleExpand(project.id)}
                  className="p-6 cursor-pointer flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-cyber font-bold text-lg text-foreground mb-1">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground text-sm truncate">
                      {project.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex gap-2">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-muted/50 text-xs font-mono rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {expandedId === project.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded View */}
                {expandedId === project.id && (
                  <div className="px-6 pb-6 border-t border-border/50 pt-6 animate-in slide-in-from-top-2 duration-300">
                    {/* Full Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs font-mono rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Code Snippet */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-muted-foreground">// code_sample</span>
                      </div>
                      <pre className="p-4 bg-background/80 border border-border/50 rounded-lg overflow-x-auto">
                        <code className="text-sm font-mono text-foreground whitespace-pre">
                          {project.codeSnippet}
                        </code>
                      </pre>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted transition-colors rounded font-mono text-sm"
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors rounded font-mono text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
