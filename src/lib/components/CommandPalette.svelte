<script lang="ts">
    import { fade, fly } from 'svelte/transition'
    import { Search, ArrowRight } from 'lucide-svelte'
    import { commandPaletteOpen } from '$lib/stores/commandPalette'
    import { profile } from '$lib/data/data'
    import { projects } from '$lib/data/projects'
  
    type Cmd = { id: string; label: string; hint: string; group: string; action: () => void }
  
    let query = $state('')
    let selectedIndex = $state(0)
    let inputEl = $state<HTMLInputElement | null>(null)
  
    function close() { commandPaletteOpen.set(false) }
    function scrollTo(id: string) { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }) }
  
    const allCommands: Cmd[] = [
      { id: 'work',    label: 'See my work',    hint: 'Scroll to projects', group: 'Navigate',
        action: () => { close(); scrollTo('#projects') } },
      { id: 'about',   label: 'About me',       hint: 'Learn more about me', group: 'Navigate',
        action: () => { close(); scrollTo('#about') } },
      { id: 'contact', label: 'Contact',        hint: 'Get in touch', group: 'Navigate',
        action: () => { close(); scrollTo('#contact') } },
      { id: 'cv',      label: 'Download CV',    hint: 'Open resume PDF', group: 'Actions',
        action: () => { close(); window.open('/resume.pdf', '_blank') } },
      { id: 'email',   label: 'Send Email',     hint: profile.socials.email.replace('mailto:', ''), group: 'Actions',
        action: () => { close(); window.open(profile.socials.email) } },
      { id: 'github',  label: 'GitHub Profile', hint: 'View my open source work', group: 'Actions',
        action: () => { close(); window.open(profile.socials.github, '_blank') } },
      ...projects.map((p) => ({
        id: `proj-${p.id}`,
        label: p.title,
        hint: p.tech.slice(0, 3).join(' · '),
        group: 'Projects',
        action: () => { close(); window.open(p.live !== '#' ? p.live : p.github, '_blank') },
      })),
    ]
  
    let results = $derived(
      query.trim()
        ? allCommands.filter(
            (c) =>
              c.label.toLowerCase().includes(query.toLowerCase()) ||
              c.hint.toLowerCase().includes(query.toLowerCase()) ||
              c.group.toLowerCase().includes(query.toLowerCase()),
          )
        : allCommands,
    )
  
    let groups = $derived(
      results.reduce<Record<string, Cmd[]>>((acc, cmd) => {
        ;(acc[cmd.group] ??= []).push(cmd)
        return acc
      }, {}),
    )
  
    // Reset index when results change
    $effect(() => {
      results
      selectedIndex = 0
    })
  
    // Focus input and reset on open
    $effect(() => {
      if ($commandPaletteOpen) {
        query = ''
        selectedIndex = 0
        setTimeout(() => inputEl?.focus(), 30)
      }
    })
  
    function handleKeyDown(e: KeyboardEvent) {
      if (!$commandPaletteOpen) return
      if (e.key === 'ArrowDown') { e.preventDefault(); selectedIndex = Math.min(selectedIndex + 1, results.length - 1) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); selectedIndex = Math.max(selectedIndex - 1, 0) }
      else if (e.key === 'Enter') { e.preventDefault(); results[selectedIndex]?.action() }
      else if (e.key === 'Escape') { close() }
    }
  </script>
  
  <svelte:window onkeydown={handleKeyDown} />
  
  {#if $commandPaletteOpen}
    <div
      transition:fade={{ duration: 150 }}
      class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <!-- Backdrop -->
      <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
      <div onclick={close} class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
  
      <!-- Panel -->
      <div
        in:fly={{ y: -16, duration: 200 }}
        class="relative w-full max-w-xl bg-slate-900 border border-slate-700/60
               rounded-xl shadow-2xl shadow-black overflow-hidden"
      >
        <!-- Search input -->
        <div class="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search size={15} class="text-slate-500 shrink-0" />
          <input
            bind:this={inputEl}
            bind:value={query}
            type="text"
            placeholder="Type a command or search…"
            class="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
          />
          <kbd class="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-slate-500 rounded border border-slate-700">
            ESC
          </kbd>
        </div>
  
        <!-- Results -->
        <div class="max-h-72 overflow-y-auto">
          {#if results.length === 0}
            <p class="text-center text-sm text-slate-600 py-10">No results for "{query}"</p>
          {:else}
            {#each Object.entries(groups) as [group, cmds]}
              <div class="py-1.5 px-2">
                <p class="text-[10px] font-mono text-slate-600 uppercase tracking-widest px-2 mb-1 pt-1.5">
                  {group}
                </p>
                {#each cmds as cmd}
                  {@const idx = results.indexOf(cmd)}
                  <button
                    onclick={cmd.action}
                    class="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                      {idx === selectedIndex
                        ? 'bg-cyan-400/10 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}"
                  >
                    <div class="flex-1 min-w-0">
                      <span class="text-sm font-medium block truncate">{cmd.label}</span>
                      <span class="text-xs text-slate-600 block truncate">{cmd.hint}</span>
                    </div>
                    {#if idx === selectedIndex}
                      <ArrowRight size={13} class="text-cyan-400 shrink-0" />
                    {/if}
                  </button>
                {/each}
              </div>
            {/each}
          {/if}
        </div>
  
        <!-- Hint footer -->
        <div class="flex gap-3 px-4 py-2 border-t border-slate-800 text-[10px] font-mono text-slate-700">
          <span>↑↓ navigate</span>
          <span class="text-slate-800">·</span>
          <span>↵ open</span>
          <span class="text-slate-800">·</span>
          <span>ESC close</span>
        </div>
      </div>
    </div>
  {/if}