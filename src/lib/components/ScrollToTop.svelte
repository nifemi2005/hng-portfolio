<script lang="ts">
  import { fly } from 'svelte/transition'
  import { ArrowUp } from 'lucide-svelte'

  let visible = $state(false)

  function onScroll() { visible = window.scrollY > 600 }
</script>

<svelte:window onscroll={onScroll} />

{#if visible}
  <button
    in:fly={{ y: 12, duration: 250 }}
    out:fly={{ y: 12, duration: 180 }}
    onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    class="scroll-top"
    aria-label="Scroll to top"
  >
    <ArrowUp size={15} />
  </button>
{/if}

<style>
  .scroll-top {
    position: fixed;
    bottom: 1.5rem; right: 1.5rem;
    z-index: 40;
    padding: .65rem;
    background: rgba(15,23,42,.9);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 50%;
    color: #64748b;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: color .2s, border-color .2s, box-shadow .25s, transform .2s;
  }
  .scroll-top:hover {
    color: #f1f5f9;
    border-color: rgba(34,211,238,.35);
    box-shadow: 0 0 20px rgba(34,211,238,.2), 0 4px 16px rgba(0,0,0,.4);
    transform: translateY(-3px);
  }
  .scroll-top:active { transform: scale(.92); }
</style>
