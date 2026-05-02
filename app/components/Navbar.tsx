'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Brain, Menu, X, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/model-info', label: 'Model Info' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`glass-effect flex items-center justify-between px-6 py-3 transition-all duration-500 ${
          scrolled ? 'rounded-2xl border-white/20 shadow-2xl overflow-hidden' : 'bg-transparent border-transparent'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-11 h-11 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform duration-300">
                <Brain className="w-7 h-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white">DEEPGUARD</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-purple-400 -mt-1 uppercase">Advanced AI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
              >
                {link.label}
                <motion.div 
                  className="absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                />
              </Link>
            ))}
            <div className="ml-4 h-6 w-[1px] bg-white/10 mx-2" />
            <button className="px-5 py-2 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 hover:shadow-glow-purple">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden mt-4 glass-effect p-6 flex flex-col gap-4 border-white/20 shadow-2xl origin-top"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white/80 hover:text-white transition-colors flex items-center justify-between group"
                >
                  {link.label}
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </Link>
              ))}
              <hr className="border-white/10" />
              <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white shadow-glow-purple">
                Sign In
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

import { ChevronRight } from 'lucide-react'
