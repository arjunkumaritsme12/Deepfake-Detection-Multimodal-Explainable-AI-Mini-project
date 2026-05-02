'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="glass-effect relative p-8 h-full border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-center text-center">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-purple-500/30 transition-all duration-300 group-hover:shadow-glow-purple">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
