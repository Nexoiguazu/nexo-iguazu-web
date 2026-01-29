"use client"

import React, { useState } from "react"

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string
}

export default function FallbackImg({
  src,
  alt,
  className,
  fallbackSrc = "/images/placeholder.png",
  ...rest
}: Props) {
  const [imgSrc, setImgSrc] = useState<string>((src as string) ?? "")

  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt ?? ""}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  )
}
