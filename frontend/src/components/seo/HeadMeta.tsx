import { useEffect } from 'react'

interface HeadMetaProps {
  title: string
  description?: string
  canonicalPath?: string
}

export function HeadMeta({ title, description, canonicalPath }: HeadMetaProps) {
  useEffect(() => {
    document.title = title

    if (description) {
      let descMeta = document.querySelector('meta[name="description"]')
      if (!descMeta) {
        descMeta = document.createElement('meta')
        descMeta.setAttribute('name', 'description')
        document.head.appendChild(descMeta)
      }
      descMeta.setAttribute('content', description)
    }

    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', `https://www.zuvvix.com${canonicalPath}`)
    }
  }, [title, description, canonicalPath])

  return null
}

