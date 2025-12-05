import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, Users, Trophy, ExternalLink, Wrench, Target } from 'lucide-react';

export interface Challenge {
  name: string;
  category: string;
  difficulty: string;
  platform: string;
  description: string;
  featured: boolean;
  solves: number;
  fullDescription?: string;
  tools?: string[];
  techniques?: string[];
  link?: string;
}

interface ChallengeModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
}

const ChallengeModal = ({ challenge, isOpen, onClose }: ChallengeModalProps) => {
  if (!challenge) return null;

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
      pwn: 'text-primary border-primary/30 bg-primary/10',
      web: 'text-secondary border-secondary/30 bg-secondary/10',
      reversing: 'text-accent border-accent/30 bg-accent/10',
      cloud: 'text-neon-pink border-neon-pink/30 bg-neon-pink/10',
      AD: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
      crypto: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
      forensics: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      OSINT: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    };
    return colors[category] || 'text-muted-foreground border-muted/30 bg-muted/10';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="cyber-card border-primary/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 text-xs font-mono border rounded uppercase ${getCategoryColor(challenge.category)}`}>
              {challenge.category}
            </span>
            <span className={`px-2 py-0.5 text-xs font-mono border rounded ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
            {challenge.featured && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/20 border border-primary/30 rounded text-primary text-xs ml-auto">
                <Star className="w-3 h-3 fill-current" />
                <span>Featured</span>
              </div>
            )}
          </div>
          <DialogTitle className="font-cyber text-2xl text-foreground">
            {challenge.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          <div>
            <p className="text-muted-foreground leading-relaxed">
              {challenge.fullDescription || challenge.description}
            </p>
          </div>

          {/* Tools */}
          {challenge.tools && challenge.tools.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-muted-foreground">// TOOLS_USED</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {challenge.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted/50 border border-border/50 rounded-full text-xs font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Techniques */}
          {challenge.techniques && challenge.techniques.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-secondary" />
                <span className="font-mono text-sm text-muted-foreground">// TECHNIQUES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {challenge.techniques.map((technique, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary/10 border border-secondary/30 rounded-full text-xs font-mono text-secondary"
                  >
                    {technique}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="w-4 h-4" />
                <span>{challenge.platform}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{challenge.solves} solves</span>
              </div>
            </div>

            {challenge.link && (
              <a
                href={challenge.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors rounded font-mono text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View on Platform
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeModal;
