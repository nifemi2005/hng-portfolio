export interface Project {
    id: string
    title: string
    description: string
    tech: string[]
    tags: string[]
    image?: string
    github: string
    live: string
    featured: boolean
  }
  
  export const projects: Project[] = [
    {
      id: '01',
      title: 'HawkEye Dashboard',
      description:
        'A real-time monitoring dashboard streaming live service metrics via WebSocket. Features animated charts, virtualized activity feeds, and interactive filters.',
      tech: ['Vue 3', 'TypeScript', 'ECharts', 'Pinia', 'Tailwind CSS'],
      tags: ['Frontend', 'Real-time'],
      image: '/projects/hawkeye.png',
      github: 'https://github.com/your-username/hawkeye',
      live: 'https://hawkeye.vercel.app',
      featured: true,
    },
    {
      id: '02',
      title: 'WhisperBox',
      description:
        'End-to-end encrypted messaging app with real-time delivery. Messages are encrypted client-side using the WebCrypto API — the server never sees plaintext.',
      tech: ['React', 'TypeScript', 'Node.js', 'WebCrypto API', 'WebSockets'],
      tags: ['Full-stack', 'Security'],
      image: '/projects/whisperbox.png',
      github: 'https://github.com/your-username/whisperbox',
      live: 'https://whisperbox.vercel.app',
      featured: true,
    },
    {
      id: '03',
      title: 'AI Page Summarizer',
      description:
        'Chrome extension (Manifest V3) that extracts content from any webpage and returns a structured AI summary with key insights and estimated reading time.',
      tech: ['JavaScript', 'Chrome Extensions', 'Claude API', 'Tailwind CSS'],
      tags: ['Extension', 'AI'],
      image: '/projects/summarizer.png',
      github: 'https://github.com/your-username/ai-summarizer',
      live: '#',
      featured: false,
    },
  ]
  
  export const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags))]