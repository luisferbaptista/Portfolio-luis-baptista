"use client"

import { motion } from "framer-motion"

interface SkillBarProps {
  name: string
  percentage: number
  delay?: number
}

export default function SkillBar({ name, percentage, delay = 0 }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

