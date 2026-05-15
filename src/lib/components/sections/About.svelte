<script lang="ts">
  import { skills } from '$lib/data/skills'
  import { reveal } from '$lib/utils/reveal'

  const categories = [...new Set(skills.map((s) => s.category))]
  const current = ['Vue 3', 'React', 'TypeScript', 'Svelte', 'Tailwind CSS', 'Node.js']

  const stats = [
    { value: '2+',  label: 'Years building' },
    { value: '5+',  label: 'Projects shipped' },
    { value: '10+', label: 'Technologies' },
    { value: '∞',   label: 'Coffee consumed' },
  ]
</script>

<section id="about" class="px-4 py-24 relative overflow-hidden">

  <!-- Subtle background glow -->
  <div class="absolute bottom-0 right-0 w-150 h-150 bg-violet-600/4
              blur-[140px] rounded-full pointer-events-none" aria-hidden="true"></div>

  <div class="mx-auto max-w-6xl relative z-10">

    <!-- Section header -->
    <div use:reveal class="mb-3">
      <span class="section-label">03 / about</span>
    </div>
    <h2 use:reveal={{ delay: 100 }} class="section-heading">About Me</h2>

    <!-- Stats strip -->
    <div use:reveal={{ delay: 180 }} class="stats-strip">
      {#each stats as stat, i}
        <div class="stat-item" style="animation-delay: {i * 80}ms">
          <span class="stat-value">{stat.value}</span>
          <span class="stat-label">{stat.label}</span>
        </div>
        {#if i < stats.length - 1}
          <div class="stat-divider" aria-hidden="true"></div>
        {/if}
      {/each}
    </div>

    <div class="grid gap-12 lg:grid-cols-2 lg:gap-20 mt-14">

      <!-- Bio -->
      <div>
        <p use:reveal={{ delay: 0 }} class="bio-text">
          I'm <span class="text-white font-medium">Temenu Oluwanifemi</span>, a frontend
          engineer who cares deeply about the craft. I build interfaces that are fast,
          accessible, and feel intentional — not just functional.
        </p>
        <p use:reveal={{ delay: 100 }} class="bio-text">
          My work sits at the intersection of design and engineering. I obsess over the
          small details — transitions, micro-interactions, performance — because that's
          what separates good products from great ones.
        </p>
        <p use:reveal={{ delay: 200 }} class="bio-text">
          I've shipped Chrome extensions, real-time dashboards, and encrypted messaging
          apps. I'm always looking for the next hard problem worth solving.
        </p>

        <!-- Currently working with -->
        <div use:reveal={{ delay: 300 }} class="mt-8">
          <p class="font-mono text-xs text-slate-600 tracking-widest mb-4">
            // currently working with
          </p>
          <div class="flex flex-wrap gap-x-6 gap-y-3">
            {#each current as tech, i (tech)}
              <span class="current-tech" style="animation-delay:{i*60}ms">
                <span class="current-dot" aria-hidden="true"></span>
                {tech}
              </span>
            {/each}
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div>
        <p use:reveal class="font-mono text-xs tracking-widest text-slate-600 uppercase mb-8">
          Tech &amp; Tools
        </p>
        <div class="space-y-7">
          {#each categories as category (category)}
            <div use:reveal>
              <div class="flex items-center gap-3 mb-3">
                <p class="font-mono text-[10px] tracking-widest text-slate-600 uppercase">
                  {category}
                </p>
                <div class="flex-1 h-px bg-slate-800"></div>
              </div>
              <div class="flex flex-wrap gap-2">
                {#each skills.filter((s) => s.category === category) as skill (skill.name)}
                  <span class="skill-chip">{skill.name}</span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  .section-label {
    font-family: var(--font-mono);
    font-size: .75rem;
    color: #22d3ee;
    text-transform: uppercase;
    letter-spacing: .15em;
  }
  .section-heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #fff;
    margin-bottom: 0;
    position: relative;
    display: inline-block;
  }
  .section-heading::after {
    content: '';
    position: absolute;
    bottom: -8px; left: 0;
    height: 2px; width: 0;
    background: linear-gradient(90deg, #22d3ee, transparent);
    transition: width .9s cubic-bezier(.16,1,.3,1);
  }
  .section-heading:global(.after-reveal)::after { width: 100%; }

  /* Stats strip */
  .stats-strip {
    display: flex;
    align-items: center;
    gap: 0;
    margin-top: 2rem;
    padding: 1.25rem 1.75rem;
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(255,255,255,.06);
    border-radius: .75rem;
    flex-wrap: wrap;
    gap: .5rem;
  }
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 80px;
    padding: .25rem .5rem;
  }
  .stat-value {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    background: linear-gradient(135deg, #fff 30%, rgba(34,211,238,.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
  }
  .stat-label {
    font-family: var(--font-mono);
    font-size: .65rem;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: .08em;
    margin-top: .2rem;
    white-space: nowrap;
  }
  .stat-divider {
    width: 1px;
    height: 2.5rem;
    background: rgba(255,255,255,.07);
    flex-shrink: 0;
  }

  /* Bio text */
  .bio-text {
    font-size: .9375rem;
    line-height: 1.8;
    color: #94a3b8;
    margin-bottom: 1.1rem;
  }

  /* Currently working with */
  .current-tech {
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: .875rem;
    color: #64748b;
    transition: color .2s;
  }
  .current-tech:hover { color: #cbd5e1; }
  .current-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22d3ee;
    flex-shrink: 0;
    box-shadow: 0 0 6px rgba(34,211,238,.5);
  }

  /* Skill chips */
  .skill-chip {
    padding: .35rem .8rem;
    font-size: .8125rem;
    color: #64748b;
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(255,255,255,.06);
    border-radius: .5rem;
    transition: color .25s, border-color .25s, background .25s, transform .2s, box-shadow .25s;
    cursor: default;
  }
  .skill-chip:hover {
    color: #e2e8f0;
    border-color: rgba(34,211,238,.3);
    background: rgba(34,211,238,.04);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,.2);
  }
</style>
