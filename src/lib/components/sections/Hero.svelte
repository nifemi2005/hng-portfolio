<script lang="ts">
  import { fly, fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { Mail, Download, ArrowDown } from 'lucide-svelte'
  import { profile } from '$lib/data/data'

  let mounted = $state(false)
  onMount(() => { mounted = true })
</script>

<section
  id="home"
  class="relative min-h-screen flex items-center overflow-hidden px-4"
>

  <!-- Aurora background blobs -->
  <div class="absolute inset-0 -z-10 overflow-hidden">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-cyan-500/10 blur-[140px]"
    ></div>
    <div
      class="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[120px]"
    ></div>
    <div
      class="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] rounded-full bg-blue-600/8 blur-[100px]"
    ></div>
  </div>

  <!-- Subtle grid overlay -->
  <div
    class="absolute inset-0 -z-10 opacity-[0.025]"
    style="background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px); background-size: 80px 80px;"
  ></div>

  <!-- Content -->
  <div class="max-w-6xl w-full mx-auto pt-20 pb-24">
    {#if mounted}

      <!-- Status pill -->
      <div in:fly={{ y: 20, duration: 500, delay: 0 }} class="mb-8">
        <span
          class="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 bg-cyan-400/5 border border-cyan-400/20 px-3 py-1.5 rounded-full"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          Available for opportunities
        </span>
      </div>

      <!-- Name -->
      <h1
        in:fly={{ y: 40, duration: 700, delay: 100 }}
        class="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-4"
      >
        <span class="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
          {profile.name}
        </span>
      </h1>

      <!-- Role -->
      <div in:fly={{ y: 30, duration: 600, delay: 200 }} class="mb-6">
        <p class="font-mono text-lg sm:text-xl text-cyan-400">
          <span class="text-slate-700 select-none mr-1">&#47;&#47;</span>{profile.role}
        </p>
      </div>

      <!-- Tagline -->
      <p
        in:fly={{ y: 30, duration: 600, delay: 300 }}
        class="text-base sm:text-xl text-slate-400 max-w-lg leading-relaxed mb-10"
      >
        {profile.tagline}
      </p>

      <!-- CTA buttons -->
      <div
        in:fly={{ y: 30, duration: 600, delay: 400 }}
        class="flex flex-wrap gap-4 mb-14"
      >
        <a
          href="#projects"
          class="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-slate-950 font-semibold text-sm rounded-lg hover:bg-cyan-300 active:scale-95 transition-all"
        >
          See my work
        </a>
        <a
          href={profile.resume}
          download="Temenu_Oluwanifemi_CV.pdf"
          class="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 text-slate-300 text-sm rounded-lg hover:border-cyan-400/50 hover:text-white active:scale-95 transition-all"
        >
          <Download size={16} />
          Download CV
        </a>
      </div>

      <!-- Social links -->
      <div
        in:fly={{ y: 20, duration: 600, delay: 500 }}
        class="flex items-center gap-1"
      >
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          class="p-2.5 text-slate-500 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all"
          aria-label="GitHub profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z"/></svg>
        </a>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          class="p-2.5 text-slate-500 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all"
          aria-label="LinkedIn profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a
          href={profile.socials.email}
          class="p-2.5 text-slate-500 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all"
          aria-label="Send email"
        >
          <Mail size={20} />
        </a>

        <div class="w-px h-4 bg-slate-800 mx-3"></div>

        <span class="font-mono text-xs text-slate-600 tracking-widest">
          v{new Date().getFullYear()}.1
        </span>
      </div>

    {/if}
  </div>

  <!-- Scroll indicator -->
  {#if mounted}
    <div
      in:fade={{ duration: 800, delay: 1200 }}
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
    >
      <span class="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
      <ArrowDown size={16} class="animate-bounce" />
    </div>
  {/if}
</section>