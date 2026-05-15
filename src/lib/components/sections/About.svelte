<script lang="ts">
	import { skills } from '$lib/data/skills';
	import { reveal } from '$lib/utils/reveal'
	const categories = [...new Set(skills.map((s) => s.category))];
	const current = ['Vue 3', 'React', 'TypeScript', 'Svelte', 'Tailwind CSS', 'Node.js'];
</script>

<section id="about" class="px-4 py-24">
	<div class="mx-auto max-w-6xl">
		<div use:reveal class="mb-4">
			<span class="font-mono text-xs tracking-widest text-cyan-400 uppercase">03 / about</span>
		</div>
		<h2 use:reveal={{ delay: 100 }} class="mb-12 text-3xl font-bold text-white sm:text-4xl">About Me</h2>

		<div use:reveal={{ delay: 200 }} class="grid gap-12 lg:grid-cols-2 lg:gap-20">
			<!-- Bio -->
			<div class="space-y-4 text-[15px] leading-relaxed text-slate-300">
				<p>
					I'm <span class="font-medium text-white">Temenu Oluwanifemi</span>, a frontend engineer
					who cares deeply about the craft. I build interfaces that are fast, accessible, and feel
					intentional — not just functional.
				</p>
				<p>
					<!-- Replace with your own story -->
					My work sits at the intersection of design and engineering. I obsess over the small details
					— transitions, micro-interactions, performance — because that's what separates good products
					from great ones.
				</p>
				<p>
					I've shipped Chrome extensions, real-time dashboards, and encrypted messaging apps. I'm
					always looking for the next hard problem worth solving.
				</p>

				<div class="pt-2">
					<p class="mb-3 font-mono text-sm text-slate-600">// currently working with</p>
					<div class="flex flex-wrap gap-x-5 gap-y-2">
						{#each current as tech (tech)}
							<span class="flex items-center gap-2 text-sm text-slate-400">
								<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"></span>
								{tech}
							</span>
						{/each}
					</div>
				</div>
			</div>

			<!-- Skills -->
			<div>
				<p class="mb-6 font-mono text-xs tracking-widest text-slate-600 uppercase">Tech & Tools</p>
				<div class="space-y-6">
					{#each categories as category (category)}
						<div use:reveal>
							<p class="mb-2.5 font-mono text-[10px] tracking-widest text-slate-700 uppercase">
								{category}
							</p>
							<div class="flex flex-wrap gap-2">
								{#each skills.filter((s) => s.category === category) as skill (skill.name)}
									<span
										class="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-sm
                             text-slate-400 transition-all hover:border-cyan-500/30 hover:text-white"
									>
										{skill.name}
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
