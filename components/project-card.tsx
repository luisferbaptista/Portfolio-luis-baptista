"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
  delay?: number
}

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  liveUrl,
  delay = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="overflow-hidden h-full flex flex-col group">
        <div className="relative overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
            <div className="flex space-x-2">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="secondary">
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </a>
              )}
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="secondary">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
        <CardContent className="flex-grow pt-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

