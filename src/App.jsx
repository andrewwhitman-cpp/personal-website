import { useState } from 'react'
import './App.css'
import { ThemeProvider, useTheme } from './ThemeContext'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDark ? '☀️' : '🌙'}
    </button>
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
            <p>I'm a skilled developer with experience in C++, DevOps, React, JavaScript, and modern AI technologies.</p>
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
