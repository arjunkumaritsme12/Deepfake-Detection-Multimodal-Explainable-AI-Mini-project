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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-effect p-6 text-center hover:glow-effect transition-all duration-300"
    >
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-purple-200 leading-relaxed">{description}</p>
    </motion.div>
  )
}
