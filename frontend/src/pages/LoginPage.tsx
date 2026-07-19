import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Phone, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Auth states
  const [authMethod, setAuthMethod] = useState<'selection' | 'google' | 'phone'>('selection');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  
  // Simulation logs / status indicators
  const [sysLogs, setSysLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const addLog = (log: string) => {
    setSysLogs(prev => [...prev, `[sys] ${log}`]);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setSysLogs([]);
    addLog('initializing OAuth handshake with Google API...');
    
    setTimeout(() => {
      addLog('fetching account credentials securely...');
      setTimeout(() => {
        addLog('token verified: user_auth_claims accepted.');
        setTimeout(() => {
          addLog('handshake complete. opening access gate...');
          setTimeout(() => {
            setIsLoading(false);
            navigate('/select');
          }, 600);
        }, 600);
      }, 700);
    }, 500);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg('Error: Invalid terminal address (phone number).');
      return;
    }
    
    setIsLoading(true);
    setErrorMsg('');
    setSysLogs([]);
    addLog(`contacting SMS cellular gateway node...`);
    
    setTimeout(() => {
      addLog(`verifying security routing for destination: +91 ${phoneNumber}`);
      setTimeout(() => {
        addLog(`security payload dispatched successfully.`);
        addLog(`[alert] mock gateway secure OTP code is: 4829`);
        setIsLoading(false);
        setOtpSent(true);
      }, 800);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== '4829') {
      setErrorMsg('Access Denied: Invalid OTP credentials.');
      return;
    }
    
    setIsLoading(true);
    setErrorMsg('');
    addLog('authenticating verification code...');
    
    setTimeout(() => {
      addLog('credentials verified. session token established.');
      setTimeout(() => {
        addLog('opening conversational firewall. loading select arena...');
        setTimeout(() => {
          setIsLoading(false);
          navigate('/select');
        }, 600);
      }, 500);
    }, 600);
  };

  return (
    <PageTransition>
      <div className="w-full min-h-screen bg-cyber-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
        
        {/* Soft elegant glowing backdrop lights */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] -top-1/4 -left-1/4 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] -bottom-1/4 -right-1/4 pointer-events-none" />

        {/* Central Terminal Shell using Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md glass-panel p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] z-20 relative overflow-hidden rounded-2xl"
        >
          {/* Header */}
          <header className="flex flex-col items-center text-center gap-3 mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-16 h-16 mb-1 flex items-center justify-center bg-zinc-800/40 rounded-2xl ring-1 ring-white/10 shadow-inner"
            >
              <img src="/logo.png" className="w-11 h-11 object-contain" alt="Conversa Logo" />
            </motion.div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Conversa
            </h1>
            <p className="text-xs text-zinc-400 font-medium">
              Start your immersive language journey
            </p>
          </header>

          <AnimatePresence mode="wait">
            {/* View 1: Auth Options Selection */}
            {authMethod === 'selection' && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {/* Google Sign-in */}
                <button
                  onClick={() => {
                    setAuthMethod('google');
                    handleGoogleLogin();
                  }}
                  className="w-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-indigo-500/30 py-3.5 px-4 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] active:scale-[0.98]"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Connect with Google
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center my-2 gap-4">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase">or</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* Phone Sign-in */}
                <button
                  onClick={() => setAuthMethod('phone')}
                  className="w-full bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/40 py-3.5 px-4 rounded-xl text-sm font-medium text-indigo-400 flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" />
                  Continue with Phone
                </button>
              </motion.div>
            )}

            {/* View 2: Google Loading Logs */}
            {authMethod === 'google' && (
              <motion.div
                key="google"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-6 gap-6"
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-500/10" />
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <Shield className="w-6 h-6 text-indigo-400" />
                </div>
                
                <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
                  {sysLogs.map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 text-xs text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>
                        {log.includes('handshake') ? 'OAuth Handshake Complete' :
                         log.includes('credentials') ? 'Account Credentials Fetched' :
                         log.includes('claims') ? 'Google Claims Verified' : 'Session Node Open'}
                      </span>
                    </motion.div>
                  ))}
                  {isLoading && sysLogs.length < 4 && (
                    <div className="flex items-center gap-3 text-xs text-zinc-500 pl-7">
                      <div className="w-3.5 h-3.5 rounded-full border border-t-zinc-400 border-r-zinc-400 border-b-transparent border-l-transparent animate-spin shrink-0" />
                      <span className="animate-pulse">Connecting...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* View 3: Phone Number Input / OTP Verification */}
            {authMethod === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                {!otpSent ? (
                  /* Phone Input Form */
                  <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-3 text-sm text-zinc-400 font-medium select-none shadow-inner">
                          +91
                        </div>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="9876543210"
                          maxLength={10}
                          className="flex-1 bg-zinc-900/40 border border-white/5 hover:border-white/10 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors shadow-inner font-mono tracking-wide"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-indigo-500 hover:bg-indigo-600 border border-indigo-400/20 text-white font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98] transition-all"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Request OTP
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* OTP Verification Form */
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">Security OTP Code</label>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="••••"
                        maxLength={4}
                        className="w-full bg-zinc-900/40 border border-white/5 hover:border-white/10 focus:border-emerald-500 focus:outline-none rounded-xl px-4 py-3.5 font-mono text-center tracking-[0.75em] text-xl text-white transition-colors shadow-inner"
                        required
                      />
                      <span className="text-[10px] text-zinc-500 text-center mt-1">
                        Use mock OTP code: <span className="text-indigo-400 font-bold tracking-wider">4829</span>
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 border border-emerald-500/20 text-white font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] transition-all"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & Enter
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Simulated Step-by-Step for Cellular logs */}
                {sysLogs.length > 0 && (
                  <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                    {sysLogs.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-[11px] text-zinc-400"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>
                          {log.includes('gateway') ? 'Connected to cellular node' :
                           log.includes('routing') ? 'Security routing verified' :
                           log.includes('dispatched') ? 'OTP payload dispatched' :
                           log.includes('authenticating') ? 'Authenticating code...' :
                           log.includes('session') ? 'Session token established' : 'Opening Conversa portal'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Back button */}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('selection');
                    setOtpSent(false);
                    setPhoneNumber('');
                    setOtpCode('');
                    setErrorMsg('');
                    setSysLogs([]);
                  }}
                  className="text-[11px] text-zinc-500 hover:text-zinc-300 font-semibold uppercase tracking-wider text-center mt-2 flex items-center justify-center gap-1.5 cursor-pointer hover:underline transition-colors"
                >
                  <ArrowRight className="w-3 h-3 rotate-180" />
                  Return to options
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback & Error panel */}
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-red-950/20 border border-red-500/20 rounded-xl p-3.5 flex items-start gap-3 text-xs text-red-400"
            >
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <p className="leading-relaxed">{errorMsg.replace('Error: ', '').replace('Access Denied: ', '')}</p>
            </motion.div>
          )}

        </motion.div>

        {/* Footer info */}
        <div className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest flex items-center gap-3 z-20">
          <span>Shield Secure Auth v2.10</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            AES-256 Protocol
          </span>
        </div>

      </div>
    </PageTransition>
  );
};

