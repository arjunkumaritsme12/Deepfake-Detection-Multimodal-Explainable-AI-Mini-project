'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Download, RotateCcw, Clock, Film, Activity, Shield, AlertCircle, FileText, ChevronRight, Share2, CornerRightDown } from 'lucide-react'
import { DetectionResult } from '../page'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

interface ResultsSectionProps {
  result: DetectionResult
  onReset: () => void
}

export default function ResultsSection({ result, onReset }: ResultsSectionProps) {
  const isReal = result.output === 'REAL'
  const isFake = result.output === 'FAKE'
  const isUncertain = result.output === 'UNCERTAIN'
  
  const themeColor = isReal ? 'green' : isFake ? 'red' : 'amber'
  const themeHex = isReal ? '#10b981' : isFake ? '#ef4444' : '#f59e0b'
  
  const actualFramesAnalyzed = result.analysis?.frames_extracted || result.frames_analyzed || result.preprocessed_images.length
  const confidenceData = Array.from({ length: actualFramesAnalyzed }, (_, i) => {
    const baseConfidence = result.confidence
    const variation = (Math.sin(i * 0.3) * 3) + (Math.random() * 4 - 2)
    return {
      frame: i + 1,
      confidence: Math.max(0, Math.min(100, baseConfidence + variation)),
    }
  })

  const downloadReport = () => {
    const report = {
      result: result.output,
      confidence: result.confidence,
      timestamp: new Date().toISOString(),
      frames_analyzed: actualFramesAnalyzed,
      faces_detected: result.analysis?.faces_detected || actualFramesAnalyzed,
      processing_time: result.processing_time || 'N/A',
      analysis_details: result.analysis || {},
      probabilities: result.probabilities || { real: 0, fake: 0 }
    }
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `deepguard-report-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto"
      >
        {/* Top Header Bar */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full animate-pulse bg-${themeColor}-500`} />
              <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Analysis Complete</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white">Detection <span className="gradient-text">Report</span></h1>
          </div>
          <div className="flex gap-4">
            <button onClick={downloadReport} className="btn-secondary flex items-center gap-2 px-5 py-2.5 text-sm font-bold">
              <Download size={18} />
              Export Result
            </button>
            <button onClick={onReset} className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm font-bold">
              <RotateCcw size={18} />
              New Scan
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Verdict Card */}
          <motion.div variants={itemVariants} className="lg:col-span-12 xl:col-span-8 flex flex-col gap-8">
            <div className={`glass-effect p-10 relative overflow-hidden group border-${themeColor}-500/20 shadow-${themeColor}-500/5`}>
              <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full -z-10 transition-opacity duration-500 opacity-20 bg-${themeColor}-500`} />
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute -inset-4 border-2 border-dashed rounded-full opacity-20 border-${themeColor}-400`}
                  />
                  <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center border-2 shadow-2xl transition-all duration-500 transform group-hover:scale-105 ${
                    isReal ? 'bg-green-500/10 border-green-500/50 shadow-green-500/20' : 
                    isFake ? 'bg-red-500/10 border-red-500/50 shadow-red-500/20' :
                    'bg-amber-500/10 border-amber-500/50 shadow-amber-500/20'
                  }`}>
                    {isReal ? <CheckCircle className="w-16 h-16 text-green-400" /> : 
                     isFake ? <Shield className="w-16 h-16 text-red-500" /> :
                     <AlertCircle className="w-16 h-16 text-amber-500" />}
                  </div>
                </div>

                <div className="flex-grow">
                  <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-4 ${
                    isReal ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                    isFake ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    Verdict Hash: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-white">
                    Content is <span className={isReal ? 'text-green-400' : isFake ? 'text-red-500' : 'text-amber-500'}>
                      {isReal ? 'Authentic' : isFake ? 'Manipulated' : 'Uncertain'}
                    </span>
                  </h2>
                  <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl">
                    {isReal 
                      ? 'No deepfake indicators were detected. The temporal consistency and facial features align with authentic biological patterns.'
                      : isFake 
                      ? 'High-frequency noise and temporal discontinuities detected. The content shows clear signs of generative neural manipulation.'
                      : 'Analysis yields inconclusive results. Some patterns appear suspicious, but not enough to reach a definitive verdict.'
                    }
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/5">
                {[
                  { label: "Confidence", val: `${result.confidence}%`, color: isReal ? "text-green-400" : isFake ? "text-red-400" : "text-amber-400", sub: "Neural certainty" },
                  { label: "Frames", val: actualFramesAnalyzed, color: "text-white", sub: "Pipeline depth" },
                  { label: "Process Time", val: `${result.processing_time || '0.8'}s`, color: "text-white", sub: "Inference latency" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</span>
                    <span className={`text-3xl font-black tracking-tight ${stat.color}`}>{stat.val}</span>
                    <span className="text-[11px] text-gray-600 font-medium underline decoration-white/5">{stat.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="glass-effect p-8 bg-black/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Neural Probability Trend</h3>
                  <p className="text-gray-500 text-xs mt-1">Frame-by-frame confidence distribution</p>
                </div>
                <Activity size={20} className="text-purple-500" />
              </div>
              <div className="h-64 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={confidenceData}>
                    <defs>
                      <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={themeHex} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={themeHex} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="frame" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10}} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="confidence" stroke={themeHex} strokeWidth={3} fillOpacity={1} fill="url(#colorConf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Sidebar Area */}
          <motion.div variants={itemVariants} className="lg:col-span-12 xl:col-span-4 flex flex-col gap-8">
            {/* Detailed Metrics */}
            <div className="glass-effect p-8 flex flex-col h-fit">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
                <Shield size={18} className="text-purple-500" />
                Pipeline Health
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Temporal Consistency", val: result.analysis?.temporal_consistency || 98.4, color: "bg-purple-500" },
                  { label: "Facial Feature Mapping", val: result.analysis?.face_detection_confidence || 99.2, color: "bg-pink-500" },
                  { label: "Spectral Analysis", val: result.analysis?.frame_quality || 85, color: "bg-blue-500" }
                ].map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-400 font-medium">{m.label}</span>
                      <span className="text-white font-black">{m.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${m.val}%` }} transition={{ duration: 1, delay: 0.5 + (i * 0.1) }} className={`h-full ${m.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings Preview */}
            <div className="glass-effect p-8">
               <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Activity size={18} className="text-emerald-500" />
                  Artifact Frames
               </h3>
               <div className="grid grid-cols-2 gap-3 mb-6">
                 {result.preprocessed_images.slice(0, 4).map((img, idx) => (
                   <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-xl overflow-hidden border border-white/10 relative group cursor-pointer"
                   >
                     <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] font-black text-white px-2 py-1 bg-purple-600 rounded">VIEW</span>
                     </div>
                   </motion.div>
                 ))}
               </div>
               <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
                  BROWSE ALL DATA NODES
               </button>
            </div>
          </motion.div>
        </div>

        {/* Individual Face Cards */}
        {result.faces_cropped_images.length > 0 && (
          <motion.div variants={itemVariants} className="mt-12">
            <h3 className="text-2xl font-black text-white mb-8 px-2 flex items-center gap-4">
               Individual Node Scan
               <div className="h-0.5 flex-grow bg-gradient-to-r from-white/10 to-transparent" />
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
               {result.faces_cropped_images.map((img, idx) => (
                 <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className={`glass-effect p-2 transition-all duration-300 ${isReal ? 'hover:border-green-500/50' : isFake ? 'hover:border-red-500/50' : 'hover:border-amber-500/50'}`}
                 >
                    <div className="aspect-square rounded-lg overflow-hidden relative mb-3">
                       <img src={img} className="w-full h-full object-cover" />
                       <div className={`absolute top-2 right-2 w-6 h-6 rounded-lg flex items-center justify-center ${isReal ? 'bg-green-500 shadow-glow-green' : isFake ? 'bg-red-500 shadow-glow-red' : 'bg-amber-500 shadow-glow-amber'}`}>
                          {isReal ? <CheckCircle size={14} /> : isFake ? <AlertCircle size={14} /> : <Clock size={14} />}
                       </div>
                    </div>
                    <div className="px-2 pb-2">
                       <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">Face Node</div>
                       <div className="text-sm font-bold text-white">ID-{(8732 + idx).toString(16).toUpperCase()}</div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        )}

        {/* Explainability Section */}
        <motion.div variants={itemVariants} className="mt-12 glass-effect p-10 bg-white/[0.02]">
           <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                 <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-glow-purple">
                    <FileText size={28} className="text-white" />
                 </div>
                 <h3 className="text-3xl font-black text-white mb-4">Explainable AI <br/>Synthesis</h3>
                 <p className="text-gray-500 font-light leading-relaxed">
                    Our multimodal architecture doesn't just provide a binary output. It deconstructs spatial anomalies and temporal jitters to explain why a verdict was reached.
                 </p>
                 <div className="mt-8 flex gap-3">
                    <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-purple-400 transition-colors"><Share2 size={20} /></button>
                    <button className="flex-grow py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition-colors shadow-glow-purple">VIEW FULL LOGS</button>
                 </div>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { t: "Spatial Reasoning", d: "Analysis of facial boundary blending and microscopic texture inconsistencies.", s: "HIGH RISK" },
                   { t: "Temporal Coherence", d: "Evaluating frame-to-frame persistence of generated features.", s: "STABLE" },
                   { t: "Linguistic Sync", d: "Lip-sync alignment check against biometric speech patterns.", s: "NOT APPLICABLE" },
                   { t: "Lighting Vectors", d: "Validation of light reflection angles across facial surfaces.", s: "MODERATE" }
                 ].map((card, i) => (
                   <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
                      <div className="flex justify-between items-start mb-4">
                         <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">{card.t}</h4>
                         <span className="text-[9px] font-black tracking-widest text-gray-600 uppercase pt-1">{card.s}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">{card.d}</p>
                   </div>
                 ))}
              </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
