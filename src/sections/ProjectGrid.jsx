import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import Tag from '../components/ui/Tag'

function ProjectCard({ project }) {
  const videoRef = useRef(null)
  const [active, setActive] = useState(false)

  const handleEnter = () => {
    if (!project.video) return
    setActive(true)
    videoRef.current?.play()
  }

  const handleLeave = () => {
    if (!project.video) return
    setActive(false)
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }

  return (
    <Link
      to={project.href}
      className="group flex flex-col border overflow-hidden transition-shadow hover:shadow-xl"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Media */}
      <div
        className="relative overflow-hidden aspect-video"
        style={{ backgroundColor: 'var(--color-surface-alt)' }}
      >
        {/* Fallback initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-2xl font-light" style={{ color: 'var(--color-foreground-muted)' }}>
            {project.title.charAt(0)}
          </span>
        </div>

        {/* Static image — fades out on hover when video is present */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: 'opacity 0.4s ease, transform 0.5s ease',
            opacity: active ? 0 : 1,
            transform: active ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Looping video — fades in on hover */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transition: 'opacity 0.4s ease',
              opacity: active ? 1 : 0,
            }}
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Tag>{project.category}</Tag>
          <span className="text-xs font-light flex-shrink-0" style={{ color: 'var(--color-foreground-muted)' }}>{project.year}</span>
        </div>
        <h3 className="font-serif text-xl font-light mb-2 mt-3" style={{ color: 'var(--color-foreground)' }}>
          {project.title}
        </h3>
        <p className="text-xs font-light leading-relaxed flex-1 mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
          {project.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex gap-1.5 flex-wrap">
            {project.tools.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] font-light" style={{ color: 'var(--color-foreground-muted)' }}>{t}</span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs font-medium tracking-wider uppercase transition-all group-hover:gap-2" style={{ color: 'var(--color-foreground)' }}>
            View <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ProjectGrid() {
  return (
    <section id="work" className="py-24 px-6" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--color-foreground-muted)' }}>
            Selected Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light" style={{ color: 'var(--color-foreground)' }}>
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
