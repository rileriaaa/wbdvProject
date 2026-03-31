'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getUser } from '../(lib)/storage'
import type { User } from '@/types'

interface Message {
    id: string
    from: 'me' | 'them'
    text: string
    time: string
}

interface Conversation {
    id: string
    name: string
    initials: string
    lastMsg: string
    time: string
    unread: number
    productTitle: string
    productPrice: number
    messages: Message[]
}

const CONVERSATIONS: Conversation[] = [
    {
        id: 'c1', name: 'Maria Santos', initials: 'MS', unread: 2,
        lastMsg: 'Is the calculus book still available?', time: '2h ago',
        productTitle: 'Calculus: Early Transcendentals, 8th Ed.', productPrice: 320,
        messages: [
            { id: 'm1', from: 'them', text: 'Hi! Is the calculus book still available?', time: '10:30 AM' },
            { id: 'm2', from: 'me', text: 'Yes it is! Still in good condition.', time: '10:35 AM' },
            { id: 'm3', from: 'them', text: 'Great! Can we do ₱300?', time: '10:38 AM' },
            { id: 'm4', from: 'me', text: 'Best I can do is ₱310, it\'s barely used.', time: '10:40 AM' },
            { id: 'm5', from: 'them', text: 'Deal! Where can we meet?', time: '10:42 AM' },
        ],
    },
    {
        id: 'c2', name: 'Juan Dela Cruz', initials: 'JD', unread: 0,
        lastMsg: 'I already bought one, thanks!', time: '1d ago',
        productTitle: 'Engineering Drawing Set', productPrice: 180,
        messages: [
            { id: 'm1', from: 'them', text: 'Hey, do you still have the drawing set?', time: 'Yesterday' },
            { id: 'm2', from: 'me', text: 'Yes, pick up or delivery?', time: 'Yesterday' },
            { id: 'm3', from: 'them', text: 'I already bought one, thanks!', time: 'Yesterday' },
        ],
    },
    {
        id: 'c3', name: 'Ana Reyes', initials: 'AR', unread: 1,
        lastMsg: 'Can you add more photos?', time: '2d ago',
        productTitle: 'Organic Chemistry 9th Ed.', productPrice: 450,
        messages: [
            { id: 'm1', from: 'them', text: 'Can you add more photos of the book?', time: '2 days ago' },
        ],
    },
]

function MessagesContent() {
    const searchParams = useSearchParams()
    const [user, setUser] = useState<User | null>(null)
    const [activeConvo, setActiveConvo] = useState<Conversation>(CONVERSATIONS[0])
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Message[]>(CONVERSATIONS[0].messages)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => { setUser(getUser()) }, [])
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

    function selectConvo(c: Conversation) {
        setActiveConvo(c)
        setMessages(c.messages)
    }

    function sendMessage(e: React.FormEvent) {
        e.preventDefault()
        if (!input.trim()) return
        const newMsg: Message = { id: `m${Date.now()}`, from: 'me', text: input.trim(), time: 'Just now' }
        setMessages(prev => [...prev, newMsg])
        setInput('')
    }

    return (
        <div style={{ background: 'var(--bg)', height: 'calc(100vh - 60px)', display: 'flex', overflow: 'hidden' }}>

            {/* ── INBOX SIDEBAR ── */}
            <div
                className="w-[300px] flex-shrink-0 flex flex-col hidden md:flex"
                style={{ borderRight: '1px solid var(--border)' }}
            >
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
                    <h2 className="text-[15px] font-bold" style={{ color: 'var(--text)' }}>Messages</h2>
                    <button className="btn-ghost w-8 h-8 p-0 flex items-center justify-center text-lg">✏️</button>
                </div>

                {/* Search */}
                <div className="px-3 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px]" style={{ color: 'var(--text-muted)' }}>🔍</span>
                        <input type="text" placeholder="Search conversations…" className="input-sd pl-8 h-[34px] text-[12px]" />
                    </div>
                </div>

                {/* Conversation list */}
                <div className="flex-1 overflow-y-auto">
                    {CONVERSATIONS.map(c => (
                        <button
                            key={c.id}
                            onClick={() => selectConvo(c)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                            style={{
                                background: activeConvo.id === c.id ? 'var(--accent-light)' : 'transparent',
                                borderLeft: `3px solid ${activeConvo.id === c.id ? 'var(--accent)' : 'transparent'}`,
                                borderBottom: '1px solid var(--border)',
                                cursor: 'pointer',
                            }}
                        >
                            <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: 'var(--accent)' }}>
                                    {c.initials}
                                </div>
                                {c.unread > 0 && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: 'var(--accent)' }}>
                                        {c.unread}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] font-semibold truncate" style={{ color: 'var(--text)' }}>{c.name}</span>
                                    <span className="text-[10px] flex-shrink-0 ml-2" style={{ color: 'var(--text-muted)' }}>{c.time}</span>
                                </div>
                                <div className="text-[12px] truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{c.lastMsg}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── CONVERSATION THREAD ── */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Thread header */}
                <div className="flex items-center gap-3 px-5 py-3 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: 'var(--accent)' }}>
                        {activeConvo.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{activeConvo.name}</div>
                        <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Last seen 2h ago</div>
                    </div>
                    {/* Linked product */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg flex-shrink-0" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                        <span className="text-sm">📗</span>
                        <div>
                            <div className="text-[11px] font-semibold truncate max-w-[140px]" style={{ color: 'var(--text)' }}>{activeConvo.productTitle}</div>
                            <div className="text-[11px]" style={{ color: 'var(--accent)' }}>₱{activeConvo.productPrice}</div>
                        </div>
                    </div>
                    <button className="btn-secondary text-[12px] py-1.5 px-3 flex-shrink-0">Report</button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className="max-w-[70%]">
                                <div
                                    className="px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed"
                                    style={{
                                        background: msg.from === 'me' ? 'var(--text)' : 'var(--bg-subtle)',
                                        color: msg.from === 'me' ? 'var(--bg)' : 'var(--text)',
                                        border: msg.from === 'me' ? 'none' : '1px solid var(--border)',
                                        borderBottomRightRadius: msg.from === 'me' ? 4 : undefined,
                                        borderBottomLeftRadius: msg.from !== 'me' ? 4 : undefined,
                                    }}
                                >
                                    {msg.text}
                                </div>
                                <div className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-right' : ''}`} style={{ color: 'var(--text-muted)' }}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                    onSubmit={sendMessage}
                    className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
                    style={{ borderTop: '1px solid var(--border)' }}
                >
                    <button type="button" className="btn-ghost w-9 h-9 p-0 flex items-center justify-center text-lg flex-shrink-0">📎</button>
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message…"
                        className="input-sd flex-1 h-[40px] text-[14px]"
                    />
                    <button type="submit" className="btn-primary h-[40px] px-5 text-[13px] flex-shrink-0">
                        Send →
                    </button>
                </form>
            </div>
        </div>
    )
}

// ── Suspense wrapper — required for useSearchParams() ────────────────────
export default function MessagesPage() {
    return (
        <Suspense fallback={
            <div className="section-sd py-20 text-center">
                <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>Loading messages…</p>
            </div>
        }>
            <MessagesContent />
        </Suspense>
    )
}