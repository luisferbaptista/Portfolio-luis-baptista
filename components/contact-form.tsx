"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ContactFormProps {
  email: string
  translations?: {
    name: string
    yourName: string
    email: string
    yourEmail: string
    subject: string
    message: string
    yourMessage: string
    sending: string
    sendMessage: string
    emailDirectly: string
    messageSent: string
    thankYou: string
  }
}

export default function ContactForm({ email, translations }: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Default English translations
  const defaultTranslations = {
    name: "Name",
    yourName: "Your name",
    email: "Email",
    yourEmail: "Your email",
    subject: "Subject",
    message: "Message",
    yourMessage: "Your message",
    sending: "Sending...",
    sendMessage: "Send Message",
    emailDirectly: "Or email me directly at",
    messageSent: "Message sent!",
    thankYou: "Thanks for reaching out. I'll get back to you soon.",
  }

  // Use provided translations or defaults
  const t = translations || defaultTranslations

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send the form data to your backend
    // For demonstration purposes, we're just showing a success message
    toast({
      title: t.messageSent,
      description: t.thankYou,
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t.name}</Label>
          <Input
            id="name"
            name="name"
            placeholder={t.yourName}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t.yourEmail}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">{t.subject}</Label>
        <Input
          id="subject"
          name="subject"
          placeholder={t.subject}
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t.message}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t.yourMessage}
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t.sending}
            </span>
          ) : (
            <span className="flex items-center">
              <Send className="mr-2 h-4 w-4" />
              {t.sendMessage}
            </span>
          )}
        </Button>
      </motion.div>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
        {t.emailDirectly}{" "}
        <a href={`mailto:${email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
          {email}
        </a>
      </p>
    </form>
  )
}

