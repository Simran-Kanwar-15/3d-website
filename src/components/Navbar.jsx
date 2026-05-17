import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Monuments', href: '#monuments' },
  { name: 'History', href: '#history' },
  { name: 'Food', href: '#cafes' },
  { name: 'Stay', href: '#hotels' },
  { name: 'Shop', href: '#shopping' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: scrolled ? 'rgba(10, 10, 20, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [scrolled])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between transition-colors"
    >
      <a href="#hero" className="font-cinzel text-xl md:text-2xl text-gold font-bold tracking-wider">
        JODHPUR
      </a>
      
      <button 
        className="md:hidden text-gold text-2xl"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      <ul className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full md:top-0 left-0 right-0 md:bg-transparent flex-col md:flex-row items-center gap-4 md:gap-8 py-4 md:py-0 bg-bgDark/95 md:bg-transparent`}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="font-rajdhani text-sm uppercase tracking-wider text-textLight hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar