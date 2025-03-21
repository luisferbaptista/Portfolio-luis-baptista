"use client"

import { useState, useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  rotationStrength?: number
  glareEnabled?: boolean
  glareMaxOpacity?: number
  glareColor?: string
  glarePosition?: string
  scale?: number
}

export default function InteractiveCard({
  children,
  className = "",
  rotationStrength = 10,
  glareEnabled = true,
  glareMaxOpacity = 0.2,
  glareColor = "rgba(255, 255, 255, 0.8)",
  glarePosition = "50%",
  scale = 1.02,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  // Motion values for rotation
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Spring animations for smoother movement
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 })

  // Glare effect
  const glareOpacity = useMotionValue(0)
  const springGlareOpacity = useSpring(glareOpacity, { stiffness: 150, damping: 15 })
  const glareX = useMotionValue(glarePosition)
  const glareY = useMotionValue("50%")
  const springGlareX = useSpring(glareX, { stiffness: 50, damping: 10 })
  const springGlareY = useSpring(glareY, { stiffness: 50, damping: 10 })

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current || !isHovering) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card (0 to 1)
    const relativeX = (e.clientX - rect.left) / rect.width
    const relativeY = (e.clientY - rect.top) / rect.height

    // Convert to rotation values (-rotationStrength to rotationStrength)
    const x = (relativeY - 0.5) * rotationStrength * 2
    const y = (0.5 - relativeX) * rotationStrength * 2

    rotateX.set(x)
    rotateY.set(y)

    // Update glare position
    if (glareEnabled) {
      glareX.set(`${relativeX * 100}%`)
      glareY.set(`${relativeY * 100}%`)
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    if (glareEnabled) {
      glareOpacity.set(glareMaxOpacity)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    rotateX.set(0)
    rotateY.set(0)
    if (glareEnabled) {
      glareOpacity.set(0)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
    >
      {/* Card content */}
      <div className="relative z-10 h-full">{children}</div>

      {/* Glare effect */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${springGlareX} ${springGlareY}, ${glareColor}, transparent 70%)`,
            opacity: springGlareOpacity,
          }}
        />
      )}
    </motion.div>
  )
}

