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
        
        {/* CRT Scanline overlay effect */}
        <div className="scanlines absolute inset-0 pointer-events-none z-10 opacity-30" />
        
        {/* Futuristic glowing backdrop */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-neon-cyan/5 blur-[120px] top-1/4 left-1/4 pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-neon-magenta/5 blur-[100px] bottom-1/4 right-1/4 pointer-events-none" />

        {/* Central Terminal Shell */}
        <div className="w-full max-w-md bg-cyber-panel/90 border border-white/5 rounded-xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] z-20 relative overflow-hidden">
          
          {/* Cyan Glow Top Corner Accent */}
          <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-l from-neon-cyan to-transparent" />
          <div className="absolute top-0 right-0 w-px h-24 bg-gradient-to-b from-neon-cyan to-transparent" />

          {/* Header */}
          <header className="flex flex-col items-center text-center gap-2 mb-8">
            <div className="w-16 h-16 mb-2 flex items-center justify-center">
              <img src="/logo.png" className="w-14 h-14 object-contain" alt="Conversa Logo" />
            </div>
            <h1 className="font-mono text-2xl font-bold tracking-widest text-white">
              Conversa <span className="text-neon-cyan">// AUTH</span>
            </h1>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
              Establish secure communication node
            </p>
          </header>

          <AnimatePresence mode="wait">
            {/* View 1: Auth Options Selection */}
            {authMethod === 'selection' && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-4"
              >
                {/* Google Sign-in */}
                <button
                  onClick={() => {
                    setAuthMethod('google');
                    handleGoogleLogin();
                  }}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-cyan/40 py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider text-white flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer group shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] cyber-button-clip"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Connect Google Node
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center my-2 gap-4">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">or</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* Phone Sign-in */}
                <button
                  onClick={() => setAuthMethod('phone')}
                  className="w-full bg-neon-cyan/5 hover:bg-neon-cyan/15 border border-neon-cyan/20 hover:border-neon-cyan/50 py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider text-neon-cyan flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.2)] cyber-button-clip"
                >
                  <Phone className="w-4 h-4" />
                  Cellular Auth (Phone)
                </button>
              </motion.div>
            )}

            {/* View 2: Google Loading Logs */}
            {authMethod === 'google' && (
              <motion.div
                key="google"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 font-mono text-xs"
              >
                <div className="bg-black/35 rounded border border-white/5 p-4 min-h-[120px] flex flex-col gap-1.5 text-white/70 overflow-hidden leading-relaxed">
                  {sysLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-neon-cyan shrink-0">&gt;</span>
                      <p>{log}</p>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-1.5 text-neon-cyan">
                      <span>&gt;</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-ping" />
                      <span className="animate-pulse">resolving session details...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* View 3: Phone Number Input / OTP Verification */}
            {authMethod === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-5"
              >
                {!otpSent ? (
                  /* Phone Input Form */
                  <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/40">Enter Phone Number</label>
                      <div className="flex gap-2">
                        <div className="bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 font-mono text-sm text-white/50 select-none">
                          +91
                        </div>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="9876543210"
                          maxLength={10}
                          className="flex-1 bg-black/20 border border-white/10 hover:border-white/20 focus:border-neon-cyan focus:outline-none rounded-lg px-4 py-2.5 font-mono text-sm text-white transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-neon-cyan hover:bg-cyan-400 border border-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cyber-button-clip"
                    >
                      {isLoading ? 'Connecting...' : 'Request Security OTP'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  /* OTP Verification Form */
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/40">Enter Security Code (OTP)</label>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="••••"
                        maxLength={4}
                        className="w-full bg-black/20 border border-white/10 hover:border-white/20 focus:border-neon-green focus:outline-none rounded-lg px-4 py-2.5 font-mono text-center tracking-widest text-lg text-white transition-colors"
                        required
                      />
                      <span className="font-mono text-[9px] text-white/40 text-center mt-1">
                        Try mock OTP value: <span className="text-neon-cyan font-bold">4829</span>
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-neon-green hover:bg-green-400 border border-green-300 text-black font-mono font-bold text-xs uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all cyber-button-clip"
                    >
                      {isLoading ? 'Verifying...' : 'Establish Connection'}
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* Simulated Logs window for cellular authentication */}
                {sysLogs.length > 0 && (
                  <div className="bg-black/35 rounded border border-white/5 p-3.5 font-mono text-[10px] text-white/60 flex flex-col gap-1 overflow-hidden leading-relaxed">
                    {sysLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-neon-cyan shrink-0">&gt;</span>
                        <p>{log}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Back button */}
                <button
                  onClick={() => {
                    setAuthMethod('selection');
                    setOtpSent(false);
                    setPhoneNumber('');
                    setOtpCode('');
                    setErrorMsg('');
                    setSysLogs([]);
                  }}
                  className="font-mono text-[10px] text-white/40 hover:text-white/70 uppercase tracking-widest text-center mt-2 flex items-center justify-center gap-1.5 cursor-pointer hover:underline"
                >
                  <ArrowRight className="w-3 h-3 rotate-180" />
                  Return to options
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback & Error panel */}
          {errorMsg && (
            <div className="mt-6 bg-red-950/15 border border-red-500/20 rounded-lg p-3 flex items-start gap-2.5 text-xs text-red-400 font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <p>{errorMsg}</p>
            </div>
          )}

        </div>

        {/* Footer info chrome */}
        <div className="mt-8 font-mono text-[9px] text-white/20 uppercase tracking-widest flex items-center gap-4 z-20">
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
