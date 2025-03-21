"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"

interface SpotlightProps {
  className?: string
  size?: number
  color?: string
  opacity?: number
}

export default function Spotlight({
  className = "",
  size = 300,
  color = "rgba(62, 140, 255, 0.15)",
  opacity = 0.15,
}: SpotlightProps) {
  const [isClient, setIsClient] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setIsClient(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  if (!isClient) return null

  return (
    <motion.div
      className={`pointer-events-none fixed inset-0 z-30 ${className}`}
      style={{
        background: `radial-gradient(circle ${size}px at ${mouseX}px ${mouseY}px, ${color}, transparent)`,
        opacity,
      }}
    />
  )
}

