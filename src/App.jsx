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
              <div className="home-text">
                <h1>Welcome to My Portfolio</h1>
                <p>Hi, I'm a web developer passionate about creating amazing digital experiences.</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="about-section">
            <h2>About Me</h2>
            <p>I'm a skilled developer with experience in React, JavaScript, and modern web technologies.</p>
          </section>
        )}

        {activeSection === 'projects' && (
          <section className="projects-section">
            <h2>My Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Project 1</h3>
                <p>Description of project 1</p>
              </div>
              <div className="project-card">
                <h3>Project 2</h3>
                <p>Description of project 2</p>
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
