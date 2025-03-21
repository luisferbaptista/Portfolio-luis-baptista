"use client"

import { useState, useRef, type ReactNode, type MouseEvent } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = "",
  strength = 30,
  radius = 150,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // Only apply the effect if the cursor is within the radius
    if (distance < radius) {
      // Calculate the strength based on the distance (closer = stronger)
      const magnetStrength = (1 - distance / radius) * strength

      setPosition({
        x: (distanceX * magnetStrength) / 100,
        y: (distanceY * magnetStrength) / 100,
      })
    } else {
      // Reset position if cursor is outside the radius
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={buttonRef}
      className={`${className} relative inline-block`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

