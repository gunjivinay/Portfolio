import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Menu, X, User, GraduationCap } from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }

      // Reveal animations on scroll
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-wave animation every 5 seconds
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2500);
    }, 5000);

    return () => clearInterval(waveInterval);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React and Node.js",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat app with AI integration",
      image: "https://images.unsplash.com/photo-1673187735969-e4ed06a7ae4e?auto=format&fit=crop&q=80&w=800",
      tech: ["TypeScript", "OpenAI", "WebSocket"]
    },
    {
      title: "Analytics Dashboard",
      description: "Interactive data visualization dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      tech: ["React", "D3.js", "TailwindCSS"]
    }
  ];

  const skills = [
    { category: "Frontend", items: ["Html", "Css", "JavaScript","Tailwind CSS", "Bootstrap"] },
    { category: "Backend", items: ["Node.js", "Java", "Python"] },
    { category: "Tools", items: ["Git", "VS Code", "Github", "Vercel"] }
  ];

  const education = [
  
    {
      degree: "Bachelor of Electrical and Electronics Engineering",
      college: "St.Mary's Group of Institutions,Hyderabad",
      year: "2020-2023",
      description: "Focus on Software Engineering and Web Technologies"
    }
  ];

  const NavLinks = ({ className = "", onClick = () => { } }) => (
    <div className={className}>
      {['home', 'about', 'skills', 'education', 'projects', 'contact'].map((item) => (
        <a
          key={item}
          href={`#${item}`}
          onClick={onClick}
          className={`nav-link block px-4 py-2 transition-all duration-300 hover:text-blue-400 ${activeSection === item ? 'text-blue-400 font-semibold scale-105' : 'text-gray-300'
            }`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </a>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient hover-lift">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <NavLinks className="hidden md:flex space-x-8" />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} className="animate-rotate" /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : 'closed'} md:hidden p-6`}>
          <NavLinks
            className="flex flex-col space-y-4"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className={`inline-block mb-4 ${isWaving ? 'animate-wave' : ''}`}>
              👋
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in hover-lift">
              Creative Developer
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
              Turning ideas into elegant digital solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 animate-glow hover-glow">
                Get in touch
              </a>
              <a href="#projects" className="border border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full transition-all transform hover:scale-105 animate-pulse">
                View Work
              </a>
              <a href="https://drive.google.com/file/d/1o9sAdnNLypBAzrIVJ3OOAQ8BeiHyOmZJ/view?usp=sharing" className="border border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full transition-all transform hover:scale-105 animate-pulse">
                Check Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center reveal">About Me</h2>
          <div className="max-w-3xl mx-auto reveal">
            <div className="gradient-border p-8 hover-lift">
              <div className="flex items-center gap-6 mb-6">
                <User size={40} className="text-blue-400 animate-float" />
                <div>
                  <h3 className="text-2xl font-bold animate-shimmer">Full Stack Developer</h3>
                  <p className="text-gray-400">Passionate about creating innovative solutions</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Hi, I'm [Your Name], a passionate and detail-oriented frontend developer with a strong foundation in HTML, CSS, JavaScript, and modern frameworks like React. As a fresher, I am eager to apply my skills to create responsive, user-friendly, and visually appealing web applications. I thrive on solving problems and continuously learning new technologies to stay ahead in the ever-evolving world of web development. Let's build something amazing together!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center reveal">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl transform hover:scale-105 transition-all duration-300 reveal hover-glow"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-xl font-bold mb-4 text-blue-400 animate-shimmer">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="skill-tag animate-scale-in hover-rotate"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center reveal">Education</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="gradient-border p-6 transform hover:scale-[1.02] transition-all duration-300 reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start gap-4">
                  <GraduationCap size={24} className="text-blue-400 mt-1 animate-bounce-custom" />
                  <div>
                    <h3 className="text-xl font-bold animate-shimmer">{edu.degree}</h3>
                    <p className="text-blue-400">{edu.school}</p>
                    <p className="text-gray-400 text-sm mb-2">{edu.year}</p>
                    <p className="text-gray-300">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center reveal">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="gradient-border transform hover:scale-105 transition-all duration-300 reveal hover-glow"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative group">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 animate-shimmer">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="skill-tag hover-rotate"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center reveal">Get In Touch</h2>
          <div className="max-w-lg mx-auto gradient-border p-8 transform hover:scale-[1.02] transition-all duration-300 reveal hover-glow">
            <div className="flex justify-center space-x-8 mb-8">
              <a
                href="https://github.com/gunjivinay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 animate-float hover-rotate"
              >
                <Github size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/gunjivinaykumar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 animate-float hover-rotate"
                style={{ animationDelay: "0.2s" }}
              >
                <Linkedin size={28} />
              </a>
              <a
                href="mailto:gunjivinaykumar2001@gmail.com"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 animate-float hover-rotate"
                style={{ animationDelay: "0.4s" }}
              >
                <Mail size={28} />
              </a>
            </div>
            <p className="text-center text-gray-300 animate-pulse">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
