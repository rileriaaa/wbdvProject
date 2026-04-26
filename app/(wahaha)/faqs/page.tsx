'use client'

import { useState } from 'react'
import Link from 'next/link'

const FAQ_DATA = [
    {
        category: 'Buying',
        items: [
            { q: 'How do I find items on Scholar\'s Den?', a: 'Use the search bar at the top of any page, or browse by category using the Browse page. You can filter by price, condition, and category.' },
            { q: 'Is it safe to buy from other students?', a: 'Yes! All sellers are verified students. We also offer buyer protection — if your item doesn\'t match the description, we\'ll help resolve it.' },
            { q: 'Can I return an item if it\'s not as described?', a: 'Yes. If the item significantly differs from the listing, you can open a dispute within 3 days of receiving it. Contact us through the Order Details page.' },
            { q: 'How do I contact a seller?', a: 'Click "Message Seller" on any listing page. You\'ll be taken to a private chat where you can ask questions before purchasing.' },
        ],
    },
    {
        category: 'Selling',
        items: [
            { q: 'How do I create a listing?', a: 'Go to your Seller Dashboard and click "Add New Listing". Fill in the product details, upload photos, set a price, and publish.' },
            { q: 'What items can I sell on Scholar\'s Den?', a: 'Textbooks, school supplies, art materials, lab equipment, electronics, and other educational materials. Items must be legal and school-appropriate.' },
            { q: 'How do I set a price for my items?', a: 'We recommend pricing at 40–60% of the original retail price for used items. You can also set an original price to show buyers how much they\'re saving.' },
        ],
    },
    {
        category: 'Payments',
        items: [
            { q: 'What payment methods are accepted?', a: 'We accept GCash, Credit/Debit Cards, Bank Transfer, and Cash on Delivery (for on-campus pickups).' },
            { q: 'Is my payment information secure?', a: 'Yes. All transactions are encrypted. We never store your full card details on our servers.' },
            { q: 'When do I get charged?', a: 'Your payment is processed when you confirm your order at checkout. For COD, you pay when you receive the item.' },
        ],
    },
    {
        category: 'Shipping & Delivery',
        items: [
            { q: 'What are the shipping options?', a: 'Standard Delivery (3–5 days, ₱80), Express Delivery (1–2 days, ₱150), and On-Campus Pickup (free, available Mon–Sat).' },
            { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days. Express delivery takes 1–2 days. Campus pickup is available same-day if the seller confirms.' },
            { q: 'Can I pick up items in person?', a: 'Yes! Select "Pick-up (On Campus)" at checkout. The seller will arrange a meeting point on campus.' },
        ],
    },
]

export default function FAQsPage() {
    const [search, setSearch] = useState('')
    const [activeTab, setActiveTab] = useState('All')
    const [openItems, setOpenItems] = useState<string[]>([])

    const allCategories = ['All', ...FAQ_DATA.map(f => f.category)]

    const filtered = FAQ_DATA
        .filter(cat => activeTab === 'All' || cat.category === activeTab)
        .map(cat => ({
            ...cat,
            items: cat.items.filter(
                item => !search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter(cat => cat.items.length > 0)

    function toggleItem(key: string) {
        setOpenItems(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
    }

    return (
        <div style={{ background: 'var(--bg)' }}>

            <section className="py-12 md:py-16" style={{ background: 'var(--dark-surface)' }}>
                <div className="section-sd text-center">
                    <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Help Center</p>
                    <h1 className="text-[32px] font-bold text-white mb-4">Frequently Asked Questions</h1>
                    <div className="max-w-[480px] mx-auto relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: 'rgba(255,255,255,0.3)' }}>🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search your question…"
                            className="w-full h-[48px] pl-11 pr-4 rounded-xl text-[14px] outline-none"
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'var(--font-sans)' }}
                        />
                    </div>
                </div>
            </section>

            <div className="section-sd py-10 md:py-14" style={{ padding: '50px 10px 50px 10px' }}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">

                    <div>
                        <div className="flex items-center gap-2 flex-wrap mb-8">
                            {allCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className="px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors"
                                    style={{
                                        background: activeTab === cat ? 'var(--text)' : 'var(--bg-subtle)',
                                        color: activeTab === cat ? 'var(--bg)' : 'var(--text-secondary)',
                                        border: `1px solid ${activeTab === cat ? 'var(--text)' : 'var(--border)'}`,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {filtered.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-5xl mb-3">🔍</div>
                                <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>No results for &ldquo;{search}&rdquo;</p>
                            </div>
                        ) : (
                            filtered.map(cat => (
                                <div key={cat.category} className="mb-10">
                                    <h2 className="text-[18px] font-bold mb-4" style={{ color: 'var(--text)' }}>{cat.category}</h2>
                                    <div className="flex flex-col gap-2">
                                        {cat.items.map((item, i) => {
                                            const key = `${cat.category}-${i}`
                                            const open = openItems.includes(key)
                                            return (
                                                <div key={key} className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${open ? 'var(--accent)' : 'var(--border)'}` }}>
                                                    <button
                                                        onClick={() => toggleItem(key)}
                                                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                                                        style={{ background: open ? 'var(--accent-light)' : 'var(--bg-subtle)', border: 'none', cursor: 'pointer' }}
                                                    >
                                                        <span className="text-[14px] font-semibold pr-4" style={{ color: 'var(--text)' }}>{item.q}</span>
                                                        <span className="text-[16px] flex-shrink-0" style={{ color: 'var(--accent)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                                                    </button>
                                                    {open && (
                                                        <div className="px-5 pb-4 pt-2" style={{ background: 'var(--bg)' }}>
                                                            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.a}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))
                        )}

                        <div
                            className="flex items-center justify-between p-6 rounded-xl flex-wrap gap-4"
                            style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}
                        >
                            <div>
                                <h3 className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>Still have questions?</h3>
                                <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Our support team is here to help.</p>
                            </div>
                            <Link href="/contact" className="btn-primary text-[14px]">Contact Support →</Link>
                        </div>
                    </div>

                    <div className="sticky top-[80px] flex flex-col gap-4">
                        <div className="p-5 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Popular Topics</h3>
                            <div className="flex flex-col gap-1">
                                {['How to buy safely', 'Creating a listing', 'Payment methods', 'Shipping & delivery', 'Returns & disputes', 'Account security'].map(topic => (
                                    <button
                                        key={topic}
                                        onClick={() => setSearch(topic)}
                                        className="flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-left w-full"
                                        style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        <span>{topic}</span>
                                        <span style={{ color: 'var(--text-muted)' }}>›</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Contact Support</h3>
                            <div className="flex flex-col gap-3">
                                {[
                                    { icon: '💬', label: 'Live Chat', desc: 'Available 9AM–6PM' },
                                    { icon: '📧', label: 'Email Support', desc: 'Reply within 24hrs' },
                                ].map(c => (
                                    <Link key={c.label} href="/contact" className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-muted)', textDecoration: 'none' }}>
                                        <span className="text-xl">{c.icon}</span>
                                        <div>
                                            <div className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{c.label}</div>
                                            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{c.desc}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}