export const orka = {
  title: 'Orka',
  tagline: 'Orchestrate natural language into connected AI agent workflows.',
  category: 'AI Product Design & Development',
  heroImage: '/images/orka/v2-generated.png',
  accentColor: '#34d399',
  role: 'Designer & Developer',
  timeline: '2025–2026',
  tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  prototypeUrl: '/projects/orka/',

  problem: {
    headline: 'Building AI agents is powerful — but the setup is a wall.',
    body: "Most teams that could benefit from AI automation are blocked before they start. Connecting triggers, conditions, memory, and actions across a live system requires writing code, understanding APIs, and debugging invisible state. Orka removes that wall — you describe what you want your agent to do, and it builds the workflow for you. Then you iterate in plain language until it's exactly right.",
  },

  features: [
    // ── Feature 1: Dashboard (Screenshot) ─────────────────────────────────
    {
      label: 'Agent Dashboard',
      headline: 'Every agent, at a glance.',
      body: 'The dashboard is home base: how many agents are live, what ran today and how reliably. Each agent card shows its status, what it does, its run history and when it last ran. Open any one to land straight in its workflow, or start a new agent from a single button.',
      image: '/images/orka/v2-dashboard.png',
      imagePosition: 'right',
      screenshot: true,
    },

    // ── Feature 2: Prompt-first generation (Highlight) ─────────────────────
    {
      label: 'Describe It, Watch It Build',
      headline: 'From one sentence to a working agent.',
      body: "The builder opens on a single question: what should your agent do? Type 'monitor brand mentions and alert the team when sentiment drops' and Orka assembles the agent step by step — trigger, AI analysis, memory, condition branch, actions — while the assistant explains each choice in plain language as it lands on the canvas. The bar for intuitiveness was a widget builder: one prompt box to start, real examples one click away, every view in sync.",
      image: '/images/orka/v2-entry.png',
      imagePosition: 'right',
      highlight: true,
      highlights: [
        { name: 'Prompt first', description: 'One box to start. Templates and a blank canvas are there when you want them, and the tool library stays tucked away until a graph exists.' },
        { name: 'Narrated build', description: 'Steps appear one at a time in flow order, and the assistant adds a one-line reason for each, so you can follow the thinking.' },
        { name: 'Auto-layout', description: 'A layered top-to-bottom layout places every step and keeps side inputs like memory beside the step that uses them, so links never hide behind nodes.' },
        { name: 'One source of truth', description: 'Every agent is a single spec of steps and typed links. The Graph, Logic and Intent views are all drawn from it, so they can never drift apart.' },
        { name: 'Real examples', description: 'Four scripted agents cover monitoring, support routing, research briefings and lead scoring, each with its own refinements and test data.' },
        { name: 'Honest prototype', description: 'Generation is scripted so every visitor sees the same fast flow, and the assistant says which example it built from. Each AI step is modelled on a Claude call.' },
      ],
    },

    // ── Feature 3: Visual Node Editor (Split) ─────────────────────────────
    {
      label: 'Visual Node Editor',
      headline: 'See your agent. Click anything to configure it.',
      body: 'Every agent renders as a node canvas color-coded by step type. Links carry meaning too: solid lines for data, dashed amber lines for condition branches with the branch named on the line, and dotted cyan lines for memory reads and writes. Drag tools in, draw new connections from any node, tidy the layout with one click, and edit any step from the inspector.',
      image: '/images/orka/v2-generated.png',
      imagePosition: 'left',
      split: true,
    },

    // ── Feature 4: Three Views — Intent, Logic, Graph (Screenshot) ────────
    {
      label: 'Three Views. One Agent.',
      headline: 'Switch perspectives without losing context.',
      body: "Every workflow has three views you can switch between freely. Graph shows the interactive node canvas. Logic gives you a numbered, plain-English walkthrough of the execution order. Intent restates what you asked for and what the agent will do, so any team member can understand it without reading the nodes.",
      image: '/images/orka/v2-logic.png',
      imagePosition: 'right',
      screenshot: true,
      features: [
        { name: 'Intent view.', description: "Your original request, the agent's purpose, what starts it and what it ends by doing." },
        { name: 'Logic view.', description: 'A numbered walkthrough of every step in order, with branches spelled out in words.' },
        { name: 'Graph view.', description: 'The full interactive canvas — drag, zoom, connect, and configure steps visually.' },
      ],
    },

    // ── Feature 5: Conversational Editing (Split) ─────────────────────────
    {
      label: 'Conversational Editing',
      headline: 'Ask for a change. See exactly what moved.',
      body: "You refine an agent the same way you built it — by asking. 'Email me when sentiment is very negative.' 'Drop the daily digest.' The change lands on the canvas as a visible diff: new steps glow green, edited steps pulse amber, and removed steps linger as ghosts. Nothing is final until you choose Keep or Undo, and every kept change becomes a version you can jump back to.",
      image: '/images/orka/v2-refine.png',
      imagePosition: 'left',
      split: true,
    },

    // ── Feature 6: Test Run (Highlight) ───────────────────────────────────
    {
      label: 'Test Run',
      headline: 'Watch the agent think before it goes live.',
      body: "Hit Test Run and the agent plays through on the canvas with sample data. The running step glows, data animates along the link into it, finished steps get a check, and branches that weren't taken dim out. Memory steps show what they remembered. Alongside, the run log records each step's timing, result and output — the invisible state made visible.",
      image: '/images/orka/v2-test-run.png',
      imagePosition: 'right',
      highlight: true,
    },
  ],

  gallery: [
    { src: '/images/orka/v2-dashboard.png',       alt: 'Agent dashboard — manage and monitor all AI agents' },
    { src: '/images/orka/v2-entry.png',           alt: 'Prompt-first builder — describe what the agent should do' },
    { src: '/images/orka/v2-generated.png',       alt: 'Generated Brand Monitor agent with narrated build' },
    { src: '/images/orka/v2-refine.png',          alt: 'Conversational edit — new step highlighted, Keep or Undo' },
    { src: '/images/orka/v2-logic.png',           alt: 'Logic view — numbered plain-English walkthrough' },
    { src: '/images/orka/v2-test-run.png',        alt: 'Test run in progress — active step glowing on the canvas' },
    { src: '/images/orka/v2-test-run-done.png',   alt: 'Test run complete — every step with timing and output' },
  ],

  stats: [
    { value: '6', label: 'Step types',  description: 'Trigger, AI, condition, memory, delay, and action' },
    { value: '3', label: 'Link types',  description: 'Data, branch and memory flows, each drawn distinctly' },
    { value: '1', label: 'Agent spec',  description: 'Graph, Logic and Intent views all render from one source' },
  ],
}
