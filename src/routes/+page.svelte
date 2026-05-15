<script lang="ts">
  import Nav from '$lib/components/Nav.svelte'
  import Hero from '$lib/components/sections/Hero.svelte'
  import Projects from '$lib/components/sections/Projects.svelte'
  import About from '$lib/components/sections/About.svelte'
  import Contact from '$lib/components/sections/Contact.svelte'
  import CommandPalette from '$lib/components/CommandPalette.svelte'
</script>

<Nav />
<main id="main-content">
  <Hero />
  <Projects />
  <About />
  <Contact />
</main>
<CommandPalette />