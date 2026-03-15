export const travelie = {
  title: 'Travelie',
  tagline: 'Discover, plan, and share your next adventure',
  category: 'Mobile App Design',
  heroImage: '/images/travelie/home.png',
  accentColor: '#0ea5e9',
  role: 'UX/UI Designer',
  timeline: '2025',
  tools: ['Figma', 'React', 'Tailwind CSS'],
  prototypeUrl: '/projects/travelie/',
  problem: {
    headline: 'Travel planning is overwhelming, impersonal, and full of generic recommendations.',
    body: 'Travellers were drowning in blog posts, Reddit threads, and social feeds trying to find authentic, curated recommendations. Existing apps optimized for bookings — not discovery or storytelling. Travelie was designed to fill that gap.',
  },
  features: [
    {
      label: 'Dashboard',
      headline: 'Everything in one place.',
      body: 'The home dashboard gives travellers a live view of their upcoming trips, revenue analytics, top destinations, and inbox — with an AI-powered CTA to kick off a new trip plan in seconds.',
      image: '/images/travelie/home.png',
      imagePosition: 'right',
    },
    {
      label: 'AI Trip Planner',
      headline: 'Describe it. Get a full itinerary.',
      body: 'Users describe their dream trip in natural language, select vibes, set dates and budget, and AI generates a complete personalized itinerary. Recent plans and trending destinations keep inspiration flowing.',
      image: '/images/travelie/plan-trip.png',
      imagePosition: 'left',
    },
    {
      label: 'Explore',
      headline: 'Beyond the tourist trail.',
      body: 'A curated explore page surfaces featured itineraries, trending packages, and personalized recommendations — with full package details, activities, pricing, and one-tap booking.',
      image: '/images/travelie/explore.png',
      imagePosition: 'right',
    },
  ],
  gallery: [
    { src: '/images/travelie/home.png', alt: 'Home dashboard with analytics and upcoming trips' },
    { src: '/images/travelie/plan-trip.png', alt: 'AI-powered trip planning interface' },
    { src: '/images/travelie/explore.png', alt: 'Explore packages and curated itineraries' },
  ],
  stats: [
    { value: '3', label: 'Core screens', description: 'Dashboard, planner, and explore' },
    { value: 'AI', label: 'Powered planning', description: 'Natural language itinerary generation' },
    { value: '100%', label: 'Responsive', description: 'Mobile-first across all breakpoints' },
  ],
}
