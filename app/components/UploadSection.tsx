'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XCircle, Loader2, ArrowLeft, Video, Image as ImageIcon, Upload, Info, CheckCircle2, AlertTriangle, Shield, Cpu } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { DetectionResult } from '../page'

interface UploadSectionProps {
  onResult: (result: DetectionResult) => void
  onBack: () => void
}

type FileType = 'video' | 'image'

export default function UploadSection({ onResult, onBack }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null)
  const [fileType, setFileType] = useState<FileType>('video')
  const [sequenceLength, setSequenceLength] = useState(40)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      
      if (file.size > 100 * 1024 * 1024) {
        toast.error('File size must be less than 100MB')
        return
      }
      
      const isVideo = file.type.startsWith('video/')
      const isImage = file.type.startsWith('image/')
      
      if (!isVideo && !isImage) {
        toast.error('Please upload a video or image file')
        return
      }
      
      setFile(file)
      setFileType(isVideo ? 'video' : 'image')
      toast.success(`${isVideo ? 'Video' : 'Image'} ready for analysis`)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm'],
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.bmp']
    },
    maxFiles: 1,
    multiple: false,
  })

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first')
      return
    }

    setIsProcessing(true)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.floor(Math.random() * 5) + 2
      })
    }, fileType === 'image' ? 300 : 700)

    const formData = new FormData()
    
    if (fileType === 'video') {
      formData.append('upload_video_file', file)
      formData.append('num_frames', sequenceLength.toString())
    } else {
      formData.append('upload_image_file', file)
    }

    try {
      const endpoint = fileType === 'video' ? '/api/predict' : '/api/predict-image'
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Processing failed');
      }

      const data = await response.json()
      
      clearInterval(progressInterval)
      setProgress(100)
      
      setTimeout(() => {
        onResult(data)
      }, 800)
      
    } catch (error) {
      clearInterval(progressInterval)
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to process. Please check your connection.';
      toast.error(errorMessage, { duration: 5000 });
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Navigation */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-10 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:text-purple-400" />
          <span className="font-medium">Return to Dashboard</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Analysis Setup */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                Submit <span className="gradient-text">Media</span> <br/>
                Deep Analysis Pipeline
              </h1>
              <p className="text-gray-400 text-lg font-light max-w-xl">
                Deploying advanced vision transformers to dissect and verify the authenticity of your digital assets.
              </p>
            </div>

            <div className="glass-effect p-8 border-white/10 shadow-2xl relative overflow-hidden group">
              {/* Feature Selector */}
              <div className="flex bg-white/5 p-1.5 rounded-2xl mb-8 w-fit border border-white/5">
                {[
                  { id: 'video', icon: Video, label: 'Video Analysis' },
                  { id: 'image', icon: ImageIcon, label: 'Image Analysis' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => { if(!file) setFileType(type.id as FileType) }}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm ${
                      fileType === type.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-glow-purple'
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    } ${file && fileType !== type.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Enhanced Dropzone */}
              {!file ? (
                <div
                  {...getRootProps()}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`relative upload-zone bg-white/[0.02] border-2 border-dashed ${
                    isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-white/10'
                  } group hover:border-purple-500/50 transition-all duration-700 h-80 flex flex-col items-center justify-center`}
                >
                  <input {...getInputProps()} />
                  
                  <motion.div
                    animate={isHovered ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                    className="relative mb-6"
                  >
                    <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center border border-white/10 group-hover:border-purple-500 transition-colors">
                      {fileType === 'video' ? <Video size={32} /> : <ImageIcon size={32} />}
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 bg-purple-600 text-white p-1 rounded-lg"
                    >
                      <Upload size={14} />
                    </motion.div>
                  </motion.div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                    {isDragActive ? 'Release to upload' : `Upload ${fileType}`}
                  </h3>
                  <p className="text-gray-500 font-light text-center px-8">
                    Drag and drop or <span className="text-purple-400 font-medium">browse</span> your local files.<br/>
                    <span className="text-xs mt-2 block text-gray-600 tracking-wider">SECURE PAYLOAD PARSING ACTIVE</span>
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-white/5 border border-white/5 rounded-2xl"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                          {fileType === 'video' ? <Video size={24} /> : <ImageIcon size={24} />}
                        </div>
                        <div>
                          <div className="text-white font-bold leading-tight line-clamp-1">{file.name}</div>
                          <div className="text-gray-500 text-sm font-light mt-1">
                            Payload Weight: <span className="text-purple-400">{(file.size / 1024 / 1024).toFixed(2)} MiB</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        disabled={isProcessing}
                        className="p-2 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 rounded-lg transition-all"
                      >
                        <XCircle size={22} />
                      </button>
                    </div>

                    {fileType === 'video' && !isProcessing && (
                      <div className="mb-10 space-y-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Depth Config</div>
                            <div className="text-xl font-black text-white">{sequenceLength} Frames <span className="text-purple-500 font-medium text-sm ml-2">— Balanced</span></div>
                          </div>
                        </div>
                        <div className="relative pt-2">
                          <input
                            type="range" min="10" max="100" step="10"
                            value={sequenceLength}
                            onChange={(e) => setSequenceLength(Number(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500"
                          />
                        </div>
                      </div>
                    )}

                    {isProcessing ? (
                      <div className="py-2">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/20">
                              <Loader2 className="animate-spin text-purple-400" size={20} />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Deploying Neural Engines...</div>
                                <div className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Executing Sub-processes</div>
                            </div>
                          </div>
                          <div className="text-2xl font-black text-purple-500">{progress}%</div>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 relative"
                          >
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shine" />
                          </motion.div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-gray-500 italic text-[11px] font-medium justify-center">
                          <Shield size={12} className="text-purple-500" />
                          Analyzing spatial-temporal patterns for microscopic artifacts...
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleUpload}
                        className="w-full btn-primary h-16 text-lg font-black tracking-wide flex items-center justify-center gap-3 group"
                      >
                        <Cpu className="group-hover:rotate-45 transition-transform" />
                        INITIATE ANALYSIS
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Right Column: Pipeline Details */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
            <div className="glass-effect p-8 flex flex-col h-full bg-gradient-to-br from-white/[0.03] to-transparent border-white/5">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6">
                <Info size={24} className="text-purple-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-6">Security Protocol</h3>
              
              <div className="space-y-6 flex-grow">
                {[
                  { title: "Encrypted Transfer", icon: Shield, desc: "Assets are parsed using AES-256 equivalent socket layers." },
                  { title: "Hardware Isolation", icon: Cpu, desc: "Inference runs on isolated TPU containers." },
                  { title: "Privacy Compliance", icon: CheckCircle2, desc: "No biometric data is persisted post-analysis." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors">
                    <item.icon className="text-purple-500 shrink-0 mt-1" size={18} />
                    <div>
                      <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-gray-500 text-xs font-light leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={16} />
                <p className="text-[11px] text-yellow-600/80 font-medium leading-relaxed uppercase tracking-wider">
                  System trained on Celeb-DF, FaceForensics++, and customized synthetic datasets for optimal precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
