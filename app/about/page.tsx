'use client'

import { motion } from 'framer-motion'
import { Shield, Target, Users, Lightbulb, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">About This Project</span>
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Fighting misinformation and protecting digital authenticity with AI
          </p>
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Target className="w-12 h-12 text-purple-400" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg text-purple-100 leading-relaxed mb-6">
            In an era where deepfake technology is becoming increasingly sophisticated and accessible, 
            the need for reliable detection tools has never been more critical. Our mission is to 
            democratize access to advanced deepfake detection technology, making it available to 
            everyone from journalists and researchers to everyday users concerned about digital authenticity.
          </p>
          <p className="text-lg text-purple-100 leading-relaxed">
            We believe that by providing transparent, accurate, and easy-to-use detection tools, we can 
            help combat misinformation, protect individuals from malicious deepfakes, and restore trust 
            in digital media.
          </p>
        </motion.div>

        {/* The Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-12 h-12 text-purple-400" />
            <h2 className="text-3xl font-bold">The Deepfake Challenge</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Growing Threat</h3>
              <p className="text-purple-100 leading-relaxed">
                Deepfake technology has evolved rapidly, making it possible to create highly convincing 
                fake videos with minimal technical expertise. These manipulated videos can be used for:
              </p>
              <ul className="mt-4 space-y-2 text-purple-200">
                <li>• Spreading political misinformation</li>
                <li>• Creating non-consensual content</li>
                <li>• Financial fraud and scams</li>
                <li>• Damaging reputations</li>
                <li>• Undermining trust in media</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Real-World Impact</h3>
              <p className="text-purple-100 leading-relaxed mb-4">
                The consequences of deepfakes are already being felt across society:
              </p>
              <ul className="space-y-2 text-purple-200">
                <li>• <strong>Politics:</strong> Fake videos of politicians making false statements</li>
                <li>• <strong>Business:</strong> CEO fraud costing companies millions</li>
                <li>• <strong>Personal:</strong> Revenge porn and harassment</li>
                <li>• <strong>Media:</strong> Erosion of trust in news and journalism</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Our Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Lightbulb className="w-12 h-12 text-purple-400" />
            <h2 className="text-3xl font-bold">Our Solution</h2>
          </div>
          <p className="text-lg text-purple-100 leading-relaxed mb-8">
            We've developed a state-of-the-art deepfake detection system that combines advanced computer 
            vision and deep learning to identify manipulated videos with high accuracy. Our approach:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect p-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">Accessible</h3>
              <p className="text-purple-200 text-sm">
                Simple web interface that anyone can use without technical knowledge
              </p>
            </div>
            <div className="glass-effect p-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">Accurate</h3>
              <p className="text-purple-200 text-sm">
                93%+ accuracy using ResNeXt + LSTM architecture trained on thousands of videos
              </p>
            </div>
            <div className="glass-effect p-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">Transparent</h3>
              <p className="text-purple-200 text-sm">
                Detailed explanations of results with confidence scores and visual analysis
              </p>
            </div>
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Built With Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Next.js 14', desc: 'React Framework' },
              { name: 'PyTorch', desc: 'Deep Learning' },
              { name: 'FastAPI', desc: 'Backend API' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'OpenCV', desc: 'Computer Vision' },
              { name: 'Framer Motion', desc: 'Animations' },
              { name: 'Vercel', desc: 'Deployment' },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-effect p-4 text-center"
              >
                <div className="font-semibold text-purple-300 mb-1">{tech.name}</div>
                <div className="text-sm text-purple-200">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Users className="w-12 h-12 text-purple-400" />
            <h2 className="text-3xl font-bold">Who Can Use This?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-effect p-6">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Journalists & Media</h3>
              <p className="text-purple-100">
                Verify the authenticity of video content before publication to maintain credibility 
                and combat misinformation.
              </p>
            </div>
            <div className="glass-effect p-6">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Researchers</h3>
              <p className="text-purple-100">
                Study deepfake detection techniques and contribute to the development of more 
                robust detection methods.
              </p>
            </div>
            <div className="glass-effect p-6">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Law Enforcement</h3>
              <p className="text-purple-100">
                Investigate cases involving manipulated video evidence and digital fraud.
              </p>
            </div>
            <div className="glass-effect p-6">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">General Public</h3>
              <p className="text-purple-100">
                Verify suspicious videos encountered on social media and protect yourself from 
                misinformation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Heart className="w-12 h-12 text-purple-400" />
            <h2 className="text-3xl font-bold">Future Vision</h2>
          </div>
          <p className="text-lg text-purple-100 leading-relaxed mb-6">
            This project represents just the beginning of our journey to combat deepfakes. Our roadmap includes:
          </p>
          <ul className="space-y-3 text-purple-100">
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <span><strong>Real-time Detection:</strong> Process videos as they're being recorded or streamed</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <span><strong>Browser Extension:</strong> Detect deepfakes directly on social media platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <span><strong>API Access:</strong> Allow developers to integrate our detection into their applications</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <span><strong>Multi-modal Detection:</strong> Analyze audio and metadata alongside video</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <span><strong>Community Dataset:</strong> Build a collaborative database of verified deepfakes</span>
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Join the Fight Against Deepfakes</h2>
          <p className="text-xl text-purple-200 mb-8">
            Try our detection system and help protect digital authenticity
          </p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2 text-lg">
            Try Demo Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
