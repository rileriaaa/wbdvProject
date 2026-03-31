'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { MOCK_ORDERS } from '../../(lib)/mockdata'

export default function LeaveReviewPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const order = MOCK_ORDERS.find(o => o.id === id) ?? MOCK_ORDERS[0]
    const item = order.items[0]

    const [overall, setOverall] = useState(0)
    const [hovered, setHovered] = useState(0)
    const [catRatings, setCatRatings] = useState({ itemAsDescribed: 0, communication: 0, shippingSpeed: 0 })
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [anonymous, setAnonymous] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (overall === 0) { setError('Please select an overall rating.'); return }
        setError('')
        setSubmitted(true)
        setTimeout(() => router.push('/profile/orders'), 2500)
    }

    const StarRow = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(s => (
                <button
                    key={s}
                    type="button"
                    onClick={() => onChange(s)}
                    className="text-2xl transition-transform hover:scale-110"
                    style={{ color: s <= value ? '#f59e0b' : 'var(--border)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}
                >★</button>
            ))}
        </div>
    )

    if (submitted) {
        return (
            <div className="section-sd py-24 text-center">
                <div className="text-6xl mb-4">⭐</div>
                <h2 className="text-[24px] font-bold mb-2" style={{ color: 'var(--text)' }}>Review Submitted!</h2>
                <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>Redirecting to your orders…</p>
            </div>
        )
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="section-sd py-8 md:py-12 max-w-[700px]">
                <Link href="/profile/orders" className="text-[12px] font-medium mb-4 flex items-center gap-1" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    ← Back to Orders
                </Link>
                <h1 className="text-[24px] font-bold mb-6" style={{ color: 'var(--text)' }}>Leave a Review</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                        <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                            <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Order Reference</h2>
                        </div>
                        <div className="p-4 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>📗</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[14px] font-semibold truncate" style={{ color: 'var(--text)' }}>{item.title}</div>
                                <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Order: {order.id} · {order.date}</div>
                            </div>
                            <div className="text-[14px] font-bold flex-shrink-0" style={{ color: 'var(--text)' }}>₱{item.price.toLocaleString()}</div>
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                        <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                            <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Reviewing Seller</h2>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: 'var(--accent)' }}>
                                    {item.seller.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{item.seller.name}</div>
                                    <div className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--text-muted)' }}>
                                        <span className="stars text-[11px]">★</span> {item.seller.rating} rating
                                    </div>
                                </div>
                            </div>
                            <Link href={`/seller/${item.seller.id}`} className="btn-secondary text-[12px] py-1.5 px-4">View Profile</Link>
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                        <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                            <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Overall Rating</h2>
                        </div>
                        <div className="p-5 flex flex-col items-center gap-3">
                            <p className="text-[12px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Tap to rate</p>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <button
                                        key={s} type="button"
                                        onClick={() => setOverall(s)}
                                        onMouseEnter={() => setHovered(s)}
                                        onMouseLeave={() => setHovered(0)}
                                        className="text-4xl transition-transform hover:scale-110"
                                        style={{ color: s <= (hovered || overall) ? '#f59e0b' : 'var(--border)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}
                                    >★</button>
                                ))}
                            </div>
                            <p className="text-[14px] font-semibold" style={{ color: overall ? 'var(--accent)' : 'var(--text-muted)' }}>
                                {overall ? `${overall} out of 5 — ${LABELS[overall]}` : 'Select a rating'}
                            </p>
                            {error && <p className="text-[12px]" style={{ color: '#dc2626' }}>{error}</p>}
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                        <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                            <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Rate by Category</h2>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            {([
                                { key: 'itemAsDescribed', label: 'Item as Described' },
                                { key: 'communication', label: 'Seller Communication' },
                                { key: 'shippingSpeed', label: 'Shipping Speed' },
                            ] as { key: keyof typeof catRatings; label: string }[]).map(c => (
                                <div key={c.key} className="flex items-center justify-between gap-4">
                                    <span className="text-[14px]" style={{ color: 'var(--text)' }}>{c.label}</span>
                                    <StarRow value={catRatings[c.key]} onChange={v => setCatRatings(p => ({ ...p, [c.key]: v }))} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                        <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                            <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Write Your Review</h2>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>Review Title</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Summarize your experience" className="input-sd h-[42px]" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>Review Body</label>
                                <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Tell others about your experience…" className="input-sd" style={{ height: 100, resize: 'none', paddingTop: 10 }} />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-secondary)' }}>Add Photos (optional)</label>
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-16 rounded-lg flex items-center justify-center text-xl cursor-pointer" style={{ background: 'var(--bg-muted)', border: '2px dashed var(--border)' }}>+</div>
                                    <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Drag & drop or click to upload</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <button
                                type="button"
                                onClick={() => setAnonymous(v => !v)}
                                className="w-10 h-5 rounded-full relative transition-colors"
                                style={{ background: anonymous ? 'var(--accent)' : 'var(--border)', border: 'none', cursor: 'pointer' }}
                            >
                                <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: anonymous ? '22px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                            </button>
                            <div>
                                <div className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>Post Anonymously</div>
                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Your name won&apos;t be shown on this review</div>
                            </div>
                        </label>
                        <div className="flex items-center gap-3">
                            <Link href="/profile/orders" className="btn-secondary text-[14px] h-[44px] px-6">Cancel</Link>
                            <button type="submit" className="btn-primary text-[14px] h-[44px] px-8">Submit Review →</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}