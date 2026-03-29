'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setUser } from '../(lib)/storage'
// import { MOCK_USER } from '../(lib)/mockdata'
import type { User, Product, Category } from '../../types/index'

export const MOCK_USER = {
    id: 'u1',
    firstName: 'Ashley',
    lastName: 'Naval',
    email: 'ashley@email.com',
    avatar: null,
    role: 'both', // 'buyer' | 'seller' | 'both'
    rating: 4.8,
    memberSince: '2024',
    school: 'Polytechnic University of the Philippines',
} satisfies User

interface FormData {
    email: string
    password: string
    rememberMe: boolean
}

interface FormErrors {
    email?: string
    password?: string
    general?: string
}

export default function LoginPage() {
    const router = useRouter()

    const [form, setForm] = useState<FormData>({
        email: '',
        password: '',
        rememberMe: false,
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [forgotMode, setForgotMode] = useState(false)
    const [forgotEmail, setForgotEmail] = useState('')
    const [forgotSent, setForgotSent] = useState(false)

    function validate(): boolean {
        const e: FormErrors = {}
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.password) e.password = 'Password is required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    function handleChange(field: keyof FormData, value: string | boolean) {
        setForm(prev => ({ ...prev, [field]: value }))
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)

        await new Promise(r => setTimeout(r, 800))

        // Simulate auth — accept any email/password, log in as MOCK_USER
        const user = { ...MOCK_USER, email: form.email.toLowerCase() }
        setUser(user)
        setLoading(false)
        router.push('/')
    }

    async function handleForgotSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!forgotEmail.trim()) return
        setLoading(true)
        await new Promise(r => setTimeout(r, 700))
        setLoading(false)
        setForgotSent(true)
    }

    if (forgotMode) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
                <div className="w-full max-w-[400px]">
                    <Link href="/" className="flex items-center gap-2 mb-8" style={{ textDecoration: 'none' }}>
                        <div className="w-7 h-7 rounded-md flex items-center justify-center text-sm" style={{ background: 'var(--accent)' }}>📚</div>
                        <span className="font-bold text-[14px]" style={{ color: 'var(--text)' }}>Scholar&apos;s Den</span>
                    </Link>

                    {forgotSent ? (
                        <div className="text-center">
                            <div className="text-5xl mb-4">📬</div>
                            <h2 className="text-[22px] font-bold mb-2" style={{ color: 'var(--text)' }}>Check your email</h2>
                            <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
                                We sent a password reset link to <strong>{forgotEmail}</strong>
                            </p>
                            <button
                                onClick={() => { setForgotMode(false); setForgotSent(false); setForgotEmail('') }}
                                className="btn-secondary w-full h-[42px] text-[14px]"
                            >
                                ← Back to Log In
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => setForgotMode(false)}
                                className="btn-ghost text-[13px] mb-6 px-0"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                ← Back to Log In
                            </button>
                            <h1 className="text-[24px] font-bold mb-1" style={{ color: 'var(--text)' }}>Forgot password?</h1>
                            <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
                                Enter your email and we&apos;ll send you a reset link.
                            </p>
                            <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-[12px] font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={forgotEmail}
                                        onChange={e => setForgotEmail(e.target.value)}
                                        placeholder="youremail@school.edu"
                                        className="input-sd h-[42px]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary h-[44px] w-full text-[14px]"
                                    style={{ opacity: loading ? 0.7 : 1 }}
                                >
                                    {loading ? 'Sending…' : 'Send Reset Link'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>

            <div
                className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-10"
                style={{ background: 'var(--text)' }}
            >
                <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
                    <div className="w-8 h-8 rounded-md flex items-center justify-center text-base" style={{ background: 'var(--accent)' }}>
                        📚
                    </div>
                    <span className="font-bold text-[15px] text-white">Scholar&apos;s Den</span>
                </Link>

                <div>
                    <p className="text-[28px] font-bold leading-snug mb-4" style={{ color: '#fff' }}>
                        Welcome back. Your books are waiting.
                    </p>
                    <div className="flex flex-col gap-3">
                        {[
                            { icon: '🔔', text: 'Check your messages and notifications' },
                            { icon: '📦', text: 'Track your orders and purchases' },
                            { icon: '💰', text: 'Manage your listings and earnings' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-[14px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline' }}>
                        Sign up free
                    </Link>
                </p>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-[400px]">

                    <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden" style={{ textDecoration: 'none' }}>
                        <div className="w-7 h-7 rounded-md flex items-center justify-center text-sm" style={{ background: 'var(--accent)' }}>📚</div>
                        <span className="font-bold text-[14px]" style={{ color: 'var(--text)' }}>Scholar&apos;s Den</span>
                    </Link>

                    <h1 className="text-[26px] font-bold mb-1" style={{ color: 'var(--text)' }}>
                        Welcome back
                    </h1>
                    <p className="text-[14px] mb-8" style={{ color: 'var(--text-secondary)' }}>
                        Log in to your Scholar&apos;s Den account.
                    </p>

                    {errors.general && (
                        <div className="mb-4 px-4 py-3 rounded-lg text-[13px]" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <div>
                            <label className="block text-[12px] font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => handleChange('email', e.target.value)}
                                placeholder="youremail@school.edu"
                                className="input-sd h-[42px]"
                                style={errors.email ? { borderColor: '#dc2626' } : {}}
                                autoComplete="email"
                            />
                            {errors.email && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setForgotMode(true)}
                                    className="text-[12px] font-medium"
                                    style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={e => handleChange('password', e.target.value)}
                                    placeholder="Enter your password"
                                    className="input-sd h-[42px] pr-10"
                                    style={errors.password ? { borderColor: '#dc2626' } : {}}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px]"
                                    style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    {showPass ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errors.password && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.password}</p>}
                        </div>

                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.rememberMe}
                                onChange={e => handleChange('rememberMe', e.target.checked)}
                                className="w-4 h-4"
                                style={{ accentColor: 'var(--accent)' }}
                            />
                            <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                                Remember me
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary h-[44px] w-full text-[14px] mt-1"
                            style={{ opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'Logging in…' : 'Log In →'}
                        </button>

                        <div className="flex items-center gap-3">
                            <hr className="divider-sd flex-1" />
                            <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>or</span>
                            <hr className="divider-sd flex-1" />
                        </div>

                        <button
                            type="button"
                            className="btn-secondary h-[44px] w-full text-[14px] flex items-center justify-center gap-2"
                        >
                            <span>🌐</span> Continue with Google
                        </button>

                        <p className="text-center text-[13px] lg:hidden" style={{ color: 'var(--text-secondary)' }}>
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                                Sign up free
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    )
}