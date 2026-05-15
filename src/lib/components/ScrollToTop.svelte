<script lang="ts">
    import { fly } from 'svelte/transition'
    import { ArrowUp } from 'lucide-svelte'
  
    let visible = $state(false)
  
    function onScroll() {
      visible = window.scrollY > 600
    }
  </script>
  
  <svelte:window onscroll={onScroll} />
  
  {#if visible}
    <button
      in:fly={{ y: 8, duration: 200 }}
      out:fly={{ y: 8, duration: 150 }}
      onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      class="fixed bottom-6 right-6 z-40 p-3 bg-slate-800/90 border border-slate-700
             rounded-full text-slate-400 hover:text-white hover:border-cyan-500/40
             backdrop-blur-sm transition-all shadow-lg shadow-black/30"
      aria-label="Scroll to top"
    >
      <ArrowUp size={16} />
    </button>
  {/if}