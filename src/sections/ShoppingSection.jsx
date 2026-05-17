import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const markets = [
  {
    name: 'Sardar Market & Clock Tower',
    icon: '🏪',
    whatToBuy: ['Mathaniya Spices', 'Textiles', 'Handicrafts', 'Makhaniya Lassi'],
    timings: '9AM–9PM',
    bestFor: 'Everything Authentic',
    gradient: 'from-[#1B0E00] via-[#2A1500] to-[#E8853D]',
  },
  {
    name: 'Mochi Bazaar',
    icon: '👞',
    whatToBuy: ['Jodhpuri Mojari (Juttis)', 'Leather Bags', 'Belts'],
    timings: '10AM–8PM',
    bestFor: 'Footwear & Leather',
    gradient: 'from-[#1B2A6B] via-[#2a3d8a] to-[#D4AF37]',
  },
  {
    name: 'Tripolia Bazaar',
    icon: '🎭',
    whatToBuy: ['Wooden Handicrafts', 'Brass Items', 'Traditional Antiques'],
    timings: '10AM–8PM',
    bestFor: 'Souvenirs & Decor',
    gradient: 'from-[#2A0E00] via-[#4A1E00] to-[#E8853D]',
  },
  {
    name: 'Kapraa Bazaar',
    icon: '🧵',
    whatToBuy: ['Bandhani (Tie & Dye)', 'Leheriya', 'Jodhpuri Suits'],
    timings: '9AM–8PM',
    bestFor: 'Royal Textiles',
    gradient: 'from-[#0E1A00] via-[#1A2A00] to-[#D4AF37]',
  },
]

const products = [
  { name: 'Bandhani Fabric', price: '₹200–₹5,000', gradient: 'from-[#E8853D] to-[#D4AF37]', story: 'Traditional tie-and-dye craft of Marwar' },
  { name: 'Jodhpuri Mojari', price: '₹300–₹2,000', gradient: 'from-[#8B4513] to-[#D4AF37]', story: 'Pointed leather footwear with embroidery' },
  { name: 'Wooden Furniture', price: '₹1000–₹50,000', gradient: 'from-[#1B2A6B] to-[#4a7bc4]', story: 'World-famous antique style carved wood' },
  { name: 'Mathaniya Red Chilli', price: '₹200–₹800', gradient: 'from-[#C00000] to-[#E8853D]', story: 'The soul of authentic Laal Maas' },
  { name: 'Glass Bangles', price: '₹50–₹500', gradient: 'from-[#8B0000] to-[#E8853D]', story: 'Handmade colorful adornments' },
  { name: 'Camel Leather Bags', price: '₹500–₹5,000', gradient: 'from-[#8B4513] to-[#654321]', story: 'Durable desert craft' },
  { name: 'Makhaniya Lassi', price: '₹40–₹100', gradient: 'from-[#D4AF37] to-[#FFFDD0]', story: 'Saffron-infused rich buttermilk' },
  { name: 'Miniature Paintings', price: '₹300–₹10,000', gradient: 'from-[#1B2A6B] to-[#D4AF37]', story: 'Marwar school of intricate art' },
]

