'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MOCK_ORDERS } from '../../(lib)/mockdata'

const STEPS = ['Order Placed', 'Processing', 'Shipped', 'Delivered']

export default function OrderConfirmPage() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(t)
    }, [])

    const order = MOCK_ORDERS[0]
    const orderId = `ORD-${Date.now().toString().slice(-8)}`
    const activeStep = 0 // just placed

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="section-sd py-10 md:py-16">

                <div
                    className="rounded-2xl overflow-hidden mb-8 transition-all duration-500"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(12px)',
                        background: 'var(--text)',
                    }}
                >
                    <div className="flex flex-col items-center text-center py-12 px-6">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-5"
                            style={{ background: 'rgba(255,255,255,0.1)' }}
                        >
                            ✅
                        </div>
                        <h1 className="text-[28px] md:text-[34px] font-bold text-white mb-2">
                            Order Placed Successfully!
                        </h1>
                        <p className="text-[15px] mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            Thank you! Your items will be delivered soon.
                        </p>
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-mono font-semibold"
                            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)' }}
                        >
                            ORDER #{orderId}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
                    <div className="flex flex-col gap-6">

                        <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                            <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                                <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Items Ordered</h2>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>📗</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[14px] font-semibold truncate" style={{ color: 'var(--text)' }}>{item.title}</div>
                                            <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Qty: 1 · by {item.seller.name}</div>
                                        </div>
                                        <div className="text-[14px] font-bold flex-shrink-0" style={{ color: 'var(--text)' }}>₱{item.price.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                            <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                                <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Shipping Details</h2>
                            </div>
                            <div className="p-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                                    <div>
                                        <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Deliver To</div>
                                        <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>Ashley Naval</div>
                                        <div className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{order.shipping.address}</div>
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Shipping Method</div>
                                        <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{order.shipping.method}</div>
                                        <div className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Est. 3–5 Business Days</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Delivery Progress</div>
                                    <div className="relative flex items-center justify-between">
                                        {/* Track line */}
                                        <div className="absolute left-0 right-0 h-0.5 top-[14px] z-0" style={{ background: 'var(--border)' }} />
                                        <div
                                            className="absolute left-0 h-0.5 top-[14px] z-0 transition-all duration-700"
                                            style={{ background: 'var(--accent)', width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
                                        />
                                        {STEPS.map((s, i) => (
                                            <div key={s} className="flex flex-col items-center gap-2 z-10 flex-1">
                                                <div
                                                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                                                    style={{
                                                        background: i <= activeStep ? 'var(--accent)' : 'var(--bg)',
                                                        border: `2px solid ${i <= activeStep ? 'var(--accent)' : 'var(--border)'}`,
                                                        color: i <= activeStep ? '#fff' : 'var(--text-muted)',
                                                    }}
                                                >
                                                    {i <= activeStep ? '✓' : i + 1}
                                                </div>
                                                <span className="text-[10px] text-center font-medium" style={{ color: i <= activeStep ? 'var(--text)' : 'var(--text-muted)' }}>
                                                    {s}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            <Link href="/browse" className="btn-primary text-[14px] px-6">
                                ← Continue Shopping
                            </Link>
                            <Link href="/profile/orders" className="btn-secondary text-[14px] px-6">
                                View Purchase History
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl p-5 sticky top-[80px]" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                        <h3 className="text-[14px] font-bold mb-4" style={{ color: 'var(--text)' }}>Order Summary</h3>
                        {[
                            { label: 'Subtotal', val: `₱${order.total.toLocaleString()}` },
                            { label: 'Shipping Fee', val: '₱80' },
                            { label: 'Discount', val: '−₱0' },
                        ].map(row => (
                            <div key={row.label} className="flex justify-between text-[13px] mb-2">
                                <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                                <span style={{ color: 'var(--text)' }}>{row.val}</span>
                            </div>
                        ))}
                        <hr className="divider-sd my-3" />
                        <div className="flex justify-between text-[15px] font-bold mb-4">
                            <span style={{ color: 'var(--text)' }}>Total</span>
                            <span style={{ color: 'var(--text)' }}>₱{(order.total + 80).toLocaleString()}</span>
                        </div>
                        <div className="p-3 rounded-lg text-[13px] font-medium flex items-center gap-2" style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
                            <span>💳</span>
                            <span>Paid via {order.payment}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}