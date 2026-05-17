import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const monuments = [
  {
    name: 'Mehrangarh Fort',
    timings: '9AM–5PM',
    feeInd: '₹100',
    feeFor: '₹600',
    best: 'Morning',
    image: '/FRAMES/mehrangarh fort.jpeg',
    gradient: 'from-[#1B2A6B] via-[#2a3d8a] to-[#E8853D]'
  },
  {
    name: 'Umaid Bhawan Palace',
    timings: '9AM–5PM',
    feeInd: '₹30',
    feeFor: '₹100',
    best: 'Afternoon',
    image: '/FRAMES/umaid palace.jpeg',
    gradient: 'from-[#1a2545] via-[#2d3d6b] to-[#d4a029]'
  },
  {
    name: 'Jaswant Thada',
    timings: '9AM–5PM',
    feeInd: '₹30',
    feeFor: '₹50',
    best: 'Sunset',
    image: '/FRAMES/haveli in pal.jpeg',
    gradient: 'from-[#0f1925] via-[#1e3048] to-[#c9883d]'
  },
  {
    name: 'Mandore Gardens',
    timings: '8AM–8PM',
    feeInd: 'Free',
    feeFor: 'Free',
    best: 'Evening',
    image: '/FRAMES/hotel haveli.jpeg',
    gradient: 'from-[#1a2d4a] via-[#2a4568] to-[#b8762d]'
  },
  {
    name: 'Clock Tower',
    timings: 'Open 24hrs',
    feeInd: 'Free',
    feeFor: 'Free',
    best: 'Anytime',
    image: '/FRAMES/clock tower.jpeg',
    gradient: 'from-[#0d1520] via-[#1a2838] to-[#a8652d]'
  },
  {
    name: 'Rao Jodha Desert Rock Park',
    timings: '8AM–6PM',
    feeInd: '₹80',
    feeFor: '₹200',
    best: 'Morning',
    image: '/FRAMES/rao jodha.jpeg',
    gradient: 'from-[#1f3555] via-[#2d4a70] to-[#c9752d]'
  },
  {
    name: 'Toorji Ka Jhalra',
    timings: 'Open 24hrs',
    feeInd: 'Free',
    feeFor: 'Free',
    best: 'Night',
    image: '/FRAMES/toorji.jpeg',
    gradient: 'from-[#151d2e] via-[#1f2d42] to-[#b8784d]'
  },
  {
    name: 'Kaylana Lake',
    timings: '6AM–7PM',
    feeInd: 'Free',
    feeFor: 'Free',
    best: 'Sunrise',
    image: '/FRAMES/kaylana lake.jpeg',
    gradient: 'from-[#0f1a2c] via-[#1a2c42] to-[#a86d3d]'
  },
  {
    name: 'Balsamand Lake',
    timings: '9AM–6PM',
    feeInd: 'Free',
    feeFor: 'Free',
    best: 'Morning',
    image: '/FRAMES/balsamd lake.jpeg',
    gradient: 'from-[#162035] via-[#203050] to-[#b8864d]'
  },
]

