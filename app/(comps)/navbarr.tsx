'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getUser, removeUser, removeAuthCookie, getCartCount, toggleTheme, getTheme, onAuthStateChange } from '../(lib)/storage'
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

    function syncNavbarState() {
        setUser(getUser())
        setCartCount(getCartCount())
    }

    useEffect(() => {
        syncNavbarState()
        const t = getTheme()
        setThemeState(t)
        document.documentElement.setAttribute('data-theme', t)

        return onAuthStateChange(syncNavbarState)
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
        removeAuthCookie()
        setUser(null)
        setDropdownOpen(false)
        router.push('/')
    }

    function handleToggleTheme() {
        const next = toggleTheme()
        setThemeState(next)
    }

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/browse', label: 'Browse' }
    ]

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + '/')

    const dropdownItems = [
        { href: '/profile', icon: '👤', label: 'My Profile' },
        { href: '/profile/orders', icon: '📦', label: 'Purchase History' },
        { href: '/profile/seller/listings', icon: '🏪', label: 'My Listings' },
        { href: '/profile/seller/orders', icon: '📊', label: 'Orders Dashboard' },
    ]

    const megaMenuColumns = [
        {
            heading: "End of Season Sale",
            links: [{ label: "Extra 30% off", href: "/sale" }],
        },
        {
            heading: "Featured",
            links: [
                { label: "New Arrivals", href: "/browse" },
                { label: "Bestsellers", href: "/browse" },
                { label: "Shop All Sale", href: "/browse" },
            ],
        },
        {
            heading: "Quick Links",
            links: [
                { label: "Browse All", href: "/new-arrivals" },
                { label: "Textbooks", href: "/bestsellers" },
                { label: "School Supplies", href: "/sale/all" },
                { label: "Art Materials", href: "/sale/all" },
                { label: "Electronics", href: "/sale/all" },
            ],
        },
        {
            heading: "Account",
            links: [
                { label: "My Profile", href: "/new-arrivals" },
                { label: "Purchase History", href: "/bestsellers" },
                { label: "My Cart", href: "/sale/all" },
                { label: "Sell an Item", href: "/sale/all" },
                { label: "Account Settings", href: "/sale/all" },
            ],
        },
        {
            heading: "Support",
            links: [
                { label: "About Us", href: "/new-arrivals" },
                { label: "FAQs", href: "/bestsellers" },
                { label: "Contact Us", href: "/sale/all" },
                { label: "Terms of Service", href: "/sale/all" },
                { label: "Privacy Policy", href: "/sale/all" },
            ],
        },
    ]

    return (
        <header
            className="sticky top-0 z-50 w-full transition-all duration-200"
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
                            className="font-bold text-[14px] tracking-tight hidden sm:block"
                            style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}
                        >
                            Scholar&apos;s Den
                        </span>
                    </Link>

                    <form onSubmit={handleSearch} className="flex-1 max-w-[580px] gap-4 mx-auto hidden md:flex items-center">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                🔍
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search books, supplies, materials…"
                                className="input-sd !pl-10 pr-4 h-[38px] text-[13px]"
                                style={{ borderRadius: '8px' }}
                            />
                        </div>
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
                    </form>



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
                                    href="/messages"
                                    className="relative w-8 h-8 flex items-center justify-center rounded-lg text-base"
                                    style={{
                                        background: 'var(--bg-subtle)',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                    }}
                                >
                                    💬
                                    <span
                                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                                        style={{ background: 'var(--accent)', border: '1.5px solid var(--bg)' }}
                                    >
                                        9+
                                    </span>
                                </Link>

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
                                            className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white flex-shrink-0"
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
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'var(--bg)',
                    borderTop: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 49,
                }}>
                    <div className="section-sd" style={{ padding: '28px 32px 32px' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${megaMenuColumns.length}, minmax(0, 1fr))`,
                            gap: '0 24px',
                        }}>
                            {megaMenuColumns.map(col => (
                                <div key={col.heading}>
                                    <p style={{
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: 'var(--text)',
                                        margin: '0 0 10px',
                                    }}>
                                        {col.heading}
                                    </p>
                                    {col.links.map(link => (
                                        <Link
                                            // key={link.href}
                                            href={link.href}
                                            style={{
                                                display: 'block',
                                                fontSize: '13px',
                                                color: 'var(--text-secondary)',
                                                textDecoration: 'none',
                                                padding: '3px 0',
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}