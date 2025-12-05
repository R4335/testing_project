import { useState } from 'react';
import { BookOpen, Calendar, Clock, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import GlitchText from '../GlitchText';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const BlogSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Heap Exploitation: From tcache to Arbitrary Write',
      date: '2024-12-01',
      readTime: '15 min',
      excerpt: 'A deep dive into modern heap exploitation techniques, focusing on tcache poisoning and how it can be leveraged for arbitrary write primitives.',
      content: `## Introduction

Modern heap allocators have evolved significantly, introducing various security measures to prevent exploitation. However, the tcache mechanism in glibc 2.26+ introduced new attack vectors that we'll explore in depth.

## Understanding tcache

The tcache (thread-local cache) was introduced to improve performance by maintaining per-thread bins for small allocations. Each thread has:

- 64 bins for different size classes
- Each bin can hold up to 7 chunks
- LIFO (Last In, First Out) ordering

## The Vulnerability

The key weakness in early tcache implementations was the lack of validation:

\`\`\`c
// Simplified tcache_get
void *tcache_get(size_t tc_idx) {
    tcache_entry *e = tcache->entries[tc_idx];
    tcache->entries[tc_idx] = e->next;
    return (void *)e;
}
\`\`\`

No integrity checks on the \`next\` pointer!

## Exploitation Steps

1. **Trigger a double-free** to get the same chunk in tcache twice
2. **Modify the fd pointer** to point to your target address
3. **Allocate twice** - second allocation returns your target
4. **Write arbitrary data** to the controlled address

## Mitigations

- **Safe-linking** (glibc 2.32+): XOR obfuscation of fd pointers
- **Key field**: Double-free detection

## Conclusion

Understanding heap internals is crucial for both exploitation and defense.`,
      tags: ['pwn', 'heap', 'glibc', 'exploitation']
    },
    {
      id: 2,
      title: 'Bypassing Modern WAFs with HTTP Request Smuggling',
      date: '2024-11-15',
      readTime: '12 min',
      excerpt: 'Exploring HTTP request smuggling techniques to bypass web application firewalls and access protected resources.',
      content: `## What is HTTP Request Smuggling?

HTTP Request Smuggling exploits discrepancies in how front-end and back-end servers parse HTTP requests, particularly around Content-Length and Transfer-Encoding headers.

## Types of Smuggling

### CL.TE (Content-Length wins on front-end)

\`\`\`http
POST / HTTP/1.1
Host: target.com
Content-Length: 13
Transfer-Encoding: chunked

0

GET /admin
\`\`\`

### TE.CL (Transfer-Encoding wins on front-end)

Similar concept but reversed priority.

## WAF Bypass Example

When a WAF blocks requests to \`/admin\`:

1. Send a smuggled request that the WAF sees as benign
2. The back-end interprets it as two requests
3. Second request accesses \`/admin\` directly

## Detection

Look for:
- Timeout discrepancies
- Reflected content from smuggled requests
- Differential response sizes

## Conclusion

Request smuggling remains a powerful technique despite being well-documented.`,
      tags: ['web', 'smuggling', 'WAF', 'bypass']
    },
    {
      id: 3,
      title: 'Active Directory Attack Paths: From User to Domain Admin',
      date: '2024-11-01',
      readTime: '20 min',
      excerpt: 'A comprehensive guide to common Active Directory attack paths, from initial access to full domain compromise.',
      content: `## Initial Reconnaissance

Start with gathering information about the domain:

\`\`\`powershell
# Using PowerView
Get-DomainController
Get-DomainPolicy
Get-DomainUser -Properties samaccountname,description
\`\`\`

## Privilege Escalation Paths

### 1. Kerberoasting

Target service accounts with SPNs:

\`\`\`bash
GetUserSPNs.py domain/user:pass -dc-ip 10.10.10.1 -request
\`\`\`

### 2. AS-REP Roasting

Target accounts without pre-authentication:

\`\`\`bash
GetNPUsers.py domain/ -usersfile users.txt -dc-ip 10.10.10.1
\`\`\`

### 3. Delegation Abuse

Constrained delegation can be abused for privilege escalation.

## Domain Admin

With DA credentials, extract all hashes:

\`\`\`bash
secretsdump.py domain/admin:pass@dc.domain.local
\`\`\`

## Persistence

- Golden Ticket
- Silver Ticket
- DCSync rights

## Conclusion

Understanding these paths helps both attackers and defenders.`,
      tags: ['AD', 'windows', 'privilege-escalation', 'kerberos']
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="relative py-24 border-t border-border/30">
      <div className="cyber-grid absolute inset-0 opacity-5" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-secondary" />
              <span className="text-muted-foreground font-mono text-sm">// KNOWLEDGE_BASE</span>
            </div>
            <h2 className="font-cyber text-3xl md:text-5xl font-bold">
              <GlitchText className="text-gradient-cyber">BLOG</GlitchText>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Technical writeups, research, and security insights
            </p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="cyber-card overflow-hidden transition-all duration-500"
              >
                {/* Header */}
                <div
                  onClick={() => toggleExpand(post.id)}
                  className="p-6 cursor-pointer hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-cyber font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                        <div className="flex items-center gap-2">
                          <Tag className="w-3 h-3" />
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-muted/50 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {expandedId === post.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === post.id && (
                  <div className="px-6 pb-6 border-t border-border/50 pt-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="prose prose-invert prose-sm max-w-none">
                      {post.content.split('\n\n').map((paragraph, i) => {
                        if (paragraph.startsWith('## ')) {
                          return (
                            <h2 key={i} className="font-cyber text-lg text-primary mt-6 mb-3">
                              {paragraph.replace('## ', '')}
                            </h2>
                          );
                        }
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={i} className="font-cyber text-base text-secondary mt-4 mb-2">
                              {paragraph.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (paragraph.startsWith('```')) {
                          const lines = paragraph.split('\n');
                          const code = lines.slice(1, -1).join('\n');
                          return (
                            <pre key={i} className="p-4 bg-background/80 border border-border/50 rounded-lg overflow-x-auto my-4">
                              <code className="text-sm font-mono text-foreground">
                                {code}
                              </code>
                            </pre>
                          );
                        }
                        if (paragraph.startsWith('- ')) {
                          const items = paragraph.split('\n');
                          return (
                            <ul key={i} className="list-disc list-inside text-muted-foreground space-y-1 my-3">
                              {items.map((item, j) => (
                                <li key={j}>{item.replace('- ', '')}</li>
                              ))}
                            </ul>
                          );
                        }
                        if (paragraph.startsWith('1. ')) {
                          const items = paragraph.split('\n');
                          return (
                            <ol key={i} className="list-decimal list-inside text-muted-foreground space-y-1 my-3">
                              {items.map((item, j) => (
                                <li key={j}>{item.replace(/^\d+\.\s*\*\*/, '').replace(/\*\*/, ': ')}</li>
                              ))}
                            </ol>
                          );
                        }
                        return (
                          <p key={i} className="text-muted-foreground leading-relaxed my-3">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/50">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
