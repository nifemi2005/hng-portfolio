<script lang="ts">
	import '../app.css'
	import '@fontsource-variable/inter'
	import '@fontsource-variable/jetbrains-mono'
	import { commandPaletteOpen } from '$lib/stores/commandPalette'
	import ScrollToTop from '$lib/components/ScrollToTop.svelte'
  
	let { children } = $props()
  
	// Replace with your actual deployed URL before submitting
	const siteUrl = 'https://your-portfolio.vercel.app'
  
	function handleGlobalKey(e: KeyboardEvent) {
	  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
		e.preventDefault()
		commandPaletteOpen.update((v) => !v)
	  }
	}
  </script>
  
  <svelte:window onkeydown={handleGlobalKey} />
  
  <svelte:head>
	<title>Temenu Oluwanifemi — Frontend Engineer</title>
	<meta name="description" content="Frontend engineer building fast, interactive, and visually compelling web experiences." />
  
	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:title" content="Temenu Oluwanifemi — Frontend Engineer" />
	<meta property="og:description" content="Frontend engineer building fast, interactive, and visually compelling web experiences." />
  
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Temenu Oluwanifemi — Frontend Engineer" />
	<meta name="twitter:description" content="Frontend engineer building fast, interactive web experiences." />
  
	<!-- Canonical -->
	<link rel="canonical" href={siteUrl} />
  </svelte:head>
  
  <!-- Skip nav link — invisible unless focused by keyboard -->
  <a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
		   focus:px-4 focus:py-2 focus:bg-cyan-400 focus:text-slate-950 focus:font-semibold
		   focus:text-sm focus:rounded-lg"
  >
	Skip to content
  </a>
  
  <div class="dark min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
	{@render children?.()}
	<ScrollToTop />
  </div>