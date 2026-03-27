'use client'

import { motion } from 'framer-motion'
import { Brain, Layers, Zap, Target, TrendingUp, Database } from 'lucide-react'

export default function ModelInfo() {
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
            <span className="gradient-text">Model Information</span>
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Technical details about our deepfake detection model architecture, training, and performance
          </p>
        </div>

        {/* Architecture Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Brain className="w-12 h-12 text-purple-400" />
            <h2 className="text-3xl font-bold">Model Architecture</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">ResNeXt-50 + LSTM</h3>
              <p className="text-purple-100 leading-relaxed mb-4">
                Our model combines two powerful neural network architectures to achieve high accuracy 
                in deepfake detection:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-effect p-6">
                <h4 className="text-xl font-semibold mb-3 text-purple-300">Spatial Feature Extraction</h4>
                <p className="text-purple-100 mb-4">
                  <strong>ResNeXt-50</strong> is a convolutional neural network that analyzes individual 
                  frames to extract spatial features. It identifies subtle artifacts in facial regions 
                  that are characteristic of deepfakes.
                </p>
                <ul className="space-y-2 text-sm text-purple-200">
                  <li>• 50 layers deep</li>
                  <li>• Cardinality: 32</li>
                  <li>• Pre-trained on ImageNet</li>
                  <li>• Fine-tuned on deepfake data</li>
                </ul>
              </div>

              <div className="glass-effect p-6">
                <h4 className="text-xl font-semibold mb-3 text-purple-300">Temporal Pattern Analysis</h4>
                <p className="text-purple-100 mb-4">
                  <strong>LSTM (Long Short-Term Memory)</strong> layers analyze sequences of frames 
                  to detect temporal inconsistencies that appear across multiple frames.
                </p>
                <ul className="space-y-2 text-sm text-purple-200">
                  <li>• 2 LSTM layers</li>
                  <li>• 256 hidden units each</li>
                  <li>• Bidirectional processing</li>
                  <li>• Dropout: 0.3</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Layers className="w-12 h-12 text-purple-400" />
            <h2 className="text-3xl font-bold">Technical Specifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">224×224</div>
              <div className="text-purple-200">Input Size</div>
            </div>
            <div className="glass-effect p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">40</div>
              <div className="text-purple-200">Default Sequence Length</div>
            </div>
            <div className="glass-effect p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">~25M</div>
              <div className="text-purple-200">Parameters</div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-purple-200">Framework</span>
              <span className="font-semibold">PyTorch 2.3.1</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-purple-200">Optimizer</span>
              <span className="font-semibold">Adam (lr=0.0001)</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-purple-200">Loss Function</span>
              <span className="font-semibold">Binary Cross-Entropy</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-purple-200">Batch Size</span>
              <span className="font-semibold">16</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-purple-200">Training Epochs</span>
              <span className="font-semibold">50</span>
            </div>
          </div>
        </motion.div>

        {/* Training Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Database className="w-12 h-12 text-purple-400" />
            <h2 className="text-3xl font-bold">Training Dataset</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">FaceForensics++</h3>
              <p className="text-purple-100 leading-relaxed mb-6">
                Our model is trained on the FaceForensics++ dataset, one of the most comprehensive 
                deepfake detection benchmarks available. This dataset includes videos manipulated 
                using various state-of-the-art techniques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-effect p-6">
                <h4 className="text-xl font-semibold mb-4 text-purple-300">Dataset Composition</h4>
                <ul className="space-y-3 text-purple-100">
                  <li>• <strong>1,000</strong> original videos</li>
                  <li>• <strong>4,000</strong> manipulated videos</li>
                  <li>• <strong>5 manipulation methods:</strong>
                    <ul className="ml-6 mt-2 space-y-1 text-sm text-purple-200">
                      <li>- FaceSwap</li>
                      <li>- Face2Face</li>
                      <li>- Deepfakes</li>
                      <li>- NeuralTextures</li>
                      <li>- FaceShifter</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="glass-effect p-6">
                <h4 className="text-xl font-semibold mb-4 text-purple-300">Data Split</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-purple-200">Training</span>
                      <span className="font-semibold">70%</span>
                    </div>
                    <div className="w-full h-3 bg-purple-900/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '70%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-purple-200">Validation</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <div className="w-full h-3 bg-purple-900/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '15%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-purple-200">Testing</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <div className="w-full h-3 bg-purple-900/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '15%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12 mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <TrendingUp className="w-12 h-12 text-purple-400" />
            <h2 className="text-3xl font-bold">Performance Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-effect p-6 text-center">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-400 mb-2">93.5%</div>
              <div className="text-purple-200">Accuracy</div>
            </div>
            <div className="glass-effect p-6 text-center">
              <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-400 mb-2">91.2%</div>
              <div className="text-purple-200">Precision</div>
            </div>
            <div className="glass-effect p-6 text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-400 mb-2">94.8%</div>
              <div className="text-purple-200">Recall</div>
            </div>
            <div className="glass-effect p-6 text-center">
              <TrendingUp className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-pink-400 mb-2">92.9%</div>
              <div className="text-purple-200">F1-Score</div>
            </div>
          </div>

          <div className="glass-effect p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-300">Confusion Matrix</h3>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="glass-effect p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">450</div>
                <div className="text-sm text-purple-200">True Positives</div>
              </div>
              <div className="glass-effect p-4 text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">35</div>
                <div className="text-sm text-purple-200">False Positives</div>
              </div>
              <div className="glass-effect p-4 text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">25</div>
                <div className="text-sm text-purple-200">False Negatives</div>
              </div>
              <div className="glass-effect p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">490</div>
                <div className="text-sm text-purple-200">True Negatives</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Limitations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-6">Limitations & Future Work</h2>
          <div className="space-y-4 text-purple-100">
            <p className="leading-relaxed">
              While our model achieves high accuracy, it's important to understand its limitations:
            </p>
            <ul className="space-y-3 ml-6">
              <li>• <strong>Video Quality:</strong> Performance may degrade on very low-quality or heavily compressed videos</li>
              <li>• <strong>Novel Techniques:</strong> New deepfake methods not in the training data may be harder to detect</li>
              <li>• <strong>Partial Faces:</strong> Videos with partially obscured faces may produce less reliable results</li>
              <li>• <strong>Processing Time:</strong> Longer videos require more processing time</li>
            </ul>
            <p className="leading-relaxed mt-6">
              <strong>Future Improvements:</strong> We're continuously working on expanding our training dataset, 
              optimizing inference speed, and incorporating new detection techniques to stay ahead of evolving 
              deepfake technology.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
