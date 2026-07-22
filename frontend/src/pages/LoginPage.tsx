import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { supabase } from '../lib/supabase';

// Reusable Floating Label Input Component with active focus rings & inline error messaging
interface FloatingInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  required?: boolean;
  rightElement?: React.ReactNode;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  type,
  value,
  onChange,
  label,
  error,
  required,
  rightElement,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  return (
    <div className="w-full flex flex-col gap-1 text-left">
      <div
        className={`relative w-full rounded-xl transition-all duration-200 bg-[#F4F5F8] border ${
          error
            ? 'border-red-400 bg-red-50/20 ring-2 ring-red-500/10'
            : isFocused
            ? 'border-blue-500 bg-white ring-3 ring-blue-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300'
        }`}
      >
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 pointer-events-none select-none ${
            isFloating
              ? 'top-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600'
              : 'top-3.5 text-xs font-medium text-slate-400'
          }`}
        >
          {label}
        </label>

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`w-full bg-transparent px-4 text-xs text-slate-800 font-semibold outline-none transition-all ${
            isFloating ? 'pt-5 pb-1.5' : 'py-3.5'
          } ${rightElement ? 'pr-11' : ''}`}
        />

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center z-10">
            {rightElement}
          </div>
        )}
      </div>

      {/* Inline validation error feedback */}
      {error && (
        <span className="text-[10px] text-red-500 font-semibold px-1 flex items-center gap-1 animate-fade-in">
          • {error}
        </span>
      )}
    </div>
  );
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Mode: false = Sign In, true = Create Account
  const [isSignUp, setIsSignUp] = useState(false);

  // Form Field States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Password Visibility Toggle
  const [showPassword, setShowPassword] = useState(false);

  // Field Validation Errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Global Status
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');

  // Google OAuth handler
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setGlobalError('');
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
      if (supabaseUrl && !supabaseUrl.includes('cqcankzukor') && !supabaseUrl.includes('placeholder')) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/select`,
          },
        });
        if (error) throw error;
        return;
      }
    } catch (err: any) {
      console.warn('Google OAuth provider redirect skipped:', err?.message || err);
    }

    // Local authentication simulation
    setTimeout(() => {
      setIsLoading(false);
      navigate('/select');
    }, 600);
  };

  // Form Validation & Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setGlobalError('');

    if (isSignUp && !name.trim()) {
      setNameError('Full name is required');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError('Email address is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/select');
    }, 750);
  };

  const toggleAuthMode = (mode: boolean) => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setGlobalError('');
    setIsSignUp(mode);
  };

  return (
    <PageTransition>
      {/* Viewport: Clean off-white canvas with centered auth card */}
      <div className="w-full min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-4 selection:bg-blue-600 selection:text-white font-sans relative overflow-x-hidden">
        
        {/* MAIN AUTH CARD CONTAINER - Sliding Blue Theme Overlay Card */}
        <div className="relative w-full max-w-3xl min-h-[480px] md:min-h-[500px] bg-white rounded-[24px] shadow-[0_14px_28px_rgba(0,0,0,0.15),_0_10px_10px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col md:flex-row z-10">
          
          {/* ========================================================================= */}
          {/* 1. SIGN IN FORM (Left Side) */}
          {/* ========================================================================= */}
          <div
            className={`w-full md:w-1/2 h-full p-8 md:p-12 flex flex-col justify-center items-center text-center transition-all duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              isSignUp
                ? 'opacity-0 pointer-events-none translate-x-full md:translate-x-0'
                : 'opacity-100 pointer-events-auto translate-x-0 z-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center gap-3">
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-1">
                Sign In
              </h1>

              {/* Dedicated Google Auth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-2xs group my-1"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Sign in with Google</span>
              </button>

              <div className="flex items-center gap-2 w-full my-0.5">
                <div className="flex-1 h-px bg-slate-200/80" />
                <span className="text-[11px] text-slate-400 font-medium">or use your account</span>
                <div className="flex-1 h-px bg-slate-200/80" />
              </div>

              {/* Floating Label Email Input */}
              <FloatingInput
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                label="Email Address"
                error={emailError}
              />

              {/* Floating Label Password Input with Eye Visibility Toggle */}
              <FloatingInput
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                label="Password"
                error={passwordError}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              <button
                type="button"
                onClick={() => navigate('/select')}
                className="text-[11px] text-slate-500 hover:text-blue-600 transition-colors my-1 cursor-pointer"
              >
                Forgot your password?
              </button>

              {/* Action Button with Loading Spinner State */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-blue-600 hover:to-indigo-800 text-white font-bold text-xs uppercase tracking-wider px-12 py-3 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer mt-1 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SIGNING IN...</span>
                  </>
                ) : (
                  <span>SIGN IN</span>
                )}
              </button>

              {/* Mobile screen toggle */}
              <div className="block md:hidden mt-4 text-xs text-slate-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => toggleAuthMode(true)}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          {/* ========================================================================= */}
          {/* 2. CREATE ACCOUNT FORM (Right Side) */}
          {/* ========================================================================= */}
          <div
            className={`w-full md:w-1/2 h-full p-8 md:p-12 flex flex-col justify-center items-center text-center transition-all duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              !isSignUp
                ? 'opacity-0 pointer-events-none -translate-x-full md:translate-x-0'
                : 'opacity-100 pointer-events-auto translate-x-0 z-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center gap-3">
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-1">
                Create Account
              </h1>

              {/* Dedicated Google Auth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-2xs group my-1"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Sign up with Google</span>
              </button>

              <div className="flex items-center gap-2 w-full my-0.5">
                <div className="flex-1 h-px bg-slate-200/80" />
                <span className="text-[11px] text-slate-400 font-medium">or use your email for registration</span>
                <div className="flex-1 h-px bg-slate-200/80" />
              </div>

              {/* Floating Label Full Name Input */}
              <FloatingInput
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError(''); }}
                label="Full Name"
                error={nameError}
              />

              {/* Floating Label Email Input */}
              <FloatingInput
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                label="Email Address"
                error={emailError}
              />

              {/* Floating Label Password Input with Eye Visibility Toggle */}
              <FloatingInput
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                label="Password"
                error={passwordError}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              {/* Action Button with Loading Spinner State */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-blue-600 hover:to-indigo-800 text-white font-bold text-xs uppercase tracking-wider px-12 py-3 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SIGNING UP...</span>
                  </>
                ) : (
                  <span>SIGN UP</span>
                )}
              </button>

              {/* Mobile screen toggle */}
              <div className="block md:hidden mt-4 text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => toggleAuthMode(false)}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>

          {/* ========================================================================= */}
          {/* 3. SLIDING BLUE OVERLAY PANEL (Vibrant Blue Theme Shift) */}
          {/* ========================================================================= */}
          <div
            className={`hidden md:block absolute top-0 left-0 w-1/2 h-full z-30 overflow-hidden transition-transform duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              isSignUp ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Double-width inner panel to shift text seamlessly */}
            <div
              className={`w-[200%] h-full flex transition-transform duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                isSignUp ? 'translate-x-0' : '-translate-x-1/2'
              }`}
            >
              
              {/* SUB-PANEL A: Welcome Back! (Positioned on Left when isSignUp is TRUE) */}
              <div className="w-1/2 h-full bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] text-white p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="max-w-xs flex flex-col items-center z-10">
                  <h2 className="text-3xl font-extrabold tracking-tight mb-3 text-white">
                    Welcome Back!
                  </h2>
                  <p className="text-xs text-blue-100/90 leading-relaxed mb-6 font-normal px-2">
                    Stay connected by logging in with your credentials and continue your experience
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleAuthMode(false)}
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-700 active:scale-95 text-xs font-bold uppercase tracking-wider px-10 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
                  >
                    SIGN IN
                  </button>
                </div>
              </div>

              {/* SUB-PANEL B: Hey There! (Positioned on Right when isSignUp is FALSE) */}
              <div className="w-1/2 h-full bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] text-white p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="max-w-xs flex flex-col items-center z-10">
                  <h2 className="text-3xl font-extrabold tracking-tight mb-3 text-white">
                    Hey There!
                  </h2>
                  <p className="text-xs text-blue-100/90 leading-relaxed mb-6 font-normal px-2">
                    Begin your amazing journey by creating an account with us today
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleAuthMode(true)}
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-700 active:scale-95 text-xs font-bold uppercase tracking-wider px-10 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
                  >
                    SIGN UP
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global error notification fallback if needed */}
        {globalError && (
          <div className="mt-4 max-w-sm w-full bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-xs text-center z-10 animate-fade-in">
            {globalError}
          </div>
        )}

      </div>
    </PageTransition>
  );
};
