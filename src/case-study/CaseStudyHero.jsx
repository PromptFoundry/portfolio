export default function CaseStudyHero({ title, tagline, category, heroImage, heroVideo, accentColor }) {
  return (
    <section
      className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ backgroundColor: '#0f0f0f' }}
    >
      {/* Video background */}
      {heroVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ pointerEvents: 'none' }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {/* Fallback image (shown when no video, or while video loads) */}
      {heroImage && !heroVideo && (
        <img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.35))' }}
      />

      <div className="relative w-full max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-[0.5em] uppercase mb-6" style={{ color: accentColor || 'rgba(255,255,255,0.5)' }}>
          {category}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {tagline}
        </p>
      </div>
    </section>
  )
}
