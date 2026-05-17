import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hotels = [
  {
    name: 'Umaid Bhawan Palace',
    category: 'Palace',
    stars: 5,
    price: 'from ₹35,000/night',
    amenities: ['Pool', 'Spa', 'Fine Dining', 'Museum', 'Helipad'],
    description: 'A living palace, now a luxury hotel — experience royalty.',
    image: '/FRAMES/umaid palace.jpeg',
  },
  {
    name: 'Ajit Bhawan',
    category: 'Heritage',
    stars: 4,
    price: 'from ₹8,000/night',
    amenities: ['Pool', 'Heritage Walk', 'Restaurant', 'Gardens'],
    description: "India's first heritage hotel — since 1927.",
    image: '/FRAMES/ajit bawan.jpeg',
  },
  {
    name: 'Raas Jodhpur',
    category: 'Boutique',
    stars: 5,
    price: 'from ₹12,000/night',
    amenities: ['Rooftop Pool', 'Spa', 'Fort View', 'Fine Dining'],
    description: 'Contemporary luxury against ancient blue walls.',
    image: '/FRAMES/rass jodhpur.jpeg',
  },
  {
    name: 'Haveli Inn Pal',
    category: 'Heritage',
    stars: 3,
    price: 'from ₹3,500/night',
    amenities: ['Rooftop Restaurant', 'Heritage Rooms', 'City View'],
    description: 'Authentic haveli charm in the heart of the blue city.',
    image: '/FRAMES/haveli in pal.jpeg',
  },
  {
    name: 'Hotel Haveli',
    category: 'Budget',
    stars: 3,
    price: 'from ₹1,200/night',
    amenities: ['WiFi', 'Restaurant', 'Courtyard'],
    description: 'Comfortable and charming — perfect for the explorer.',
    image: '/FRAMES/hotel haveli.jpeg',
  },
]

const amenityIcons = {
  Pool: '🏊',
  Spa: '💆',
  'Fine Dining': '🍽️',
  Museum: '🏛️',
  Helipad: '🚁',
  'Heritage Walk': '🚶',
  Restaurant: '🍴',
  Gardens: '🌿',
  'Rooftop Pool': '屋顶',
  'Fort View': '🏰',
  'Rooftop Restaurant': '🍽️',
  'Heritage Rooms': '🛏️',
  'City View': '🌆',
  WiFi: '📶',
  Courtyard: '🏡',
}

const tabs = ['All', 'Palace', 'Heritage', 'Boutique', 'Budget']

function HotelsSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const tabsRef = useRef(null)
  const underlineRef = useRef(null)
  const gridRef = useRef(null)
  const [activeTab, setActiveTab] = useState('All')
  const [filteredHotels, setFilteredHotels] = useState(hotels)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const modalRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })

    gsap.fromTo(tabsRef.current?.children, { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: { trigger: tabsRef.current, start: 'top 85%' },
    })
  }, [])

  useEffect(() => {
    gsap.to(underlineRef.current, {
      x: activeTab === 'All' ? 0 :
          activeTab === 'Palace' ? 80 :
          activeTab === 'Heritage' ? 160 :
          activeTab === 'Boutique' ? 240 : 320,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [activeTab])

  useEffect(() => {
    const filtered = activeTab === 'All' ? hotels : hotels.filter(h => h.category === activeTab)
    gsap.to(gridRef.current?.children, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setFilteredHotels(filtered)
        gsap.to(gridRef.current?.children, {
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
        })
      },
    })
  }, [activeTab])

  useEffect(() => {
    const cards = gridRef.current?.children
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, x: -60 }, {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
      })
    }
  }, [filteredHotels])

  useEffect(() => {
    if (selectedHotel) {
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.94 }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
  }, [selectedHotel])

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.94,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => setSelectedHotel(null),
    })
  }

  return (
    <section ref={sectionRef} id="hotels" className="py-24 px-8 bg-bgDark min-h-screen">
      <div ref={headingRef} className="text-center mb-12">
        <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-4">Where to Stay</h2>
        <p className="font-cormorant italic text-xl text-desertOrange">Rest like royalty</p>
      </div>

      <div ref={tabsRef} className="flex justify-center gap-8 mb-12 relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`font-rajdhani uppercase tracking-wider text-sm pb-2 ${activeTab === tab ? 'text-gold' : 'text-textLight/60 hover:text-textLight'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div ref={underlineRef} className="absolute bottom-0 left-0 w-16 h-[2px] bg-gold" />
      </div>

      <div ref={gridRef} className="max-w-5xl mx-auto space-y-6">
        {filteredHotels.map((h, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row rounded-xl overflow-hidden"
            style={{ height: '220px', backgroundColor: '#0E0E1E', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <div className="w-full md:w-[40%] h-full relative overflow-hidden">
              <img 
                src={h.image} 
                alt={h.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bgDark/80 to-transparent" />
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-cinzel text-lg text-gold">{h.name}</h3>
                  <span className="px-2 py-0.5 bg-orange-900/30 text-orange-300 text-xs rounded-full">{h.category}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-gold text-sm">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className={s < h.stars ? '' : 'opacity-30'}>★</span>
                    ))}
                  </div>
                  <span className="font-rajdhani text-gold">{h.price}</span>
                </div>
                <div className="flex gap-2 mb-3">
                  {h.amenities.slice(0, 4).map((a, ai) => (
                    <span key={ai} className="text-lg opacity-70" title={a}>{amenityIcons[a] || '•'}</span>
                  ))}
                </div>
                <p className="font-cormorant italic text-textLight/60 text-sm">{h.description}</p>
              </div>
              <button 
                onClick={() => setSelectedHotel(h)}
                className="self-start border border-gold text-gold px-5 py-2 rounded-lg font-rajdhani text-sm hover:bg-gold hover:text-bgDark transition-colors">
                Check Availability →
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedHotel && (
        <div className="fixed inset-0 z-50 bg-[rgba(10,10,20,0.96)] backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <div ref={modalRef} className="bg-[#0E0E1E] max-w-lg w-full rounded-2xl border border-gold/30 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-32 bg-cover bg-center flex items-end p-6" style={{ backgroundImage: `url("${selectedHotel.image}")` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E1E] to-transparent" />
              <button className="absolute top-4 right-4 text-2xl text-gold hover:text-white transition-colors z-10" onClick={closeModal}>✕</button>
              <h3 className="font-cinzel text-2xl text-gold relative z-10">{selectedHotel.name}</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-cormorant text-textLight/80 text-xl">{selectedHotel.price}</p>
              </div>

              <div className="h-32 bg-blue-900/30 rounded-lg overflow-hidden relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  allowFullScreen 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedHotel.name + ' Jodhpur')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-rajdhani text-gold text-sm mb-1">Check-in</label>
                  <input type="date" className="bg-[#1a1a2e] border border-gold/40 rounded-lg p-2 text-textLight font-rajdhani focus:outline-none focus:border-gold" />
                </div>
                <div className="flex flex-col">
                  <label className="font-rajdhani text-gold text-sm mb-1">Check-out</label>
                  <input type="date" className="bg-[#1a1a2e] border border-gold/40 rounded-lg p-2 text-textLight font-rajdhani focus:outline-none focus:border-gold" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-rajdhani text-gold text-sm mb-1">Guests</label>
                  <select className="bg-[#1a1a2e] border border-gold/40 rounded-lg p-2 text-textLight font-rajdhani focus:outline-none focus:border-gold">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-rajdhani text-gold text-sm mb-1">Room Type</label>
                  <select className="bg-[#1a1a2e] border border-gold/40 rounded-lg p-2 text-textLight font-rajdhani focus:outline-none focus:border-gold">
                    <option>Standard</option>
                    <option>Deluxe</option>
                    <option>Suite</option>
                    <option>Royal Suite</option>
                  </select>
                </div>
              </div>

              <button className="w-full mt-4 bg-gold text-bgDark py-3 rounded-lg font-rajdhani uppercase tracking-wider font-bold hover:bg-yellow-500 transition-colors" onClick={() => { alert('Reservation confirmed! We look forward to hosting you.'); closeModal(); }}>
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default HotelsSection