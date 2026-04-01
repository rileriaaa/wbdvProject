'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' })
    const [submitted, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)

    const SUBJECTS = ['General Inquiry', 'Order Issue', 'Account Problem', 'Report a Listing', 'Technical Support', 'Feedback']

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        await new Promise(r => setTimeout(r, 900))
        setLoading(false)
        setSubmit(true)
    }

    if (submitted) {
        return (
            <div className="section-sd py-24 text-center">
                <div className="text-6xl mb-4">📬</div>
                <h2 className="text-[26px] font-bold mb-2" style={{ color: 'var(--text)' }}>Message Sent!</h2>
                <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
                    We typically respond within 24 hours in business days.
                </p>
                <Link href="/" className="btn-primary text-[14px]">Back to Home</Link>
            </div>
        )
    }

    return (
        <div style={{ background: 'var(--bg)' }}>

            <section className="py-12 md:py-16" style={{ background: 'var(--text)' }}>
                <div className="section-sd text-center">
                    <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>We&apos;re Here to Help</p>
                    <h1 className="text-[32px] font-bold text-white mb-2">Contact Us</h1>
                    <p className="text-[15px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        Got a question, concern, or feedback? Reach out and we&apos;ll get back to you as soon as we can.
                    </p>
                </div>
            </section>

            <div className="section-sd py-12 md:py-16" style={{ padding: '50px 0 50px 0' }}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">

                    <div>
                        <h2 className="text-[20px] font-bold mb-6" style={{ color: 'var(--text)' }}>Send us a message</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                                    <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Juan Dela Cruz" required className="input-sd h-[42px]" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email</label>
                                    <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" required className="input-sd h-[42px]" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                                <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="input-sd h-[42px]" style={{ cursor: 'pointer' }}>
                                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>Message</label>
                                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Describe your concern in detail…" required className="input-sd" style={{ height: 140, resize: 'none', paddingTop: 10 }} />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-secondary)' }}>Attach a File (optional)</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                                        <span>📎</span>
                                        <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Choose a file</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="submit" disabled={loading} className="btn-primary h-[48px] w-full text-[15px]" style={{ opacity: loading ? 0.7 : 1 }}>
                                    {loading ? 'Sending…' : 'Send Message →'}
                                </button>
                                <p className="text-[12px] mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
                                    We typically respond within 24 hours in business days.
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="flex flex-col gap-4 sticky top-[80px]">
                        <div className="p-5 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Other Ways to Reach Us</h3>
                            <div className="flex flex-col gap-3">
                                {[
                                    { icon: '💬', label: 'Live Chat', desc: 'Available Mon–Fri, 9AM–6PM' },
                                    { icon: '📧', label: 'Email Us', desc: 'support@scholarsden.com' },
                                    { icon: '📖', label: 'Help Center', desc: 'Browse FAQs for instant answers' },
                                ].map(c => (
                                    <div key={c.label} className="flex items-start gap-3">
                                        <span className="text-xl mt-0.5">{c.icon}</span>
                                        <div>
                                            <div className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{c.label}</div>
                                            <div className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{c.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Follow Us</h3>
                            <div className="flex gap-2">
                                {['Facebook', 'Instagram', 'Twitter/X'].map(s => (
                                    <a key={s} href="#" className="flex-1 py-2 rounded-lg text-center text-[12px] font-medium" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                                        {s[0]}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Support Hours</h3>
                            <div className="flex flex-col gap-1.5 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                                <div className="flex justify-between"><span>Mon–Fri</span><span>9:00AM – 6:00PM</span></div>
                                <div className="flex justify-between"><span>Saturday</span><span>10:00AM – 3:00PM</span></div>
                                <div className="flex justify-between"><span>Sunday & Holidays</span><span style={{ color: '#dc2626' }}>Closed</span></div>
                            </div>
                        </div>

                        <div className="p-5 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Quick Links</h3>
                            <div className="flex flex-col gap-1.5">
                                {[
                                    { href: '/faqs', label: 'FAQs / Help Center' },
                                    { href: '/terms', label: 'Terms of Service' },
                                    { href: '/privacy', label: 'Privacy Policy' },
                                    { href: '/browse', label: 'Browse Listings' },
                                ].map(l => (
                                    <Link key={l.href} href={l.href} className="text-[13px]" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                                        → {l.label}
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