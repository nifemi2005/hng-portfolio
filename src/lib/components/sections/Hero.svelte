<script lang="ts">
  import { fly, fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { Mail, Download, ArrowDown } from 'lucide-svelte'
  import { profile } from '$lib/data/data'

  let mounted    = $state(false)
  let showName   = $state(false)
  let displayName = $state('')
  let displayRole = $state('')
  let cursorOn   = $state(true)

  const CHARS = '!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%'

  function scramble(target: string, set: (v: string) => void, done?: () => void) {
    const FRAMES = 48
    let frame = 0
    const id = setInterval(() => {
      const resolved = Math.floor((frame / FRAMES) * target.length)
      let out = ''
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') { out += ' '; continue }
        out += i < resolved
          ? target[i]
          : CHARS[Math.floor(Math.random() * CHARS.length)]
      }
      set(out)
      if (++frame > FRAMES) { clearInterval(id); set(target); done?.() }
    }, 28)
  }

  function typewrite(target: string, set: (v: string) => void, done?: () => void, ms = 52) {
    let i = 0
    const id = setInterval(() => {
      set(target.slice(0, ++i))
      if (i >= target.length) { clearInterval(id); done?.() }
    }, ms)
  }

  /* deterministic particles — avoids hydration mismatch */
  const particles = Array.from({ length: 22 }, (_, i) => {
    const seed = (i * 1.618) % 1
    return {
      x:        ((seed * 997)  % 100),
      y:        ((seed * 1433) % 100),
      size:     1 + (i % 3) * 0.8,
      dur:      10 + (i % 7) * 2.5,
      delay:    -((i * 3.7) % 18),
      opacity:  0.08 + (i % 5) * 0.04,
    }
  })

  onMount(() => {
    mounted = true
    showName = true
    setTimeout(() => {
      scramble(profile.name, v => displayName = v, () => {
        setTimeout(() => typewrite(profile.role, v => displayRole = v), 180)
      })
    }, 350)

    const blink = setInterval(() => cursorOn = !cursorOn, 500)
    return () => clearInterval(blink)
  })
</script>

