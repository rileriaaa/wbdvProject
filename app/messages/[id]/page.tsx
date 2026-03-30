'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Message {
    id: string
    from: 'me' | 'them'
    text: string
    time: string
}

const CONVERSATIONS: Record<string, {
    name: string
    initials: string
    productTitle: string
    productId: string
    productPrice: number
    messages: Message[]
}> = {
    c1: {
        name: 'Maria Santos', initials: 'MS',
        productTitle: 'Calculus: Early Transcendentals, 8th Ed.', productId: '1', productPrice: 320,
        messages: [
            { id: 'm1', from: 'them', text: 'Hi! Is the calculus book still available?', time: '10:30 AM' },
            { id: 'm2', from: 'me', text: 'Yes it is! Still in good condition.', time: '10:35 AM' },
            { id: 'm3', from: 'them', text: 'Great! Can we do ₱300?', time: '10:38 AM' },
            { id: 'm4', from: 'me', text: 'Best I can do is ₱310, it\'s barely used.', time: '10:40 AM' },
            { id: 'm5', from: 'them', text: 'Deal! Where can we meet?', time: '10:42 AM' },
        ],
    },
    c2: {
        name: 'Juan Dela Cruz', initials: 'JD',
        productTitle: 'Engineering Drawing Set', productId: '2', productPrice: 180,
        messages: [
            { id: 'm1', from: 'them', text: 'Hey, do you still have the drawing set?', time: 'Yesterday' },
            { id: 'm2', from: 'me', text: 'Yes, pick up or delivery?', time: 'Yesterday' },
            { id: 'm3', from: 'them', text: 'I already bought one, thanks!', time: 'Yesterday' },
        ],
    },
    c3: {
        name: 'Ana Reyes', initials: 'AR',
        productTitle: 'Organic Chemistry 9th Ed.', productId: '3', productPrice: 450,
        messages: [
            { id: 'm1', from: 'them', text: 'Can you add more photos of the book?', time: '2 days ago' },
        ],
    },
}

export default function ConversationPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const convo = CONVERSATIONS[id] ?? CONVERSATIONS.c1

    const [messages, setMessages] = useState<Message[]>(convo.messages)
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    function sendMessage(e: React.FormEvent) {
        e.preventDefault()
        if (!input.trim()) return
        setMessages(prev => [...prev, {
            id: `m${Date.now()}`, from: 'me', text: input.trim(), time: 'Just now',
        }])
        setInput('')
    }

    return (
        <div style={{ background: 'var(--bg)', height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>

            <div
                className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
                style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}
            >
                <button
                    onClick={() => router.push('/messages')}
                    className="btn-ghost w-8 h-8 p-0 flex items-center justify-center mr-1"
                    style={{ fontSize: 18 }}
                >
                    ←
                </button>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background: 'var(--accent)' }}>
                    {convo.initials}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{convo.name}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Last seen 2h ago</div>
                </div>

                <Link
                    href={`/item/${convo.productId}`}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg flex-shrink-0"
                    style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', textDecoration: 'none' }}
                >
                    <span className="text-sm">📗</span>
                    <div>
                        <div className="text-[11px] font-semibold truncate max-w-[140px]" style={{ color: 'var(--text)' }}>{convo.productTitle}</div>
                        <div className="text-[11px]" style={{ color: 'var(--accent)' }}>₱{convo.productPrice}</div>
                    </div>
                </Link>

                <button className="btn-secondary text-[12px] py-1.5 px-3 flex-shrink-0">Report</button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                <div className="flex items-center gap-3 my-2">
                    <hr className="flex-1 divider-sd" />
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Today</span>
                    <hr className="flex-1 divider-sd" />
                </div>

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
                            <div
                                className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-right' : ''}`}
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {msg.time}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <form
                onSubmit={sendMessage}
                className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
                style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}
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
    )
}