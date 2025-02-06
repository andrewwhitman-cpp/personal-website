import { useState } from 'react'
import './App.css'
import { ThemeProvider, useTheme } from './ThemeContext'
import { useEffect, useRef } from 'react'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const themeEmoji = {
    light: '🌙',
    dark: '☀️'
  }
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {themeEmoji[theme]}
    </button>
  )
}

function ParticleBackground() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const style = getComputedStyle(document.documentElement)
      ctx.fillStyle = style.getPropertyValue('--particle-color').trim()
      ctx.strokeStyle = style.getPropertyValue('--particle-line-color').trim()

      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  )
}

function AppContent() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="app">
      <header className="header">
        <nav>
          <ul>
            <li><button onClick={() => setActiveSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</button></li>
            <li><button onClick={() => setActiveSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</button></li>
            <li><button onClick={() => setActiveSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</button></li>
            <li><button onClick={() => setActiveSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</button></li>
          </ul>
          <ThemeToggle />
        </nav>
      </header>

      <main>
        {activeSection === 'home' && (
          <section className="home-section">
            <ParticleBackground />
            <div className="home-content">
              <div className="profile-image">
                <picture>
                  {/* <source media="(min-width: 1200px)" srcSet="me-400x455.png" />
                  <source media="(min-width: 800px)" srcSet="me-300x341.png" />
                  <source media="(min-width: 500px)" srcSet="me-250x284.png" /> */}
                  <img src="me-400x455.png" alt="Andrew Whitman" />
                </picture>
              </div>
              <div className="home-text">
                <h1>Hi, I'm Andrew</h1>
                <p>I'm a software engineer passionate about creating amazing digital experiences.</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="about-section">
            <h2>About Me</h2>
            <p>I'm a skilled developer with experience in C++, Python, JavaScript, React, DevOps, and modern AI technologies.</p>
            <div className="skills-container">
              <h3>Technical Skills</h3>
              <div className="skills-grid">
                <div className="skill-item">
                  <span className="skill-label">C++</span>
                  <div className="skill-bar"><div className="skill-progress" style={{width: '90%'}}></div></div>
                </div>
                <div className="skill-item">
                  <span className="skill-label">Python</span>
                  <div className="skill-bar"><div className="skill-progress" style={{width: '90%'}}></div></div>
                </div>
                <div className="skill-item">
                  <span className="skill-label">JavaScript/React</span>
                  <div className="skill-bar"><div className="skill-progress" style={{width: '80%'}}></div></div>
                </div>
                <div className="skill-item">
                  <span className="skill-label">DevOps</span>
                  <div className="skill-bar"><div className="skill-progress" style={{width: '65%'}}></div></div>
                </div>
                <div className="skill-item">
                  <span className="skill-label">AI Technologies</span>
                  <div className="skill-bar"><div className="skill-progress" style={{width: '98%'}}></div></div>
                </div>
              </div>
            </div>
            {/* <div className="timeline-container">
              <h3>Professional Journey</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>2024 - Present</h4>
                    <p>Software Engineer focusing on DevOps, AI, and Improved Developer Experiences</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>2022 - 2024</h4>
                    <p>C++ Developer working on real-time application on the edge</p>
                  </div>
                </div>
              </div>
            </div> */}
          </section>
        )}

        {activeSection === 'projects' && (
          <section className="projects-section">
            <h2>My Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Bible Customizer</h3>
                <p>An interactive web application that allows users to customize a 3D model of a Bible.</p>
                <a href="https://andrewwhitman-cpp.github.io/bible-customization-app/" target="_blank" rel="noopener noreferrer">View Project</a>
              </div>
              <div className="project-card">
                <h3>Coffee Creator</h3>
                <p>A modern, responsive website showcasing coffee order customization.</p>
                <a href="https://andrewwhitman-cpp.github.io/coffee/" target="_blank" rel="noopener noreferrer">View Project</a>
              </div>
              <div className="project-card">
                <h3>More Coming Soon</h3>
                <p>Stay tuned for additional projects showcasing my development skills and creativity.</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="contact-section">
            <h2>Contact Me</h2>
            <form className="contact-form">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Message"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>© 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
