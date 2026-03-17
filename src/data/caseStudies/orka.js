export const orka = {
  title: 'Orka',
  tagline: 'Orchestrate natural language into connected AI agent workflows.',
  category: 'AI Product Design & Development',
  heroImage: '/images/orka/workflow-generated.png',
  accentColor: '#10b981',
  role: 'Designer & Developer',
  timeline: '2025',
  tools: ['React', 'TypeScript', 'Tailwind CSS', 'Anthropic SDK', 'Vite'],
  prototypeUrl: '/projects/orka/',

  problem: {
    headline: 'Building AI agents is powerful — but the setup is a wall.',
    body: "Most teams that could benefit from AI automation are blocked before they start. Connecting triggers, conditions, memory, and actions across a live system requires writing code, understanding APIs, and debugging invisible state. Orka removes that wall — you describe what you want your agent to do, and it builds the workflow for you. Then you iterate in plain language until it's exactly right.",
  },

  features: [
    // ── Feature 1: Dashboard (FeatureSection) ─────────────────────────────
    {
      label: 'Workflow Builder',
      headline: 'Build AI-powered workflows that think, decide, and act.',
      body: 'Turn real events into intelligent flows. Start with a trigger, layer in AI and logic, and connect actions across your tools—everything runs as a coordinated system.',
      image: '/images/orka/dashboard.png',
      imagePosition: 'right',
    },

    // ── Feature 2: AI Workflow Generation (Highlight) ──────────────────────
    {
      label: 'AI Workflow Generation',
      headline: 'From idea to functional agent.',
      body: "Type a prompt — 'monitor brand mentions and alert the team when sentiment drops' — and Orka generates a complete multi-step agent: trigger, AI analysis node, memory store, condition branch, and output actions. The workflow streams into view in real time so you can follow the thinking as it builds.",
      image: '/images/orka/workflow-generated.png',
      imagePosition: 'right',
      highlight: true,
      highlights: [
        { name: 'Natural language input', description: 'Describe your automation goal in plain English — no schema, no config file, no code required.' },
        { name: 'Streaming build', description: 'The workflow assembles node-by-node in real time, giving you a live preview as the agent is constructed.' },
        { name: 'Smart node selection', description: 'Orka picks the right node types — trigger, AI, condition, memory, delay, action — based on your intent.' },
        { name: 'Auto-layout', description: 'Nodes are placed and connected automatically with a depth-aware layout algorithm — no manual positioning.' },
        { name: 'Pre-built templates', description: 'Six curated starting workflows cover the most common agent patterns: social, sales, support, research, meetings, and e-commerce.' },
        { name: 'Claude-powered', description: 'Every AI node in the workflow represents a real Claude API call — the architecture reflects what production deployment would look like.' },
      ],
    },

    // ── Feature 3: Visual Node Editor (FeatureSection) ────────────────────
    {
      label: 'Visual Node Editor',
      headline: 'See your agent. Click anything to configure it.',
      body: 'Every generated workflow renders as an interactive node canvas. Nodes are color-coded by type — triggers, AI steps, conditions, memory, delays, and actions — and connected with animated flow lines. Click any node to inspect or edit its configuration. The structure makes complex multi-step logic readable at a glance.',
      image: '/images/orka/node-config.png',
      imagePosition: 'left',
    },

    // ── Feature 4: Three Views — Intent, Logic, Graph (Split) ─────────────
    {
      label: 'Three Views. One Agent.',
      headline: 'Switch perspectives without losing context.',
      body: "Every workflow has three views you can switch between freely. Graph shows the interactive node canvas. Logic gives you a clean linear list — ideal for reviewing the execution order. Intent surfaces the plain-language goal, trigger, and output summary so any team member can understand what the agent does without reading the nodes.",
      image: '/images/orka/intent-view.png',
      imagePosition: 'right',
      split: true,
      highlights: [
        { name: 'Intent view.', description: "Plain-language summary of the agent's goal, trigger condition, and expected output — readable by anyone on the team." },
        { name: 'Logic view.', description: 'A linear, scrollable list of every step in execution order — color-coded by type with descriptions.' },
        { name: 'Graph view.', description: 'The full interactive canvas — drag, zoom, connect, and configure nodes visually.' },
      ],
    },

    // ── Feature 5: Conversational Editing (FeatureSection) ────────────────
    {
      label: 'Conversational Editing',
      headline: 'Modify in plain language. The agent updates live.',
      body: "Once a workflow is live, you refine it the same way you built it — by talking to it. 'Add a one-hour delay before the email step.' 'Include a Slack notification at the end.' 'Add an if/else branch based on the AI score.' Orka parses the instruction, applies the structural change, and streams the updated workflow back — no drag-and-drop required.",
      image: '/images/orka/logic-view.png',
      imagePosition: 'left',
    },

    // ── Feature 6: Test Run (FeatureSection) ──────────────────────────────
    {
      label: 'Test Run',
      headline: 'Run it. See every step. Ship with confidence.',
      body: "Hit Test Run and Orka executes your entire workflow with mock data — stepping through every node in order, showing the output and latency for each one. The graph updates live as nodes complete. When it's done, hit Visualize to replay the full execution as an animated walkthrough.",
      image: '/images/orka/test-run.png',
      imagePosition: 'right',
    },
  ],

  gallery: [
    { src: '/images/orka/dashboard.png',          alt: 'Agent dashboard — manage and monitor all AI agents' },
    { src: '/images/orka/workflow-builder.png',   alt: 'Workflow builder — empty canvas with prompt input' },
    { src: '/images/orka/workflow-generated.png', alt: 'Generated workflow — Brand Monitor with 7 nodes' },
    { src: '/images/orka/intent-view.png',        alt: 'Intent view — plain-language goal and trigger summary' },
    { src: '/images/orka/logic-view.png',         alt: 'Logic view — linear execution order with node types' },
    { src: '/images/orka/node-config.png',        alt: 'Node config panel — Twitter/X Monitor trigger settings' },
    { src: '/images/orka/test-run.png',           alt: 'Test run panel — live execution with step outputs' },
    { src: '/images/orka/sim-modal.png',          alt: 'Test run completed — all 7 steps with outputs' },
  ],

  stats: [
    { value: '6',  label: 'Node types',           description: 'Trigger, AI, condition, memory, delay, and action' },
    { value: '6',  label: 'Pre-built templates',  description: 'Social, sales, support, research, meetings, e-commerce' },
    { value: 'AI', label: 'Powered by Claude',    description: 'Every AI node maps to a real Anthropic API call' },
  ],
}
