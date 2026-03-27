'use client'

import Link from 'next/link'
import { Brain, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Deepfake Detector</span>
            </div>
            <p className="text-purple-200 mb-4 max-w-md">
              Advanced AI-powered deepfake detection system using state-of-the-art deep learning 
              to protect digital authenticity and combat misinformation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-purple-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-purple-200 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/model-info" className="text-purple-200 hover:text-white transition-colors">
                  Model Info
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-purple-200 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Research Paper
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-purple-200">
          <p>© {new Date().getFullYear()} Deepfake Detection System. Built with ❤️ for digital authenticity.</p>
        </div>
      </div>
    </footer>
  )
}
