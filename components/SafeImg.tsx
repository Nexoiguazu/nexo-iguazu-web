"use client"

import { useState } from "react"

type Props = {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  hideOnError?: boolean
}

export default function SafeImg({
  src,
  alt,
  className,
  fallbackSrc = "/images/placeholder.jpg", // poné un placeholder tuyo
  hideOnError = false,
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [hidden, setHidden] = useState(false)

  if (hidden) return null

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (hideOnError) setHidden(true)
        else setCurrentSrc(fallbackSrc)
      }}
    />
  )
}