'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getUser, removeUser, getCartCount, toggleTheme, getTheme } from '../(lib)/storage'
import type { User, Theme } from '@/types'

export default function Navbar() {
    const router = useRouter()
    const pathname = usePathname()

    const [user, setUser] = useState<User | null>(null)
    const [cartCount, setCartCount] = useState<number>(0)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const [theme, setThemeState] = useState<Theme>('light')
    const [scrolled, setScrolled] = useState<boolean>(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setUser(getUser())
        setCartCount(getCartCount())
        const t = getTheme()
        setThemeState(t)
        document.documentElement.setAttribute('data-theme', t)
    }, [])

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    useEffect(() => {
        function onScroll() { setScrolled(window.scrollY > 8) }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => { setMobileOpen(false) }, [pathname])

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
        }
    }

    function handleLogout() {
        removeUser()
        setUser(null)
        setDropdownOpen(false)
        router.push('/')
    }

    function handleToggleTheme() {
        const next = toggleTheme()
        setThemeState(next)
    }

    const navLinks = [
        { href: '/browse', label: 'Browse' },
        { href: '/about', label: 'About' },
        { href: '/faqs', label: 'FAQs' },
        { href: '/contact', label: 'Contact' },
    ]

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + '/')

    const dropdownItems = [
        { href: '/profile', icon: '👤', label: 'My Profile' },
        { href: '/profile/orders', icon: '📦', label: 'Purchase History' },
        { href: '/seller/listings', icon: '🏪', label: 'My Listings' },
        { href: '/seller/orders', icon: '📊', label: 'Orders Dashboard' },
    ]

    return (
        <header
            className="sticky top-0 z-50 pb-1 w-full transition-all duration-200"
            style={{
                background: 'var(--bg)',
                borderBottom: '1px solid var(--border)',
                boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
            }}
        >
            <div className="section-sd">
                <div className="flex items-center gap-3 h-[60px]">

                    <Link href="/" className="flex items-center gap-2 flex-shrink-0" style={{ textDecoration: 'none' }}>
                        <div
                            className="w-8 h-8 rounded-md text-base flex-shrink-0"
                            style={{ background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            📚
                        </div>
                        <span
                            className="font-bold text-[15px] tracking-tight hidden sm:block"
                            style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}
                        >
                            Scholar&apos;s Den
                        </span>
                    </Link>

                    <form onSubmit={handleSearch} className="flex-1 max-w-[420px] mx-auto hidden md:flex items-center">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                🔍
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search books, supplies, materials…"
                                className="input-sd pl-9 pr-4 h-[38px] text-[13px]"
                                style={{ borderRadius: '8px' }}
                            />
                        </div>
                    </form>

                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="btn-ghost text-[13px] py-1.5 px-3"
                                style={{
                                    color: isActive(link.href) ? 'var(--accent)' : 'var(--text-secondary)',
                                    fontWeight: isActive(link.href) ? 600 : 500,
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex-1 lg:flex-none" />

                    <div className="flex items-center gap-2">

                        <button
                            onClick={handleToggleTheme}
                            className="btn-ghost w-8 h-8 p-0 hidden sm:flex items-center justify-center text-base"
                            style={{ borderRadius: '8px' }}
                            title="Toggle dark mode"
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        {user ? (
                            <>
                                <Link
                                    href="/notifications"
                                    className="relative w-8 h-8 flex items-center justify-center rounded-lg text-base"
                                    style={{
                                        background: 'var(--bg-subtle)',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                    }}
                                >
                                    🔔
                                    <span
                                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                                        style={{ background: 'var(--accent)', border: '1.5px solid var(--bg)' }}
                                    >
                                        3
                                    </span>
                                </Link>

                                <Link
                                    href="/cart"
                                    className="relative w-8 h-8 flex items-center justify-center rounded-lg text-base"
                                    style={{
                                        background: 'var(--bg-subtle)',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                    }}
                                >
                                    🛒
                                    {cartCount > 0 && (
                                        <span
                                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                                            style={{ background: 'var(--accent)', border: '1.5px solid var(--bg)' }}
                                        >
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(v => !v)}
                                        className="flex items-center gap-2 h-8 px-2 rounded-lg"
                                        style={{
                                            background: 'var(--bg-subtle)',
                                            border: '1px solid var(--border)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                                            style={{ background: 'var(--accent)' }}
                                        >
                                            {user.firstName?.[0]}{user.lastName?.[0]}
                                        </div>
                                        <span className="text-[12px] font-medium hidden sm:block max-w-[80px] truncate" style={{ color: 'var(--text)' }}>
                                            {user.firstName}
                                        </span>
                                        <span className="text-[9px] hidden sm:block" style={{ color: 'var(--text-muted)' }}>▾</span>
                                    </button>

                                    {dropdownOpen && (
                                        <div
                                            className="absolute right-0 top-[calc(100%+8px)] w-[200px] rounded-xl overflow-hidden z-50"
                                            style={{
                                                background: 'var(--surface)',
                                                border: '1px solid var(--border)',
                                                boxShadow: 'var(--shadow-lg)',
                                            }}
                                        >
                                            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                                                <div className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
                                                    {user.firstName} {user.lastName}
                                                </div>
                                                <div className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                                                    {user.email}
                                                </div>
                                            </div>

                                            <div className="p-1.5">
                                                {dropdownItems.map(item => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setDropdownOpen(false)}
                                                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] w-full transition-colors hover:bg-[var(--bg-muted)]"
                                                        style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                                                    >
                                                        <span>{item.icon}</span>
                                                        <span>{item.label}</span>
                                                    </Link>
                                                ))}

                                                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 0' }} />

                                                <Link
                                                    href="/profile/settings"
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] w-full transition-colors hover:bg-[var(--bg-muted)]"
                                                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                                                >
                                                    <span>⚙️</span><span>Account Settings</span>
                                                </Link>

                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] w-full transition-colors hover:bg-red-50"
                                                    style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                                                >
                                                    <span>🚪</span><span>Log Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="btn-ghost text-[13px] py-1.5 hidden sm:flex">Log In</Link>
                                <Link href="/signup" className="btn-primary text-[13px] py-1.5 px-4">Sign Up</Link>
                            </>
                        )}

                        <button
                            onClick={() => setMobileOpen(v => !v)}
                            className="btn-ghost w-8 h-8 p-0 flex items-center justify-center lg:hidden"
                            style={{ fontSize: '18px' }}
                        >
                            {mobileOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>

            {mobileOpen && (
                <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <div className="section-sd py-3 flex flex-col gap-1">
                        <form onSubmit={handleSearch} className="mb-2 md:hidden">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>🔍</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search…"
                                    className="input-sd pl-9 h-[38px] text-[13px]"
                                />
                            </div>
                        </form>

                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="py-2.5 px-3 rounded-lg text-[14px] font-medium"
                                style={{
                                    color: isActive(link.href) ? 'var(--accent)' : 'var(--text)',
                                    textDecoration: 'none',
                                    background: isActive(link.href) ? 'var(--accent-light)' : 'transparent',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {!user && (
                            <div className="flex gap-2 mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                                <Link href="/login" className="btn-secondary flex-1 text-center text-[13px]">Log In</Link>
                                <Link href="/signup" className="btn-primary  flex-1 text-center text-[13px]">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}