function ShoppingSection() {
  const sectionRef = useRef(null)
  const bannerRef = useRef(null)
  const headingRef = useRef(null)
  const marketsRef = useRef(null)
  const productsRef = useRef(null)
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' })

  useEffect(() => {
    gsap.fromTo(headingRef.current, { opacity: 0 }, {
      opacity: 1,
      duration: 1.5,
      scrollTrigger: { trigger: bannerRef.current, start: 'top 70%' },
    })

    gsap.to(headingRef.current, {
      text: 'The Grand Bazaar of Jodhpur',
      duration: 2,
      ease: 'none',
      scrollTrigger: { trigger: bannerRef.current, start: 'top 60%' },
    })

    const marketCards = marketsRef.current?.children
    if (marketCards) {
      gsap.fromTo(marketCards, { opacity: 0, y: 60 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: marketsRef.current, start: 'top 80%' },
      })
    }

    const circles = productsRef.current?.children
    if (circles) {
      gsap.fromTo(circles, { scale: 0, opacity: 0 }, {
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: productsRef.current, start: 'top 80%' },
      })
    }
  }, [])

  const handleProductHover = (e, story) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({ show: true, x: rect.left + rect.width / 2, y: rect.top - 10, content: story })
    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 })
  }

  const handleProductLeave = (e) => {
    setTooltip({ show: false, x: 0, y: 0, content: '' })
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })
  }

  return (
    <section ref={sectionRef} id="shopping" className="py-24 bg-bgDark min-h-screen">
      <div ref={bannerRef} className="relative h-[300px] flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B0E00, #2A1500, #1B2A6B)' }}>
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path fill="none" stroke="#D4AF37" strokeWidth="2" d="M100,280 L100,200 Q100,180 120,180 L150,180 L150,280 M200,280 L200,150 Q200,130 220,130 L250,130 L250,280 M300,280 L300,170 Q300,150 320,150 L350,150 L350,280 M400,280 L400,140 Q400,120 420,120 L450,120 L450,280 M500,280 L500,160 Q500,140 520,140 L550,140 L550,280 M600,280 L600,180 Q600,160 620,160 L650,160 L650,280 M700,280 L700,130 Q700,110 720,110 L750,110 L750,280 M800,280 L800,150 Q800,130 820,130 L850,130 L850,280 M900,280 L900,170 Q900,150 920,150 L950,150 L950,280 M1000,280 L1000,140 Q1000,120 1020,120 L1050,120 L1050,280 M1100,280 L1100,180 Q1100,160 1120,160 L1150,160 L1150,280" />
          <circle cx="150" cy="80" r="8" fill="#E8853D" />
          <circle cx="350" cy="60" r="6" fill="#D4AF37" />
          <circle cx="550" cy="70" r="7" fill="#E8853D" />
          <circle cx="750" cy="55" r="8" fill="#D4AF37" />
          <circle cx="950" cy="75" r="6" fill="#E8853D" />
          <rect x="800" y="200" width="60" height="40" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
        </svg>
        <h2 ref={headingRef} className="font-cinzel text-4xl md:text-5xl text-gold relative z-10">
          The Grand Bazaar of Jodhpur
        </h2>
      </div>

      <div ref={marketsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-12 px-8">
        {markets.map((m, i) => (
          <div
            key={i}
            className="border border-gold/40 rounded-xl p-6 cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${i % 2 === 0 ? '#1B0E00' : '#0E1420'}, transparent)` }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, boxShadow: '0 0 30px rgba(212,175,55,0.3)', duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, boxShadow: 'none', duration: 0.3 })}
          >
            <div className="text-5xl mb-4">{m.icon}</div>
            <h3 className="font-cinzel text-xl text-gold mb-3">{m.name}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {m.whatToBuy.map((w, wi) => (
                <span key={wi} className="px-3 py-1 bg-gold/10 text-gold/80 text-sm rounded-full">{w}</span>
              ))}
            </div>
            <div className="flex justify-between text-textLight/60 text-sm">
              <span>{m.timings}</span>
              <span>Best for: {m.bestFor}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 px-8">
        <h3 className="font-cinzel text-2xl text-gold text-center mb-10">Treasures to Take Home</h3>
        <div ref={productsRef} className="flex justify-center gap-8 overflow-x-auto pb-4">
          {products.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 text-center cursor-pointer"
              onMouseEnter={(e) => handleProductHover(e, p.story)}
              onMouseLeave={handleProductLeave}
            >
              <div className={`w-[140px] h-[140px] rounded-full bg-gradient-to-br ${p.gradient} mb-3 flex items-center justify-center`}>
                <span className="text-4xl opacity-80">✨</span>
              </div>
              <p className="font-rajdhani text-textLight">{p.name}</p>
              <p className="text-textLight/50 text-sm">{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto px-8">
        <div className="border-2 border-gold/60 rounded-xl p-6" style={{ backgroundColor: 'rgba(212,175,55,0.05)' }}>
          <h4 className="font-rajdhani text-gold text-xl mb-4">💡 Smart Shopper's Guide</h4>
          <div className="space-y-2 text-textLight/80">
            <p><span className="text-gold">•</span> Always compare prices at 2-3 shops before buying</p>
            <p><span className="text-gold">•</span> Start bargaining at 50% of quoted price</p>
            <p><span className="text-gold">•</span> Best deals: early morning (9–11AM) or evening (6–8PM)</p>
            <p><span className="text-gold">•</span> Fixed price shops: Rajasthali (Govt. emporium) — reliable quality</p>
            <p><span className="text-gold">•</span> Carry cash — most market vendors prefer it</p>
          </div>
        </div>
      </div>

      {tooltip.show && (
        <div
          className="fixed z-50 bg-gold text-bgDark px-4 py-2 rounded-lg font-rajdhani text-sm"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}
        >
          {tooltip.content}
        </div>
      )}
    </section>
  )
}

export default ShoppingSection