import { useEffect, useRef, useState } from 'react'

const frameImages = Array.from({ length: 192 }, (_, i) => {
  const num = String(i + 1).padStart(3, '0')
  return `/FRAMES/ezgif-frame-${num}.jpg`
})

function FrameAnimation3D() {
  const containerRef = useRef(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const loadedImages = useRef({})
  const animationRef = useRef(null)
  const bgImageRef = useRef(null)

  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = frameImages.map((src, index) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            loadedImages.current[index] = img
            if (index === 0) setIsLoaded(true)
            resolve()
          }
          img.onerror = () => {
            resolve()
          }
          img.src = src
        })
      })
      await Promise.all(loadPromises)
    }
    preloadImages()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    let startTime = null
    const fps = 24
    const frameDuration = 1000 / fps

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const frameIndex = Math.floor(elapsed / frameDuration) % frameImages.length

      setCurrentFrame(frameIndex)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isLoaded])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
    >
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-300"
        style={{
          backgroundImage: `url(${frameImages[currentFrame]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isLoaded ? 0.7 : 0,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A14]/80 via-transparent to-[#0A0A14]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/60 via-transparent to-[#0A0A14]/60" />
    </div>
  )
}

export default FrameAnimation3D