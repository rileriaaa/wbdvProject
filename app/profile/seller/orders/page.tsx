'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MOCK_ORDERS } from '../../../(lib)/mockdata'
import type { OrderStatus } from '@/types'

type DashTab = 'All' | 'New' | 'Processing' | 'Shipped' | 'Completed'

export default function OrdersDashboardPage() {
    const [activeTab, setActiveTab] = useState<DashTab>('All')
    const tabs: DashTab[] = ['All', 'New', 'Processing', 'Shipped', 'Completed']

    const orders = [...MOCK_ORDERS, {
        ...MOCK_ORDERS[0],
        id: 'ORD-2024-003',
        status: 'Shipped' as OrderStatus,
        total: 450,
        date: '2024-03-20',
    }]

    const filtered = orders.filter(o => {
        if (activeTab === 'All') return true
        if (activeTab === 'New') return o.status === 'Processing'
        if (activeTab === 'Completed') return o.status === 'Delivered'
        return o.status === activeTab
    })

    const STATS = [
        { icon: '📦', label: 'Total Orders', value: orders.length },
        { icon: '⏳', label: 'Pending', value: orders.filter(o => o.status === 'Processing').length },
        { icon: '🚚', label: 'Shipped', value: orders.filter(o => o.status === 'Shipped').length },
        { icon: '💰', label: 'Total Earnings', value: `₱${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}` },
    ]

    const STATUS_BADGE: Record<string, string> = {
        Processing: 'badge-accent',
        Shipped: 'badge-yellow',
        Delivered: 'badge-green',
        Cancelled: '',
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>Orders Dashboard</h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map(stat => (
                    <div key={stat.label} className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                        <span className="text-2xl">{stat.icon}</span>
                        <div>
                            <div className="text-[20px] font-bold" style={{ color: 'var(--text)' }}>{stat.value}</div>
                            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ color: 'var(--bg)' }}>Incoming Orders</h2>
                </div>

                <div className="flex items-center gap-1 px-5 pt-3" style={{ borderBottom: '1px solid var(--border)' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="px-3 py-2 text-[12px] font-medium flex-shrink-0"
                            style={{
                                color: activeTab === tab ? 'var(--accent)' : 'var(--text-secondary)',
                                borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
                                background: 'none', border: 'none',
                                borderBottomStyle: 'solid', borderBottomWidth: 2,
                                borderBottomColor: activeTab === tab ? 'var(--accent)' : 'transparent',
                                marginBottom: -1, cursor: 'pointer',
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 text-[11px] font-bold uppercase tracking-widest" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                    <span>Order ID · Buyer</span>
                    <span className="text-center">Total</span>
                    <span className="text-center">Date</span>
                    <span className="text-center">Status</span>
                    <span>Action</span>
                </div>

                {filtered.map((order, i) => (
                    <div
                        key={order.id}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center"
                        style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}
                    >
                        <div>
                            <div className="text-[13px] font-mono font-semibold" style={{ color: 'var(--text)' }}>{order.id}</div>
                            <div className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: 'var(--text-secondary)' }}>B</span>
                                Buyer · {order.items.length} item{order.items.length > 1 ? 's' : ''}
                            </div>
                        </div>

                        <div className="text-center text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
                            ₱{order.total.toLocaleString()}
                        </div>

                        <div className="text-center text-[12px]" style={{ color: 'var(--text-secondary)' }}>{order.date}</div>

                        <div className="flex justify-center">
                            <span
                                className={`badge-sd text-[11px] ${STATUS_BADGE[order.status] ?? ''}`}
                                style={order.status === 'Cancelled' ? { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' } : {}}
                            >
                                {order.status}
                            </span>
                        </div>

                        <Link href={`/orders/${order.id}`} className="btn-secondary text-[11px] py-1 px-3 h-[30px]">
                            Details
                        </Link>
                    </div>
                ))}
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ color: 'var(--bg)' }}>Sales Summary</h2>
                </div>
                <div className="p-5">
                    <div className="h-[120px] rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                        <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>📊 Sales Chart Placeholder</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: 'This Week', val: `₱${MOCK_ORDERS[0].total.toLocaleString()}` },
                            { label: 'This Month', val: `₱${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}` },
                            { label: 'All Time', val: `₱${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}` },
                        ].map(s => (
                            <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                                <div className="text-[18px] font-bold" style={{ color: 'var(--text)' }}>{s.val}</div>
                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}