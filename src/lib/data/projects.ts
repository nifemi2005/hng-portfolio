import hawkeyeImg from '$lib/assets/Projects/hawkeye.png'
import whisperboxImg from '$lib/assets/Projects/whisperbox.png'
import aiSummarizerImg from '$lib/assets/Projects/ai_summarizer.png'
import tedxosogboImg from '$lib/assets/Projects/tedxosogbo.png'
import trackerImg from '$lib/assets/Projects/pwa_tracker.png'

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
    image: hawkeyeImg,
    github: 'https://github.com/nifemi2005/Realtime-dashboard',
    live: 'https://hawkeyedemo.netlify.app/',
    featured: true,
  },
  {
    id: '02',
    title: 'WhisperBox',
    description:
      'End-to-end encrypted messaging app with real-time delivery. Messages are encrypted client-side using the WebCrypto API — the server never sees plaintext.',
    tech: ['React', 'TypeScript', 'NEXT.js', 'WebCrypto API', 'WebSockets'],
    tags: ['Security', 'Real-time'],
    image: whisperboxImg,
    github: 'https://github.com/nifemi2005/whisperbox',
    live: 'https://whisperboxdemo.netlify.app/',
    featured: true,
  },
  {
    id: '03',
    title: 'AI Page Summarizer',
    description:
      'Chrome extension (Manifest V3) that extracts content from any webpage and returns a structured AI summary with key insights and estimated reading time.',
    tech: ['JavaScript', 'Chrome Extensions', 'Claude API', 'Tailwind CSS'],
    tags: ['Extension', 'AI'],
    image: aiSummarizerImg,
    github: 'https://github.com/nifemi2005/AI-summarizer-extension',
    live: '#',
    featured: false,
  },
  {
    id: '04',
    title: 'TEDxOsogbo',
    description:
      'Official website for TEDxOsogbo — an independently organized TED event bringing bold ideas to the Osogbo community. Features speaker showcases, event highlights, and session information.',
    tech: ['React', 'TypeScript', 'NEXT.js', 'Tailwind CSS'],
    tags: ['Frontend'],
    image: tedxosogboImg,
    github: 'https://github.com/tedxosogbo/tedxosogbowebsite',
    live: 'https://tedxosogbo.netlify.app/',
    featured: true,
  },
  {
    id: '05',
    title: 'Habit Tracker PWA',
    description:
      'A Progressive Web App for building and maintaining daily habits. Installable on any device, works offline, and tracks streaks with a clean visual dashboard.',
    tech: ['TypeScript', 'Tailwind CSS'],
    tags: ['Frontend', 'PWA'],
    image: trackerImg,
    github: 'https://github.com/nifemi2005/Habit-tracker',
    live: 'https://pwa-habit-tracker.netlify.app/',
    featured: false,
  },
]

export const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags))]
