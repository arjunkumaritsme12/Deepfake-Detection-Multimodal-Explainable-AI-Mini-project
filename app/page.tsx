'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain, Shield, Zap, Video, ArrowRight, Activity, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import UploadSection from './components/UploadSection'
import ResultsSection from './components/ResultsSection'
import FeatureCard from './components/FeatureCard'

export interface DetectionResult {
  output: 'REAL' | 'FAKE'
  confidence: number
  raw_confidence?: number
  probabilities?: {
    real: number
    fake: number
  }
  analysis?: {
    frames_extracted?: number
    faces_detected?: number
    frame_quality?: number
    face_detection_confidence?: number
    temporal_consistency?: number
    compression_artifacts?: number
    image_dimensions?: string
    face_quality?: number
    image_quality?: number
    edge_consistency?: number
    color_distribution?: number
    warning_flags?: string[]
    suspicious_score?: number
    frame_analysis?: Array<{
      frame_id: number
      faces_detected: number
      faces_analysis?: Array<{
        face_id: number
        is_fake: boolean
        confidence: number
        suspicious_score?: number
        reasons?: string[]
        authenticity_indicators?: string[]
        detailed_explanation?: string
        bbox?: number[]
        analysis_details?: any
      }>
      note?: string
    }>
    image_analysis?: {
      faces_detected: number
      faces_analysis: Array<{
        face_id: number
        is_fake: boolean
        confidence: number
        suspicious_score?: number
        reasons?: string[]
        authenticity_indicators?: string[]
        detailed_explanation?: string
        bbox?: number[]
      }>
      detection_note?: string
    }
  }
  preprocessed_images: string[]
  faces_cropped_images: string[]
  original_video?: string
  original_image?: string
  processing_time?: number
  frames_analyzed?: number
  detection_method?: string
  model_version?: string
  model_type?: string
  file_type?: string
  note?: string
}

export default function Home() {
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [showUpload, setShowUpload] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const handleReset = () => {
    setResult(null)
    setShowUpload(false)
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="min-h-screen font-sans">
      {!showUpload && !result ? (
        /* Landing Page */
        <div className="container mx-auto px-4 py-8 md:py-16 overflow-hidden">
          {/* Hero Section */}
          <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center">
            {/* Background elements already handled in global body styles, but adding an extra glowing orb for the hero */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-32 h-32 mx-auto mb-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse blur-xl opacity-50" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="relative w-full h-full bg-glass-effect glass-effect rounded-[2rem] flex items-center justify-center transform rotate-45 border border-white/20 shadow-glow-purple"
              >
                <Brain className="w-16 h-16 text-white -rotate-45 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="max-w-4xl mx-auto z-10"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-white/80">AI Model Online & Ready</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
                Uncover the <br className="hidden md:block"/>
                <span className="gradient-text drop-shadow-2xl">Digital Truth</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                State-of-the-art vision transformer architecture analyzing temporal inconsistencies to detect manipulated media with <strong className="text-white">unprecedented accuracy</strong>.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => setShowUpload(true)}
                  className="btn-primary flex items-center justify-center gap-3 text-lg w-full sm:w-auto min-w-[200px]"
                >
                  <Activity className="w-5 h-5" />
                  Analyze Media
                </button>
                <Link href="/how-it-works" className="btn-secondary group flex items-center justify-center gap-2 text-lg w-full sm:w-auto min-w-[200px]">
                  View Documentation
                  <span className="transform transition-transform group-hover:translate-x-1"><ChevronRight className="w-5 h-5"/></span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24"
          >
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Enterprise-grade Engine</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Shield className="w-10 h-10 text-white" />}
                title="Deep Authenticity"
                description="Cross-references temporal frames against known generative artifacts with absolute precision."
                delay={0}
              />
              <FeatureCard
                icon={<Zap className="w-10 h-10 text-white" />}
                title="Nano-second Processing"
                description="Hardware-accelerated inference utilizing optimized tensor cores for real-time analysis."
                delay={0.2}
              />
              <FeatureCard
                icon={<Video className="w-10 h-10 text-white" />}
                title="Omni-format Support"
                description="Seamlessly ingest & process multi-megabyte 4K streams and compressed imagery pipelines."
                delay={0.4}
              />
            </div>
          </motion.div>

          {/* How It Works Parallax Section */}
          <div ref={targetRef} className="py-24 relative z-10">
            <motion.div style={{ opacity, y }} className="glass-effect p-8 md:p-16 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full" />
              
              <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Pipeline Architecture</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">From raw media ingestion to explainable probabilistic outputs.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {[
                  { step: '01', title: 'Ingestion Layer', desc: 'Secure payload parsing & validation' },
                  { step: '02', title: 'Frame Extraction', desc: 'Temporal decoding & alignment' },
                  { step: '03', title: 'Feature Mapping', desc: 'Transformer-based spatial analysis' },
                  { step: '04', title: 'Synthesis', desc: 'Explainable score aggregation' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative group overflow-hidden transition-colors hover:bg-white/10"
                  >
                    <div className="absolute -bottom-10 -right-10 text-8xl font-black text-white/5 transition-transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:-translate-x-2">
                      {item.step}
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl font-bold text-white mb-6 shadow-glow-purple">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ) : result ? (
        /* Results Page */
        <ResultsSection result={result} onReset={handleReset} />
      ) : (
        /* Upload Page */
        <UploadSection onResult={setResult} onBack={() => setShowUpload(false)} />
      )}
    </div>
  )
}
