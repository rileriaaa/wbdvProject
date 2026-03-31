'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SELLERS, PRODUCTS } from '../../(lib)/mockdata'
import ProductCard from '../../(comps)/productCard'
import type { Product } from '@/types'

const TABS = ['Listings', 'Reviews', 'About'] as const
type Tab = typeof TABS[number]

export default function SellerProfilePage() {
    const { id } = useParams<{ id: string }>()
    const seller = SELLERS.find(s => s.id === id) ?? SELLERS[0]
    const listings = (PRODUCTS as Product[]).filter(p => p.seller.id === seller.id)
    const [tab, setTab] = useState<Tab>('Listings')

    const MOCK_REVIEWS = [
        { name: 'Juan D.', rating: 5, text: 'Super responsive! Item exactly as described.', date: '1 week ago' },
        { name: 'Lea G.', rating: 5, text: 'Fast transaction. Will buy again!', date: '2 weeks ago' },
        { name: 'Carlo M.', rating: 4, text: 'Good seller. Slight delay in response but overall great.', date: '1 month ago' },
    ]

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="section-sd py-8 md:py-12">

                <div
                    className="rounded-2xl p-6 md:p-8 mb-8"
                    style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center text-[28px] font-bold text-white flex-shrink-0"
                            style={{ background: 'var(--accent)' }}
                        >
                            {seller.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <h1 className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>{seller.name}</h1>
                                    <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>🎓 {seller.school}</p>
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                        {seller.badges.map(b => (
                                            <span key={b} className="badge-sd badge-accent text-[11px]">{b}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <Link href={`/messages?seller=${seller.id}`} className="btn-primary text-[13px] py-2 px-5">
                                        Message Seller →
                                    </Link>
                                    <button className="btn-secondary text-[13px] py-2 px-4">Report</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                                {[
                                    { label: 'Listings', value: seller.totalListings },
                                    { label: 'Total Sales', value: seller.totalSales },
                                    { label: 'Rating', value: `${seller.rating} ★` },
                                    { label: 'Response Rate', value: seller.responseRate },
                                ].map(stat => (
                                    <div key={stat.label} className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                                        <div className="text-[20px] font-bold" style={{ color: 'var(--text)' }}>{stat.value}</div>
                                        <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1 mb-6" style={{ borderBottom: '1.5px solid var(--border)' }}>
                    {TABS.map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className="px-5 py-2.5 text-[14px] font-medium transition-colors"
                            style={{
                                color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
                                borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent',
                                background: 'none', border: 'none',
                                borderBottomStyle: 'solid',
                                borderBottomWidth: 2,
                                borderBottomColor: tab === t ? 'var(--accent)' : 'transparent',
                                cursor: 'pointer',
                                marginBottom: -2,
                            }}
                        >
                            {t} {t === 'Listings' && `(${listings.length})`}
                            {t === 'Reviews' && `(${MOCK_REVIEWS.length})`}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start">

                    <div>
                        {tab === 'Listings' && (
                            listings.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="text-5xl mb-3">📭</div>
                                    <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>No active listings.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                    {listings.map(p => <ProductCard key={p.id} product={p} />)}
                                </div>
                            )
                        )}

                        {tab === 'Reviews' && (
                            <div className="flex flex-col gap-5">
                                {MOCK_REVIEWS.map((rev, i) => (
                                    <div
                                        key={i}
                                        className="p-5 rounded-xl"
                                        style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: 'var(--text-secondary)' }}>
                                                    {rev.name[0]}
                                                </div>
                                                <span className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{rev.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="stars text-[12px]">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                                                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{rev.date}</span>
                                            </div>
                                        </div>
                                        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rev.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {tab === 'About' && (
                            <div
                                className="p-6 rounded-xl"
                                style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}
                            >
                                <h3 className="text-[16px] font-bold mb-3" style={{ color: 'var(--text)' }}>About {seller.name}</h3>
                                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{seller.bio}</p>
                                <div className="mt-4 pt-4 flex flex-col gap-2" style={{ borderTop: '1px solid var(--border)' }}>
                                    <div className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                                        <span>🎓</span><span>{seller.school}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                                        <span>📅</span><span>Member since {seller.memberSince}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                                        <span>⚡</span><span>Response time: {seller.responseTime}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 sticky top-[80px]">
                        <div className="p-5 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Rating Breakdown</h3>
                            <div className="text-center mb-4">
                                <div className="text-[40px] font-bold" style={{ color: 'var(--text)' }}>{seller.rating}</div>
                                <div className="stars my-1">{'★'.repeat(Math.round(seller.rating))}{'☆'.repeat(5 - Math.round(seller.rating))}</div>
                                <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{seller.totalSales} reviews</div>
                            </div>
                            {[5, 4, 3, 2, 1].map(star => {
                                const pct = star === 5 ? 80 : star === 4 ? 15 : 5
                                return (
                                    <div key={star} className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[11px] w-3" style={{ color: 'var(--text-secondary)' }}>{star}</span>
                                        <span className="stars text-[9px]">★</span>
                                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
                                            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
                                        </div>
                                        <span className="text-[10px] w-6" style={{ color: 'var(--text-muted)' }}>{pct}%</span>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}>
                            <span className="text-xl">⚡</span>
                            <div>
                                <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Response Time</div>
                                <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{seller.responseTime}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}