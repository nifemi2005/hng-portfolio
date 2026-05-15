<script lang="ts">
	import { reveal } from '$lib/utils/reveal';
	let form = $state({ name: '', email: '', message: '' });
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	const ENDPOINT = 'https://formspree.io/f/xjglqjbe';

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		status = 'loading';
		try {
			const res = await fetch(ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify(form)
			});
			status = res.ok ? 'success' : 'error';
			if (res.ok) form = { name: '', email: '', message: '' };
		} catch {
			status = 'error';
		}
	}
</script>

<section id="contact" class="px-4 py-24 pb-32">
	<div class="mx-auto max-w-2xl">
		<div use:reveal class="mb-4">
			<span class="font-mono text-xs tracking-widest text-cyan-400 uppercase">04 / contact</span>
		</div>
		<h2 use:reveal={{ delay: 100 }} class="mb-4 text-3xl font-bold text-white sm:text-4xl">Let's work together</h2>
		<p use:reveal={{ delay: 200 }} class="mb-10 leading-relaxed text-slate-400">
			Have a project in mind or want to chat? I'm open to new opportunities — drop me a message and
			I'll get back to you.
		</p>

		{#if status === 'success'}
			<div class="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-8 text-center">
				<p class="mb-1 text-lg font-semibold text-cyan-400">Message sent ✓</p>
				<p class="text-sm text-slate-500">I'll get back to you as soon as possible.</p>
				<button
					onclick={() => (status = 'idle')}
					class="mt-4 font-mono text-xs text-slate-600 transition-colors hover:text-slate-400"
				>
					Send another →
				</button>
			</div>
		{:else}
			<form use:reveal={{ delay: 300 }} onsubmit={handleSubmit} class="space-y-5" novalidate>
				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label
							for="name"
							class="mb-2 block font-mono text-[11px] tracking-widest text-slate-600 uppercase"
							>Name</label
						>
						<input
							id="name"
							type="text"
							bind:value={form.name}
							required
							placeholder="Your name"
							class="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm
                       text-slate-100 placeholder-slate-700 transition-all
                       focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 focus:outline-none"
						/>
					</div>
					<div>
						<label
							for="email"
							class="mb-2 block font-mono text-[11px] tracking-widest text-slate-600 uppercase"
							>Email</label
						>
						<input
							id="email"
							type="email"
							bind:value={form.email}
							required
							placeholder="you@email.com"
							class="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm
                       text-slate-100 placeholder-slate-700 transition-all
                       focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 focus:outline-none"
						/>
					</div>
				</div>

				<div>
					<label
						for="message"
						class="mb-2 block font-mono text-[11px] tracking-widest text-slate-600 uppercase"
						>Message</label
					>
					<textarea
						id="message"
						bind:value={form.message}
						required
						rows={5}
						placeholder="Tell me about your project…"
						class="w-full resize-none rounded-lg border border-slate-800 bg-slate-900 px-4 py-3
                     text-sm text-slate-100 placeholder-slate-700
                     transition-all focus:border-cyan-400/50 focus:ring-1
                     focus:ring-cyan-400/20 focus:outline-none"
					></textarea>
				</div>

				{#if status === 'error'}
					<p class="font-mono text-sm text-red-400">
						Something went wrong. Try again or email directly.
					</p>
				{/if}

				<button
					type="submit"
					disabled={status === 'loading'}
					class="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-8 py-3
                   text-sm font-semibold text-slate-950 transition-all
                   hover:bg-cyan-300 active:scale-95
                   disabled:cursor-not-allowed disabled:opacity-50"
				>
					{status === 'loading' ? 'Sending…' : 'Send Message'}
				</button>
			</form>
		{/if}

		<!-- Footer -->
		<div
			class="mt-20 flex flex-col items-center justify-between gap-3 border-t border-slate-800/50 pt-6 font-mono text-xs text-slate-700 sm:flex-row"
		>
			<span>© {new Date().getFullYear()} Temenu Oluwanifemi</span>
			<span>Built with SvelteKit + TailwindCSS</span>
		</div>
	</div>
</section>
