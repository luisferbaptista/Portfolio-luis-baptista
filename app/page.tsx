"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Menu, Moon, Sun, Twitter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillBar from "@/components/skill-bar"
import ContactForm from "@/components/contact-form"
import { useMediaQuery } from "@/hooks/use-mobile"
import CustomCursor from "@/components/custom-cursor"
import MouseParallax from "@/components/mouse-parallax"
import MagneticButton from "@/components/magnetic-button"
import Spotlight from "@/components/spotlight"
import InteractiveCard from "@/components/interactive-card"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState<"en" | "es">("es") // Default to Spanish
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.9])

  // Translations
  const translations = {
    en: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      softwareDeveloper: "Software Developer",
      explore: "Explore",
      aboutMe: "About Me",
      aboutText1:
        "I'm a passionate software developer with a strong focus on creating elegant, efficient, and user-friendly applications. With expertise in both frontend and backend technologies, I enjoy building complete solutions that solve real-world problems.",
      aboutText2:
        "My journey in software development began with a curiosity about how things work, which evolved into a career building innovative digital experiences. I'm constantly learning and exploring new technologies to stay at the forefront of the industry.",
      aboutText3:
        "When I'm not coding, you might find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.",
      skillsExpertise: "Skills & Expertise",
      featuredProjects: "Featured Projects",
      fasterorderTitle: "Fasterorder",
      fasterorderDesc:
        "Online service for selling your products at your fingertips! Sales software directly to WhatsApp.",
      atermwebTitle: "Atermweb",
      atermwebDesc: "Web project developer, innovative and modern solutions, with an extensive digital catalog.",
      tfgTitle: "Final Degree Project",
      tfgDesc:
        "Final degree project, whose system integrates innovative technologies including the use of AI for data management.",
      analyticsTitle: "Social Media Analytics",
      analyticsDesc: "A tool for tracking and analyzing social media performance across multiple platforms.",
      fitnessTitle: "Fitness Tracking App",
      fitnessDesc: "A mobile-first application for tracking workouts, nutrition, and fitness goals.",
      cmsTitle: "Content Management System",
      cmsDesc: "A customizable CMS with a drag-and-drop interface and advanced content modeling.",
      getInTouch: "Get In Touch",
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
      allRightsReserved: "All rights reserved.",
      messageSent: "Message sent!",
      thankYou: "Thanks for reaching out. I'll get back to you soon.",
      menu: "Menu",
      visitWebsite: "Visit Website",
      viewCode: "View Code",
      viewProfile: "View Profile",
    },
    es: {
      about: "Sobre Mí",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
      softwareDeveloper: "Desarrollador de Software",
      explore: "Explorar",
      aboutMe: "Sobre Mí",
      aboutText1:
        "Soy un desarrollador de software apasionado con un fuerte enfoque en crear aplicaciones elegantes, eficientes y fáciles de usar. Con experiencia en tecnologías frontend y backend, disfruto construyendo soluciones completas que resuelven problemas del mundo real.",
      aboutText2:
        "Mi viaje en el desarrollo de software comenzó con una curiosidad sobre cómo funcionan las cosas, que evolucionó hacia una carrera construyendo experiencias digitales innovadoras. Estoy constantemente aprendiendo y explorando nuevas tecnologías para mantenerme a la vanguardia de la industria.",
      aboutText3:
        "Cuando no estoy programando, puedes encontrarme explorando nuevas tecnologías, contribuyendo a proyectos de código abierto o compartiendo mi conocimiento con la comunidad de desarrolladores.",
      skillsExpertise: "Habilidades y Experiencia",
      featuredProjects: "Proyectos Destacados",
      fasterorderTitle: "Fasterorder",
      fasterorderDesc:
        "Servicio online para la venta de tus productos al alcance de tus manos! Software de ventas directamente al Whatsapp.",
      atermwebTitle: "Atermweb",
      atermwebDesc: "Desarrollador de proyectos web, Soluciones innovadoras y modernas, con amplio catálogo digital.",
      tfgTitle: "Trabajo de Fin de Grado",
      tfgDesc:
        "Trabajo Final de grado, cuyo sistema integra innovadoras tecnologías incluyendo el uso de la IA para el manejo de datos.",
      analyticsTitle: "Análisis de Redes Sociales",
      analyticsDesc:
        "Una herramienta para seguir y analizar el rendimiento en redes sociales en múltiples plataformas.",
      fitnessTitle: "Aplicación de Seguimiento Fitness",
      fitnessDesc: "Una aplicación mobile-first para seguimiento de entrenamientos, nutrición y objetivos de fitness.",
      cmsTitle: "Sistema de Gestión de Contenidos",
      cmsDesc: "Un CMS personalizable con interfaz de arrastrar y soltar y modelado avanzado de contenido.",
      getInTouch: "Ponte en Contacto",
      name: "Nombre",
      yourName: "Tu nombre",
      email: "Correo",
      yourEmail: "Tu correo",
      subject: "Asunto",
      message: "Mensaje",
      yourMessage: "Tu mensaje",
      sending: "Enviando...",
      sendMessage: "Enviar Mensaje",
      emailDirectly: "O envíame un correo directamente a",
      allRightsReserved: "Todos los derechos reservados.",
      messageSent: "¡Mensaje enviado!",
      thankYou: "Gracias por contactarme. Te responderé pronto.",
      menu: "Menú",
      visitWebsite: "Visitar Sitio Web",
      viewCode: "Ver Código",
      viewProfile: "Ver Perfil",
    },
  }

  const t = translations[language]

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false)
    }
  }, [isMobile])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Spotlight effect */}
      {!isMobile && <Spotlight color={darkMode ? "rgba(96, 165, 250, 0.07)" : "rgba(59, 130, 246, 0.07)"} />}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold cursor-pointer"
          >
            Luis<span className="text-blue-600 dark:text-blue-400">Baptista</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <a
                  href="#about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.about}
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a
                  href="#skills"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.skills}
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a
                  href="#projects"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.projects}
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a
                  href="#contact"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.contact}
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <MagneticButton strength={15}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLanguage}
                    aria-label="Toggle language"
                    className="mr-2 cursor-pointer"
                  >
                    <span className="font-bold text-sm">{language === "en" ? "ES" : "EN"}</span>
                  </Button>
                </MagneticButton>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <MagneticButton strength={15}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleDarkMode}
                    aria-label="Toggle dark mode"
                    className="cursor-pointer"
                  >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </MagneticButton>
              </motion.li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="mr-2 cursor-pointer"
            >
              <span className="font-bold text-sm">{language === "en" ? "ES" : "EN"}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="mr-2 cursor-pointer"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-4">
                <li>
                  <a
                    href="#about"
                    className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    onClick={closeMobileMenu}
                  >
                    {t.about}
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    onClick={closeMobileMenu}
                  >
                    {t.skills}
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    onClick={closeMobileMenu}
                  >
                    {t.projects}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    onClick={closeMobileMenu}
                  >
                    {t.contact}
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ opacity, scale }}>
          <MouseParallax strength={30} className="w-full h-full">
            <div className="absolute top-20 left-[10%] w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-[10%] w-64 h-64 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl" />
          </MouseParallax>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <MouseParallax strength={10}>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400 mx-auto">
                  <img
                    src="/images/profile.webp"
                    alt="Luis Baptista"
                    className="w-full h-full object-cover object-top scale-110"
                  />
                </div>
              </MouseParallax>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Luis Baptista
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
            >
              <span className="relative">
                <span className="relative z-10">{t.softwareDeveloper}</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 dark:bg-blue-900/40 -z-10 transform -rotate-1"></span>
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex space-x-4 mb-12"
            >
              <MagneticButton>
                <a href="https://github.com/luisferbaptista" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" aria-label="GitHub" className="cursor-pointer">
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/luis-fernando-baptista-palma/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon" aria-label="LinkedIn" className="cursor-pointer">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://x.com/luisferbaptista" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" aria-label="Twitter" className="cursor-pointer">
                    <Twitter className="h-5 w-5" />
                  </Button>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="mailto:luisferbaptista1303@gmail.com">
                  <Button variant="outline" size="icon" aria-label="Email" className="cursor-pointer">
                    <Mail className="h-5 w-5" />
                  </Button>
                </a>
              </MagneticButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <MagneticButton strength={20}>
                <a href="#about">
                  <Button variant="ghost" className="animate-bounce cursor-pointer">
                    <ArrowDown className="h-5 w-5 mr-2" />
                    {t.explore}
                  </Button>
                </a>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
        <MouseParallax strength={20} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-[10%] w-72 h-72 bg-purple-400/5 dark:bg-purple-500/5 rounded-full blur-3xl" />
        </MouseParallax>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-center relative inline-block">
              {t.aboutMe}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400"></span>
            </h2>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">{t.aboutText1}</p>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">{t.aboutText2}</p>
            <p className="text-lg text-gray-700 dark:text-gray-300">{t.aboutText3}</p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative overflow-hidden">
        <MouseParallax strength={15} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-[15%] w-64 h-64 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-[15%] w-64 h-64 bg-purple-400/5 dark:bg-purple-500/5 rounded-full blur-3xl" />
        </MouseParallax>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-12 text-center relative inline-block">
              {t.skillsExpertise}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <SkillBar name="JavaScript" percentage={90} delay={0.1} />
              <SkillBar name="React" percentage={85} delay={0.2} />
              <SkillBar name="Node.js" percentage={80} delay={0.3} />
              <SkillBar name="TypeScript" percentage={75} delay={0.4} />
              <SkillBar name="HTML/CSS" percentage={95} delay={0.5} />
              <SkillBar name="Next.js" percentage={80} delay={0.6} />
              <SkillBar name="Azure" percentage={85} delay={0.7} />
              <SkillBar name="AWS" percentage={80} delay={0.8} />
              <SkillBar name="SQL" percentage={70} delay={0.9} />
              <SkillBar name="Git" percentage={85} delay={1.0} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
        <MouseParallax strength={15} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-[15%] w-64 h-64 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-[15%] w-64 h-64 bg-purple-400/5 dark:bg-purple-500/5 rounded-full blur-3xl" />
        </MouseParallax>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center relative inline-block">
              {t.featuredProjects}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <InteractiveCard>
                <ProjectCard
                  title={t.fasterorderTitle}
                  description={t.fasterorderDesc}
                  tags={["WhatsApp", "E-commerce", "Sales", "Web App"]}
                  imageUrl="/images/fasterorder.webp"
                  liveUrl="https://fasterorder.store/"
                  delay={0.1}
                />
              </InteractiveCard>

              <InteractiveCard>
                <ProjectCard
                  title={t.atermwebTitle}
                  description={t.atermwebDesc}
                  tags={["Web Development", "UI/UX", "Digital Catalog", "Modern Solutions"]}
                  imageUrl="/images/atermweb.webp"
                  liveUrl="https://www.instagram.com/atermweb/"
                  delay={0.2}
                />
              </InteractiveCard>

              <InteractiveCard>
                <ProjectCard
                  title={t.tfgTitle}
                  description={t.tfgDesc}
                  tags={["AI", "Data Management", "Innovation", "Research"]}
                  imageUrl="/images/tfg.webp"
                  liveUrl="https://github.com/luisferbaptista?tab=repositories"
                  delay={0.3}
                />
              </InteractiveCard>

              {/* Otros proyectos en comentarios para mantenerlos */}
              {/* 
              <ProjectCard
                title={t.analyticsTitle}
                description={t.analyticsDesc}
                tags={["Vue.js", "Python", "Flask", "Redis"]}
                imageUrl="/placeholder.svg?height=200&width=400"
                delay={0.4}
              />
              <ProjectCard
                title={t.fitnessTitle}
                description={t.fitnessDesc}
                tags={["React Native", "GraphQL", "Node.js", "MongoDB"]}
                imageUrl="/placeholder.svg?height=200&width=400"
                delay={0.5}
              />
              <ProjectCard
                title={t.cmsTitle}
                description={t.cmsDesc}
                tags={["Angular", "TypeScript", "Express", "MySQL"]}
                imageUrl="/placeholder.svg?height=200&width=400"
                delay={0.6}
              />
              */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <MouseParallax strength={15} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-[15%] w-64 h-64 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-[15%] w-64 h-64 bg-purple-400/5 dark:bg-purple-500/5 rounded-full blur-3xl" />
        </MouseParallax>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-12 text-center relative inline-block">
              {t.getInTouch}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400"></span>
            </h2>

            <InteractiveCard rotationStrength={5} glareMaxOpacity={0.1} scale={1.01}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <ContactForm
                  email="luisferbaptista1303@gmail.com"
                  translations={{
                    name: t.name,
                    yourName: t.yourName,
                    email: t.email,
                    yourEmail: t.yourEmail,
                    subject: t.subject,
                    message: t.message,
                    yourMessage: t.yourMessage,
                    sending: t.sending,
                    sendMessage: t.sendMessage,
                    emailDirectly: t.emailDirectly,
                    messageSent: t.messageSent,
                    thankYou: t.thankYou,
                  }}
                />
              </div>
            </InteractiveCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 dark:bg-gray-950 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Luis Baptista. {t.allRightsReserved}
              </p>
            </div>
            <div className="flex space-x-4">
              <MagneticButton strength={25}>
                <a
                  href="https://github.com/luisferbaptista"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                </a>
              </MagneticButton>
              <MagneticButton strength={25}>
                <a
                  href="https://www.linkedin.com/in/luis-fernando-baptista-palma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                </a>
              </MagneticButton>
              <MagneticButton strength={25}>
                <a href="https://x.com/luisferbaptista" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                </a>
              </MagneticButton>
              <MagneticButton strength={25}>
                <a href="mailto:luisferbaptista1303@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

