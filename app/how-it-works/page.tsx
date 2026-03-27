'use client'

import { motion } from 'framer-motion'
import { Upload, Scan, Brain, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-12 h-12" />,
      title: 'Video Upload',
      description: 'User uploads a video file through our secure interface. The system validates the file format and size before processing.',
      details: [
        'Supports multiple video formats (MP4, AVI, MOV, MKV)',
        'Maximum file size: 100MB',
        'Secure upload with encryption',
        'Automatic format validation'
      ]
    },
    {
      icon: <Scan className="w-12 h-12" />,
      title: 'Frame Extraction & Face Detection',
      description: 'The system extracts key frames from the video and uses computer vision to detect and crop faces.',
      details: [
        'Intelligent frame sampling (10-100 frames)',
        'Face detection using dlib/face_recognition',
        'Automatic face alignment and cropping',
        'Preprocessing and normalization'
      ]
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'Deep Learning Analysis',
      description: 'Our ResNeXt + LSTM model analyzes facial features and temporal patterns to detect manipulation.',
      details: [
        'ResNeXt-50 for spatial feature extraction',
        'LSTM for temporal pattern analysis',
        'Trained on 1000+ real and fake videos',
        '93%+ accuracy on test datasets'
      ]
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: 'Results & Visualization',
      description: 'The system generates a comprehensive report with confidence scores and visual analysis.',
      details: [
        'Real vs Fake classification',
        'Confidence percentage',
        'Frame-by-frame analysis',
        'Downloadable JSON report'
      ]
    }
  ]

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
            <span className="gradient-text">How It Works</span>
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Our deepfake detection system uses advanced AI and computer vision to analyze videos 
            and identify signs of manipulation with high accuracy.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-effect p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <div className="text-purple-400">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h2 className="text-3xl font-bold mb-4">{step.title}</h2>
                  <p className="text-lg text-purple-200 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-purple-100">
                        <ArrowRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Pipeline</h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="glass-effect p-4 flex-1 text-center">
                <h3 className="font-semibold mb-2">Input Video</h3>
                <p className="text-sm text-purple-200">MP4, AVI, MOV, etc.</p>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-400 rotate-90 md:rotate-0" />
              <div className="glass-effect p-4 flex-1 text-center">
                <h3 className="font-semibold mb-2">Frame Extraction</h3>
                <p className="text-sm text-purple-200">OpenCV processing</p>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-400 rotate-90 md:rotate-0" />
              <div className="glass-effect p-4 flex-1 text-center">
                <h3 className="font-semibold mb-2">Face Detection</h3>
                <p className="text-sm text-purple-200">dlib + face_recognition</p>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-400 rotate-90 md:rotate-0" />
              <div className="glass-effect p-4 flex-1 text-center">
                <h3 className="font-semibold mb-2">ML Model</h3>
                <p className="text-sm text-purple-200">ResNeXt + LSTM</p>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-400 rotate-90 md:rotate-0" />
              <div className="glass-effect p-4 flex-1 text-center">
                <h3 className="font-semibold mb-2">Results</h3>
                <p className="text-sm text-purple-200">Real/Fake + Confidence</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why It's Accurate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Why Our System is Accurate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Advanced Architecture</h3>
              <p className="text-purple-100 leading-relaxed">
                We use ResNeXt-50, a state-of-the-art convolutional neural network, combined with 
                LSTM layers to capture both spatial and temporal features. This dual approach allows 
                us to detect subtle inconsistencies that simpler models might miss.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Comprehensive Training</h3>
              <p className="text-purple-100 leading-relaxed">
                Our model is trained on the FaceForensics++ dataset, which includes over 1000 videos 
                created using various deepfake techniques. This diverse training data helps the model 
                generalize well to different types of manipulations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Multi-Frame Analysis</h3>
              <p className="text-purple-100 leading-relaxed">
                Unlike single-frame detectors, our system analyzes sequences of frames to detect 
                temporal inconsistencies. Deepfakes often have subtle flickering or unnatural 
                movements that become apparent when viewing multiple frames.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Continuous Improvement</h3>
              <p className="text-purple-100 leading-relaxed">
                We regularly update our model with new training data and techniques to stay ahead 
                of evolving deepfake technology. Our system is designed to adapt to new manipulation 
                methods as they emerge.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Try It?</h2>
          <p className="text-xl text-purple-200 mb-8">
            Upload your video and see our AI in action
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
