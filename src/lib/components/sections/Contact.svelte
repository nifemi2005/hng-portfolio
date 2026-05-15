<script lang="ts">
  import { reveal } from '$lib/utils/reveal'
  import { Send } from 'lucide-svelte'

  let form   = $state({ name: '', email: '', message: '' })
  let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle')
  const ENDPOINT = 'https://formspree.io/f/xjglqjbe'

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    status = 'loading'
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      status = res.ok ? 'success' : 'error'
      if (res.ok) form = { name: '', email: '', message: '' }
    } catch {
      status = 'error'
    }
  }
</script>

<section id="contact" class="px-4 py-24 pb-32 relative overflow-hidden">

  <!-- Background glow -->
  <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-100
              bg-cyan-500/4 blur-[130px] rounded-full pointer-events-none" aria-hidden="true"></div>

  <div class="mx-auto max-w-2xl relative z-10">

    <!-- Section header -->
    <div use:reveal class="mb-3">
      <span class="section-label">04 / contact</span>
    </div>
    <h2 use:reveal={{ delay: 100 }} class="section-heading">Let's work together</h2>
    <p use:reveal={{ delay: 200 }} class="mt-6 mb-10 leading-relaxed text-slate-400">
      Have a project in mind or want to chat? I'm open to new opportunities — drop me a
      message and I'll get back to you.
    </p>

    {#if status === 'success'}
      <div class="success-card">
        <div class="success-icon" aria-hidden="true">✓</div>
        <p class="text-lg font-semibold text-cyan-400 mb-1">Message sent!</p>
        <p class="text-sm text-slate-500">I'll get back to you as soon as possible.</p>
        <button
          onclick={() => (status = 'idle')}
          class="mt-5 font-mono text-xs text-slate-600 hover:text-slate-400 transition-colors"
        >
          Send another →
        </button>
      </div>

    {:else}
      <form use:reveal={{ delay: 300 }} onsubmit={handleSubmit} class="space-y-5" novalidate>

        <div class="grid gap-5 sm:grid-cols-2">
          <div class="field-group">
            <label for="name" class="field-label">Name</label>
            <input id="name" type="text" bind:value={form.name}
              required placeholder="Your name" class="field-input" />
          </div>
          <div class="field-group">
            <label for="email" class="field-label">Email</label>
            <input id="email" type="email" bind:value={form.email}
              required placeholder="you@email.com" class="field-input" />
          </div>
        </div>

        <div class="field-group">
          <label for="message" class="field-label">Message</label>
          <textarea id="message" bind:value={form.message}
            required rows={5} placeholder="Tell me about your project…"
            class="field-input resize-none"></textarea>
        </div>

        {#if status === 'error'}
          <p class="font-mono text-sm text-red-400 flex items-center gap-2">
            <span aria-hidden="true">⚠</span>
            Something went wrong. Try again or email me directly.
          </p>
        {/if}

        <button type="submit" disabled={status === 'loading'} class="submit-btn">
          {#if status === 'loading'}
            <span class="spinner" aria-hidden="true"></span>
            Sending…
          {:else}
            <Send size={15} />
            Send Message
          {/if}
        </button>

      </form>
    {/if}

    <!-- Footer -->
    <div use:reveal={{ delay: 400 }}
         class="mt-20 flex flex-col items-center justify-between gap-3
                border-t border-slate-800/50 pt-6
                font-mono text-xs text-slate-700 sm:flex-row">
      <span>© {new Date().getFullYear()} Temenu Oluwanifemi</span>
      <span>Built with SvelteKit + TailwindCSS</span>
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

  /* Form fields */
  .field-group { display: flex; flex-direction: column; gap: .4rem; }
  .field-label {
    font-family: var(--font-mono);
    font-size: .68rem;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: .12em;
  }
  .field-input {
    width: 100%;
    padding: .75rem 1rem;
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: .5rem;
    font-size: .875rem;
    color: #f1f5f9;
    outline: none;
    transition: border-color .25s, background .25s, box-shadow .25s;
  }
  .field-input::placeholder { color: #334155; }
  .field-input:hover { border-color: rgba(255,255,255,.12); }
  .field-input:focus {
    border-color: rgba(34,211,238,.4);
    background: rgba(34,211,238,.03);
    box-shadow: 0 0 0 3px rgba(34,211,238,.08), 0 0 20px rgba(34,211,238,.06);
  }

  /* Submit button */
  .submit-btn {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    padding: .75rem 2rem;
    background: #22d3ee;
    color: #020617;
    font-weight: 700;
    font-size: .875rem;
    border-radius: .5rem;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform .2s, box-shadow .2s, background .2s;
  }
  .submit-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.2) 0%, transparent 60%);
    opacity: 0;
    transition: opacity .25s;
  }
  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(34,211,238,.4), 0 8px 20px rgba(0,0,0,.3);
  }
  .submit-btn:hover:not(:disabled)::after { opacity: 1; }
  .submit-btn:active:not(:disabled) { transform: scale(.97); }
  .submit-btn:disabled { opacity: .55; cursor: not-allowed; }

  /* Loading spinner */
  .spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid rgba(2,6,23,.3);
    border-top-color: #020617;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Success card */
  .success-card {
    text-align: center;
    padding: 3rem 2rem;
    border: 1px solid rgba(34,211,238,.2);
    background: rgba(34,211,238,.03);
    border-radius: .75rem;
    animation: success-in .5s cubic-bezier(.16,1,.3,1);
  }
  @keyframes success-in {
    from { opacity: 0; transform: scale(.95) translateY(10px); }
    to   { opacity: 1; transform: scale(1)   translateY(0); }
  }
  .success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem; height: 3rem;
    border-radius: 50%;
    background: rgba(34,211,238,.1);
    border: 1px solid rgba(34,211,238,.3);
    color: #22d3ee;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    animation: success-pop .6s .1s cubic-bezier(.16,1,.3,1) both;
  }
  @keyframes success-pop {
    from { transform: scale(0); }
    to   { transform: scale(1); }
  }
</style>
