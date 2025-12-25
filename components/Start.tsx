'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import BlurText from './BlurText'
import DecryptedText from './DecryptedText'
import FallingText from './FallingText'

export default function Start({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'flower' | 'text' | 'done'>('idle')
  const phaseRef = useRef(phase)
  const scrollCooldown = useRef(false)
  const [showText, setShowText] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const textAnimatedRef = useRef(false)
  const isMountedRef = useRef(true)
  const [rightTextStage, setRightTextStage] = useState<0 | 1 | 2 | null>(null)
  const [textFall, setTextFall] = useState(false)

  const leftFlowerControls = useAnimation()
  const rightFlowerControls = useAnimation()
  const textControls = useAnimation()
  const containerControls = useAnimation()

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const safeSetRightTextStage = useCallback((stage: 0 | 1 | 2) => {
    if (!isMountedRef.current) return
    setTimeout(() => {
      if (!isMountedRef.current) return
      setRightTextStage(stage)
    }, 0)
  }, [])

  if (!isMountedRef.current) return null

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  // Idle floating animation for flowers (no rotation)
  useEffect(() => {
    leftFlowerControls.start({
      y: [0, -10, 0],
      transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
    })
    rightFlowerControls.start({
      y: [0, -10, 0],
      transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
    })
  }, [leftFlowerControls, rightFlowerControls])

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (scrollCooldown.current || phaseRef.current === 'done') return
      e.preventDefault()
      scrollCooldown.current = true
      setTimeout(() => {
        scrollCooldown.current = false
      }, 300)
      advancePhase()
    }
    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [])

  const handleClickOrTap = () => {
    if (phaseRef.current === 'done') return
    advancePhase()
  }

  const advancePhase = () => {
    switch (phaseRef.current) {
      case 'idle':
        startFlower()
        break
      case 'flower':
        startTextFade()
        break
      default:
        break
    }
  }

  const fadeInText = async () => {
    if (textAnimatedRef.current) return
    textAnimatedRef.current = true
    textControls.set({ opacity: 0, y: 20 })
    await textControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 1.6 : 0.8, ease: 'easeOut' },
    })
  }

  const startFlower = () => {
    setPhase('flower')
    setTextFall(true)

    // Bold exit for flowers (no rotation)
    leftFlowerControls.start({
      x: '-150%',
      scale: [1, 1.3, 0.9],
      opacity: [1, 1, 0],
      transition: {
        duration: isMobile ? 2.2 : 1.4,
        ease: [0.16, 1, 0.3, 1],
      },
    })
    rightFlowerControls.start({
      x: '150%',
      scale: [1, 1.3, 0.9],
      opacity: [1, 1, 0],
      transition: {
        duration: isMobile ? 2.2 : 1.4,
        ease: [0.16, 1, 0.3, 1],
      },
    })

    setTimeout(() => setShowText(true), isMobile ? 600 : 400)
    setTimeout(() => fadeInText(), isMobile ? 900 : 650)
  }

  const startTextFade = () => {
    setPhase('text')

    textControls.start({
      opacity: 0,
      y: -50,
      transition: { duration: isMobile ? 1.0 : 0.6 },
    })

    containerControls
      .start({
        opacity: 0,
        transition: {
          duration: isMobile ? 0.8 : 0.5,
          ease: 'easeInOut',
        },
      })
      .then(() => {
        if (!isMountedRef.current) return
        onComplete()
        setPhase('done')
      })
  }

  return (
    <div
      className="relative"
      style={{ height: phase === 'done' ? '100vh' : '200vh' }}
    >
      <motion.section
        id="heroload"
        className="sticky top-0 h-screen w-full bg-black text-white flex items-center justify-center text-center overflow-hidden"
        onClick={handleClickOrTap}
        onTouchStart={handleClickOrTap}
        animate={containerControls}
        initial={{ opacity: 1 }}
      >
        {isMobile ? (
          <>
            <div className="absolute top-[10%] w-full flex flex-col items-center space-y-10 text-4xl font-bold z-20">
              <BlurText
                text="NAV"
                delay={150}
                animateBy="letters"
                direction="top"
              />
              <BlurText
                text="DIGITAL"
                delay={150}
                animateBy="letters"
                direction="top"
              />
              <BlurText
                text="STUDIO"
                delay={150}
                animateBy="letters"
                direction="top"
                onAnimationComplete={() => safeSetRightTextStage(0)}
              />
            </div>

            <AnimatePresence mode="wait">
              {rightTextStage !== null && (
                <div
                  key="decrypt-sequence"
                  className="absolute bottom-[10%] w-full flex flex-col items-center space-y-10 text-4xl font-bold z-20"
                >
                  <DecryptedText
                    text="ELEVATE"
                    animateOn="load"
                    onAnimationComplete={() => {
                      if (rightTextStage === 0) safeSetRightTextStage(1)
                    }}
                  />
                  {rightTextStage >= 1 && (
                    <DecryptedText
                      text="INNOVATE"
                      animateOn="load"
                      onAnimationComplete={() => {
                        if (rightTextStage === 1) safeSetRightTextStage(2)
                      }}
                    />
                  )}
                  {rightTextStage >= 2 && (
                    <DecryptedText text="LEAD" animateOn="load" />
                  )}
                </div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            className="absolute inset-0 flex items-center justify-between px-20 text-7xl font-bold text-white z-10"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: textFall ? 0 : 1, y: textFall ? 100 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div className="flex flex-col items-start text-left space-y-20">
              <BlurText text="NAV" delay={150} animateBy="letters" direction="top" />
              <BlurText text="DIGITAL" delay={150} animateBy="letters" direction="top" />
              <BlurText
                text="STUDIO"
                delay={150}
                animateBy="letters"
                direction="top"
                onAnimationComplete={() => safeSetRightTextStage(0)}
              />
            </div>

            <AnimatePresence mode="wait">
              {rightTextStage !== null && (
                <div
                  key="decrypt-sequence"
                  className="flex flex-col items-end text-right space-y-20"
                >
                  <DecryptedText
                    text="ELEVATE"
                    animateOn="load"
                    onAnimationComplete={() => {
                      if (rightTextStage === 0) safeSetRightTextStage(1)
                    }}
                  />
                  {rightTextStage >= 1 && (
                    <DecryptedText
                      text="INNOVATE"
                      animateOn="load"
                      onAnimationComplete={() => {
                        if (rightTextStage === 1) safeSetRightTextStage(2)
                      }}
                    />
                  )}
                  {rightTextStage >= 2 && (
                    <DecryptedText text="LEAD" animateOn="load" />
                  )}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Portal / spotlight */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            textFall
              ? { scale: [0, 1.4, 1], opacity: [0, 1, 1] }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: isMobile ? 1.4 : 1.0,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div
            className="w-[60vmin] h-[60vmin] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(0,0,0,0) 70%)',
              boxShadow: '0 0 140px rgba(255,255,255,0.25)',
            }}
          />
        </motion.div>

        {/* Left flower */}
        <motion.img
          src="/images/left_flower3.png"
          alt="Left Flower"
          className="absolute top-30 left-30 w-[80%] md:w-[35%] -translate-y-1/2 -translate-x-1/2 z-10 cursor-pointer"
          animate={leftFlowerControls}
          initial={{ x: '0%' }}
          whileHover={
            !isMobile
              ? { scale: 1.05, y: -6, transition: { duration: 0.3 } }
              : undefined
          }
        />

        {/* Right flower */}
        <motion.img
          src="/images/right_flower3.png"
          alt="Right Flower"
          className="absolute top-30 right-30 w-[80%] md:w-[35%] -translate-y-1/2 -translate-x-1/2 z-10 cursor-pointer"
          animate={rightFlowerControls}
          initial={{ x: '0%' }}
          whileHover={
            !isMobile
              ? { scale: 1.05, y: -6, transition: { duration: 0.3 } }
              : undefined
          }
        />

        {showText && (
          <motion.div
            className="z-20 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={textControls}
          >
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Digital systems{' '}
              <span className="text-accent">that move the needle</span>.
            </h1>
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              Clean design. Smart code. Strategy-led results. Crafted from scratch
              for the brands that lead.
            </p>
          </motion.div>
        )}
      </motion.section>
    </div>
  )
}
