"use client"

import { useEffect, useState, useRef } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)

    if (isTouchDevice) return

    // Aplicar clase para ocultar cursor nativo
    document.documentElement.classList.add("custom-cursor")

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Posicionamiento directo sin animaciones para eliminar lag
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.hasAttribute("onclick") ||
        target.getAttribute("tabindex") === "0" ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    // Asegurarse de que el cursor esté oculto al cargar la página
    const style = document.createElement("style")
    style.innerHTML = `
      * { cursor: none !important; }
    `
    document.head.appendChild(style)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseover", onMouseOver)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseover", onMouseOver)
      document.documentElement.classList.remove("custom-cursor")
      document.head.removeChild(style)
    }
  }, [isTouchDevice])

  if (!isMounted || isTouchDevice) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      style={{
        transform: `translate(-100px, -100px)`,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-100 ${
          isHovering
            ? "w-10 h-10 -translate-x-5 -translate-y-5 bg-blue-500/5 border-blue-500/80"
            : "w-8 h-8 -translate-x-4 -translate-y-4 bg-transparent border-blue-500/50"
        } border-[1.5px]`}
      />
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-75 ${
          isHovering
            ? "w-1.5 h-1.5 -translate-x-[3px] -translate-y-[3px] bg-blue-500"
            : "w-1 h-1 -translate-x-[2px] -translate-y-[2px] bg-blue-500/80"
        }`}
      />
    </div>
  )
}

