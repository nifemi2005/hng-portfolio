<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Menu, X } from 'lucide-svelte';
	import { commandPaletteOpen } from '$lib/stores/commandPalette';
	import { resolve } from '$app/paths';

	let menuOpen = $state(false);

	const links = [
		{ label: 'Work', href: '#projects' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', href: '#contact' }
	];
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
		<a
			href={resolve('/')}
			class="font-mono text-xl font-bold tracking-tight text-cyan-400 transition-colors hover:text-cyan-300"
		>
			TO.
		</a>

		<nav class="hidden items-center gap-8 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="group relative text-sm text-slate-400 transition-colors hover:text-slate-100"
				>
					{link.label}
					<span
						class="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"
					></span>
				</a>
			{/each}
		</nav>

		<button
			onclick={() => commandPaletteOpen.update((v) => !v)}
			class="ml-4 hidden items-center gap-1.5 border-l border-slate-800 pl-4 font-mono
         text-xs text-slate-600 transition-colors hover:text-slate-400 md:flex"
			aria-label="Open command palette"
		>
			<span>⌘K</span>
		</button>

		<button
			onclick={() => (menuOpen = !menuOpen)}
			class="-mr-2 p-2 text-slate-400 transition-colors hover:text-slate-100 md:hidden"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
		>
			{#if menuOpen}
				<X size={20} />
			{:else}
				<Menu size={20} />
			{/if}
		</button>
	</div>

	{#if menuOpen}
		<div
			transition:slide={{ duration: 200 }}
			class="border-t border-white/5 bg-slate-950 px-4 pb-4 md:hidden"
		>
			{#each links as link (link.href)}
				<a
					href={link.href}
					onclick={() => (menuOpen = false)}
					class="flex border-b border-white/5 py-3 text-sm text-slate-400 transition-colors last:border-0 hover:text-slate-100"
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</header>
