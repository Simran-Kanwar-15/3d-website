import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

function FinaleSection() {
  const sectionRef = useRef(null)
  const starsRef = useRef(null)
  const silhouettesRef = useRef(null)
  const lightsRef = useRef(null)
  const lanternsRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const canvas = starsRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const stars = []
      for (let i = 0; i < 250; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 2 + 1,
        })
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        stars.forEach((star) => {
          const twinkle = Math.sin(Date.now() / 1000 * star.speed) * 0.4 + 0.6
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        })
        requestAnimationFrame(draw)
      }
      draw()
    }

    gsap.to(starsRef.current, { opacity: 1, duration: 3, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })

    gsap.fromTo(silhouettesRef.current, { opacity: 0, y: 40 }, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
    })

    const lights = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      size: Math.random() * 5 + 3,
      delay: Math.random() * 2,
    }))
    if (lightsRef.current) {
      lightsRef.current.style.setProperty('--light-count', lights.length)
    }

    gsap.to(lanternsRef.current?.children || [], {
      y: '-110vh',
      opacity: 0,
      duration: 8,
      stagger: { each: 0.6, repeat: -1 },
      ease: 'power1.in',
    })

    gsap.to(textRef.current, {
      text: 'Jodhpur Awaits Your Arrival.',
      duration: 2.5,
      ease: 'none',
      delay: 0.8,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
    })

    gsap.fromTo(buttonsRef.current?.children, { opacity: 0, y: 30 }, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      delay: 4,
    })
  }, [])

  const lanterns = Array.from({ length: 15 }, (_, i) => ({
    left: `${Math.random() * 90 + 5}%`,
    size: Math.random() * 8 + 8,
    delay: Math.random() * 5,
  }))

  const cityLights = Array.from({ length: 40 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 15 + 5}%`,
    size: Math.random() * 5 + 3,
    color: i % 2 === 0 ? '#D4AF37' : '#E8853D',
    animDuration: Math.random() * 2 + 1,
  }))

  return (
    <section ref={sectionRef} id="finale" className="relative h-screen overflow-hidden" style={{ backgroundColor: '#020208' }}>
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 120px rgba(212,175,55,0.12)', animation: 'vignettePulse 3s infinite alternate' }} />

      <canvas ref={starsRef} className="absolute inset-0 z-0 opacity-0" />

      <div ref={silhouettesRef} className="absolute bottom-0 left-0 right-0 flex justify-between items-end z-10 px-8 opacity-0">
        <svg viewBox="0 0 300 150" className="w-[40vw] max-w-[400px]" style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.4))' }}>
          <path fill="#0D0D1A" d="M50,150 L50,80 Q55,60 70,70 L80,150 M90,150 L90,50 Q95,30 110,45 L120,150 M130,150 L130,70 Q135,55 145,65 L155,150 M165,150 L165,40 Q170,25 185,35 L195,150 M205,150 L205,60 Q210,45 225,55 L235,150 M245,150 L245,80 Q250,65 265,75 L275,150 M285,150 L285,90 Q290,75 300,85 L300,150 Z" />
          <rect x="165" y="20" width="15" height="20" fill="#0D0D1A" />
          <rect x="185" y="25" width="10" height="10" fill="#0D0D1A" />
        </svg>
        <svg viewBox="0 0 200 120" className="w-[30vw] max-w-[300px]" style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.4))' }}>
          <path fill="#0D0D1A" d="M20,120 L20,80 Q25,60 40,70 L50,120 M60,120 L60,40 Q65,20 80,35 L90,120 M100,120 L100,60 Q105,45 120,55 L130,120 M140,120 L140,30 Q145,15 160,25 L170,120 M180,120 L180,70 Q185,55 200,65 L200,120 Z" />
          <circle cx="140" cy="25" r="15" fill="#0D0D1A" style={{ filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.6))' }} />
          <rect x="100" y="50" width="30" height="10" fill="#0D0D1A" opacity="0.5" />
        </svg>
      </div>

      <div ref={lightsRef} className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        {cityLights.map((l, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: l.left,
              bottom: l.bottom,
              width: l.size,
              height: l.size,
              backgroundColor: l.color,
              animation: `cityGlow ${l.animDuration}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <div ref={lanternsRef} className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        {lanterns.map((l, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: l.left,
              bottom: 0,
              width: l.size,
              height: l.size,
              backgroundColor: '#D4AF37',
              boxShadow: '0 0 12px #D4AF37, 0 0 24px rgba(212,175,55,0.4)',
              animation: `lanternFloat 8s infinite linear`,
              animationDelay: `${l.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-8">
        <h2 ref={textRef} className="font-cinzel text-gold" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '0.1em' }}>
          Jodhpur Awaits
        </h2>
        <p className="font-cormorant italic text-desertOrange text-xl mt-4 opacity-0" style={{ animation: 'fadeIn 1s ease-out 3.5s forwards' }}>
          Plan your royal journey today.
        </p>
        <div ref={buttonsRef} className="flex gap-6 mt-12">
          <button className="bg-gold text-bgDark px-8 py-4 font-rajdhani uppercase tracking-wider rounded-lg hover:bg-gold/90 transition-colors">
            Book a Stay
          </button>
          <button className="border-2 border-gold text-gold px-8 py-4 font-rajdhani uppercase tracking-wider rounded-lg hover:bg-gold hover:text-bgDark transition-colors">
            Explore More
          </button>
        </div>
      </div>

      <style>{`
        @keyframes cityGlow {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        @keyframes lanternFloat {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
        @keyframes vignettePulse {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-bgDark py-8 text-center">
      <p className="font-rajdhani text-textLight/40 mb-4">© 2026 Jodhpur Tourism Experience</p>
      <div className="flex justify-center gap-6">
        <a href="#" className="text-gold hover:text-desertOrange transition-colors text-xl">📷</a>
        <a href="#" className="text-gold hover:text-desertOrange transition-colors text-xl">🐦</a>
        <a href="#" className="text-gold hover:text-desertOrange transition-colors text-xl">▶️</a>
      </div>
    </footer>
  )
}

export { FinaleSection, Footer }