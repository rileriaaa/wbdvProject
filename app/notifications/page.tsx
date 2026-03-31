'use client'

import { useState } from 'react'
import { MOCK_NOTIFICATIONS } from '../(lib)/mockdata'
import type { Notification, NotifType } from '@/types'

const FILTER_TABS: { id: NotifType | 'All'; label: string; icon: string }[] = [
    { id: 'All', label: 'All', icon: '🔔' },
    { id: 'Order Update', label: 'Order Updates', icon: '📦' },
    { id: 'Message', label: 'Messages', icon: '💬' },
    { id: 'Review', label: 'Review Reminders', icon: '⭐' },
    { id: 'Promotion', label: 'Promotions', icon: '🎉' },
    { id: 'System', label: 'System', icon: '⚙️' },
]

const NOTIF_ICON: Record<string, string> = {
    'Order Update': '📦',
    'Message': '💬',
    'Promotion': '🎉',
    'Review': '⭐',
    'System': '⚙️',
}

export default function NotificationsPage() {
    const [notifs, setNotifs] = useState<Notification[]>(MOCK_NOTIFICATIONS)
    const [activeFilter, setActiveFilter] = useState<NotifType | 'All'>('All')
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        'Order Update': true,
        'Message': true,
        'Review': true,
        'Promotion': false,
        'System': true,
    })

    const filtered = notifs.filter(n => activeFilter === 'All' || n.type === activeFilter)
    const unreadCount = notifs.filter(n => !n.read).length

    function markAllRead() {
        setNotifs(prev => prev.map(n => ({ ...n, read: true })))
    }

    function clearAll() {
        setNotifs([])
    }

    function markRead(id: string) {
        setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    }

    const groups: { label: string; items: Notification[] }[] = [
        { label: 'Today', items: filtered.filter((_, i) => i < 3) },
        { label: 'Yesterday', items: filtered.filter((_, i) => i >= 3) },
    ].filter(g => g.items.length > 0)

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="section-sd py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">

                    <div className="flex flex-col gap-6">
                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Filter</h3>
                            <div className="flex flex-col gap-1">
                                {FILTER_TABS.map(f => (
                                    <button
                                        key={f.id}
                                        onClick={() => setActiveFilter(f.id)}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-left w-full transition-colors"
                                        style={{
                                            background: activeFilter === f.id ? 'var(--accent-light)' : 'transparent',
                                            color: activeFilter === f.id ? 'var(--accent)' : 'var(--text-secondary)',
                                            fontWeight: activeFilter === f.id ? 600 : 400,
                                            border: 'none', cursor: 'pointer',
                                        }}
                                    >
                                        <span>{f.icon}</span>
                                        <span className="flex-1">{f.label}</span>
                                        {f.id === 'All' && unreadCount > 0 && (
                                            <span className="badge-sd badge-accent text-[10px] px-1.5">{unreadCount}</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Notification Settings</h3>
                            <div className="flex flex-col gap-3">
                                {Object.entries(toggles).map(([key, val]) => (
                                    <div key={key} className="flex items-center justify-between">
                                        <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{key}</span>
                                        <button
                                            onClick={() => setToggles(t => ({ ...t, [key]: !t[key] }))}
                                            className="w-9 h-5 rounded-full relative transition-colors flex-shrink-0"
                                            style={{ background: val ? 'var(--accent)' : 'var(--border)', border: 'none', cursor: 'pointer' }}
                                        >
                                            <span
                                                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                                                style={{ left: val ? '18px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <h1 className="text-[20px] font-bold" style={{ color: 'var(--text)' }}>Notifications</h1>
                                {unreadCount > 0 && (
                                    <span className="badge-sd badge-accent text-[11px]">{unreadCount} unread</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={markAllRead} className="btn-ghost text-[12px] py-1.5 px-3">Mark All Read</button>
                                <button onClick={clearAll} className="btn-ghost text-[12px] py-1.5 px-3" style={{ color: '#dc2626' }}>Clear All</button>
                            </div>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-5xl mb-3">🔔</div>
                                <h3 className="text-[16px] font-bold mb-1" style={{ color: 'var(--text)' }}>All caught up!</h3>
                                <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>No notifications here.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {groups.map(group => (
                                    <div key={group.label}>
                                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>{group.label}</h3>
                                        <div className="flex flex-col gap-2">
                                            {group.items.map(notif => (
                                                <div
                                                    key={notif.id}
                                                    onClick={() => markRead(notif.id)}
                                                    className="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all"
                                                    style={{
                                                        background: notif.read ? 'var(--bg-subtle)' : 'var(--accent-light)',
                                                        border: `1.5px solid ${notif.read ? 'var(--border)' : 'var(--accent-border)'}`,
                                                        borderLeft: `4px solid ${notif.read ? 'var(--border)' : 'var(--accent)'}`,
                                                    }}
                                                >
                                                    <div
                                                        className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                                                        style={{ background: notif.read ? 'var(--bg-muted)' : 'var(--accent)', color: notif.read ? 'var(--text-secondary)' : '#fff' }}
                                                    >
                                                        {NOTIF_ICON[notif.type] ?? '🔔'}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <p className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{notif.title}</p>
                                                            <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{notif.time}</span>
                                                        </div>
                                                        <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{notif.body}</p>
                                                        <span className="badge-sd badge-neutral text-[10px] mt-2">{notif.type}</span>
                                                    </div>

                                                    {!notif.read && (
                                                        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--accent)' }} />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}