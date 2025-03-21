"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface MouseParallaxProps {
  children: ReactNode
  strength?: number
  className?: string
}

export default function MouseParallax({ children, strength = 20, className = "" }: MouseParallaxProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const dampenedX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const dampenedY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const rotateX = useTransform(dampenedY, [-0.5, 0.5], [strength / 5, -strength / 5])
  const rotateY = useTransform(dampenedX, [-0.5, 0.5], [-strength / 5, strength / 5])
  const translateX = useTransform(dampenedX, [-0.5, 0.5], [-strength, strength])
  const translateY = useTransform(dampenedY, [-0.5, 0.5], [-strength, strength])

  useEffect(() => {
    if (!isClient) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Convert to normalized values between -0.5 and 0.5
      mouseX.set(clientX / innerWidth - 0.5)
      mouseY.set(clientY / innerHeight - 0.5)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isClient, mouseX, mouseY])

  if (!isClient) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  )
}

