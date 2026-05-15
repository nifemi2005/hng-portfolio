<script lang="ts">
  import { ExternalLink } from 'lucide-svelte'
  import { fly } from 'svelte/transition'
  import { projects, allTags } from '$lib/data/projects'
  import { reveal } from '$lib/utils/reveal'

  let activeTag = $state('All')

  let filtered = $derived(
    activeTag === 'All' ? projects : projects.filter((p) => p.tags.includes(activeTag))
  )
</script>

<section id="projects" class="py-24 px-4 relative overflow-hidden">

  <!-- Subtle section background glow -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-150 h-100 bg-cyan-500/4 blur-[120px] rounded-full pointer-events-none"
       aria-hidden="true"></div>

  <div class="max-w-6xl mx-auto relative z-10">

    <!-- Section header -->
    <div use:reveal class="mb-3">
      <span class="section-label">02 / work</span>
    </div>
    <h2 use:reveal={{ delay: 100 }} class="section-heading">Selected Projects</h2>

    <!-- Filter pills -->
    <div use:reveal={{ delay: 200 }} class="flex flex-wrap gap-2 mb-12">
      {#each allTags as tag (tag)}
        <button
          onclick={() => (activeTag = tag)}
          class="filter-pill {activeTag === tag ? 'filter-pill--active' : ''}"
        >
          {tag}
        </button>
      {/each}
    </div>

    <!-- Project grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filtered as project, i (project.id)}
        <article use:reveal={{ delay: i * 90 }} class="card">

          <!-- Image -->
          <div class="card-image">
            {#if project.image}
              <img src={project.image} alt={project.title} class="card-img" />
              <div class="card-image-overlay"></div>
            {:else}
              <div class="card-placeholder">
                <span class="font-mono text-5xl font-bold text-slate-700">{project.id}</span>
              </div>
            {/if}
          </div>

          <!-- Body -->
          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-start justify-between gap-4 mb-3">
              <h3 class="font-semibold text-white text-lg leading-tight">{project.title}</h3>
              <div class="flex gap-1 shrink-0">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                   class="icon-btn" aria-label="GitHub repository">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z"/>
                  </svg>
                </a>
                {#if project.live !== '#'}
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                     class="icon-btn icon-btn--cyan" aria-label="Live demo">
                    <ExternalLink size={16} />
                  </a>
                {/if}
              </div>
            </div>

            <p class="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{project.description}</p>

            <div class="flex flex-wrap gap-1.5">
              {#each project.tech as tech (tech)}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
          </div>

        </article>
      {/each}
    </div>

  </div>
</section>

<style>
  /* Section labels & headings */
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
    margin-bottom: 3rem;
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
  :global(.after-reveal) .section-heading::after,
  .section-heading:global(.after-reveal)::after { width: 100%; }

  /* Filter pills */
  .filter-pill {
    padding: .375rem 1rem;
    font-family: var(--font-mono);
    font-size: .8rem;
    border-radius: 9999px;
    border: 1px solid #334155;
    color: #94a3b8;
    background: transparent;
    cursor: pointer;
    transition: border-color .2s, color .2s, background .2s, box-shadow .2s, transform .15s;
  }
  .filter-pill:hover {
    border-color: #64748b;
    color: #f1f5f9;
    transform: translateY(-1px);
  }
  .filter-pill--active {
    background: #22d3ee;
    color: #020617;
    border-color: #22d3ee;
    font-weight: 600;
    box-shadow: 0 0 18px rgba(34,211,238,.35);
  }
  .filter-pill--active:hover { transform: translateY(-1px); }

  /* Cards */
  .card {
    display: flex;
    flex-direction: column;
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: .75rem;
    overflow: hidden;
    transition: transform .3s cubic-bezier(.16,1,.3,1),
                border-color .3s,
                box-shadow .3s;
    position: relative;
  }
  .card::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: .75rem;
    background: radial-gradient(600px circle at var(--mx,50%) var(--my,50%),
      rgba(34,211,238,.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
    z-index: 1;
  }
  .card:hover {
    transform: translateY(-6px);
    border-color: rgba(34,211,238,.25);
    box-shadow: 0 20px 40px rgba(0,0,0,.4), 0 0 30px rgba(34,211,238,.06);
  }
  .card:hover::before { opacity: 1; }

  /* Card image */
  .card-image {
    aspect-ratio: 16/9;
    overflow: hidden;
    position: relative;
  }
  .card-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform .6s cubic-bezier(.16,1,.3,1);
  }
  .card:hover .card-img { transform: scale(1.08); }

  .card-image-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(15,23,42,.6) 100%);
    opacity: 0;
    transition: opacity .3s;
  }
  .card:hover .card-image-overlay { opacity: 1; }

  .card-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, rgba(6,182,212,.08), rgba(124,58,237,.08));
    display: flex; align-items: center; justify-content: center;
    border-bottom: 1px solid #1e293b;
  }

  /* Icon buttons */
  .icon-btn {
    padding: .35rem;
    color: #475569;
    border-radius: .4rem;
    text-decoration: none;
    display: flex; align-items: center;
    transition: color .2s, background .2s, transform .2s;
    position: relative; z-index: 2;
  }
  .icon-btn:hover { color: #e2e8f0; background: rgba(255,255,255,.06); transform: translateY(-1px); }
  .icon-btn--cyan:hover { color: #22d3ee; }

  /* Tech tags */
  .tech-tag {
    padding: .15rem .5rem;
    font-family: var(--font-mono);
    font-size: .65rem;
    background: #1e293b;
    color: #64748b;
    border-radius: .3rem;
    border: 1px solid rgba(255,255,255,.05);
    transition: color .2s, border-color .2s, background .2s;
  }
  .tech-tag:hover { color: #94a3b8; border-color: rgba(34,211,238,.2); background: rgba(34,211,238,.04); }
</style>
