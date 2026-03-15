import { useParams } from 'react-router-dom'

export default function ProjectEmbed() {
  const { name } = useParams()
  return (
    <iframe
      src={`/projects/${name}/`}
      title={name}
      style={{ display: 'block', width: '100%', height: '100vh', border: 'none' }}
    />
  )
}
