import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

export default function MoreWork({ currentId }) {
  const others = projects.filter(p => p.id !== currentId)

  return (
    <section
      className="py-24 px-6 border-t"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--color-foreground-muted)' }}>
            More Work
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light" style={{ color: 'var(--color-foreground)' }}>
            Other Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map(project => (
            <Link
              key={project.id}
              to={project.href}
              className="group flex flex-col border overflow-hidden transition-shadow hover:shadow-xl"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt, var(--color-surface))' }}
            >
              <div className="relative overflow-hidden aspect-video" style={{ backgroundColor: 'var(--color-surface-alt, var(--color-surface))' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-2 p-5">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--color-foreground-muted)' }}>
                    {project.category}
                  </p>
                  <h3 className="font-serif text-lg font-light" style={{ color: 'var(--color-foreground)' }}>
                    {project.title}
                  </h3>
                </div>
                <ArrowUpRight
                  size={16}
                  className="flex-shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'var(--color-foreground-muted)' }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
