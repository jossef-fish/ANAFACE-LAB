'use client'
import React from 'react'
import { Button } from '@/src/components/ui/button'
import { InfiniteSlider } from '@/src/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/src/components/ui/progressive-blur'
import { cn } from '@/src/lib/utils'
import { Menu, X, ChevronRight } from 'lucide-react'
import { useScroll, motion } from 'motion/react'
import Logo from '@/src/components/Logo'

interface HeroSectionProps {
    onAnalyzeClick: () => void;
    onCompareClick: () => void;
}

export function HeroSection({ onAnalyzeClick, onCompareClick }: HeroSectionProps) {
    return (
        <>
            <HeroHeader onAnalyzeClick={onAnalyzeClick} onCompareClick={onCompareClick} />
            <main className="overflow-x-hidden">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-black tracking-tighter leading-[0.9]">
                                    ENGINEER YOUR <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA3FF] via-[#7A5CFF] to-[#4DA3FF] animate-gradient-x">
                                        BEST FACE.
                                    </span>
                                </h1>
                                <p className="mt-8 max-w-2xl text-balance text-lg text-white/40 leading-relaxed">
                                    ANAFACE LAB is a personal AI face analysis laboratory. 
                                    Upload your photo and receive a scientific facial attractiveness report 
                                    with deep structural insights.
                                </p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        onClick={onAnalyzeClick}
                                        size="lg"
                                        className="h-12 rounded-full pl-5 pr-3 text-base bg-white text-black hover:bg-[#4DA3FF] hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                        <span className="text-nowrap font-bold">Analyze My Face</span>
                                        <ChevronRight className="ml-1" />
                                    </Button>
                                    <Button
                                        onClick={onCompareClick}
                                        size="lg"
                                        variant="ghost"
                                        className="h-12 rounded-full px-5 text-base hover:bg-white/5 border border-white/10 text-white font-bold">
                                        <span className="text-nowrap">Face vs Face</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-black/10 sm:aspect-video lg:rounded-[3rem] dark:border-white/5">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="size-full object-cover opacity-50 invert dark:opacity-35 dark:invert-0 dark:lg:opacity-75"
                                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"></video>
                        </div>
                    </div>
                </section>
                <section className="bg-background pb-2">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6 border-white/10">
                                <p className="text-end text-sm text-white/40 uppercase tracking-widest font-bold">Powering the best teams</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    duration={40}
                                    gap={112}>
                                    <div className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-tighter">
                                        <span className="text-xl">NVIDIA</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-tighter">
                                        <span className="text-xl">GITHUB</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-tighter">
                                        <span className="text-xl">OPENAI</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-tighter">
                                        <span className="text-xl">TESLA</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-tighter">
                                        <span className="text-xl">APPLE</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-tighter">
                                        <span className="text-xl">MICROSOFT</span>
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-linear-to-r from-[#0B0B0F] absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-linear-to-l from-[#0B0B0F] absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Analyze', href: '#analyze' },
    { name: 'Compare', href: '#compare' },
    { name: 'About', href: '#about' },
]

const HeroHeader = ({ onAnalyzeClick, onCompareClick }: { onAnalyzeClick: () => void; onCompareClick: () => void }) => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-50 w-full pt-2">
                <div className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12', scrolled && 'bg-[#0B0B0F]/50 backdrop-blur-2xl border border-white/5')}>
                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-4')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </button>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => {
                                                    if (item.name === 'Analyze') onAnalyzeClick();
                                                    else if (item.name === 'Compare') onCompareClick();
                                                }}
                                                className="text-white/60 hover:text-white block duration-150 font-medium">
                                                <span>{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-[#0B0B0F] group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => {
                                                    setMenuState(false);
                                                    if (item.name === 'Analyze') onAnalyzeClick();
                                                    else if (item.name === 'Compare') onCompareClick();
                                                }}
                                                className="text-white/60 hover:text-white block duration-150 font-bold">
                                                <span>{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    onClick={onAnalyzeClick}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full border-white/10 text-white hover:bg-white/5">
                                    <span>Analyze</span>
                                </Button>
                                <Button
                                    onClick={() => {}}
                                    size="sm"
                                    className="rounded-full bg-[#4DA3FF] text-white hover:bg-[#4DA3FF]/80">
                                    <span>Join Lab</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}
