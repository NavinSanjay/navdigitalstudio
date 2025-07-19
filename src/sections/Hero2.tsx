'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Projects from './Projects'

export default function Hero2() {
    
    return (
        <div className="relative">
            <section className="sticky top-0 h-screen w-full bg-black text-white flex items-center justify-center text-center overflow-hidden"
            >
                {/* <motion.img
                    src="/images/left_flower.png"
                    alt="Left Flower"
                    className="absolute top-30 left-30 w-[35%] -translate-y-1/2 -translate-x-1/2 z-10"
                    animate={leftFlowerControls}
                    initial={{ x: '0%' }}
                />
                <motion.img
                    src="/images/right_flower.png"
                    alt="Right Flower"
                    className="absolute top-30 right-30 w-[35%] -translate-y-1/2 -translate-x-1/2 z-10"
                    animate={rightFlowerControls}
                    initial={{ x: '0%' }}
                /> */}
                <div
                    className="z-0 max-w-2xl"
                >
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
                        Digital systems <span className="text-accent">that move the needle</span>.
                    </h1>
                    <p className="text-muted-foreground mt-4 text-base md:text-lg">
                        Clean design. Smart code. Strategy-led results. Crafted from scratch for the brands that lead.
                    </p>
                </div>
            </section>
        </div>
    )
}
