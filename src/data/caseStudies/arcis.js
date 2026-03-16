export const arcis = {
  title: 'Arcis Golf',
  tagline: 'A design system built to unify 88 clubs under one visual language',
  category: 'Design System & UI Kit',
  heroImage: '/images/arcis/templates/dark/classic.png',
  accentColor: '#c8a96e',
  role: 'UI Designer & Developer',
  timeline: '2025',
  tools: ['React', 'Tailwind CSS', 'Vite', 'Figma'],
  prototypeUrl: '/projects/arcis/',

  problem: {
    headline: 'Arcis needed a system — not just a new look.',
    body: "Arcis Golf operates 88 private, resort, and daily-fee golf courses across the United States. Each property had its own identity, yet all shared a need for consistent, high-quality digital touchpoints. The existing approach — one-off designs per property — was slow, inconsistent, and impossible to maintain at scale. The challenge was building a flexible design system that could express each club's personality while keeping the entire portfolio on-brand, and empowering teams to make real edits without touching code.",
  },

  features: [
    // ── Feature 1: Component Library (Highlight) ──────────────────────────
    {
      label: 'Component Library',
      headline: 'Every section. Every variant.',
      body: 'Built a comprehensive UI kit of 15+ section types — heroes, galleries, event grids, membership pricing, pro shop, weather widgets, contact forms, and more — each with multiple fully responsive layout variants. Every component is theme-aware and ships ready to compose.',
      image: '/images/arcis/templates/dark/luxury-estate.png',
      imagePosition: 'right',
      highlight: true,
      highlights: [
        { name: '15+ section types', description: 'Heroes, galleries, event grids, membership pricing, pro shop, weather, contact forms, and more.' },
        { name: 'Multiple layout variants', description: 'Each section ships with 3–6 distinct variants — full bleed, split, overlay, minimal, and more.' },
        { name: 'Fully responsive', description: 'Every component adapts from 390px mobile to full desktop — layout, spacing, and typography all fluid.' },
        { name: 'Dark & light modes', description: 'Components adapt contrast, surface tone, and overlays automatically to any theme or mode.' },
        { name: 'Data-driven props', description: 'All configuration is expressed as plain JSON — variant, content, and layout are fully serializable.' },
        { name: 'Live viewport preview', description: 'An interactive simulator lets you preview every component at desktop, tablet, and mobile widths.' },
      ],
    },

    // ── Feature 2: Page Configurator (Split with live embed) ──────────────
    {
      label: 'Page Configurator',
      headline: 'Drag, drop, and preview in real time.',
      body: 'A visual page builder lets teams compose full homepages without writing a line of code — choosing from curated templates, reordering sections via drag and drop, toggling visibility, swapping variants, and previewing the result at any viewport width.',
      image: '/images/arcis/templates/dark/resort.png',
      imagePosition: 'left',
      split: true,
      highlights: [
        { name: 'Template-first workflow.', description: 'Start from six curated homepage templates, each assembled from the component library with real, production-ready defaults.' },
        { name: 'Drag-and-drop reordering.', description: 'Reorder any section with a grip handle. The live preview updates immediately — no save step.' },
        { name: 'Add-section modal.', description: 'Browse all 15+ section types with scaled live previews of every variant before committing.' },
      ],
    },

    // ── Feature 3: Theming Engine (Bento) ────────────────────────────────
    {
      label: 'Theming Engine',
      headline: "One system. Every club's identity.",
      body: 'A CSS custom property–based theming engine supports multiple named color themes — each reflecting a distinct club personality — all switchable at runtime without a page reload. Every component inherits the active theme automatically.',
      bento: true,
      bentoTiles: [
        {
          image: '/images/arcis/bento-augusta-theme.png',
          imageClass: 'object-top',
          label: 'Section Library',
          title: 'Every section type, ready to drop in',
          body: '15+ curated section types — heroes, galleries, event grids, membership tiers, and more — each with multiple layout variants, all browsable in a live preview modal.',
          colSpan: 'lg:col-span-4',
          roundedExtra: 'max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]',
        },
        {
          image: '/images/arcis/bento-component-library.png',
          imageClass: 'object-bottom',
          label: 'Design Tokens',
          title: 'CSS custom properties, all the way down',
          body: 'Every color, surface, and accent is a named token. Swap themes at the root and every component updates instantly — no code change required.',
          colSpan: 'lg:col-span-2',
          roundedExtra: 'lg:rounded-tr-[2rem]',
        },
        {
          image: '/images/arcis/bento-responsive-preview.png',
          imageClass: 'object-top',
          label: 'Theme Switcher',
          title: 'Five club identities, one codebase',
          body: 'Augusta, Bordeaux, Coastal, Desert Ridge, and Links — each a distinct personality. Preview any theme at any viewport width without leaving the builder.',
          colSpan: 'lg:col-span-2',
          roundedExtra: 'lg:rounded-bl-[2rem]',
        },
        {
          video: '/videos/arcis-responsive-preview.mp4',
          label: 'Responsive Preview',
          title: 'Preview at any width, instantly',
          body: 'Toggle between desktop, tablet, and mobile — the live canvas reflows in real time so teams can validate layouts before a single line of code ships.',
          colSpan: 'lg:col-span-4',
          roundedExtra: 'max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]',
        },
      ],
    },
  ],

  gallery: [
    { src: '/images/arcis/templates/dark/luxury-estate.png', alt: 'Luxury Estate template — dark theme' },
    { src: '/images/arcis/templates/dark/classic.png',       alt: 'Classic Club template — dark theme' },
    { src: '/images/arcis/templates/dark/resort.png',        alt: 'Resort template — dark theme' },
    { src: '/images/arcis/templates/dark/pro-shop.png',      alt: 'Pro Shop template — dark theme' },
    { src: '/images/arcis/templates/dark/tournament.png',    alt: 'Tournament template — dark theme' },
    { src: '/images/arcis/templates/dark/membership.png',    alt: 'Membership template — dark theme' },
  ],

  stats: [
    { value: '88',  label: 'Club properties', description: 'Private, resort, and daily-fee courses across the US' },
    { value: '15+', label: 'Section types',   description: 'Each with 3–6 distinct layout variants' },
    { value: '6',   label: 'Page templates',  description: 'Curated starting points, ready to configure and deploy' },
  ],
}
