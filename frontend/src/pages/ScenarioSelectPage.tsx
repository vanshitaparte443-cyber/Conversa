import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  MapPin,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  BarChart3,
  Languages,
  Mic,
  Sliders,
  Menu
} from 'lucide-react';

export const ScenarioSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectScenario } = useSession();
  
  // Default selected scenario: Bengaluru Tech Interview
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    mockScenarios.find(s => s.id === 'job-interview') || mockScenarios[0]
  );
  const [activeLanguage, setActiveLanguage] = useState<TargetLanguage>('English');
  const [activeProficiency, setActiveProficiency] = useState<string>('Intermediate');

  // Sidebar Feature Dropdown Toggle States
  const [openLanguagesDropdown, setOpenLanguagesDropdown] = useState(true);
  const [openPersonasDropdown, setOpenPersonasDropdown] = useState(false);
  const [openToolsDropdown, setOpenToolsDropdown] = useState(false);

  // Mobile Sidebar Drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

  // Clean, quiet status dot + text (no loud pills)
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
    <div className="flex flex-col h-full justify-between p-4 selection:bg-blue-500/10 selection:text-blue-600">
      <div className="flex flex-col gap-6">
        
        {/* Sidebar Brand Header */}
        <div className="flex items-center gap-3 px-2 pt-1 select-none">
          <img
            src="/logo.png"
            alt="Conversa Logo"
            className="w-7 h-7 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-brand font-bold text-lg tracking-tight text-slate-900 leading-none">
              Conversa
            </span>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5">
              Immersion Studio
            </span>
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Navigation
          </span>

          <button
            onClick={() => { navigate('/select'); setMobileSidebarOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span>Immersion Arenas</span>
          </button>

          <button
            onClick={() => { navigate('/history'); setMobileSidebarOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>Session History</span>
          </button>

          <button
            onClick={() => { navigate('/debrief'); setMobileSidebarOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Feature Sections */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/80">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Studio Features
          </span>

          {/* 1. Languages Dropdown */}
          <div className="rounded-lg border border-slate-200/80 bg-white overflow-hidden">
            <button
              onClick={() => setOpenLanguagesDropdown(!openLanguagesDropdown)}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-slate-500" />
                <span>Indian Languages</span>
              </div>
              {openLanguagesDropdown ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {openLanguagesDropdown && (
              <div className="px-3 pb-3 pt-1 flex flex-col gap-2 bg-slate-50/50 border-t border-slate-100 text-[11px] text-slate-600">
                <span className="flex items-center justify-between font-normal hover:text-slate-900 cursor-pointer">
                  <span>Hindi (Standard & Dialect)</span>
                  <span className="text-slate-400 font-mono">10 scenarios</span>
                </span>
                <span className="flex items-center justify-between font-normal hover:text-slate-900 cursor-pointer">
                  <span>Gujarati (Ahmedabad)</span>
                  <span className="text-slate-400 font-mono">Standard</span>
                </span>
                <span className="flex items-center justify-between font-normal hover:text-slate-900 cursor-pointer">
                  <span>Marathi (Mumbai)</span>
                  <span className="text-slate-400 font-mono">Standard</span>
                </span>
                <span className="flex items-center justify-between font-normal hover:text-slate-900 cursor-pointer">
                  <span>Bengali & Tamil</span>
                  <span className="text-emerald-600 font-mono font-medium">Live STT</span>
                </span>
              </div>
            )}
          </div>

          {/* 2. Personas Dropdown */}
          <div className="rounded-lg border border-slate-200/80 bg-white overflow-hidden">
            <button
              onClick={() => setOpenPersonasDropdown(!openPersonasDropdown)}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-slate-500" />
                <span>AI Personas & Roles</span>
              </div>
              {openPersonasDropdown ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {openPersonasDropdown && (
              <div className="px-3 pb-3 pt-1 flex flex-col gap-2 bg-slate-50/50 border-t border-slate-100 text-[11px] text-slate-600">
                <span className="font-normal">Karan Bhai (Chai Vendor)</span>
                <span className="font-normal">Ramesh Lal (Shopkeeper)</span>
                <span className="font-normal">Shruti Hegde (Technical Lead)</span>
                <span className="font-normal">Babubhai (Auto Driver)</span>
              </div>
            )}
          </div>

          {/* 3. AI Tools Dropdown */}
          <div className="rounded-lg border border-slate-200/80 bg-white overflow-hidden">
            <button
              onClick={() => setOpenToolsDropdown(!openToolsDropdown)}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-500" />
                <span>Sarvam AI Tools</span>
              </div>
              {openToolsDropdown ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {openToolsDropdown && (
              <div className="px-3 pb-3 pt-1 flex flex-col gap-2 bg-slate-50/50 border-t border-slate-100 text-[11px] text-slate-600">
                <span className="flex items-center gap-1.5 font-normal">
                  <Mic className="w-3.5 h-3.5 text-slate-400" />
                  <span>Voice STT Monitor</span>
                </span>
                <span className="flex items-center gap-1.5 font-normal">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Real-Time Fluency Metric</span>
                </span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Sidebar Footer User Profile */}
      <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-800 leading-none">Learner Account</span>
            <span className="text-[10px] text-slate-400 truncate max-w-[110px] mt-0.5">user@conversa.ai</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <PageTransition>
      {/* Clean canvas with balanced, modern geometry */}
      <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans relative">
        
        {/* ========================================================================= */}
        {/* DESKTOP LEFT SIDEBAR */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 h-screen sticky top-0 shrink-0 z-20">
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
                className="fixed inset-0 bg-slate-900 z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 lg:hidden shadow-xl flex flex-col"
              >
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* MAIN DASHBOARD CONTENT AREA */}
        {/* ========================================================================= */}
        <main className="flex-1 flex flex-col p-6 md:p-8 max-w-6xl mx-auto w-full min-h-screen">
          
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
                  Select a real-world scenario to begin your AI speech roleplay
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/history')}
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <History className="w-4 h-4 text-slate-400" />
              <span>Session History</span>
            </button>
          </header>

          {/* Workspace Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Scenario Cards List (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Select Scenario ({mockScenarios.length})
                </h2>
                <span className="text-xs text-slate-400 font-mono">Sarvam Speech Engine</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {mockScenarios.map((sc) => {
                  const isSelected = selectedScenario?.id === sc.id;
                  
                  return (
                    <div
                      key={sc.id}
                      onClick={() => handleCardClick(sc)}
                      className={`rounded-xl p-4 md:p-5 border transition-colors cursor-pointer flex flex-col gap-3 relative bg-white ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/20 shadow-xs'
                          : 'border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      {/* Top Row: Icon + Title + Difficulty Tag */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 transition-colors ${
                            isSelected ? 'bg-blue-50 border-blue-100' : 'bg-slate-100 border-slate-200/60'
                          }`}>
                            {getScenarioIcon(sc.id, isSelected)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-brand font-bold text-base text-slate-900 tracking-tight m-0">
                                {sc.name}
                              </h3>
                            </div>
                            <span className="text-xs text-slate-500 font-normal block mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              {sc.description ? sc.description.split('.')[0] : ''}
                            </span>
                          </div>
                        </div>

                        {renderDifficultyTag(sc.difficulty)}
                      </div>

                      {/* Meta Info Line */}
                      <div className="flex items-center gap-3 pt-2.5 border-t border-slate-100 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                          {sc.persona?.name || 'Persona'} ({sc.persona?.role || 'Role'})
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[11px] text-slate-400 font-normal">
                          {sc.targetLanguage ? sc.targetLanguage.join(', ') : ''}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Configuration & Start Studio Box (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-xl p-5 md:p-6 flex flex-col gap-5 shadow-2xs sticky top-6">
              
              <div className="border-b border-slate-200/80 pb-4">
                <div className="text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  Active Configuration
                </div>
                <h3 className="font-brand font-bold text-lg md:text-xl text-slate-900 tracking-tight">
                  {selectedScenario?.name || 'Scenario'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                  {selectedScenario?.description || ''}
                </p>
              </div>

              {/* Target Persona Detail Card */}
              <div className="bg-slate-50 border border-slate-200/70 rounded-lg p-3.5 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                    {selectedScenario?.persona?.name ? selectedScenario.persona.name.charAt(0) : 'P'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-none">
                      {selectedScenario?.persona?.name || 'Persona'}
                    </h4>
                    <span className="text-[11px] text-slate-500 mt-0.5 block font-normal">
                      {selectedScenario?.persona?.role || 'Role'}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-slate-600 bg-white p-2.5 rounded-md border border-slate-200/60 font-normal leading-relaxed">
                  "{selectedScenario?.promptGuideline ? selectedScenario.promptGuideline.slice(0, 110) : ''}..."
                </div>
              </div>

              {/* Language Selector */}
              {selectedScenario?.targetLanguage && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                    <span>Select Immersion Language</span>
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    {selectedScenario.targetLanguage.map((lang) => {
                      const isActive = activeLanguage === lang;
                      return (
                        <button
                          key={lang}
                          onClick={() => setActiveLanguage(lang)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {lang}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Proficiency Selector - Segmented Control */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                  Proficiency Level
                </label>

                <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                    const isActive = activeProficiency === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setActiveProficiency(lvl)}
                        className={`py-2 flex-1 text-center text-xs transition-colors cursor-pointer rounded-lg ${
                          isActive
                            ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800 font-medium'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* START IMMERSION STUDIO BUTTON */}
              <button
                onClick={handleStartSession}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-1"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Immersion Studio</span>
              </button>
            </div>

          </div>
        </main>

      </div>
    </PageTransition>
  );
};
