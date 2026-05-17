import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
  { year: '1459', event: 'Rao Jodha founds Jodhpur as the new capital of Marwar' },
  { year: '1561', event: 'Mughal Empire influence begins under Akbar' },
  { year: '1818', event: 'Treaty of subsidiary alliance with the British Empire' },
  { year: '1943', event: 'Umaid Bhawan Palace completed, employing thousands during famine' },
  { year: '1949', event: 'Jodhpur State merges into the United State of Rajasthan' },
]

const cultureCards = [
  { icon: '💃', name: 'Ghoomar Dance', desc: 'Graceful traditional folk dance of Marwar women' },
  { icon: '👳', name: 'Safa (Turban)', desc: 'The colorful Jodhpuri turbans, a symbol of honor and pride' },
  { icon: '🎭', name: 'Maand Music', desc: 'Classical royal singing style of Rajasthan' },
]

const festivals = [
  { name: 'Marwar Festival', month: 'Oct', desc: 'Celebration of Rajput heroes and folk music' },
  { name: 'RIFF — Folk Festival', month: 'Oct', desc: 'International roots music and culture' },
  { name: 'Gangaur Festival', month: 'Mar', desc: 'Festival of colors honoring Gauri & Shiva' },
]

function HistorySection() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const nodesRef = useRef([])
  const cultureRef = useRef(null)
  const festivalsRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(lineRef.current, { scaleY: 0, transformOrigin: 'top' }, {
      scaleY: 1,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: timelineRef.current, start: 'top 70%', end: 'bottom 30%', scrub: 1 },
    })

    nodesRef.current.forEach((node, i) => {
      if (!node) return
      gsap.fromTo(node, { opacity: 0, x: i % 2 === 0 ? -60 : 60 }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: node, start: 'top 82%' },
      })
    })

    const cultureCards = cultureRef.current?.children
    if (cultureCards) {
      gsap.fromTo(cultureCards, { opacity: 0, y: 60 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: cultureRef.current, start: 'top 80%' },
      })
    }

    const festivalCards = festivalsRef.current?.children
    if (festivalCards) {
      gsap.fromTo(festivalCards, { opacity: 0, y: 30 }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: festivalsRef.current, start: 'top 85%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="history" className="py-24 px-8 relative min-h-screen" style={{ backgroundColor: '#12100E' }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(180,120,60,0.04)' }} />

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-4">History & Culture</h2>
          <p className="font-cormorant italic text-xl text-desertOrange">The royal legacy lives on</p>
        </div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto mb-20">
          <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold to-desertOrange -translate-x-1/2" />

          {timelineEvents.map((t, i) => (
            <div
              key={i}
              ref={(el) => (nodesRef.current[i] = el)}
              className={`flex items-center mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-1/2 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <span className="font-cinzel text-gold text-2xl">{t.year}</span>
              </div>
              <div className="w-5 h-5 rounded-full bg-gold border-4 border-bgDark z-10 flex-shrink-0" />
              <div className={`w-1/2 ${i % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
                <p className="font-cormorant text-lg text-textLight max-w-xs">{t.event}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h3 className="font-cinzel text-2xl text-gold text-center mb-10">Cultural Heritage</h3>
          <div ref={cultureRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {cultureCards.map((c, i) => (
              <div key={i} className="bg-gradient-to-br from-royalBlue/30 to-desertOrange/20 rounded-xl p-8 text-center h-[240px] flex flex-col items-center justify-center">
                <span className="text-5xl mb-4">{c.icon}</span>
                <h4 className="font-cinzel text-xl text-gold mb-2">{c.name}</h4>
                <p className="font-cormorant text-textLight">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-cinzel text-2xl text-gold text-center mb-10">Festival Celebrations</h3>
          <div ref={festivalsRef} className="flex flex-wrap justify-center gap-6">
            {festivals.map((f, i) => (
              <div key={i} className="border-2 border-gold/60 rounded-xl p-6 max-w-sm bg-black/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-cinzel text-lg text-gold">{f.name}</h4>
                  <span className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full font-rajdhani">{f.month}</span>
                </div>
                <p className="font-cormorant text-textLight text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistorySection