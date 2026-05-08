import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/auth'

// Demo credentials
const DEMO_USERS = [
  {
    email: 'admin@meiborg.com',
    password: 'meipay2026',
    user: {
      id: '1',
      name: 'Alex Meiborg',
      email: 'admin@meiborg.com',
      role: 'ADMIN' as const,
      companyId: 'meiborg-001',
      title: 'HR Director',
    },
  },
  {
    email: 'hr@meiborg.com',
    password: 'meipay2026',
    user: {
      id: '2',
      name: 'Jordan Rivers',
      email: 'hr@meiborg.com',
      role: 'HR_MANAGER' as const,
      companyId: 'meiborg-001',
      title: 'HR Manager',
    },
  },
]

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    await new Promise(r => setTimeout(r, 600))

    const match = DEMO_USERS.find(
      u => u.email === email && u.password === password
    )

    if (match) {
      login(match.user)
      navigate('/dashboard')
    } else {
      setError('Invalid email or password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-meipay-navy flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-meipay-accent rounded-2xl mb-4 shadow-lg shadow-meipay-accent/30">
            <span className="text-white font-bold text-xl">MP</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">MeiPay</h1>
          <p className="text-white/40 text-sm mt-1">HR & Payroll — Meiborg</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@meiborg.com"
                required
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-meipay-accent/50 focus:border-meipay-accent transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-white/70">
                  Password
                </label>
                <button type="button" className="text-xs text-meipay-accent/70 hover:text-meipay-accent transition-colors">
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-meipay-accent/50 focus:border-meipay-accent transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-meipay-accent text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-meipay-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-lg shadow-meipay-accent/20"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-xs text-white/20 text-center mt-5">
            Demo: admin@meiborg.com / meipay2026
          </p>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          MeiPay v1.0 · Meiborg Confidential
        </p>
      </div>
    </div>
  )
}
