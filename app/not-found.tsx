import Link from 'next/link'

const SUGGESTIONS = [
    { icon: '📚', label: 'Browse Listings', href: '/browse', desc: 'Find textbooks and supplies' },
    { icon: '🔍', label: 'Search Items', href: '/browse', desc: 'Search the full catalog' },
    { icon: '❓', label: 'Visit FAQs', href: '/faqs', desc: 'Get quick answers' },
    { icon: '📦', label: 'Track Your Order', href: '/profile/orders', desc: 'Check order status' },
    { icon: '💬', label: 'Contact Support', href: '/contact', desc: 'We\'re here to help' },
    { icon: '🏠', label: 'Go to Home', href: '/', desc: 'Back to landing page' },
]

export default function NotFound() {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="section-sd py-20 md:py-28" style={{ padding: '50px 10px 50px 10px' }}>

                <div className="text-center">
                    <div
                        className="text-[120px] md:text-[160px] font-bold leading-none mb-2 select-none"
                        style={{
                            color: 'transparent',
                            WebkitTextStroke: '2px black',
                            fontFamily: 'var(--font-sans)',
                        }}
                    >
                        404
                    </div>
                    <h1 className="text-[28px] md:text-[36px] font-bold mb-3" style={{ color: 'var(--text)' }}>
                        Page Not Found
                    </h1>
                    <p className="text-[15px] max-w-[460px] mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
                        The page you&apos;re looking for doesn&apos;t exist, may have been moved, or the URL might be incorrect.
                    </p>

                    <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
                        <Link href="/" className="btn-primary text-[14px] py-2.5 px-7">← Back to Home</Link>
                        <Link href="/browse" className="btn-secondary text-[14px] py-2.5 px-7">Browse Listings</Link>
                        <Link href="/contact" className="btn-ghost text-[14px] py-2.5 px-5">Contact Support</Link>
                    </div>

                    <div className="max-w-[420px] mx-auto">
                        <form action="/browse" method="get">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>🔍</span>
                                    <input
                                        name="q"
                                        type="text"
                                        placeholder="Try searching for something…"
                                        className="input-sd !pl-10 h-[44px] text-[14px]"
                                    />
                                </div>
                                <button type="submit" className="btn-primary h-[44px] px-5 text-[14px] flex-shrink-0">Search</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="max-w-[700px] mx-auto">
                    <p className="text-[12px] font-bold mt-4 uppercase tracking-widest text-center mb-5" style={{ color: 'var(--text-muted)' }}>
                        You might be looking for
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {SUGGESTIONS.map(s => (
                            <Link
                                key={s.href + s.label}
                                href={s.href}
                                className="flex flex-col items-center text-center p-5 rounded-xl transition-all hover:-translate-y-0.5"
                                style={{
                                    background: 'var(--bg-subtle)',
                                    border: '1.5px solid var(--border)',
                                    textDecoration: 'none',
                                }}
                            >
                                <span className="text-3xl mb-2">{s.icon}</span>
                                <div className="text-[13px] font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{s.label}</div>
                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{s.desc}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}