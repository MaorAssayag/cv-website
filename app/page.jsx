import React from 'react';
import { Github, Linkedin, Mail, Phone, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Maor Assayag</h1>
          <p className="text-xl text-gray-600">
            Laser-focused on research and innovation to create a positive societal impact.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="outline" asChild>
              <a href="https://github.com/MaorAssayag" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://linkedin.com/in/maor-assayag" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:msg.maor@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>
          </div>
        </div>

        {/* Experience Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">R&D Team Lead</h3>
                    <p className="text-gray-600">Israeli Navy R&D Center</p>
                  </div>
                  <span className="text-gray-500">May 2020 – Present</span>
                </div>
                <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
                  <li>Conducting research, design, architecture, development, evaluation, integration, and maturation of communication systems</li>
                  <li>Designed and developed features of 20+ core microservices using RESTful API, Websocket, Kotlin, Java, Python, Golang, C#, C++, NodeJS, Angular, TypeScript</li>
                  <li>Leading research in DSP projects, including RF communication system detection and decoding through spectrum analysis and advanced entropy theory in challenging environments (low SNR, Doppler effects, etc.)</li>
                  <li>Designed and implemented custom communication protocols over various RF bands/Satellite</li>
                  <li>Led orchestration solution for real-time operational combat systems using Nomad, Consul, and Vault</li>
                  <li>Managed CI/CD process using Git, Jfrog Artifactory, Azure DevOps, and Docker</li>
                  <li>Interviewed 300+ young talents for unit enrollment across various roles</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">UI/UX Director</h3>
                    <p className="text-gray-600">Israeli Navy R&D Center</p>
                  </div>
                  <span className="text-gray-500">Oct 2020 – Present</span>
                </div>
                <p className="mt-4 text-gray-700">
                  Leading UI/UX design for operational and experimental communication combat systems, standardizing design patterns and components across teams and accelerating development velocity
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">Full-Stack Engineer</h3>
                    <p className="text-gray-600">Israeli Navy R&D Center</p>
                  </div>
                  <span className="text-gray-500">Oct 2019 – Present</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">Master of Science in Marine Technologies</h3>
                    <p className="text-gray-600">University of Haifa</p>
                  </div>
                  <span className="text-gray-500">2023-2025</span>
                </div>
                <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
                  <li>Subjects in the field of DSP and ML/DL</li>
                  <li>Research on predictive models uncovering temporal dependencies in sperm whale communication</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">Bachelor of Science in Computer Engineering</h3>
                    <p className="text-gray-600">Ben-Gurion University</p>
                  </div>
                  <span className="text-gray-500">2015-2019</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Open Source Projects */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Open Source Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="group relative overflow-hidden transform transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                {/* Underwater waves SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 05 50 500 170" preserveAspectRatio="none">
                  <path fill="rgba(0,255,255,0.3)" className="animate-wave" d="M-100,96L-52,112C-4,128,92,160,188,160C284,160,380,128,476,112C572,96,668,96,764,112C860,128,956,160,1052,160C1148,160,1244,128,1340,112L1436,96L1436,320L1340,320C1244,320,1148,320,1052,320C956,320,860,320,764,320C668,320,572,320,476,320C380,320,284,320,188,320C92,320,-4,320,-52,320L-100,320Z"></path>
                  <path fill="rgba(0,255,255,0.2)" className="animate-wave" style={{ animationDelay: '0.5s' }} d="M-100,160L-52,176C-4,192,92,224,188,224C284,224,380,192,476,176C572,160,668,160,764,176C860,192,956,224,1052,224C1148,224,1244,192,1340,176L1436,160L1436,320L1340,320C1244,320,1148,320,1052,320C956,320,860,320,764,320C668,320,572,320,476,320C380,320,284,320,188,320C92,320,-4,320,-52,320L-100,320Z"></path>
                  <path fill="rgba(0,255,255,0.1)" className="animate-wave" style={{ animationDelay: '1s' }} d="M-100,224L-52,240C-4,256,92,288,188,288C284,288,380,256,476,240C572,224,668,224,764,240C860,256,956,288,1052,288C1148,288,1244,256,1340,240L1436,224L1436,320L1340,320C1244,320,1148,320,1052,320C956,320,860,320,764,320C668,320,572,320,476,320C380,320,284,320,188,320C92,320,-4,320,-52,320L-100,320Z"></path>
                </svg>
              </div>
              <CardContent className="p-6 relative z-10">
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
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden transform transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                {/* Cursor glow SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" className="animate-glow">
                    <animate attributeName="r" values="40;45;40" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="animate-glow">
                    <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" className="animate-glow">
                    <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <CardContent className="p-6 relative z-10">
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
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden transform transition-all duration-200 hover:shadow-lg">
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
              <CardContent className="p-6 relative z-10">
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
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden transform transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                {/* Morse code dots and dashes SVG */}
                <svg className="absolute bottom-0 right-0 w-48 h-48" viewBox="-10 0 140 100" preserveAspectRatio="none">
                  {/* Detection border */}
                  <rect x="25" y="70" width="80" height="20" fill="none" stroke="rgba(0,255,0,0.3)" strokeWidth="2" className="animate-wave">
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
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">morse-deep-learning</h3>
                  <Badge>Python</Badge>
                </div>
                <p className="mt-2 text-gray-600">
                  Deep learning models to detect and decode Morse code signals
                </p>
                <Button variant="link" className="mt-2 p-0" asChild>
                  <a href="https://github.com/MaorAssayag/morse-deep-learning-detect-and-decode" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Project
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Awards Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Awards & Honors</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-end opacity-10">
                <img 
                  src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/university_of_haifa_logo.jpg`}
                  alt="University of Haifa"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="font-medium">University of Haifa Master's Outstanding Excellence Award</h3>
                  <p className="text-gray-500">2025</p>
                </div>
              </div>
            </div>

            <div className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-end opacity-10">
                <img 
                  src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/idf_logo.png`}
                  alt="IDF"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="font-medium">IDF Chief of the General Staff Excellence Technological Award</h3>
                  <p className="text-gray-500">2023</p>
                </div>
              </div>
            </div>

            <div className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-end opacity-10">
                <img 
                  src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/IsraeliNavy.png`}
                  alt="Israeli Navy"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="font-medium">Israeli Navy Commander in Chief Award for Creativity, Innovation and Excellence</h3>
                  <p className="text-gray-500">2022</p>
                </div>
              </div>
            </div>

            <div className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-end opacity-10">
                <img 
                  src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/IsraeliNavy.png`}
                  alt="Israeli Navy"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="font-medium">Israeli Navy R&D Brigade Excellence Award</h3>
                  <p className="text-gray-500">2022</p>
                </div>
              </div>
            </div>

            <div className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-end opacity-10">
                <img 
                  src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/IsraeliNavy.png`}
                  alt="Israeli Navy"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="font-medium">Israeli Navy Control Unit Commander Special Contribution Commendation</h3>
                  <p className="text-gray-500">2022</p>
                </div>
              </div>
            </div>

            <div className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-end opacity-10">
                <img 
                  src={`${process.env.NODE_ENV === 'production' ? '/cv-website' : ''}/assets/IsraeliNavy.png`}
                  alt="Israeli Navy"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="font-medium">Israeli Navy Computer and Software Development Center Excellence Award</h3>
                  <p className="text-gray-500">2021</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <div className="inline-flex items-center gap-4">
            <Button asChild>
              <a href="tel:+972532794699">
                <Phone className="w-4 h-4 mr-2" />
                Call Me
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="assets/Maor_Assayag_Resume.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
} 