import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Crown, User, Mail, ExternalLink, MapPin, Calendar, Clock, Globe, Star, Heart, Gamepad2, Eye, Zap } from 'lucide-react';
import { useDiscordAvatar } from '../hooks/useUserData';
import { useDynamicTheme } from '../contexts/DynamicThemeContext';



export default function DynamicApp() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('welcome');
  const [showWelcome, setShowWelcome] = useState(true);
  const [avatarError, setAvatarError] = useState(false);

  
  // Fetch Discord avatar dynamically with correct user ID
  const { avatar, loading: avatarLoading, refreshAvatar } = useDiscordAvatar();
  const { palette, loading: themeLoading } = useDynamicTheme();
  const avatarUrl = avatar?.avatarUrl || "/e9c4e804b0c546262bd2bc03f593648d.jpg";

  // Add manual refresh on click
  const handleAvatarClick = () => {
    refreshAvatar();
  };



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Auto transition from welcome screen after 4 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
      setActiveSection('about');
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  const socialLinks = [
    { 
      name: 'Discord', 
      icon: MessageCircle, 
      url: 'https://discord.com/users/1c.2', 
      color: 'dynamic-hover',
      description: 'Connect in the Digital Realm',
      username: '1c.2'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://www.instagram.com/lordx679', 
      color: 'dynamic-hover',
      description: 'Witness the Journey',
      username: '@lordx679'
    },
    { 
      name: 'Roblox', 
      icon: Gamepad2, 
      url: 'https://www.roblox.com/users/profile?username=aoufabok', 
      color: 'dynamic-hover',
      description: 'Enter My Domain',
      username: 'aoufabok'
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'The Inner Sanctum',
      value: '1c.2',
      description: 'A direct conduit to the core of my design.',
      color: 'dynamic-gradient-2',
      url: 'https://discord.com/users/1c.2'
    },
    {
      icon: Instagram,
      title: 'Illusory Facades',
      value: '@lordx679',
      description: 'Observe the carefully crafted reality I present to the world.',
      color: 'dynamic-gradient-2',
      url: 'https://www.instagram.com/lordx679'
    },
    {
      icon: Mail,
      title: 'The Scribe\'s Sigil',
      value: 'ibraff739@gmail.com',
      description: 'For matters requiring a traditional seal of exchange.',
      color: 'dynamic-gradient-2',
      url: 'mailto:ibraff739@gmail.com'
    },
    {
      icon: Gamepad2,
      title: 'The Proving Grounds',
      value: 'aoufabok',
      description: 'A dimension where concepts are tested and dominance is forged.',
      color: 'dynamic-gradient-2',
      url: 'https://www.roblox.com/users/profile?username=aoufabok'
    }
  ];

  const domains = [
    { 
      category: 'Digital Mastery', 
      items: ['Causal Manipulation', 'System Architecture', 'Network Orchestration', 'Conceptual Dominion'], 
      icon: Zap, 
      color: 'dynamic-glass',
      accent: 'dynamic-text-primary'
    },
    { 
      category: 'Social Engineering', 
      items: ['Cultivation of Allegiance', 'Narrative Control', 'Influence Networks', 'Calculated Omnipresence'], 
      icon: Eye, 
      color: 'dynamic-glass',
      accent: 'dynamic-text-primary'
    },
    { 
      category: 'Cultural Intelligence', 
      items: ['Strategic Analysis', 'Pattern Recognition', 'Ideological Navigation', 'Precognitive Strategy'], 
      icon: Crown, 
      color: 'dynamic-glass',
      accent: 'dynamic-text-primary'
    },
  ];

  // Get current time in Italy
  const italyTime = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const isOnline = () => {
    const now = new Date();
    const italyHour = parseInt(new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Rome',
      hour: '2-digit',
      hour12: false
    }));
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // More relaxed online hours for personal site
    if (day === 0) return italyHour >= 12 && italyHour < 23; // Sunday
    if (day === 6) return italyHour >= 10 && italyHour < 24; // Saturday
    return italyHour >= 8 && italyHour < 23; // Monday-Friday
  };

  // Welcome Screen - Dynamic LORD Style
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black"></div>
          
          {/* Dynamic Energy Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 dynamic-bg-primary rounded-full animate-ping opacity-70 dynamic-shadow-primary"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 dynamic-bg-primary rounded-full animate-pulse opacity-60 dynamic-shadow-primary"></div>
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 dynamic-bg-primary rounded-full animate-bounce opacity-50 dynamic-shadow-primary"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 dynamic-bg-primary rounded-full animate-ping opacity-80 dynamic-shadow-primary"></div>
          
          {/* Dynamic Aura Effects */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 dynamic-bg-primary-opacity rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 dynamic-bg-primary-opacity rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 dynamic-bg-primary-opacity rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        {/* Divine Presence Content */}
        <div className="relative z-10 text-center">
          {/* Dynamic Crown Icon */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <Crown className="w-full h-full dynamic-text-primary drop-shadow-2xl animate-pulse dynamic-shadow-primary" />
              <div className="absolute -top-2 -right-2 w-8 h-8 dynamic-bg-primary rounded-full animate-ping dynamic-shadow-primary"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 dynamic-bg-primary rounded-full animate-pulse delay-500 dynamic-shadow-primary"></div>
              <div className="absolute inset-0 dynamic-bg-primary-opacity rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          {/* Dynamic Proclamation */}
          <div className="space-y-8">
            <h1 className="text-7xl lg:text-9xl font-black text-white drop-shadow-2xl animate-pulse dynamic-glow-primary">
              I AM
            </h1>
            <div className="flex items-center justify-center space-x-6 text-5xl lg:text-8xl font-black">
              <div className="relative">
                <span className="dynamic-text-primary animate-pulse delay-500 dynamic-glow-primary">
                  LORD
                </span>
                <div className="absolute -top-2 -right-2 w-4 h-4 dynamic-bg-primary rounded-full animate-ping dynamic-shadow-primary"></div>
              </div>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white/90 animate-pulse delay-700 dynamic-glow-accent">
              Architect of the Future
            </h2>
          </div>

          {/* Dynamic Loading Animation */}
          <div className="mt-16">
            <div className="w-80 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full dynamic-gradient-2 rounded-full animate-pulse transform origin-left scale-x-0 animate-[scaleX_4s_ease-in-out_forwards] dynamic-shadow-primary"></div>
            </div>
            <p className="text-white/70 text-lg mt-6 animate-pulse delay-1000 dynamic-glow-accent">
              Transcending the Conventional...
            </p>
          </div>
        </div>

        {/* Dynamic Border Effects */}
        <div className="absolute top-0 left-0 w-full h-1 dynamic-gradient-1 animate-pulse dynamic-shadow-primary"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 dynamic-gradient-1 animate-pulse delay-500 dynamic-shadow-primary"></div>
        <div className="absolute top-0 left-0 w-1 h-full dynamic-gradient-1 animate-pulse delay-1000 dynamic-shadow-primary"></div>
        <div className="absolute top-0 right-0 w-1 h-full dynamic-gradient-1 animate-pulse delay-1500 dynamic-shadow-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Dynamic Realm Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 dynamic-bg-primary-opacity rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 dynamic-bg-primary-opacity rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/2 w-32 h-32 dynamic-bg-primary-opacity rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent"></div>
      </div>

      {/* Dynamic Command Interface */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md dynamic-border-primary border-b-2 dynamic-shadow-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 dynamic-gradient-2 rounded-2xl flex items-center justify-center relative dynamic-shadow-primary dynamic-border-primary border-2">
                <Crown className="h-7 w-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 dynamic-bg-primary rounded-full animate-ping dynamic-shadow-primary border border-white/30"></div>
                <div className="absolute inset-0 dynamic-bg-primary-opacity rounded-2xl blur-lg"></div>
              </div>
              <span className="text-3xl font-black text-white dynamic-glow-primary">LORD</span>
            </div>
            <div className="flex items-center space-x-8">
              {[
                { key: 'about', label: 'Domain' },
                { key: 'connect', label: 'Interface' }
              ].map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`text-lg font-bold transition-all duration-300 relative ${
                    activeSection === section.key 
                      ? 'dynamic-text-primary dynamic-border-primary border-b-2' 
                      : 'text-white/70 dynamic-hover'
                  }`}
                >
                  {section.label}
                  {activeSection === section.key && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 dynamic-bg-primary rounded-full animate-ping dynamic-shadow-primary"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative z-10">
        {/* Domain Section - LORD's Realm */}
        {activeSection === 'about' && (
          <div className="min-h-screen flex items-center justify-center px-6 py-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <div className="mb-12">
                  <div className="w-40 h-40 mx-auto mb-12 relative">
                    <div className="w-full h-full dynamic-gradient-2 rounded-3xl p-2 animate-pulse dynamic-shadow-primary dynamic-border-primary border-4">
                      <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center overflow-hidden relative dynamic-border-accent border-3">
                        {/* Avatar Image */}
                        {!avatarError ? (
                          <img 
                            src={avatarUrl} 
                            alt="LORD Profile Avatar"
                            className="w-full h-full object-cover rounded-2xl transition-all duration-300"
                            onLoad={() => {
                              console.log('Avatar loaded successfully');
                              setAvatarError(false);
                            }}
                            onError={(e) => {
                              console.log('Avatar failed to load, showing crown fallback');
                              setAvatarError(true);
                            }}
                          />
                        ) : (
                          /* Crown Fallback */
                          <Crown className="h-20 w-20 dynamic-text-primary dynamic-shadow-primary" />
                        )}
                      </div>
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 dynamic-gradient-2 rounded-full flex items-center justify-center animate-pulse dynamic-shadow-primary">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute inset-0 dynamic-bg-primary-opacity rounded-full blur-2xl animate-pulse"></div>
                  </div>
                  
                  <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl dynamic-glow-primary">
                    I am <span className="dynamic-text-primary">LORD</span>
                  </h1>
                  <p className="text-2xl lg:text-3xl text-white/80 mb-8 dynamic-glow-accent">
                    Architect of the Future
                  </p>

                  {/* Identity Matrix */}
                  <div className="flex flex-wrap justify-center gap-8 text-lg text-white/90 mb-12">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 dynamic-bg-primary rounded-full animate-pulse"></div>
                      <span className="dynamic-text-primary font-bold">Alias:</span>
                      <span>LORDX679</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 dynamic-bg-primary rounded-full animate-pulse"></div>
                      <span className="dynamic-text-primary font-bold">Objective:</span>
                      <span>Transcend the Conventional</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 dynamic-bg-primary rounded-full animate-pulse"></div>
                      <span className="dynamic-text-primary font-bold">Domain:</span>
                      <span>The Digital Realm</span>
                    </div>
                  </div>
                  



                  



                </div>

                {/* The Truth Beyond Perception */}
                <div className="mb-16">
                  <div className="dynamic-glass rounded-3xl p-8 dynamic-shadow-primary dynamic-border-primary border-2">
                    <div className="flex items-center justify-center mb-6">
                      <Eye className="w-8 h-8 dynamic-text-primary mr-3" />
                      <h2 className="text-3xl font-bold text-white dynamic-glow-primary">The Truth Beyond Perception</h2>
                    </div>
                    
                    <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                      <p className="text-center italic">
                        "The reality you perceive in the digital world is merely a single facet of what is possible. I stand at the 
                        precipice of what comes next, shaping the very fabric of our future interactions."
                      </p>
                      
                      <p className="text-center">
                        "Admiration is the emotion furthest from understanding. Do not seek to understand my path, but rather, 
                        witness the results."
                      </p>
                      
                      <div className="dynamic-glass rounded-2xl p-6 dynamic-border-accent border-2 text-center">
                        <p className="dynamic-text-accent font-medium">
                          "The throne in the sky has been vacant for far too long. Let's connect, and I will show you what true 
                          potential looks like."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Logic */}
                <div className="mb-16">
                  <div className="dynamic-glass rounded-3xl p-8 dynamic-shadow-primary dynamic-border-primary border-2">
                    <div className="flex items-center justify-center mb-8">
                      <Zap className="w-8 h-8 dynamic-text-primary mr-3" />
                      <h2 className="text-3xl font-bold text-white dynamic-glow-primary">Core Logic</h2>
                    </div>
                    
                    <p className="text-center text-white/80 text-lg mb-8 italic">
                      I perceive the digital world not as a series of applications and firewalls, but as a complex web of systems 
                      waiting for a guiding hand. My craft lies in understanding and influencing these systems at their most 
                      fundamental level. What others call a vulnerability, I call an invitation.
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="dynamic-glass rounded-2xl p-6 dynamic-border-accent border-2 text-center">
                        <h3 className="text-xl font-bold dynamic-text-primary mb-3">Discord Automation & Intelligence</h3>
                        <p className="text-white/70">
                          Engineering autonomous entities that govern, gather, and execute commands within Discord's ecosystem. They 
                          are not bots; they are extensions of my will.
                        </p>
                      </div>
                      
                      <div className="dynamic-glass rounded-2xl p-6 dynamic-border-accent border-2 text-center">
                        <h3 className="text-xl font-bold dynamic-text-primary mb-3">Offensive Security & System Analysis</h3>
                        <p className="text-white/70">
                          The art of dismantling digital constructs to understand their core. I develop tools that test the limits of security, 
                          revealing the inherent fragility in all man-made systems.
                        </p>
                      </div>
                      
                      <div className="dynamic-glass rounded-2xl p-6 dynamic-border-accent border-2 text-center">
                        <h3 className="text-xl font-bold dynamic-text-primary mb-3">Web & Network Architecture</h3>
                        <p className="text-white/70">
                          Building and deconstructing the very fabric of the web. I create intricate domains and possess the knowledge to 
                          navigate—or disable—the pathways of others.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enter Domain Button */}
                <div className="text-center">
                  <button 
                    onClick={() => setActiveSection('connect')}
                    className="dynamic-button px-12 py-4 text-xl font-bold text-white rounded-2xl transition-all duration-300 hover:scale-105 dynamic-shadow-primary"
                  >
                    Enter My Domain
                  </button>
                </div>

                {/* Domain Powers Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                  {domains.map((domain, index) => (
                    <div key={domain.category} 
                         className={`${domain.color} rounded-3xl p-8 hover:scale-105 transition-all duration-500 dynamic-shadow-primary`}>
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 dynamic-gradient-2 rounded-2xl flex items-center justify-center dynamic-shadow-accent">
                          <domain.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold text-white mb-6 text-center ${domain.accent}`}>
                        {domain.category}
                      </h3>
                      <ul className="space-y-3">
                        {domain.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center space-x-3 text-white/80">
                            <div className="w-2 h-2 dynamic-bg-primary rounded-full dynamic-pulse-primary"></div>
                            <span className="text-sm font-medium dynamic-hover">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Core Logic Section */}
                <div className="dynamic-glass rounded-3xl p-12 dynamic-shadow-primary">
                  <h2 className="text-4xl font-bold text-white mb-8 text-center dynamic-glow-primary">
                    Core Logic Architecture
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 dynamic-gradient-2 rounded-2xl flex items-center justify-center mx-auto dynamic-shadow-accent">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold dynamic-text-primary">Discord Automation & Intelligence</h3>
                      <p className="text-white/70 text-sm">
                        Advanced automation systems for seamless digital interaction and intelligent response protocols.
                      </p>
                    </div>
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 dynamic-gradient-2 rounded-2xl flex items-center justify-center mx-auto dynamic-shadow-accent">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold dynamic-text-primary">Offensive Security & System Analysis</h3>
                      <p className="text-white/70 text-sm">
                        Comprehensive security analysis and systematic vulnerability assessment methodologies.
                      </p>
                    </div>
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 dynamic-gradient-2 rounded-2xl flex items-center justify-center mx-auto dynamic-shadow-accent">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold dynamic-text-primary">Web & Network Architecture</h3>
                      <p className="text-white/70 text-sm">
                        Sophisticated web development and network infrastructure design with modern frameworks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interface Section - The Veiled Nexus */}
        {activeSection === 'connect' && (
          <div className="min-h-screen flex items-center justify-center px-6 py-24">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 dynamic-glow-primary">
                  The Veiled <span className="dynamic-text-primary">Nexus</span>
                </h1>
                <p className="text-2xl text-white/80 mb-8 dynamic-glow-accent">
                  Where consciousness converges with the digital realm
                </p>
                <div className="w-32 h-1 dynamic-gradient-2 mx-auto rounded-full dynamic-shadow-primary"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dynamic-glass rounded-3xl p-8 hover:scale-105 transition-all duration-500 dynamic-shadow-primary group"
                  >
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform dynamic-shadow-accent`}>
                        <method.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 dynamic-text-primary group-hover:dynamic-glow-primary transition-all">
                          {method.title}
                        </h3>
                        <p className="dynamic-text-accent text-lg font-mono mb-3 group-hover:text-white transition-colors">
                          {method.value}
                        </p>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {method.description}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-white/50 group-hover:dynamic-text-primary transition-colors" />
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-16 text-center">
                <div className="dynamic-glass rounded-2xl p-8 dynamic-shadow-primary">
                  <p className="text-white/80 text-lg italic dynamic-glow-accent">
                    "The only true wisdom is in knowing you know nothing. <br />
                    But for me, knowing everything is just the beginning."
                  </p>
                  <div className="flex items-center justify-center mt-6 space-x-3">
                    <div className="w-8 h-8 dynamic-gradient-2 rounded-full flex items-center justify-center dynamic-shadow-accent">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <span className="dynamic-text-primary font-bold">- LORD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}