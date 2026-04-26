'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MOCK_ORDERS } from '../../(lib)/mockdata'
import type { OrderStatus } from '@/types'

const STATUS_TABS: (OrderStatus | 'All')[] = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const STATUS_BADGE: Record<string, string> = {
    Processing: 'badge-accent',
    Confirmed: 'badge-accent',
    Shipped: 'badge-yellow',
    Delivered: 'badge-green',
    Cancelled: '',
}

export default function PurchaseHistoryPage() {
    const [activeTab, setActiveTab] = useState<OrderStatus | 'All'>('All')

    const filtered = MOCK_ORDERS.filter(o => activeTab === 'All' || o.status === activeTab)

    return (
        <div className="flex flex-col gap-6 px-[10px]">
            <h1 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>Purchase History</h1>

            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide" style={{ borderBottom: '1.5px solid var(--border)' }}>
                {STATUS_TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="px-4 py-2.5 text-[13px] font-medium flex-shrink-0 transition-colors"
                        style={{
                            color: activeTab === tab ? 'var(--accent)' : 'var(--text-secondary)',
                            borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
                            background: 'none', border: 'none',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 2,
                            borderBottomColor: activeTab === tab ? 'var(--accent)' : 'transparent',
                            marginBottom: -2,
                            cursor: 'pointer',
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-5xl mb-3">📭</div>
                    <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>No orders in this category.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filtered.map(order => (
                        <div
                            key={order.id}
                            className="rounded-xl overflow-hidden"
                            style={{ border: '1.5px solid var(--border)' }}
                        >
                            <div className="px-5 py-3 flex items-center justify-between flex-wrap gap-2" style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
                                <div className="flex items-center gap-3">
                                    <span className="text-[12px] font-mono font-semibold" style={{ color: 'var(--text)' }}>{order.id}</span>
                                    <span
                                        className={`badge-sd text-[11px] ${STATUS_BADGE[order.status] ?? ''}`}
                                        style={order.status === 'Cancelled' ? { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' } : {}}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{order.date}</span>
                            </div>

                            <div className="p-4">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-3 mb-3 last:mb-0">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>📗</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[13px] font-medium truncate" style={{ color: 'var(--text)' }}>{item.title}</div>
                                            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>₱{item.price.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center justify-between mt-4 pt-4 flex-wrap gap-3" style={{ borderTop: '1px solid var(--border)' }}>
                                    <div>
                                        <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>Total: </span>
                                        <span className="text-[15px] font-bold" style={{ color: 'var(--text)' }}>₱{order.total.toLocaleString()}</span>
                                        <span className="text-[11px] ml-2" style={{ color: 'var(--text-muted)' }}>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/orders/${order.id}`} className="btn-secondary text-[12px] py-1.5 px-4">
                                            View Details
                                        </Link>
                                        {order.status === 'Delivered' && (
                                            <Link href={`/review/${order.id}`} className="btn-primary text-[12px] py-1.5 px-4">
                                                Leave Review
                                            </Link>
                                        )}
                                        {order.status === 'Processing' && (
                                            <button className="btn-ghost text-[12px] py-1.5 px-4" style={{ color: '#dc2626' }}>
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}