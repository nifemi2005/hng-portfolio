<script lang="ts">
  import { slide } from 'svelte/transition'
  import { onMount } from 'svelte'
  // import { Menu, X } from 'lucide-svelte'
  import { resolve } from '$app/paths'
  import { commandPaletteOpen } from '$lib/stores/commandPalette'

  let menuOpen  = $state(false)
  let scrolled  = $state(false)
  let activeSection = $state('home')

  const links = [
    { label: 'Work',    href: '#projects' },
    { label: 'About',   href: '#about'    },
    { label: 'Contact', href: '#contact'  },
  ]

  const sectionIds = ['home', 'projects', 'about', 'contact']

  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 60

      // track active section
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          activeSection = id
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  })
</script>

<header class="header" class:header--scrolled={scrolled}>
  <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">

    <!-- Logo -->
    <a href={resolve('/')} class="logo">
      <span class="logo-text">TO.</span>
    </a>

    <!-- Desktop nav -->
    <nav class="hidden items-center gap-8 md:flex">
      {#each links as link (link.href)}
        {@const isActive = activeSection === link.href.slice(1)}
        <a href={link.href} class="nav-link" class:nav-link--active={isActive}>
          {link.label}
          <span class="nav-underline"></span>
        </a>
      {/each}
    </nav>

    <!-- Right side -->
    <div class="hidden md:flex items-center gap-3">
      <button
        onclick={() => commandPaletteOpen.update((v) => !v)}
        class="cmd-btn"
        aria-label="Open command palette"
      >
        <span class="cmd-key text-white">⌘</span>K
      </button>
    </div>

    <!-- Mobile hamburger -->
    <button
      onclick={() => (menuOpen = !menuOpen)}
      class="hamburger"
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
    >
      <span class="hamburger-bar" class:open={menuOpen} aria-hidden="true"></span>
      <span class="hamburger-bar" class:open={menuOpen} aria-hidden="true"></span>
      <span class="hamburger-bar" class:open={menuOpen} aria-hidden="true"></span>
    </button>

  </div>

  <!-- Mobile menu -->
  {#if menuOpen}
    <div transition:slide={{ duration: 250 }} class="mobile-menu md:hidden">
      {#each links as link, i (link.href)}
        {@const isActive = activeSection === link.href.slice(1)}
        <a
          href={link.href}
          onclick={() => (menuOpen = false)}
          class="mobile-link"
          class:mobile-link--active={isActive}
          style="animation-delay:{i * 60}ms"
        >
          <span class="mobile-link-num font-mono text-[10px] text-slate-700"
            >0{i + 1}</span>
          {link.label}
        </a>
      {/each}
    </div>
  {/if}
</header>

<style>
  /* ── Header ─────────────────────────────────────────────── */
  .header {
    position: fixed;
    inset-inline: 0; top: 0;
    z-index: 50;
    border-bottom: 1px solid transparent;
    background: transparent;
    transition: background .35s, border-color .35s, backdrop-filter .35s;
  }
  .header--scrolled {
    background: rgba(2,6,23,.8);
    border-color: rgba(255,255,255,.06);
    backdrop-filter: blur(16px);
  }

  /* ── Logo ────────────────────────────────────────────────── */
  .logo { text-decoration: none; }
  .logo-text {
    font-family: var(--font-mono);
    font-size: 1.2rem;
    font-weight: 700;
    color: #22d3ee;
    letter-spacing: -.02em;
    transition: color .2s, text-shadow .2s;
  }
  .logo:hover .logo-text {
    color: #67e8f9;
    text-shadow: 0 0 20px rgba(34,211,238,.5);
  }

  /* ── Nav links ───────────────────────────────────────────── */
  .nav-link {
    position: relative;
    font-size: .875rem;
    color: #64748b;
    text-decoration: none;
    padding-bottom: 2px;
    transition: color .2s;
  }
  .nav-link:hover { color: #f1f5f9; }
  .nav-link--active { color: #e2e8f0; }

  .nav-underline {
    position: absolute;
    bottom: -2px; left: 0;
    height: 1.5px;
    width: 0;
    background: #22d3ee;
    border-radius: 2px;
    transition: width .3s cubic-bezier(.16,1,.3,1);
    box-shadow: 0 0 8px rgba(34,211,238,.6);
  }
  .nav-link:hover .nav-underline,
  .nav-link--active .nav-underline { width: 100%; }

  /* ── ⌘K button ───────────────────────────────────────────── */
  .cmd-btn {
    display: flex;
    align-items: center;
    gap: .25rem;
    font-family: var(--font-mono);
    font-size: .7rem;
    color: #ffffff;
    padding: .3rem .6rem;
    border: 1px solid rgba(255,255,255,.07);
    border-radius: .375rem;
    background: transparent;
    cursor: pointer;
    transition: color .2s, border-color .2s, background .2s;
  }
  .cmd-btn:hover {
    color: #94a3b8;
    border-color: rgba(34,211,238,.2);
    background: rgba(34,211,238,.04);
  }
  .cmd-key { font-size: .8rem; }

  /* ── Hamburger ───────────────────────────────────────────── */
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    padding: .5rem;
    background: none;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  @media (min-width: 768px) {
    .hamburger { display: none; }
  }
  .hamburger-bar {
    display: block;
    width: 22px; height: 1.5px;
    background: #94a3b8;
    border-radius: 2px;
    transform-origin: center;
    transition: transform .25s, opacity .25s, background .2s;
  }
  .hamburger:hover .hamburger-bar { background: #f1f5f9; }
  .hamburger-bar:nth-child(1).open { transform: translateY(6.5px) rotate(45deg); }
  .hamburger-bar:nth-child(2).open { opacity: 0; transform: scaleX(0); }
  .hamburger-bar:nth-child(3).open { transform: translateY(-6.5px) rotate(-45deg); }

  /* ── Mobile menu ─────────────────────────────────────────── */
  .mobile-menu {
    border-top: 1px solid rgba(255,255,255,.05);
    background: rgba(2,6,23,.95);
    backdrop-filter: blur(16px);
    padding: .5rem .75rem 1rem;
  }
  .mobile-link {
    display: flex;
    align-items: center;
    gap: .75rem;
    padding: .875rem .5rem;
    font-size: .9375rem;
    color: #64748b;
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,.04);
    transition: color .2s, padding-left .2s;
    animation: mobile-link-in .3s both;
  }
  .mobile-link:last-child { border-bottom: none; }
  .mobile-link:hover, .mobile-link--active {
    color: #f1f5f9;
    padding-left: .75rem;
  }
  @keyframes mobile-link-in {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
</style>
