import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const restaurants = [
  {
    name: 'Flavors of Jodhpur',
    type: 'Local Specialty',
    rating: 4,
    price: '₹₹',
    timings: '8AM–10PM',
    dishes: ['Mirchi Bada', 'Pyaaz Kachori', 'Lassi'],
    specialty: 'Famous for Jodhpur street food',
    image: '/FRAMES/flavours of jodhpur.jpeg',
    gradient: 'from-[#1a1205] via-[#2d1f0a] to-[#d4a029]',
  },
  {
    name: 'Indique Rooftop Restaurant',
    type: 'Fine Dining',
    rating: 5,
    price: '₹₹₹',
    timings: '12PM–11PM',
    dishes: ['Laal Maas', 'Dal Baati Churma', 'Ker Sangri'],
    specialty: 'Panoramic fort view rooftop',
    image: '/FRAMES/rooftop restraurants.jpeg',
    gradient: 'from-[#1a1205] via-[#2d1f0a] to-[#d4a029]',
  },
  {
    name: 'On The Rocks Restaurant',
    type: 'Rajasthani',
    rating: 4,
    price: '₹₹',
    timings: '11AM–10:30PM',
    dishes: ['Rajasthani Thali', 'Bajre ki Roti', 'Gatte ki Sabzi'],
    specialty: 'Rock-themed rustic ambiance',
    image: '/FRAMES/on the rocks.jpeg',
    gradient: 'from-[#0f1a14] via-[#1a2d1f] to-[#4a8c5c]',
  },
  {
    name: 'Shri Mishrilal Hotel',
    type: 'Traditional',
    rating: 5,
    price: '₹',
    timings: '7AM–10PM',
    dishes: ['Makhaniya Lassi', 'Mawa Kachori'],
    specialty: 'Since 1927 — legendary lassi',
    image: '/FRAMES/shri misrilal hotel.jpeg',
    gradient: 'from-[#1a0f0f] via-[#2d1a1a] to-[#c45c5c]',
  },
  {
    name: 'Stepwell Café',
    type: 'Café',
    rating: 4,
    price: '₹₹',
    timings: '8AM–9PM',
    dishes: ['Cold Coffee', 'Rajasthani Snacks'],
    specialty: 'Near Toorji Ka Jhalra stepwell',
    image: '/FRAMES/stepwell cafe.jpg',
    gradient: 'from-[#0f1420] via-[#1a2030] to-[#5c7cc4]',
  },
  {
    name: 'Gypsy Restaurant',
    type: 'Multi-cuisine',
    rating: 3,
    price: '₹',
    timings: '9AM–10PM',
    dishes: ['Budget Thali', 'Lassi', 'Pakoras'],
    specialty: 'Budget-friendly local favorite',
    image: '/FRAMES/gypsy-restaurant.jpg',
    gradient: 'from-[#141a0f] via-[#1f2d14] to-[#8cb85c]',
  },
]

function CafesSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)
  const [selectedMapCafe, setSelectedMapCafe] = useState(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })

    const cards = gridRef.current?.children
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 60 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
      })
    }
  }, [])

  const handleCardHover = (e, isEnter) => {
    const card = e.currentTarget
    gsap.to(card, {
      y: isEnter ? -6 : 0,
      borderColor: isEnter ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.15)',
      duration: 0.3,
    })
  }

  return (
    <section ref={sectionRef} id="cafes" className="py-24 px-8 bg-bgDark min-h-screen">
      <div ref={headingRef} className="text-center mb-16">
        <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-4">Flavours of Jodhpur</h2>
        <p className="font-cormorant italic text-xl text-desertOrange">From royal kitchens to rooftop sunsets</p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {restaurants.map((r, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden cursor-pointer"
            style={{ border: '1px solid rgba(212,175,55,0.15)' }}
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <div
              className="h-[180px] relative flex items-end p-6 bg-cover bg-center"
              style={{
                backgroundImage: `url("${r.image}")`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${r.gradient} opacity-60`} />
              <h3 className="font-cinzel text-xl text-white relative z-10">{r.name}</h3>
            </div>
            <div className="bg-[#111122] p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className={s < r.rating ? '' : 'opacity-30'}>★</span>
                  ))}
                </div>
                <span className="text-textLight/60 font-rajdhani text-sm">{r.price}</span>
                <span className="text-textLight/60 text-sm ml-auto">{r.timings}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {r.dishes.map((d, di) => (
                  <span key={di} className="px-2 py-1 bg-orange-900/50 text-orange-200 text-xs rounded-full">
                    {d}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedMapCafe(r.name)}
                  className="flex-1 border border-gold/60 text-gold py-2 px-4 rounded-lg font-rajdhani text-sm hover:bg-gold/10 transition-colors">
                  View Map
                </button>
                <button 
                  onClick={(e) => { 
                    e.target.innerText = '✓ Reserved'; 
                    alert(`Your table at ${r.name} has been reserved!`);
                  }}
                  className="flex-1 bg-gold text-bgDark py-2 px-4 rounded-lg font-rajdhani text-sm hover:bg-gold/90 transition-colors"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMapCafe && (
        <div className="fixed inset-0 z-50 bg-[rgba(10,10,20,0.96)] backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedMapCafe(null)}>
          <div className="bg-[#0E0E1E] max-w-2xl w-full rounded-2xl border border-gold/30 p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-2xl text-gold hover:text-white transition-colors z-10" onClick={() => setSelectedMapCafe(null)}>✕</button>
            <h3 className="font-cinzel text-2xl text-gold mb-4">{selectedMapCafe} Location</h3>
            <div className="h-64 bg-blue-900/30 rounded-lg overflow-hidden relative">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMapCafe + ' Jodhpur')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CafesSection