'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getUser } from '../(lib)/storage'
import type { User } from '@/types'

type NavItem =
    | { href: string; icon: string; label: string; divider?: false }
    | { divider: true; label?: string }

const NAV: NavItem[] = [
    { href: '/profile', icon: '👤', label: 'My Profile' },
    { href: '/profile/orders', icon: '📦', label: 'Purchase History' },
    { href: '/profile/settings', icon: '⚙️', label: 'Account Settings' },
    { divider: true, label: 'Seller Dashboard' },
    { href: '/profile/seller/listings', icon: '🏪', label: 'Manage Listings' },
    { href: '/profile/seller/listings/new', icon: '➕', label: 'Add New Listing' },
    { href: '/profile/seller/orders', icon: '📊', label: 'Orders Dashboard' },
    { divider: true },
    { href: '/faqs', icon: '❓', label: 'Help / FAQs' },
]

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => { setUser(getUser()) }, [])

    function isActive(href: string) {
        if (href === '/profile') return pathname === '/profile'
        return pathname.startsWith(href)
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="section-sd py-8 md:py-12" style={{ padding: '50px 0 50px 0' }}>
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">

                    <aside className="sticky top-[80px]">

                        <div
                            className="flex flex-col items-center text-center p-5 rounded-xl mb-4"
                            style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}
                        >
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center text-[22px] font-bold text-white mb-3"
                                style={{ background: 'var(--accent)' }}
                            >
                                {user ? `${user.firstName[0]}${user.lastName[0]}` : '?'}
                            </div>
                            <div className="text-[15px] font-bold" style={{ color: 'var(--text)' }}>
                                {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
                            </div>
                            <div className="text-[12px] mt-0.5 truncate w-full" style={{ color: 'var(--text-muted)' }}>
                                {user?.email ?? ''}
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="stars text-[11px]">★</span>
                                <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                                    {user?.rating ?? 0} · Member since {user?.memberSince ?? '—'}
                                </span>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-0.5">
                            {NAV.map((item, i) => {
                                if ('divider' in item && item.divider) {
                                    return (
                                        <div key={i}>
                                            <hr className="divider-sd my-2" />
                                            {item.label && (
                                                <p
                                                    className="text-[10px] font-bold uppercase tracking-widest px-4 mb-1.5"
                                                    style={{ color: 'var(--text-muted)' }}
                                                >
                                                    {item.label}
                                                </p>
                                            )}
                                        </div>
                                    )
                                }

                                const navItem = item as { href: string; icon: string; label: string }
                                const active = isActive(navItem.href)

                                return (
                                    <Link
                                        key={navItem.href}
                                        href={navItem.href}
                                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors"
                                        style={{
                                            background: active ? 'var(--text)' : 'transparent',
                                            color: active ? 'var(--bg)' : 'var(--text-secondary)',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <span>{navItem.icon}</span>
                                        <span>{navItem.label}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </aside>

                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}