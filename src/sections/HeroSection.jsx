import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const fortSVG = (
  <svg viewBox="0 0 1440 200" className="w-full absolute bottom-0" preserveAspectRatio="none">
    <path
      fill="#0D0D1A"
      d="M0,200 L0,180 Q20,175 40,180 L50,150 Q55,140 60,145 L70,180 L80,120 Q85,100 95,110 L105,180 L115,90 Q120,70 130,85 L140,180 L150,130 Q155,115 165,125 L175,180 L200,100 Q210,80 225,95 L235,180 L260,110 Q270,90 285,105 L295,180 L320,80 Q335,60 350,80 L360,180 L380,140 Q390,125 405,140 L415,180 L440,70 Q455,50 470,70 L480,180 L500,100 Q515,80 530,100 L540,180 L560,130 Q575,110 590,130 L600,180 L620,60 Q635,40 650,60 L660,180 L680,90 Q695,70 710,90 L720,180 L740,110 Q755,90 770,110 L780,180 L800,70 Q815,50 830,70 L840,180 L860,100 Q875,80 890,100 L900,180 L920,80 Q935,60 950,80 L960,180 L980,120 Q995,100 1010,120 L1020,180 L1040,90 Q1055,70 1070,90 L1080,180 L1100,70 Q1115,50 1130,70 L1140,180 L1160,100 Q1175,80 1190,100 L1200,180 L1220,130 Q1235,110 1250,130 L1260,180 L1280,80 Q1295,60 1310,80 L1320,180 L1340,110 Q1355,90 1370,110 L1380,180 L1400,90 Q1415,70 1430,85 L1440,100 L1440,200 Z"
    />
    <g fill="#0D0D1A">
      <rect x="100" y="60" width="30" height="40" />
      <rect x="110" y="50" width="10" height="10" />
      <rect x="300" y="40" width="40" height="50" />
      <rect x="315" y="25" width="10" height="15" />
      <rect x="315" y="55" width="10" height="10" />
      <rect x="500" y="50" width="35" height="45" />
      <rect x="510" y="35" width="15" height="15" />
      <rect x="700" y="30" width="45" height="55" />
      <rect x="720" y="15" width="12" height="15" />
      <rect x="720" y="50" width="12" height="12" />
      <rect x="900" y="45" width="40" height="50" />
      <rect x="915" y="30" width="10" height="15" />
      <rect x="915" y="60" width="10" height="10" />
      <rect x="1100" y="35" width="50" height="60" />
      <rect x="1120" y="20" width="12" height="15" />
      <rect x="1120" y="55" width="12" height="12" />
      <circle cx="130" cy="110" r="6" />
      <circle cx="350" cy="100" r="8" />
      <circle cx="550" cy="90" r="6" />
      <circle cx="750" cy="85" r="7" />
      <circle cx="950" cy="95" r="6" />
      <circle cx="1150" cy="80" r="8" />
    </g>
  </svg>
)

const birdsSVG = (
  <g fill="none" stroke="#0D0D1A" strokeWidth="2">
    <path d="M0,0 Q5,5 10,0" />
    <path d="M15,0 Q20,5 25,0" />
    <path d="M30,0 Q35,5 40,0" />
    <path d="M45,0 Q50,5 55,0" />
    <path d="M60,0 Q65,5 70,0" />
  </g>
)

