export function reveal(node: HTMLElement, { delay = 0 }: { delay?: number } = {}) {
    if (typeof window === 'undefined') return {}
  
    // Respect the user's motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return {}
  
    node.classList.add('before-reveal')
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        node.style.transitionDelay = `${delay}ms`
        node.classList.remove('before-reveal')
        node.classList.add('after-reveal')
        observer.disconnect()
      },
      { threshold: 0.12 },
    )
  
    observer.observe(node)
  
    return { destroy: () => observer.disconnect() }
  }