'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Shield, Zap, Video, ArrowRight, CheckCircle } from 'lucide-react'
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

  const handleReset = () => {
    setResult(null)
    setShowUpload(false)
  }

  return (
    <div className="min-h-screen">
      {!showUpload && !result ? (
        /* Landing Page */
        <div className="container mx-auto px-4 py-12 md:py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Deepfake Detection</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto mb-8">
              Advanced AI-powered system to detect manipulated videos and images using cutting-edge deep learning technology
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowUpload(true)}
                className="btn-primary flex items-center gap-2 text-lg"
              >
                Try Demo Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/how-it-works" className="btn-secondary text-lg">
                How It Works
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-purple-400" />}
              title="High Accuracy"
              description="Advanced Vision Transformer architecture with multi-modal analysis for both videos and images"
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-purple-400" />}
              title="Fast Processing"
              description="Quick analysis with real-time face detection and frame extraction in seconds"
            />
            <FeatureCard
              icon={<Video className="w-12 h-12 text-purple-400" />}
              title="Multi-format Support"
              description="Supports videos (MP4, AVI, MOV, MKV) and images (JPG, PNG, WEBP) up to 100MB"
            />
          </motion.div>

          {/* Why It Matters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect p-8 md:p-12 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Why Deepfake Detection Matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-300">The Problem</h3>
                <p className="text-purple-100 leading-relaxed">
                  Deepfake technology has become increasingly sophisticated, making it easier to create 
                  convincing fake videos that can spread misinformation, damage reputations, and 
                  undermine trust in digital media.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-300">Our Solution</h3>
                <p className="text-purple-100 leading-relaxed">
                  Our AI-powered detection system analyzes video frames, facial features, and temporal 
                  patterns to identify manipulated content with high accuracy, helping protect digital 
                  authenticity and combat misinformation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* How It Works Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { step: '1', title: 'Upload Video', desc: 'Select a video file to analyze' },
                { step: '2', title: 'Extract Frames', desc: 'AI extracts key frames from video' },
                { step: '3', title: 'Analyze Faces', desc: 'Deep learning detects anomalies' },
                { step: '4', title: 'Get Results', desc: 'Receive detailed analysis report' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="glass-effect p-6"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-purple-200">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <Link href="/how-it-works" className="btn-secondary">
              Learn More About Our Technology
            </Link>
          </motion.div>
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
