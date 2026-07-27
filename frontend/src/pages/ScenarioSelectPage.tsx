import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { mockScenarios } from '../data/mockScenarios';
import type { Scenario, TargetLanguage } from '../types/scenario';
import { PageTransition } from '../components/layout/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Globe, 
  Play, 
  MessageSquare,
  Coffee,
  ShoppingBag,
  Briefcase,
  Car,
  UserCheck,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  BarChart3,
  Languages,
  Mic,
  Sliders,
  Menu,
  X,
  Search,
  Shuffle,
  Star,
  Volume2,
  TrendingUp,
  Award
} from 'lucide-react';

export const ScenarioSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectScenario } = useSession();
  
  // Default selected scenario: null (unselected initially)
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<TargetLanguage>('English');
  const [activeProficiency, setActiveProficiency] = useState<string>('Intermediate');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Favorites' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string | null>(null);
  const [selectedPersonaFilter, setSelectedPersonaFilter] = useState<string | null>(null);

  // Sync URL query params for language filter
  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam) {
      setSelectedLanguageFilter(langParam);
    }
  }, [searchParams]);

  // Favorites state
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('conversa_favorites') || '[]');
    } catch {
      return [];
    }
  });

  // Voice sample playback state
  const [isPlayingSample, setIsPlayingSample] = useState<boolean>(false);

  // Gamification Streak & XP state
  const [streakCount] = useState<number>(() => {
    const saved = localStorage.getItem('conversa_streak');
    return saved ? parseInt(saved, 10) : 3;
  });
  const [xpPoints] = useState<number>(() => {
    const saved = localStorage.getItem('conversa_xp');
    return saved ? parseInt(saved, 10) : 240;
  });

  // User Profile details modal state
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('conversa_favorites', JSON.stringify(next));
      return next;
    });
  };

  const playVoiceSample = () => {
    if (!selectedScenario || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    setIsPlayingSample(true);
    const sampleTexts: Record<string, string> = {
      'chai-stall': 'Kem cho bhai! Ketli cutting chai banavoon?',
      'market-haggling': 'Namaste ji! Yeh traditional jacket ekdum pure silk hai.',
      'job-interview': 'Hello! Welcome to the technical interview. Can you explain your React state architecture?',
      'rickshaw-ride': 'Ha bhai, Laxmi Vilas Palace chaloge? Meter se chalenge.',
      'kolkata-tram': 'Nomoshkar! College Street jabe? Ticket koto lagbe?',
      'delhi-chaat': 'Bhaiya spicy aloo tikki chaat bana do, meethi chutney kam daalna.',
      'chennai-auto': 'Vanakkam! Marina Beach poga mudiyuma?',
      'jalandhar-dhaba': 'Sat Sri Akal ji! Shahi paneer te tandoori roti laao.',
      'hyderabad-biryani': 'Aadab! Mutton biryani double masala ke saath chalegi.'
    };

    const text = sampleTexts[selectedScenario.id] || 'Namaste! Welcome to Conversa Speech Studio.';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingSample(false);
    utterance.onerror = () => setIsPlayingSample(false);
    window.speechSynthesis.speak(utterance);
  };

  // Sidebar Feature Dropdown Toggle States
  const [openLanguagesDropdown, setOpenLanguagesDropdown] = useState(true);
  const [openPersonasDropdown, setOpenPersonasDropdown] = useState(false);
  const [openToolsDropdown, setOpenToolsDropdown] = useState(false);

  // Mobile Sidebar Drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSurpriseMe = () => {
    const available = mockScenarios.filter(sc => {
      const matchesDiff = difficultyFilter === 'All' || sc.difficulty === difficultyFilter;
      const matchesLang = !selectedLanguageFilter || (sc.targetLanguage && sc.targetLanguage.includes(selectedLanguageFilter as any));
      const matchesPersona = !selectedPersonaFilter || sc.persona.name.toLowerCase().includes(selectedPersonaFilter.toLowerCase());
      return matchesDiff && matchesLang && matchesPersona;
    });

    const pool = available.length > 0 ? available : mockScenarios;
    const randomScenario = pool[Math.floor(Math.random() * pool.length)];
    handleCardClick(randomScenario);
  };

  const handleCardClick = (sc: Scenario) => {
    if (!sc) return;
    setSelectedScenario(sc);
    if (sc.targetLanguage && sc.targetLanguage.length > 0) {
      setActiveLanguage(sc.targetLanguage[0]);
    }
  };

  const handleStartSession = () => {
    if (!selectedScenario) return;
    selectScenario(selectedScenario, activeLanguage, activeProficiency);
    navigate('/chat');
  };

  const getScenarioIcon = (id: string, isSelected: boolean) => {
    const iconClass = isSelected ? "w-4 h-4 text-blue-600" : "w-4 h-4 text-slate-500";
    switch (id) {
      case 'chai-stall':
        return <Coffee className={iconClass} />;
      case 'market-haggling':
        return <ShoppingBag className={iconClass} />;
      case 'job-interview':
        return <Briefcase className={iconClass} />;
      case 'rickshaw-ride':
        return <Car className={iconClass} />;
      default:
        return <MessageSquare className={iconClass} />;
    }
  };

  // Clean, quiet status dot + text
  const renderDifficultyTag = (diff?: string) => {
    switch (diff) {
      case 'Easy':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Easy
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Medium
          </span>
        );
      case 'Hard':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Hard
          </span>
        );
      default:
        return null;
    }
  };

  // Reusable Clean Sidebar Component
  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-4 selection:bg-blue-500/10 selection:text-blue-600 overflow-hidden">
      {/* Scrollable Navigation & Feature Trees (Invisible Scrollbar) */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* Sidebar Brand Header */}
        <div className="flex items-center gap-3 px-1 pt-1 select-none shrink-0">
          <img
            src="/logo.png"
            alt="Conversa Logo"
            className="h-14 w-auto object-contain shrink-0 drop-shadow-2xs"
          />
          <div className="flex flex-col">
            <span className="font-brand font-extrabold text-xl tracking-tight text-slate-900 leading-tight">
              Conversa
            </span>
            <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
              Immersion Studio
            </span>
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="flex flex-col gap-1 shrink-0">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Navigation
          </span>

          <button
            onClick={() => { navigate('/select'); setMobileSidebarOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-xs border border-blue-600 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-white" />
            <span>Immersion Arenas</span>
          </button>

          <button
            onClick={() => { navigate('/history'); setMobileSidebarOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-2xs border border-transparent hover:border-blue-100 transition-all cursor-pointer"
          >
            <History className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            <span>Session History</span>
          </button>

          <button
            onClick={() => { navigate('/debrief'); setMobileSidebarOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-2xs border border-transparent hover:border-blue-100 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Feature Sections */}
        <div className="flex flex-col gap-1 pt-3 border-t border-blue-100/80">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Studio Features
          </span>

          {/* 1. Languages Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setOpenLanguagesDropdown(!openLanguagesDropdown)}
              className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-blue-600" />
                <span>Indian Languages</span>
              </div>
              {openLanguagesDropdown ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {openLanguagesDropdown && (
              <div className="pl-3 pr-1 py-1 flex flex-col gap-1 border-l-2 border-blue-200/80 ml-4 my-1">
                {[
                  { name: 'Hindi', count: '10' },
                  { name: 'Gujarati', count: '2' },
                  { name: 'Bengali', count: '1' },
                  { name: 'Tamil', count: '1' },
                  { name: 'Punjabi', count: '1' },
                  { name: 'English', count: '3' },
                ].map((item) => {
                  const isSelected = selectedLanguageFilter === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setSelectedLanguageFilter(isSelected ? null : item.name)}
                      className={`flex items-center justify-between text-[11px] px-2 py-1.5 rounded-md transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-white/80 font-medium'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className={`font-mono text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Personas Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setOpenPersonasDropdown(!openPersonasDropdown)}
              className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>AI Personas & Roles</span>
              </div>
              {openPersonasDropdown ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {openPersonasDropdown && (
              <div className="pl-3 pr-1 py-1 flex flex-col gap-1 border-l-2 border-blue-200/80 ml-4 my-1">
                {[
                  'Karan Bhai',
                  'Ramesh Lal',
                  'Shruti Hegde',
                  'Babubhai',
                  'Subir Da',
                  'Raju Chaatwala',
                  'Selvam',
                  'Gurpreet Singh'
                ].map((personaName) => {
                  const isSelected = selectedPersonaFilter === personaName;
                  return (
                    <button
                      key={personaName}
                      onClick={() => setSelectedPersonaFilter(isSelected ? null : personaName)}
                      className={`text-left text-[11px] px-2 py-1.5 rounded-md transition-all cursor-pointer truncate ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-white/80 font-medium'
                      }`}
                    >
                      {personaName}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. AI Tools Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setOpenToolsDropdown(!openToolsDropdown)}
              className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Sarvam AI Tools</span>
              </div>
              {openToolsDropdown ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {openToolsDropdown && (
              <div className="pl-3 pr-1 py-1 flex flex-col gap-1.5 border-l-2 border-blue-200/80 ml-4 my-1 text-[11px] text-slate-600">
                <span className="flex items-center gap-1.5 font-medium hover:text-blue-600 cursor-pointer py-0.5">
                  <Mic className="w-3.5 h-3.5 text-blue-500" />
                  <span>Voice STT Monitor</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium hover:text-blue-600 cursor-pointer py-0.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-500" />
                  <span>Real-Time Fluency Metric</span>
                </span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Sidebar Footer User Profile Card (Compact Trigger) */}
      <div
        onClick={() => setIsProfileOpen(true)}
        className="shrink-0 pt-3 mt-2 border-t border-blue-100/80 flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/80 hover:shadow-3xs transition-all cursor-pointer group bg-white/50 border border-transparent hover:border-blue-100/40"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-extrabold text-xs flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
            U
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">Learner Account</span>
            <span className="text-[10px] text-slate-400 truncate font-mono">user@conversa.ai</span>
          </div>
        </div>
        <div className="text-slate-400 group-hover:text-blue-600 transition-colors p-1 shrink-0">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  return (
    <PageTransition>
      {/* Dual Floating Canvas Layout */}
      <div className="w-full min-h-screen bg-transparent text-slate-900 flex font-sans relative p-3 md:p-4 gap-4">
        
        {/* ========================================================================= */}
        {/* 1. LEFT SIDEBAR CANVAS (Glassmorphism Panel with Rounded Edges) */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-64 glass-canvas rounded-2xl md:rounded-3xl h-[calc(100vh-2rem)] sticky top-4 shrink-0 z-20 overflow-hidden">
          <SidebarContent />
        </aside>

        {/* ========================================================================= */}
        {/* MOBILE SIDEBAR DRAWER */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed top-3 left-3 bottom-3 w-72 glass-canvas rounded-2xl z-50 lg:hidden shadow-2xl flex flex-col overflow-hidden"
              >
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 2. RIGHT MAIN CONTENT CANVAS (Glassmorphism Panel with Rounded Edges) */}
        {/* ========================================================================= */}
        <main className="flex-1 flex flex-col p-6 md:p-8 glass-canvas rounded-2xl md:rounded-3xl w-full min-h-[calc(100vh-2rem)] overflow-hidden">
          
          {/* Header Bar */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h1 className="font-brand font-bold text-xl md:text-2xl text-slate-900 tracking-tight">
                  Immersion Arenas
                </h1>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Select a real-world scenario to launch your AI speech roleplay session
                </p>
              </div>
            </div>

            {/* Header Right Actions: Surprise Me + Search */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all cursor-pointer shadow-3xs hover:shadow-2xs active:scale-95 shrink-0"
                title="Randomly select a scenario to launch"
              >
                <Shuffle className="w-3.5 h-3.5 text-blue-600" />
                <span>Surprise Me</span>
              </button>

              {/* Live Search Input Box */}
              <div className="relative w-full sm:w-64 md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scenarios, personas, regions..."
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white border border-slate-200/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 text-slate-800 shadow-3xs font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* Full-Width Filter & Scenarios Area */}
          <div className="flex flex-col gap-5">
            
            {/* Filter Tabs & Count Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Available Roleplays
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-xs font-bold">
                  {
                    mockScenarios.filter(sc => {
                      const matchesDiff = difficultyFilter === 'All' || difficultyFilter === 'Favorites' || sc.difficulty === difficultyFilter;
                      const matchesFav = difficultyFilter !== 'Favorites' || favoriteIds.includes(sc.id);
                      const matchesLang = !selectedLanguageFilter || (sc.targetLanguage && sc.targetLanguage.includes(selectedLanguageFilter as any));
                      const matchesPersona = !selectedPersonaFilter || sc.persona.name.toLowerCase().includes(selectedPersonaFilter.toLowerCase());
                      const q = searchQuery.toLowerCase().trim();
                      const matchesSearch = !q || (
                        sc.name.toLowerCase().includes(q) ||
                        sc.description.toLowerCase().includes(q) ||
                        sc.persona.name.toLowerCase().includes(q) ||
                        sc.persona.role.toLowerCase().includes(q) ||
                        sc.persona.location.toLowerCase().includes(q) ||
                        (sc.targetLanguage && sc.targetLanguage.some(l => l.toLowerCase().includes(q)))
                      );
                      return matchesDiff && matchesFav && matchesLang && matchesPersona && matchesSearch;
                    }).length
                  }
                </span>

                {/* Active Sidebar Filters */}
                {selectedLanguageFilter && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-2xs">
                    <span>Lang: {selectedLanguageFilter}</span>
                    <button onClick={() => setSelectedLanguageFilter(null)} className="hover:text-blue-200 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedPersonaFilter && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-2xs">
                    <span>Persona: {selectedPersonaFilter}</span>
                    <button onClick={() => setSelectedPersonaFilter(null)} className="hover:text-blue-200 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
              
              {/* Difficulty & Favorites Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl text-xs font-mono font-semibold">
                {(['All', 'Favorites', 'Easy', 'Medium', 'Hard'] as const).map((diff) => {
                  const isActive = difficultyFilter === diff;
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficultyFilter(diff)}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? 'bg-white text-blue-600 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {diff === 'Favorites' && <Star className={`w-3 h-3 ${isActive ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />}
                      <span>{diff}</span>
                      {diff === 'Favorites' && favoriteIds.length > 0 && (
                        <span className="text-[10px] opacity-80">({favoriteIds.length})</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spacious 3-Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockScenarios
                .filter(sc => {
                  const matchesDiff = difficultyFilter === 'All' || difficultyFilter === 'Favorites' || sc.difficulty === difficultyFilter;
                  const matchesFav = difficultyFilter !== 'Favorites' || favoriteIds.includes(sc.id);
                  const matchesLang = !selectedLanguageFilter || (sc.targetLanguage && sc.targetLanguage.includes(selectedLanguageFilter as any));
                  const matchesPersona = !selectedPersonaFilter || sc.persona.name.toLowerCase().includes(selectedPersonaFilter.toLowerCase());
                  const q = searchQuery.toLowerCase().trim();
                  const matchesSearch = !q || (
                    sc.name.toLowerCase().includes(q) ||
                    sc.description.toLowerCase().includes(q) ||
                    sc.persona.name.toLowerCase().includes(q) ||
                    sc.persona.role.toLowerCase().includes(q) ||
                    sc.persona.location.toLowerCase().includes(q) ||
                    (sc.targetLanguage && sc.targetLanguage.some(l => l.toLowerCase().includes(q)))
                  );
                  return matchesDiff && matchesFav && matchesLang && matchesPersona && matchesSearch;
                })
                .map((sc) => {
                  const isSelected = selectedScenario?.id === sc.id;
                  const isFav = favoriteIds.includes(sc.id);
                  
                  return (
                    <motion.div
                      key={sc.id}
                      onClick={() => handleCardClick(sc)}
                      whileHover={{ y: -6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      className={`relative rounded-2xl p-5 cursor-pointer flex flex-col justify-between gap-4 glass-card group transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-amber-500/80 !border-amber-500 !bg-white/95 shadow-xl shadow-amber-500/10'
                          : 'hover:shadow-xl hover:shadow-orange-500/10'
                      }`}
                    >
                      {/* Ambient card corner accent glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/10 via-orange-500/5 to-transparent rounded-tr-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Top Row: Icon + Title + Star + Difficulty Tag */}
                      <div className="flex items-start justify-between gap-2 relative z-10">
                        <div className="flex items-start gap-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                            isSelected 
                              ? 'bg-amber-50 border-amber-200 text-amber-600 shadow-xs' 
                              : 'bg-slate-50 border-slate-200/80 group-hover:bg-amber-50/70 group-hover:border-amber-200'
                          }`}>
                            {getScenarioIcon(sc.id, isSelected)}
                          </div>
                          <div>
                            <h3 className="font-brand font-bold text-base text-slate-900 tracking-tight leading-snug m-0 line-clamp-1 group-hover:text-amber-700 transition-colors">
                              {sc.name}
                            </h3>
                            <span className="text-xs text-slate-500 font-normal block mt-1 line-clamp-2 leading-relaxed">
                              {sc.description}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => toggleFavorite(sc.id, e)}
                            className={`p-1.5 rounded-xl transition-all cursor-pointer hover:scale-110 ${
                              isFav ? 'text-amber-500 hover:text-amber-600 bg-amber-50' : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                            }`}
                            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Footer Info */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100/90 text-xs text-slate-500 mt-auto relative z-10">
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="font-semibold text-slate-800 truncate max-w-[130px]">{sc.persona?.name}</span>
                          <span className="text-slate-400 font-normal text-[11px]">({sc.persona?.role})</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-[10px] text-amber-700 font-bold bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-200/80 shadow-2xs">
                            {sc.targetLanguage ? sc.targetLanguage[0] : ''}
                          </span>
                          {renderDifficultyTag(sc.difficulty)}
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
            </div>

          </div>

        </main>

        {/* ========================================================================= */}
        {/* SLIDE-OVER MISSION LAUNCH DRAWER */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {selectedScenario && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedScenario(null)}
                className="fixed inset-0 bg-slate-900 z-40 backdrop-blur-2xs cursor-pointer"
              />

              {/* Right Slide-Over Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-white z-50 shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-slate-200/80 flex items-start justify-between gap-4 bg-slate-50/50">
                  <div>
                    <div className="flex items-center gap-2 mb-1 font-mono text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                      <span>Mission Launcher</span>
                      <span>•</span>
                      {renderDifficultyTag(selectedScenario.difficulty)}
                    </div>
                    <h3 className="font-brand font-extrabold text-2xl text-slate-900 tracking-tight">
                      {selectedScenario.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedScenario(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                    title="Close Launcher"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Body Details */}
                <div className="p-6 flex flex-col gap-6 flex-1">
                  
                  {/* Persona Card */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                        {selectedScenario.persona.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {selectedScenario.persona.name}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">
                          {selectedScenario.persona.role} • {selectedScenario.persona.location}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed font-normal">
                      "{selectedScenario.persona.bio}"
                    </p>

                    {/* Voice Sample Audio Button */}
                    <button
                      type="button"
                      onClick={playVoiceSample}
                      className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isPlayingSample
                          ? 'bg-blue-600 border-blue-600 text-white shadow-2xs'
                          : 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-blue-300'
                      }`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isPlayingSample ? 'animate-bounce text-white' : 'text-blue-600'}`} />
                      <span>{isPlayingSample ? 'Playing Voice Sample...' : 'Listen Persona Voice Sample'}</span>
                    </button>
                  </div>

                  {/* Scenario Guideline */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Scenario Mission Guideline
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl font-normal">
                      {selectedScenario.promptGuideline}
                    </p>
                  </div>

                  {/* Language Selector */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                      <span>Select Immersion Language</span>
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      {selectedScenario.targetLanguage.map((lang) => {
                        const isActive = activeLanguage === lang;
                        return (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setActiveLanguage(lang)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                              isActive
                                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{lang}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Proficiency Selector */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      Proficiency Level
                    </label>

                    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                      {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => {
                        const isActive = activeProficiency === level;
                        return (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setActiveProficiency(level)}
                            className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-white text-blue-600 shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Drawer Footer Launch Button */}
                <div className="p-6 border-t border-slate-200/80 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={handleStartSession}
                    className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Launch Immersion Studio</span>
                  </button>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* User Profile Details Modal */}
        <AnimatePresence>
          {isProfileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsProfileOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
              >
                {/* Modal Container */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white border border-slate-200/80 w-full max-w-sm rounded-3xl p-6 shadow-xl relative flex flex-col gap-6"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Profile Header & Initial Logo */}
                  <div className="flex flex-col items-center text-center gap-3 pt-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-extrabold text-2xl flex items-center justify-center shadow-md select-none">
                      U
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-extrabold text-slate-900">Learner Account</h3>
                      <span className="text-xs text-slate-400 font-mono">user@conversa.ai</span>
                    </div>
                  </div>

                  {/* Streak & XP Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col gap-1 items-center justify-center text-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-xs text-slate-500 font-mono">Streak Days</span>
                      <span className="text-sm font-extrabold text-slate-900">{streakCount} Days</span>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col gap-1 items-center justify-center text-center">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="text-xs text-slate-500 font-mono">Total Points</span>
                      <span className="text-sm font-extrabold text-slate-900">{xpPoints} XP</span>
                    </div>
                  </div>

                  {/* Daily Goal & Progress Ring */}
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Daily Practice Goal</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/60 px-1.5 py-0.5 rounded-md">
                        On Track
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-200"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-blue-600 transition-all duration-500 ease-out"
                            strokeDasharray="66, 100"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-[10px] font-mono font-bold text-blue-600">66%</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">10 / 15 mins completed</span>
                        <span className="text-[10px] text-slate-400">Keep speaking to hit your goal!</span>
                      </div>
                    </div>
                  </div>

                  {/* Sign Out Action */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/');
                    }}
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:border-rose-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out Account</span>
                  </button>

                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};
