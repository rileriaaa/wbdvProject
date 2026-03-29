'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setUser } from '../(lib)/storage'
import type { User, UserRole } from '@/types'

interface FormData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    role: UserRole
    agreedToTerms: boolean
}

interface FormErrors {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    confirmPassword?: string
    agreedToTerms?: string
}

export default function SignUpPage() {
    const router = useRouter()

    const [form, setForm] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'buyer',
        agreedToTerms: false,
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showPass2, setShowPass2] = useState(false)

    function validate(): boolean {
        const e: FormErrors = {}
        if (!form.firstName.trim()) e.firstName = 'First name is required'
        if (!form.lastName.trim()) e.lastName = 'Last name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.password) e.password = 'Password is required'
        else if (form.password.length < 8) e.password = 'Minimum 8 characters'
        if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
        if (!form.agreedToTerms) e.agreedToTerms = 'You must agree to continue'
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

        // Simulate network delay
        await new Promise(r => setTimeout(r, 800))

        const newUser: User = {
            id: `u_${Date.now()}`,
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim().toLowerCase(),
            avatar: null,
            role: form.role,
            rating: 0,
            memberSince: new Date().getFullYear().toString(),
            school: '',
        }

        setUser(newUser)
        setLoading(false)
        router.push('/')
    }

    return (
        <div
            className="min-h-screen flex"
            style={{ background: 'var(--bg)' }}
        >
            {/* ── LEFT PANEL (decorative) ── */}
            <div
                className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-10"
                style={{ background: 'var(--text)' }}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
                    <div className="w-8 h-8 rounded-md flex items-center justify-center text-base" style={{ background: 'var(--accent)' }}>
                        📚
                    </div>
                    <span className="font-bold text-[15px] text-white">Scholar&apos;s Den</span>
                </Link>

                {/* Quote */}
                <div>
                    <p className="text-[28px] font-bold leading-snug mb-4" style={{ color: '#fff' }}>
                        Join thousands of students buying and selling smarter.
                    </p>
                    <div className="flex flex-col gap-3">
                        {[
                            { icon: '💸', text: 'Save up to 60% on textbooks' },
                            { icon: '📦', text: 'Sell what you no longer need' },
                            { icon: '🎓', text: 'Trusted by students across campuses' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-[14px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Already have account */}
                <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline' }}>
                        Log in
                    </Link>
                </p>
            </div>

            {/* ── RIGHT PANEL (form) ── */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-[440px]">

                    {/* Mobile logo */}
                    <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden" style={{ textDecoration: 'none' }}>
                        <div className="w-7 h-7 rounded-md flex items-center justify-center text-sm" style={{ background: 'var(--accent)' }}>📚</div>
                        <span className="font-bold text-[14px]" style={{ color: 'var(--text)' }}>Scholar&apos;s Den</span>
                    </Link>

                    <h1 className="text-[26px] font-bold mb-1" style={{ color: 'var(--text)' }}>
                        Create an account
                    </h1>
                    <p className="text-[14px] mb-8" style={{ color: 'var(--text-secondary)' }}>
                        Join Scholar&apos;s Den to buy and sell educational materials.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Name row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[12px] font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={form.firstName}
                                    onChange={e => handleChange('firstName', e.target.value)}
                                    placeholder="Ashley"
                                    className="input-sd h-[42px]"
                                    style={errors.firstName ? { borderColor: '#dc2626' } : {}}
                                />
                                {errors.firstName && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-[12px] font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={form.lastName}
                                    onChange={e => handleChange('lastName', e.target.value)}
                                    placeholder="Naval"
                                    className="input-sd h-[42px]"
                                    style={errors.lastName ? { borderColor: '#dc2626' } : {}}
                                />
                                {errors.lastName && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Email */}
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
                            />
                            {errors.email && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[12px] font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={e => handleChange('password', e.target.value)}
                                    placeholder="Min. 8 characters"
                                    className="input-sd h-[42px] pr-10"
                                    style={errors.password ? { borderColor: '#dc2626' } : {}}
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

                        {/* Confirm password */}
                        <div>
                            <label className="block text-[12px] font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass2 ? 'text' : 'password'}
                                    value={form.confirmPassword}
                                    onChange={e => handleChange('confirmPassword', e.target.value)}
                                    placeholder="Re-enter password"
                                    className="input-sd h-[42px] pr-10"
                                    style={errors.confirmPassword ? { borderColor: '#dc2626' } : {}}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass2(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px]"
                                    style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    {showPass2 ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.confirmPassword}</p>}
                        </div>

                        {/* Role selector */}
                        <div>
                            <label className="block text-[12px] font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                                I want to
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {([
                                    { value: 'buyer', label: 'Buy Items', icon: '🛒' },
                                    { value: 'seller', label: 'Sell Items', icon: '🏪' },
                                    { value: 'both', label: 'Buy & Sell', icon: '🔄' },
                                ] as { value: UserRole; label: string; icon: string }[]).map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleChange('role', opt.value)}
                                        className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg text-[12px] font-medium transition-all"
                                        style={{
                                            background: form.role === opt.value ? 'var(--text)' : 'var(--bg-subtle)',
                                            color: form.role === opt.value ? 'var(--bg)' : 'var(--text-secondary)',
                                            border: `1.5px solid ${form.role === opt.value ? 'var(--text)' : 'var(--border)'}`,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <span className="text-lg">{opt.icon}</span>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Terms checkbox */}
                        <div>
                            <label className="flex items-start gap-2.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.agreedToTerms}
                                    onChange={e => handleChange('agreedToTerms', e.target.checked)}
                                    className="mt-0.5 w-4 h-4 flex-shrink-0"
                                    style={{ accentColor: 'var(--accent)' }}
                                />
                                <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                                    I agree to the{' '}
                                    <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</Link>
                                </span>
                            </label>
                            {errors.agreedToTerms && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.agreedToTerms}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary h-[44px] w-full text-[14px] mt-1"
                            style={{ opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'Creating account…' : 'Create Account →'}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <hr className="divider-sd flex-1" />
                            <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>or</span>
                            <hr className="divider-sd flex-1" />
                        </div>

                        {/* Google OAuth (simulated) */}
                        <button
                            type="button"
                            className="btn-secondary h-[44px] w-full text-[14px] flex items-center justify-center gap-2"
                        >
                            <span>🌐</span> Continue with Google
                        </button>

                        {/* Login link (mobile) */}
                        <p className="text-center text-[13px] lg:hidden" style={{ color: 'var(--text-secondary)' }}>
                            Already have an account?{' '}
                            <Link href="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                                Log in
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    )
}