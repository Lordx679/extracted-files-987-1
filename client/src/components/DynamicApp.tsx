import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Crown, User, Mail, ExternalLink, MapPin, Calendar, Clock, Globe, Star, Heart, Gamepad2, Eye, Zap, Terminal, Code, Shield } from 'lucide-react';
import { useDiscordAvatar } from '../hooks/useUserData';
import { useDynamicTheme } from '../contexts/DynamicThemeContext';

export default function DynamicApp() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('welcome');
  const [showWelcome, setShowWelcome] = useState(true);
  const [avatarError, setAvatarError] = useState(false);
  const [glitchText, setGlitchText] = useState('LORD');

  const { avatar, loading: avatarLoading, refreshAvatar } = useDiscordAvatar();
  const { palette, loading: themeLoading } = useDynamicTheme();
  const avatarUrl = avatar?.avatarUrl || "/e9c4e804b0c546262bd2bc03f593648d.jpg";

  const handleAvatarClick = () => {
    refreshAvatar();
  };

  // Glitch text effect
  useEffect(() => {
    const glitchChars = ['L0RD', 'L◊RD', 'LØR∂', 'LORD', '£ORD', 'L0R∂'];
    let glitchInterval: NodeJS.Timeout;
    
    const startGlitch = () => {
      let count = 0;
      glitchInterval = setInterval(() => {
        setGlitchText(glitchChars[Math.floor(Math.random() * glitchChars.length)]);
        count++;
        if (count > 5) {
          setGlitchText('LORD');
          clearInterval(glitchInterval);
          setTimeout(startGlitch, 3000 + Math.random() * 2000);
        }
      }, 100);
    };

    const initialDelay = setTimeout(startGlitch, 2000);
    
    return () => {
      clearTimeout(initialDelay);
      clearInterval(glitchInterval);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
      setActiveSection('about');
    }, 3000);

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
      username: '1c.2',
      glow: 'hover:shadow-[0_0_30px_#5865f2]'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://www.instagram.com/lordx679', 
      username: '@lordx679',
      glow: 'hover:shadow-[0_0_30px_#e4405f]'
    },
    { 
      name: 'Roblox', 
      icon: Gamepad2, 
      url: 'https://www.roblox.com/users/profile?username=aoufabok', 
      username: 'aoufabok',
      glow: 'hover:shadow-[0_0_30px_#00a2ff]'
    },
  ];

  const skills = [
    { 
      icon: Terminal, 
      title: 'Automation', 
      desc: 'Discord bots & AI systems',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      icon: Shield, 
      title: 'Security', 
      desc: 'Penetration testing & analysis',
      color: 'from-red-500 to-pink-500'
    },
    { 
      icon: Code, 
      title: 'Development', 
      desc: 'Full-stack web architecture',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  // Welcome Screen - Futuristic
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Holographic Crown */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto mb-6 relative animate-float">
              <Crown className="w-full h-full text-cyan-400 drop-shadow-[0_0_30px_#00ffff] animate-pulse-slow" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Glitch Text */}
          <div className="space-y-6">
            <h1 className="text-8xl lg:text-9xl font-black text-white drop-shadow-2xl glitch-text">
              I AM
            </h1>
            <div className="text-6xl lg:text-8xl font-black text-cyan-400 glitch-text animate-pulse-slow">
              {glitchText}
            </div>
            <h2 className="text-3xl lg:text-4xl font-light text-white/80 animate-fade-in-up">
              Digital Architect
            </h2>
          </div>

          {/* Loading Bar */}
          <div className="mt-16">
            <div className="w-80 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-loading-bar shadow-[0_0_20px_#00ffff]"></div>
            </div>
            <p className="text-cyan-400 text-lg mt-6 animate-pulse font-light">
              Initializing...
            </p>
          </div>
        </div>

        {/* Scan Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="scan-lines"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="grid-pattern opacity-10"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="scan-lines opacity-5"></div>
      </div>

      {/* Futuristic Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center relative animate-pulse-slow">
                <Crown className="h-6 w-6 text-black" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur-lg animate-pulse"></div>
              </div>
              <span className="text-2xl font-black text-cyan-400 glitch-text">{glitchText}</span>
            </div>
            
            <div className="flex items-center space-x-6">
              {[
                { key: 'about', label: 'DOMAIN', icon: Terminal },
                { key: 'connect', label: 'CONNECT', icon: Zap }
              ].map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                    activeSection === section.key 
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_#00ffff]' 
                      : 'text-white/70 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  <span className="text-sm">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative z-10">
        {/* About Section - Futuristic Domain */}
        {activeSection === 'about' && (
          <div className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-5xl mx-auto">
              
              {/* Hero Section */}
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto mb-8 relative animate-float">
                    <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl p-1 animate-pulse-slow">
                      <div className="w-full h-full bg-black rounded-xl flex items-center justify-center overflow-hidden relative">
                        {!avatarError ? (
                          <img 
                            src={avatarUrl} 
                            alt="LORD Avatar"
                            className="w-full h-full object-cover rounded-xl transition-all duration-500 hover:scale-110"
                            onLoad={() => setAvatarError(false)}
                            onError={() => setAvatarError(true)}
                            onClick={handleAvatarClick}
                          />
                        ) : (
                          <Crown className="h-16 w-16 text-cyan-400 animate-pulse-slow" />
                        )}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-xl animate-pulse"></div>
                  </div>
                  
                  <h1 className="text-6xl lg:text-7xl font-black text-white mb-4 glitch-text">
                    I AM <span className="text-cyan-400">{glitchText}</span>
                  </h1>
                  <p className="text-xl text-cyan-400 font-light animate-pulse-slow">
                    Digital Architect
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="flex justify-center gap-8 text-sm text-white/80 mb-12 animate-fade-in-up">
                  <div className="flex items-center space-x-2 animate-bounce-slow">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    <span>LORDX679</span>
                  </div>
                  <div className="flex items-center space-x-2 animate-bounce-slow" style={{animationDelay: '0.5s'}}>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    <span>Italy</span>
                  </div>
                  <div className="flex items-center space-x-2 animate-bounce-slow" style={{animationDelay: '1s'}}>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.title}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-cyan-500/20 p-6 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:rotate-1 animate-fade-in-up"
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                         style={{background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`}}></div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <skill.icon className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {skill.title}
                      </h3>
                      <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                        {skill.desc}
                      </p>
                    </div>
                    
                    {/* Hover Effect Lines */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                ))}
              </div>

              {/* Quote Section */}
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-cyan-400/10 rounded-2xl blur-xl animate-pulse"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30">
                    <p className="text-2xl text-cyan-400 font-light italic mb-4 animate-pulse-slow">
                      "The future belongs to those who code it"
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <Crown className="w-5 h-5 text-cyan-400 animate-spin-slow" />
                      <span className="text-cyan-400 font-bold">- LORD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center animate-fade-in-up">
                <button 
                  onClick={() => setActiveSection('connect')}
                  className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-xl font-bold text-black overflow-hidden hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-[0_0_40px_#00ffff]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center space-x-2">
                    <Zap className="w-6 h-6 group-hover:animate-spin" />
                    <span>ENTER DOMAIN</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Connect Section - Chill Interface */}
        {activeSection === 'connect' && (
          <div className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-4xl mx-auto">
              
              {/* Header */}
              <div className="text-center mb-16 animate-fade-in-up">
                <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 glitch-text">
                  CONNECT <span className="text-cyan-400">PROTOCOL</span>
                </h1>
                <p className="text-lg text-white/60 font-light">
                  Choose your interface
                </p>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4 animate-pulse"></div>
              </div>

              {/* Social Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-cyan-500/20 p-6 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:-rotate-1 ${link.glow} animate-fade-in-up`}
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <link.icon className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-cyan-400 font-mono text-sm mb-2">
                        {link.username}
                      </p>
                      <ExternalLink className="w-4 h-4 text-white/40 mx-auto group-hover:text-cyan-400 transition-colors" />
                    </div>
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500"></div>
                  </a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="text-center animate-fade-in-up">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-cyan-400/10 rounded-2xl blur-xl animate-pulse"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <Mail className="w-5 h-5 text-cyan-400 animate-pulse-slow" />
                      <span className="text-cyan-400 font-mono">ibraff739@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <MapPin className="w-4 h-4 text-white/60" />
                      <span className="text-white/60 text-sm">Italy • Always Online</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Display */}
              <div className="mt-12 text-center animate-fade-in-up">
                <div className="inline-flex items-center space-x-4 bg-black/60 backdrop-blur-xl rounded-full px-6 py-3 border border-green-500/30">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  <span className="text-green-400 font-mono text-sm">SYSTEM_ONLINE</span>
                  <span className="text-white/40 text-xs">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}