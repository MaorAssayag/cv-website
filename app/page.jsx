'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, Download, ExternalLink, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDSP } from '@/context/DSPContext';
import DSPVisualizer from '@/components/DSPVisualizer';

export default function HomePage() {
  const { isDSPMode, setIsDSPMode, setTitleRect, triggerFrameReassign } = useDSP();
  const titleRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const updateRect = () => {
      if (titleRef.current) {
        setTitleRect(titleRef.current.getBoundingClientRect());
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [setTitleRect]);

  useEffect(() => {
    // Reserve space for scrollbar to prevent layout shift
    document.documentElement.style.scrollbarGutter = 'stable';
    
    if (isDSPMode) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.backgroundColor = 'black';
      document.documentElement.style.transition = 'background-color 700ms';
    } else {
      document.documentElement.style.backgroundColor = '';
      document.body.style.overflow = '';
    }
    return () => { 
      document.body.style.overflow = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, [isDSPMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeClass = `transition-all duration-700 ${isDSPMode ? 'opacity-0 blur-sm pointer-events-none' : 'opacity-100'}`;

  return (
    <>
      {/* Black Background Overlay for DSP Mode */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-700 z-20 ${isDSPMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* DSP Visualizer */}
      <DSPVisualizer isActive={isDSPMode} />


      <div className="min-h-screen p-8 md:p-16 space-y-24 max-w-5xl mx-auto relative">

      {/* Header / Contact */}
      <header className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="space-y-4 relative">
          <div className="relative inline-block">
            <h1
              ref={titleRef}
              onMouseEnter={() => setIsDSPMode(true)}
              onMouseLeave={() => setIsDSPMode(false)}
              onClick={() => isDSPMode && triggerFrameReassign()}
              className={`text-4xl md:text-5xl font-bold tracking-tighter transition-colors duration-700 ${isDSPMode ? 'text-white z-50 relative mix-blend-normal cursor-pointer' : 'text-black cursor-default'}`}
            >
              Maor Assayag
            </h1>

             {/* DSP Mode Text Reveal */}
             <div className={`absolute top-full left-0 mt-12 text-gray-400 font-mono font-light text-xl md:text-xl leading-relaxed transition-all duration-1000 z-50 max-w-6xl ${isDSPMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
               <p className="mt-4">FFT is, to me, the <span className="font-bold text-gray-200">most elegant description</span> of nature’s song.</p>
              <p className="mt-4">I've dreamt about this song many, many times.</p>
              </div>
          </div>

          <p className={`text-lg md:text-xl text-gray-500 font-light tracking-wide ${fadeClass}`}>
            Seeking a senior R&D role to drive innovation and create positive social impact.
          </p>
        </div>

        <div className={`flex flex-wrap gap-4 ${fadeClass}`}>
          <Button variant="outline" className="rounded-full border-black/10 hover:bg-black hover:text-white transition-all" asChild>
            <a href="https://github.com/MaorAssayag" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" className="rounded-full border-black/10 hover:bg-black hover:text-white transition-all" asChild>
            <a href="https://linkedin.com/in/maorassayag" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" className="rounded-full border-black/10 hover:bg-black hover:text-white transition-all" asChild>
            <a href="mailto:msg.maor@gmail.com">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </a>
          </Button>
          <Button variant="outline" className="rounded-full border-black/10 hover:bg-black hover:text-white transition-all" asChild>
            <a href="assets/Maor_Assayag_Resume.pdf" download>
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </a>
          </Button>
          <Button variant="outline" className="rounded-full border-black/10 hover:bg-black hover:text-white transition-all" asChild>
            <a href="tel:+972532794699">
              <Phone className="w-4 h-4 mr-2" />
              Call Me
            </a>
          </Button>
        </div>
      </header>

      {/* Experience */}
      <section className={`space-y-12 ${fadeClass}`}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Experience</h2>

        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl space-y-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4" style={{ animationDuration: '800ms', animationFillMode: 'both' }}>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <div>
                <h3 className="text-2xl font-bold">R&D Team Lead</h3>
                <p className="text-gray-500">Israeli Navy R&D Center</p>
              </div>
              <span className="text-base font-mono text-gray-400">May 2020 – June 2025</span>
            </div>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc list-inside marker:text-gray-300">
              <li>Led research, design, architecture, development, evaluation, integration, and maturation of communication sysetems</li>
              <li>Leading teams of 15-20 programmers, engineers and QA.</li>
              <li>My passion is to create. Dedicating years to 17-hour workdays and delivering ∼45k LOC per year.</li>
              <li>Brought novel ideas from initial conception through R&D phases to successful deployment in new operational combat systems.</li>
              <li>Designed and developed features of 35+ core microservices using RESTful API, Websocket, Kotlin, Java, Python, Golang, C#, C++, NodeJS, Angular, TypeScript</li>
              <li>Leading research in DSP projects, including RF communication system detection and decoding through spectrum analysis and advanced entropy theory in challenging environments (low SNR, Doppler effects, etc.)</li>
              <li>Designed and implemented custom communication protocols (encoding, compression, parsing, fragmentation, and encryption) over various RF bands/Satellite</li>
              <li>Led orchestration solution engineering for real-time operational combat systems using Nomad, Consul, and Vault</li>
              <li>Managed CI/CD process using Git, Jfrog Artifactory, Azure DevOps, and Docker</li>
              <li>Interviewed 300+ young talents for unit enrollment across various roles</li>
            </ul>
          </div>

          <div className="glass p-8 rounded-3xl space-y-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <div>
                <h3 className="text-2xl font-bold">UI/UX Director</h3>
                <p className="text-gray-500">Israeli Navy R&D Center</p>
              </div>
              <span className="text-base font-mono text-gray-400">Oct 2020 – June 2025</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Led UI/UX design for combat systems, standardizing pixel-perfect design patterns and components across teams and systems to accelerate development velocity
            </p>
          </div>

          <div className="glass p-8 rounded-3xl space-y-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <div>
                <h3 className="text-2xl font-bold">Full-Stack Engineer</h3>
                <p className="text-gray-500">Israeli Navy R&D Center</p>
              </div>
              <span className="text-base font-mono text-gray-400">Oct 2019 – June 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className={`space-y-8 ${fadeClass}`}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Education</h2>
        <div className="grid md:grid-cols-1 gap-6">
          <div className="glass p-8 rounded-3xl space-y-4 relative overflow-hidden group">
            <div className="absolute inset-0 pointer-events-none">
              {/* Sperm whale with emitting signals SVG - positioned to the right */}
              <svg className="absolute right-0 top-0 w-64 h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                {/* Signal waves emanating from whale */}
                <circle cx="320" cy="100" r="30" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" className="animate-whale-signal" />
                <circle cx="320" cy="100" r="30" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" className="animate-whale-signal" style={{ animationDelay: '1s' }} />
                <circle cx="320" cy="100" r="30" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" className="animate-whale-signal" style={{ animationDelay: '2s' }} />

                {/* Additional signal arcs for more visual depth */}
                <path d="M 320 100 Q 300 80 280 60" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" strokeDasharray="5,5">
                  <animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M 320 100 Q 300 120 280 140" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" strokeDasharray="5,5">
                  <animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="indefinite" begin="1.5s" />
                </path>
                <path d="M 320 100 Q 340 80 360 60" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" strokeDasharray="5,5">
                  <animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="indefinite" begin="0.75s" />
                </path>
                <path d="M 320 100 Q 340 120 360 140" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" strokeDasharray="5,5">
                  <animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="indefinite" begin="2.25s" />
                </path>

                {/* Sperm whale body */}
                <g transform="translate(300, 90)">
                  {/* Whale body */}
                  <ellipse cx="20" cy="10" rx="35" ry="12" fill="rgba(30, 58, 138, 0.4)" />
                  {/* Whale head */}
                  <ellipse cx="0" cy="10" rx="20" ry="15" fill="rgba(30, 58, 138, 0.5)" />
                  {/* Eye */}
                  <circle cx="8" cy="8" r="2" fill="rgba(255, 255, 255, 0.8)" />
                  {/* Signal origin point (forehead) */}
                  <circle cx="10" cy="5" r="3" fill="rgba(59, 130, 246, 0.6)">
                    <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
                <div>
                  <h3 className="text-xl font-bold">Master of Science in Marine Technologies</h3>
                  <p className="text-gray-500">University of Haifa</p>
                </div>
                <span className="text-base font-mono text-gray-400">2023-2025</span>
              </div>
              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
                <li>Subjects in the field of DSP and ML/DL</li>
                <li>Research on predictive models uncovering temporal dependencies in sperm whale communication</li>
              </ul>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl space-y-4">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
              <div>
                <h3 className="text-xl font-bold">Bachelor of Science in Computer Engineering</h3>
                <p className="text-gray-500">Ben-Gurion University</p>
              </div>
              <span className="text-base font-mono text-gray-400">2015-2019</span>
              </div>
              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
              <li>Developed a communication system for deaf-blind people as the final engineering project</li>              </ul>
          </div>
        </div>
      </section>

      {/* Open Source Projects */}
      <section className={`space-y-8 ${fadeClass}`}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Open Source Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* transmit-OFDM */}
          <div className="glass p-6 rounded-3xl space-y-4 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
              {/* Underwater waves SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 170" preserveAspectRatio="none">
                <path fill="rgba(0,255,255,0.3)" className="animate-wave" d="M-100,96L-52,112C-4,128,92,160,188,160C284,160,380,128,476,112C572,96,668,96,764,112C860,128,956,160,1052,160C1148,160,1244,128,1340,112L1436,96L1436,320L1340,320C1244,320,1148,320,1052,320C956,320,860,320,764,320C668,320,572,320,476,320C380,320,284,320,188,320C92,320,-4,320,-52,320L-100,320Z"></path>
                <path fill="rgba(0,255,255,0.2)" className="animate-wave" style={{ animationDelay: '0.5s' }} d="M-100,160L-52,176C-4,192,92,224,188,224C284,224,380,192,476,176C572,160,668,160,764,176C860,192,956,224,1052,224C1148,224,1244,192,1340,176L1436,160L1436,320L1340,320C1244,320,1148,320,1052,320C956,320,860,320,764,320C668,320,572,320,476,320C380,320,284,320,188,320C92,320,-4,320,-52,320L-100,320Z"></path>
                <path fill="rgba(0,255,255,0.1)" className="animate-wave" style={{ animationDelay: '1s' }} d="M-100,224L-52,240C-4,256,92,288,188,288C284,288,380,256,476,240C572,224,668,224,764,240C860,256,956,288,1052,288C1148,288,1244,256,1340,240L1436,224L1436,320L1340,320C1244,320,1148,320,1052,320C956,320,860,320,764,320C668,320,572,320,476,320C380,320,284,320,188,320C92,320,-4,320,-52,320L-100,320Z"></path>
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">transmit-OFDM</h3>
                <Badge>Python</Badge>
              </div>
              <p className="mt-2 text-gray-600">
                Orthogonal Frequency Division Multiplexing for acoustic modem transmission
              </p>
              <Button variant="link" className="mt-2 p-0" asChild>
                <a href="https://github.com/MaorAssayag/transmit-OFDM" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Project
                </a>
              </Button>
            </div>
          </div>

          {/* ngx-beautify-cursor */}
          <div className="glass p-8 rounded-3xl space-y-4 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              {/* Cursor glow SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="animate-glow">
                  <animate attributeName="r" values="40;45;40" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" className="animate-glow">
                  <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" className="animate-glow">
                  <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">ngx-beautify-cursor</h3>
                <Badge>Angular</Badge>
              </div>
              <p className="mt-2 text-gray-600">
                Angular package to enhance and customize website cursors
              </p>
              <Button variant="link" className="mt-2 p-0" asChild>
                <a href="https://github.com/MaorAssayag/ngx-beautify-cursor" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Project
                </a>
              </Button>
            </div>
          </div>

          {/* chartjs-plugin-cyclic-axis */}
          <div className="glass p-8 rounded-3xl space-y-4  group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
              {/* Rotating grid SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <g className="animate-rotate">
                  <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <line x1="25" y1="0" x2="25" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <line x1="75" y1="0" x2="75" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                </g>
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">chartjs-plugin-cyclic-axis</h3>
                <Badge>JavaScript</Badge>
              </div>
              <p className="mt-2 text-gray-600">
                Chart.js plugin for cyclic pan functionality in scatter charts
              </p>
              <Button variant="link" className="mt-2 p-0" asChild>
                <a href="https://github.com/MaorAssayag/chartjs-plugin-cyclic-axis" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Project
                </a>
              </Button>
            </div>
          </div>

          {/* morse-deep-learning */}
          <div className="glass p-8 rounded-3xl space-y-4 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
              {/* Morse code dots and dashes SVG */}
              <svg className="absolute bottom-0 right-0 w-48 h-48" viewBox="-10 0 140 100" preserveAspectRatio="none">
                {/* Detection border */}
                <rect x="25" y="70" width="80" height="20" fill="none" stroke="rgba(234,179,8,0.6)" strokeWidth="2" className="animate-wave">
                  <animate attributeName="x" values="25;30;25" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="y" values="70;72;70" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="width" values="80;85;80" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="height" values="20;22;20" dur="2s" repeatCount="indefinite" />
                </rect>
                <g className="animate-morse">
                  <circle cx="30" cy="80" r="2" fill="rgba(0,0,0,0.5)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <rect x="40" y="78" width="8" height="4" fill="rgba(0,0,0,0.5)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
                  </rect>
                  <circle cx="55" cy="80" r="2" fill="rgba(0,0,0,0.5)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <rect x="65" y="78" width="8" height="4" fill="rgba(0,0,0,0.5)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
                  </rect>
                </g>
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">morse-deep-learning</h3>
                <Badge>Python</Badge>
              </div>
              <p className="mt-2 text-gray-600">
                Morse code signals detection and decoding using deep learning models (LSTM-RNN & RCNN).
              </p>
              <Button variant="link" className="mt-2 p-0" asChild>
                <a href="https://github.com/MaorAssayag/morse-deep-learning-detect-and-decode" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Project
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className={`space-y-4 ${fadeClass}`}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Awards & Honors</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="glass p-6 rounded-2xl flex justify-between items-center hover:bg-white/80 transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-end opacity-10 pointer-events-none">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/university_of_haifa.png`}
                alt="University of Haifa"
                className="w-48 h-48 object-contain transition-all duration-500"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-medium">University of Haifa Master's Outstanding Excellence Award</h3>
              <p className="text-gray-500">2025</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex justify-between items-center hover:bg-white/80 transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-end opacity-10 pointer-events-none">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/idf_logo.png`}
                alt="IDF"
                className="w-48 h-48 object-contain transition-all duration-500"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-medium">IDF Chief of the General Staff Excellence Technological Award</h3>
              <p className="text-gray-500">2023</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex justify-between items-center hover:bg-white/80 transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-end opacity-10 pointer-events-none">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/IsraeliNavy.png`}
                alt="Israeli Navy"
                className="w-48 h-48 object-contain transition-all duration-500"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-medium">Israeli Navy Commander in Chief Award for Creativity, Innovation and Excellence</h3>
              <p className="text-gray-500">2022</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex justify-between items-center hover:bg-white/80 transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-end opacity-10 pointer-events-none">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/IsraeliNavy.png`}
                alt="Israeli Navy"
                className="w-48 h-48 object-contain transition-all duration-500"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-medium">Israeli Navy R&D Brigade Excellence Award</h3>
              <p className="text-gray-500">2022</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex justify-between items-center hover:bg-white/80 transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-end opacity-10 pointer-events-none">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/IsraeliNavy.png`}
                alt="Israeli Navy"
                className="w-48 h-48 object-contain transition-all duration-500"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-medium">Israeli Navy Control Unit Commander Special Contribution Commendation</h3>
              <p className="text-gray-500">2022</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex justify-between items-center hover:bg-white/80 transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-end opacity-10 pointer-events-none">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/IsraeliNavy.png`}
                alt="Israeli Navy"
                className="w-48 h-48 object-contain transition-all duration-500"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-medium">Israeli Navy Computer and Software Development Center Excellence Award</h3>
              <p className="text-gray-500">2021</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex justify-between items-center hover:bg-white/80 transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-end opacity-10 pointer-events-none">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/Ben-Gurion_University_of_the_Negev.png`}
                alt="Ben-Gurion University"
                className="w-48 h-48 object-contain transition-all duration-500"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-medium">Ben-Gurion University B.Sc Engineering Project Departmental Representative & Audience Favorite</h3>
              <p className="text-gray-500">2019</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Contact Buttons */}
      <div className={`flex justify-center gap-4 ${fadeClass}`}>
        <Button variant="outline" className="rounded-full border-black/10 hover:bg-black hover:text-white transition-all" asChild>
          <a href="assets/Maor_Assayag_Resume.pdf" download>
            <Download className="w-4 h-4 mr-2" />
            Resume
          </a>
        </Button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 glass p-4 rounded-full transition-all duration-300 z-50 ${isDSPMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-black" />
        </button>
      )}
      </div>
    </>
  );
}