function HeroSection() {
  const containerRef = useRef(null)
  const starsRef = useRef(null)
  const fortRef = useRef(null)
  const fogRef = useRef(null)
  const cloudsRef = useRef(null)
  const birdsRef = useRef(null)
  const lanternsRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const stars = starsRef.current
    if (stars) {
      const canvas = stars
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const starData = []
      for (let i = 0; i < 180; i++) {
        starData.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.6,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 2 + 2,
        })
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        starData.forEach((star) => {
          const twinkle = Math.sin(Date.now() / 1000 * star.speed) * 0.35 + 0.65
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        })
        requestAnimationFrame(draw)
      }
      draw()
    }

    gsap.fromTo(fortRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: 'power3.out', delay: 0.8 })

    const clouds = cloudsRef.current?.children
    if (clouds) {
      gsap.fromTo(clouds, { opacity: 0 }, { opacity: 0.12, duration: 1.5, stagger: 0.3, delay: 1.2 })
    }

    gsap.fromTo(titleRef.current, { opacity: 0, letterSpacing: '0.6em' }, { opacity: 1, letterSpacing: '0.3em', duration: 2, ease: 'power3.out', delay: 1 })

    gsap.fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power3.out', delay: 1.6 })

    gsap.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 2.2 })

    gsap.to(birdsRef.current, { x: 300, y: -40, duration: 18, repeat: -1, ease: 'none', stagger: 2 })

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      gsap.to(fortRef.current, { x: (e.clientX - centerX) * 0.012, y: (e.clientY - centerY) * 0.008, duration: 0.8 })
      gsap.to(cloudsRef.current, { x: (e.clientX - centerX) * -0.025, duration: 1 })
      gsap.to(starsRef.current, { x: (e.clientX - centerX) * 0.006, duration: 1.2 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const lanterns = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 6 + 6}s`,
  }))

  const handleCtaHover = (isHovering) => {
    gsap.to(ctaRef.current, { scale: isHovering ? 1.05 : 1, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <section ref={containerRef} className="h-screen overflow-hidden relative">
      <canvas ref={starsRef} className="absolute inset-0 z-0" />

      <div ref={fortRef} className="absolute bottom-0 left-0 w-full z-10">
        {fortSVG}
      </div>

      <div ref={fogRef} className="absolute bottom-[15%] left-0 w-full z-20 flex justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-[80%] h-32"
            style={{
              background: 'radial-gradient(ellipse, rgba(232,133,61,0.15), transparent)',
              animation: `fogDrift ${8 + i * 2}s infinite alternate ease-in-out`,
              left: `${i * 10}%`,
            }}
          />
        ))}
      </div>

      <div ref={cloudsRef} className="absolute inset-0 z-30 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full blur-[18px] opacity-0"
            style={{
              width: `${200 + i * 80}px`,
              height: `${60 + i * 20}px`,
              top: `${15 + i * 10}%`,
              left: `${10 + i * 25}%`,
              animation: `cloudMove ${20 + i * 5}s infinite alternate ease-in-out`,
            }}
          />
        ))}
      </div>

      <div ref={birdsRef} className="absolute top-[25%] right-[20%] z-40" style={{ transform: 'scale(0.6)' }}>
        {birdsSVG}
      </div>

      <div className="absolute inset-0 z-50 pointer-events-none">
        {lanterns.map((l, i) => (
          <div
            key={i}
            className="absolute w-[8px] h-[8px] bg-gold rounded-full opacity-70"
            style={{
              left: l.left,
              bottom: 0,
              animation: `floatUp ${l.duration} infinite linear`,
              animationDelay: l.delay,
              boxShadow: '0 0 8px #D4AF37',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-60 flex flex-col items-center justify-center">
        <h1
          ref={titleRef}
          className="font-cinzel text-gold text-center"
          style={{
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            letterSpacing: '0.3em',
            textShadow: '0 0 40px rgba(212,175,55,0.6)',
          }}
        >
          JODHPUR
        </h1>
        <p
          ref={subtitleRef}
          className="font-cormorant italic text-desertOrange text-center mt-4"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.8rem)' }}
        >
          Suryanagari — The Royal Blue City of Marwar
        </p>
        <button
          ref={ctaRef}
          className="mt-12 border border-gold text-gold px-8 py-4 font-rajdhani uppercase tracking-wider
                     hover:bg-gold hover:text-bgDark transition-all duration-300 cursor-pointer"
          style={{ animation: 'pulse 2s infinite' }}
          onMouseEnter={() => handleCtaHover(true)}
          onMouseLeave={() => handleCtaHover(false)}
        >
          Begin Your Journey →
        </button>
      </div>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        @keyframes fogDrift {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(30px); }
        }
        @keyframes cloudMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-60px); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0.7; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(212,175,55,0.5); }
          70% { box-shadow: 0 0 0 14px transparent; }
          100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
        }
      `}</style>
    </section>
  )
}

export default HeroSection