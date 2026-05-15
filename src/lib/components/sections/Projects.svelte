<script lang="ts">
    import { ExternalLink } from 'lucide-svelte'
    import { projects, allTags } from '$lib/data/projects'
    import { reveal } from '$lib/utils/reveal'
  
    let activeTag = $state('All')
  
    let filtered = $derived(
      activeTag === 'All' ? projects : projects.filter((p) => p.tags.includes(activeTag)),
    )
</script>
  
  <section id="projects" class="py-24 px-4">
    <div class="max-w-6xl mx-auto">
  
      <div use:reveal class="mb-4">
        <span class="font-mono text-xs text-cyan-400 uppercase tracking-widest">02 / work</span>
      </div>
      <h2 use:reveal={{ delay: 100 }} class="text-3xl sm:text-4xl font-bold text-white mb-12">Selected Projects</h2>
  
      <!-- Filter pills -->
      <div class="flex flex-wrap gap-2 mb-10">
        {#each allTags as tag (tag)}
          <button
            onclick={() => (activeTag = tag)}
            class="px-4 py-1.5 text-sm font-mono rounded-full border transition-all
              {activeTag === tag
                ? 'bg-cyan-400 text-slate-950 border-cyan-400'
                : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'}"
          >
            {tag}
          </button>
        {/each}
      </div>
  
      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filtered as project, i (project.id)}
          <article use:reveal={{ delay: i * 80 }}
            class="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden
                   hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5
                   transition-all duration-300"
          >
            <!-- Image / placeholder -->
            <div class="aspect-video overflow-hidden">
              {#if project.image}
                <img
                  src={project.image}
                  alt={project.title}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              {:else}
                <div
                  class="w-full h-full bg-gradient-to-br from-cyan-900/20 to-violet-900/20
                         flex items-center justify-center border-b border-slate-800"
                >
                  <span class="font-mono text-5xl font-bold text-slate-700">{project.id}</span>
                </div>
              {/if}
            </div>
  
            <!-- Body -->
            <div class="p-5">
              <div class="flex items-start justify-between gap-4 mb-3">
                <h3 class="font-semibold text-white text-lg leading-tight">{project.title}</h3>
                <div class="flex gap-1.5 shrink-0">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-1.5 text-slate-500 hover:text-slate-200 transition-colors"
                    aria-label="GitHub repository"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z"/></svg>
                  </a>
                  {#if project.live !== '#'}
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-1.5 text-slate-500 hover:text-cyan-400 transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  {/if}
                </div>
              </div>
  
              <p class="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>
  
              <div class="flex flex-wrap gap-1.5">
                {#each project.tech as tech (tech)}
                  <span
                    class="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-500
                           rounded border border-slate-700/50"
                  >
                    {tech}
                  </span>
                {/each}
              </div>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>