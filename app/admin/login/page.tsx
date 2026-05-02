'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import Image from 'next/image'
import { isSafeInternalRedirect } from '@/lib/security/validation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectParam = searchParams.get('redirect')
  const redirect = redirectParam && isSafeInternalRedirect(redirectParam) ? redirectParam : '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Onjuist e-mailadres of wachtwoord.')
      setLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          E-mailadres
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
          placeholder="admin@uw-bedrijf.nl"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Wachtwoord
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0F172A] hover:bg-[#1E293B] active:scale-[0.98] disabled:opacity-60 text-white font-semibold rounded-xl transition-all text-sm mt-2 shadow-sm"
      >
        {loading ? 'Inloggen...' : 'Inloggen'}
        {!loading && <LogIn size={16} />}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/[0.03] border border-white/[0.06]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] border border-white/[0.06]" />
        <div className="absolute top-1/4 right-8 w-32 h-32 rounded-full bg-indigo-500/10 border border-indigo-500/20" />

        <div className="relative z-10 text-center max-w-sm">
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Welkom terug
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Beheer uw publicaties, nieuws en instellingen via het CMS dashboard.
          </p>

          {/* Subtle dots decoration */}
          <div className="mt-12 flex justify-center gap-2 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo — always visible on right side */}
          <div className="flex justify-start mb-8">
            <Image
              src="/WebsUp.nl logo zwart.png"
              alt="WebsUp.nl"
              width={160}
              height={52}
              className="object-contain"
              priority
            />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Inloggen</h1>
            <p className="text-gray-400 text-sm">Beheer uw website content</p>
          </div>

          <Suspense fallback={
            <div className="space-y-5">
              <div className="h-[72px] bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-[72px] bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          }>
            <LoginForm />
          </Suspense>

          <p className="text-center text-gray-300 text-xs mt-8">
            Deze webapplicatie is ontwikkeld door{' '}
            <a
              href="https://websup.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              WebsUp.nl
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}