<section id="home" class="relative min-h-screen flex items-center overflow-hidden px-4">

  <!-- ── Floating aurora blobs ─────────────────────────────── -->
  <div class="aurora" aria-hidden="true">
    <div class="blob b1"></div>
    <div class="blob b2"></div>
    <div class="blob b3"></div>
    <div class="blob b4"></div>
    <div class="blob b5"></div>
  </div>

  <!-- ── Animated dot grid ──────────────────────────────────── -->
  <div class="dot-grid" aria-hidden="true"></div>

  <!-- ── Scanline texture ───────────────────────────────────── -->
  <div class="scanline" aria-hidden="true"></div>

  <!-- ── Floating particles ────────────────────────────────── -->
  <div class="particles" aria-hidden="true">
    {#each particles as p}
      <span
        class="particle"
        style="left:{p.x}%;top:{p.y}%;width:{p.size}px;height:{p.size}px;
               opacity:{p.opacity};animation-duration:{p.dur}s;animation-delay:{p.delay}s"
      ></span>
    {/each}
  </div>

  <!-- ── Decorative background word ───────────────────────── -->
  <div class="bg-word" aria-hidden="true">ENGINEER</div>

  <!-- ── Main content ──────────────────────────────────────── -->
  <div class="relative z-10 max-w-6xl w-full mx-auto pt-24 pb-20">
    {#if mounted}

      <!-- Status pill -->
      <div in:fly={{ y: 28, duration: 550, delay: 0 }} class="mb-10">
        <span class="pill">
          <span class="pill-dot"></span>
          Available for opportunities
        </span>
      </div>

      <!-- Name — text scramble -->
      {#if showName}
        <div in:fade={{ duration: 200, delay: 80 }}>
          <h1 class="hero-name">{displayName || ' '}</h1>
        </div>
      {/if}

      <!-- Role — typewriter + cursor -->
      <div in:fly={{ y: 20, duration: 500, delay: 220 }} class="mt-3 mb-5">
        <p class="hero-role">
          <span class="comment">//&nbsp;</span>{displayRole}<span
            class="cursor"
            class:cursor-on={cursorOn}
          >|</span>
        </p>
      </div>

      <!-- Tagline -->
      <p in:fly={{ y: 20, duration: 500, delay: 340 }} class="hero-tagline">
        {profile.tagline}
      </p>

      <!-- CTA buttons -->
      <div in:fly={{ y: 20, duration: 500, delay: 480 }} class="flex flex-wrap gap-4 mb-14">
        <a href="#projects" class="btn-primary">
          See my work
          <span class="btn-arrow">→</span>
        </a>
        <a href={profile.resume} download="Temenu_Oluwanifemi_CV.pdf" class="btn-secondary">
          <Download size={16} />
          Download CV
        </a>
      </div>

      <!-- Social links -->
      <div in:fly={{ y: 20, duration: 500, delay: 620 }} class="flex items-center gap-1">
        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer"
           class="social-btn" aria-label="GitHub profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z"/>
          </svg>
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
           class="social-btn" aria-label="LinkedIn profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href={profile.socials.email} class="social-btn" aria-label="Send email">
          <Mail size={20} />
        </a>

        <div class="w-px h-4 bg-slate-800 mx-3"></div>
        <span class="font-mono text-xs text-slate-700 tracking-widest">
          v{new Date().getFullYear()}.1
        </span>
      </div>

    {/if}
  </div>

  <!-- ── Scroll indicator ───────────────────────────────────── -->
  {#if mounted}
    <div
      in:fade={{ duration: 900, delay: 1500 }}
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600"
    >
      <span class="font-mono text-[10px] tracking-[0.25em] uppercase">scroll</span>
      <ArrowDown size={15} class="animate-bounce" />
    </div>
  {/if}

</section>

<style>
  /* ── Aurora ─────────────────────────────────────────────── */
  .aurora {
    position: absolute; inset: 0; z-index: 0;
    overflow: hidden; pointer-events: none;
  }
  .blob {
    position: absolute; border-radius: 50%;
    animation: blob-float linear infinite;
  }
  .b1 {
    width: 900px; height: 900px;
    background: radial-gradient(circle at center, rgba(6,182,212,.14) 0%, transparent 70%);
    top: 5%; left: 15%;
    filter: blur(100px);
    animation-duration: 22s; animation-delay: 0s;
  }
  .b2 {
    width: 650px; height: 650px;
    background: radial-gradient(circle at center, rgba(124,58,237,.13) 0%, transparent 70%);
    top: 35%; right: 5%;
    filter: blur(90px);
    animation-duration: 28s; animation-delay: -9s;
  }
  .b3 {
    width: 500px; height: 500px;
    background: radial-gradient(circle at center, rgba(59,130,246,.12) 0%, transparent 70%);
    bottom: 10%; left: 35%;
    filter: blur(80px);
    animation-duration: 20s; animation-delay: -5s;
  }
  .b4 {
    width: 350px; height: 350px;
    background: radial-gradient(circle at center, rgba(236,72,153,.09) 0%, transparent 70%);
    top: 65%; left: 8%;
    filter: blur(70px);
    animation-duration: 32s; animation-delay: -14s;
  }
  .b5 {
    width: 280px; height: 280px;
    background: radial-gradient(circle at center, rgba(16,185,129,.08) 0%, transparent 70%);
    top: 20%; right: 30%;
    filter: blur(60px);
    animation-duration: 18s; animation-delay: -7s;
  }

  @keyframes blob-float {
    0%   { transform: translate(0px,   0px)   scale(1);    }
    20%  { transform: translate(35px, -45px)  scale(1.06); }
    40%  { transform: translate(-25px, 30px)  scale(0.94); }
    60%  { transform: translate(45px,  15px)  scale(1.03); }
    80%  { transform: translate(-15px,-35px)  scale(0.97); }
    100% { transform: translate(0px,   0px)   scale(1);    }
  }

  /* ── Dot grid ───────────────────────────────────────────── */
  .dot-grid {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px);
    background-size: 36px 36px;
    animation: grid-drift 80s linear infinite;
  }
  @keyframes grid-drift {
    from { background-position: 0 0; }
    to   { background-position: 36px 36px; }
  }

  /* ── Scanline ────────────────────────────────────────────── */
  .scanline {
    position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px, transparent 2px,
      rgba(0,0,0,.025) 2px, rgba(0,0,0,.025) 4px
    );
  }

  /* ── Particles ───────────────────────────────────────────── */
  .particles { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
  .particle {
    position: absolute;
    border-radius: 50%;
    background: #22d3ee;
    animation: particle-rise linear infinite;
  }
  @keyframes particle-rise {
    0%   { transform: translateY(0)    scale(1);   opacity: inherit; }
    50%  { opacity: calc(inherit * 1.8); }
    100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
  }

  /* ── Background word ─────────────────────────────────────── */
  .bg-word {
    position: absolute; right: -1rem; top: 50%;
    transform: translateY(-50%) rotate(90deg);
    font-size: clamp(5rem, 14vw, 13rem);
    font-weight: 900; letter-spacing: .25em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,.035);
    pointer-events: none; user-select: none;
    white-space: nowrap; z-index: 0;
    animation: word-pulse 8s ease-in-out infinite;
  }
  @keyframes word-pulse {
    0%,100% { -webkit-text-stroke-color: rgba(255,255,255,.035); }
    50%     { -webkit-text-stroke-color: rgba(34,211,238,.06); }
  }

  /* ── Status pill ─────────────────────────────────────────── */
  .pill {
    display: inline-flex; align-items: center; gap: .5rem;
    font-family: var(--font-mono); font-size: .75rem;
    color: #22d3ee;
    padding: .375rem 1rem; border-radius: 9999px;
    border: 1px solid rgba(34,211,238,.22);
    background: rgba(34,211,238,.04);
    animation: pill-glow 3.5s ease-in-out infinite;
  }
  .pill-dot {
    display: inline-block; width: 6px; height: 6px;
    border-radius: 50%; background: #22d3ee; flex-shrink: 0;
    animation: dot-pulse 2s ease-in-out infinite;
  }
  @keyframes pill-glow {
    0%,100% { box-shadow: 0 0 12px rgba(34,211,238,.08), 0 0 0 0 rgba(34,211,238,.06); }
    50%     { box-shadow: 0 0 28px rgba(34,211,238,.2),  0 0 0 8px rgba(34,211,238,0); }
  }
  @keyframes dot-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,211,238,.6); }
    50%     { box-shadow: 0 0 0 5px rgba(34,211,238,0); }
  }

  /* ── Hero name ───────────────────────────────────────────── */
  .hero-name {
    font-size: clamp(2.8rem, 9vw, 8rem);
    font-weight: 900;
    letter-spacing: -.03em;
    line-height: 1.0;
    margin-bottom: .25rem;
    background: linear-gradient(
      160deg,
      #ffffff  0%,
      #e2e8f0 45%,
      rgba(255,255,255,.35) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    animation: name-shimmer 6s ease infinite;
    font-variant-numeric: tabular-nums;
  }
  @keyframes name-shimmer {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
  }

  /* ── Role + cursor ───────────────────────────────────────── */
  .hero-role {
    font-family: var(--font-mono);
    font-size: clamp(.95rem, 2.2vw, 1.35rem);
    color: #22d3ee;
    letter-spacing: .02em;
  }
  .comment { color: rgba(255,255,255,.18); user-select: none; }
  .cursor {
    display: inline-block;
    color: #22d3ee;
    font-weight: 100;
    opacity: 0;
    transition: opacity .08s;
  }
  .cursor-on { opacity: 1; }

  /* ── Tagline ─────────────────────────────────────────────── */
  .hero-tagline {
    font-size: clamp(.95rem, 1.7vw, 1.15rem);
    color: #94a3b8;
    max-width: 38rem;
    line-height: 1.75;
    margin-bottom: 2.5rem;
  }

  /* ── CTA buttons ─────────────────────────────────────────── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .75rem 1.75rem;
    background: #22d3ee; color: #020617;
    font-weight: 700; font-size: .875rem;
    border-radius: .5rem; text-decoration: none;
    position: relative; overflow: hidden;
    transition: transform .2s, box-shadow .2s;
  }
  .btn-primary::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.25) 0%, transparent 60%);
    opacity: 0; transition: opacity .25s;
  }
  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 40px rgba(34,211,238,.45), 0 12px 24px rgba(0,0,0,.35);
  }
  .btn-primary:hover::after { opacity: 1; }
  .btn-primary:active { transform: scale(.97); }

  .btn-arrow { transition: transform .2s; display: inline-block; }
  .btn-primary:hover .btn-arrow { transform: translateX(5px); }

  .btn-secondary {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .75rem 1.75rem;
    border: 1px solid rgba(255,255,255,.1);
    color: #cbd5e1; font-size: .875rem;
    border-radius: .5rem; text-decoration: none;
    background: rgba(255,255,255,.025);
    backdrop-filter: blur(6px);
    transition: border-color .25s, color .25s, transform .2s, box-shadow .25s;
  }
  .btn-secondary:hover {
    border-color: rgba(34,211,238,.45);
    color: #f1f5f9;
    transform: translateY(-3px);
    box-shadow: 0 0 24px rgba(34,211,238,.12), 0 8px 20px rgba(0,0,0,.25);
  }
  .btn-secondary:active { transform: scale(.97); }

  /* ── Social buttons ──────────────────────────────────────── */
  .social-btn {
    padding: .6rem; color: #475569;
    border-radius: .5rem; text-decoration: none;
    display: flex; align-items: center; justify-content: center;
    transition: color .2s, background .2s, transform .2s;
  }
  .social-btn:hover {
    color: #f1f5f9;
    background: rgba(255,255,255,.06);
    transform: translateY(-3px);
  }
</style>
