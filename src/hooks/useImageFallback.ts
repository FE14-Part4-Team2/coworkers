"use client";

import { useState, useEffect } from "react";

export default function useImageFallback(
  src: string | null | undefined,
  fallback: string,
): string {
  const [validSrc, setValidSrc] = useState(fallback);

  useEffect(() => {
    if (!src) {
      setValidSrc(fallback);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setValidSrc(src);
    img.onerror = () => setValidSrc(fallback);
  }, [src, fallback]);

  return validSrc;
}
