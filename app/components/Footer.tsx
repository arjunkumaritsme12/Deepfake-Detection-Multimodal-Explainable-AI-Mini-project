'use client'

import Link from 'next/link'
import { Brain, Github, Linkedin, Mail, Twitter, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 pt-20 pb-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {/* Brand & Mission */}
          <div className="md:col-span-12 lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur group-hover:blur-md transition-all opacity-50" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center border border-white/20">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">DEEPGUARD</span>
            </Link>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md font-light">
              Empowering global trust through state-of-the-art neural detection. We are dedicated to providing open-source, explainable AI solutions for a safer digital world.
            </p>

            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/arjunkumaritsme12" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/arjun-kumar-89343228b/" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Globe, href: "#" }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -4, scale: 1.1 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-8 tracking-wide">Platform</h3>
            <ul className="space-y-4">
              {['Home', 'How It Works', 'Model Info', 'About Us'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-purple-400 transition-colors duration-300 font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-8 tracking-wide">Legal</h3>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Use', 'Security', 'License'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-white font-bold text-lg mb-8 tracking-wide">Contact</h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-gray-400 text-sm mb-4 font-light">Have technical questions? Drop us a line.</p>
              <a href="mailto:roy.prajapat.143@gmail.com" className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                  <Mail size={18} className="text-purple-400" />
                </div>
                <span className="font-medium text-sm">roy.prajapat.143@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm font-light">
            © {new Date().getFullYear()} Arjun Kumar. All rights reserved. 
          </p>
          <div className="flex gap-8 text-xs font-bold tracking-[0.2em] text-gray-600">
            <span className="flex items-center gap-2 italic"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> SYSTEM STATUS: OPERATIONAL</span>
            <span className="uppercase">V2.4.0 RELEASE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