const monumentDetails = {
  'Mehrangarh Fort': {
    story: [
      'Rising 400 feet above the city, Mehrangarh Fort stands as a testament to the might and grandeur of the Rathore dynasty. Built by Rao Jodha in 1459, this fortress has witnessed centuries of royal drama, battles, and betrayal.',
      'The fort houses one of the finest museums in India, with an impressive collection of palanquins, elephant howdahs, costumes, and weapons.',
      'Today, visitors can explore the seven gates, each telling stories of past victories and defeats.'
    ],
    timeline: [
      { year: '1459', event: 'Rao Jodha begins construction' },
      { year: '1660', event: 'Major expansion under Jaswant Singh' },
      { year: '1947', event: 'Royal family donates fort to trust' },
    ],
    nearby: ['Jaswant Thada', 'Chand Baori', 'Moti Mahal'],
  },
  'Umaid Bhawan Palace': {
    story: [
      'A masterpiece of Art Deco architecture, Umaid Bhawan Palace was built by Maharaja Umaid Singh to provide employment during the famine of 1920s.',
      'The palace is divided into three parts: the royal residence, the heritage hotel managed by Taj, and the museum.',
      'The palace has been featured in numerous films and continues to host celebrities from around the world.'
    ],
    timeline: [
      { year: '1929', event: 'Foundation stone laid' },
      { year: '1943', event: 'Construction completed' },
      { year: '1971', event: 'Converted to luxury hotel' },
    ],
    nearby: ['PILLAR', 'Mandore Gardens', 'Umaid Bhawan Museum'],
  },
  'Clock Tower': {
    story: [
      'Ghanta Ghar, also known as the clock tower of Rajasthan, is in the Indian city of Jodhpur.',
      'Construction of Ghanta Ghar began in 1909 under the direction of Maharaja Sardar Singh.',
      'The tower rises in a five-tiered structure crowned by a magnificent dome. The clock mechanism was imported from England in 1910.'
    ],
    timeline: [
      { year: '1909', event: 'Construction begins' },
      { year: '1910', event: 'Clock mechanism installed' },
    ],
    nearby: ['Sardar Market', 'Indique Rooftop', 'Gulab Sagar'],
  },
  'Toorji Ka Jhalra': {
    story: [
      'Toorji Ka Jhalra is an 18th-century stepwell in Jodhpur, Rajasthan, featuring intricate sandstone carvings.',
      'The stepwell was built during the reign of Maharaja Jaswant Singh.',
      'Today, it is a popular tourist attraction and a great example of ancient water conservation architecture.'
    ],
    timeline: [
      { year: '1700s', event: 'Built during Jaswant Singh era' },
      { year: '2010s', event: 'Restored and opened to public' },
    ],
    nearby: ['Stepwell Café', 'Sardar Market', 'Clock Tower'],
  },
  'Balsamand Lake': {
    story: [
      'Balsamand Lake is a lake situated 5 kilometres from Jodhpur on Jodhpur-Mandore Road.',
      'This lake was built by Balak Rao Pratihar in 1159 AD as a water reservoir to provide water to Mandore.',
      'The lake has a length of one kilometre, breadth of 50 metres and a depth of 15 metres.'
    ],
    timeline: [
      { year: '1159', event: 'Built by Balak Rao Pratihar' },
      { year: '19th century', event: 'Rebuilt by Maharaja Jaswant Singh' },
    ],
    nearby: ['Mandore Gardens', 'Balsamand Lake Palace', 'Pillar'],
  },
  'Rao Jodha Desert Rock Park': {
    story: [
      'Rao Jodha Desert Rock Park spreads over 72 hectares near the historic Mehrangarh Fort in Jodhpur.',
      'The park was created in 2006 to restore the natural ecology of a large, rocky area adjoining the fort.',
      'The area contains distinctive volcanic rock and sandstone formations formed between 745 and 680 million years ago.'
    ],
    timeline: [
      { year: '2006', event: 'Park created' },
      { year: '2011', event: 'Opened to public' },
    ],
    nearby: ['Mehrangarh Fort', 'Jaswant Thada', 'Visitors Centre'],
  },
  'Kaylana Lake': {
    story: [
      'Kaylana Lake is located in Jodhpur, Rajasthan, about 8 km from the city center.',
      'The lake was constructed in 1872 by Pratap Singh of Jodhpur.',
      'It is a popular picnic spot and offers beautiful views of the surrounding landscape and sunset.'
    ],
    timeline: [
      { year: '1872', event: 'Lake constructed by Pratap Singh' },
    ],
    nearby: ['Mehrangarh Fort', 'Jodhpur Hills', 'Umaid Bhawan'],
  },
}

function MonumentsSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)
  const [selectedMonument, setSelectedMonument] = useState(null)
  const modalRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current, { opacity: 0, y: 50 }, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })

    const cards = gridRef.current?.children
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 80, scale: 0.95 }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
      })
    }
  }, [])

  useEffect(() => {
    if (selectedMonument) {
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.94 }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
  }, [selectedMonument])

  const handleCardHover = (e, isEnter) => {
    const card = e.currentTarget
    const bg = card.querySelector('.card-bg')
    gsap.to(card, { y: isEnter ? -8 : 0, boxShadow: isEnter ? '0 20px 60px rgba(212,175,55,0.2)' : 'none', duration: 0.3 })
    gsap.to(bg, { scale: isEnter ? 1.06 : 1, duration: 0.6 })
  }

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.94,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => setSelectedMonument(null),
    })
  }

  return (
    <section ref={sectionRef} id="monuments" className="py-24 px-8 bg-bgDark min-h-screen">
      <div ref={headingRef} className="text-center mb-16">
        <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-4">Sacred Monuments</h2>
        <p className="font-cormorant italic text-xl text-desertOrange">Explore the eternal stories carved in stone</p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {monuments.map((m, i) => (
          <div
            key={i}
            className="relative h-[380px] rounded-xl overflow-hidden cursor-pointer group"
            style={{ borderTop: '2px solid rgba(212,175,55,0.4)' }}
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
            onClick={() => setSelectedMonument(m.name)}
          >
            <div
              className="card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: `url("${m.image}")`,
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-50`} />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-cinzel text-xl text-gold mb-3">{m.name}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-900/40 text-orange-200 text-sm rounded-full">{m.timings}</span>
                <span className="px-3 py-1 bg-orange-900/40 text-orange-200 text-sm rounded-full">₹{m.feeInd} / ₹{m.feeFor}</span>
                <span className="px-3 py-1 bg-orange-900/40 text-orange-200 text-sm rounded-full">{m.best}</span>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-gold/90 text-bgDark px-6 py-3 font-rajdhani uppercase tracking-wider rounded-lg hover:bg-gold transition-colors">
                Explore →
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMonument && (
        <div className="fixed inset-0 z-50 bg-[rgba(10,10,20,0.96)] backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <div ref={modalRef} className="bg-bgDark max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-3xl text-gold hover:rotate-90 transition-transform z-10" onClick={closeModal}>×</button>
            <div
              className="h-48 bg-cover bg-center flex items-end p-8 relative"
              style={{
                backgroundImage: `url("${monuments.find(m => m.name === selectedMonument)?.image}")`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/50 to-transparent" />
              <h3 className="font-cinzel text-3xl text-gold relative z-10">{selectedMonument}</h3>
            </div>
            <div className="p-8 space-y-6">
              {monumentDetails[selectedMonument]?.story.map((para, i) => (
                <p key={i} className="font-cormorant text-lg text-textLight leading-relaxed">{para}</p>
              ))}
              {monumentDetails[selectedMonument]?.timeline && (
                <div className="border-l-2 border-gold pl-6 space-y-4">
                  <h4 className="font-cinzel text-gold text-lg">Timeline</h4>
                  {monumentDetails[selectedMonument]?.timeline.map((t, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="font-rajdhani text-gold font-bold">{t.year}</span>
                      <span className="font-cormorant text-textLight">{t.event}</span>
                    </div>
                  ))}
                </div>
              )}
              {monumentDetails[selectedMonument]?.nearby && (
                <div>
                  <h4 className="font-cinzel text-gold text-lg mb-3">Nearby Attractions</h4>
                  <ul className="flex gap-3 flex-wrap">
                    {monumentDetails[selectedMonument]?.nearby.map((n, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-gold rounded-full" />{n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="h-40 bg-blue-900/30 rounded-lg overflow-hidden relative">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMonument + ' Jodhpur')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
              </div>
              <button 
                onClick={(e) => { 
                  e.target.innerText = '✓ Added to Your Plan'; 
                  e.target.classList.add('bg-gold', 'text-bgDark');
                  alert(`Awesome! ${selectedMonument} has been added to your Jodhpur itinerary.`);
                }}
                className="w-full border-2 border-gold text-gold py-4 font-rajdhani uppercase tracking-wider hover:bg-gold hover:text-bgDark transition-colors rounded-lg"
              >
                Plan My Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default MonumentsSection