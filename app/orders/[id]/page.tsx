'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MOCK_ORDERS } from '../../(lib)/mockdata'

const STEPS = ['Order Placed', 'Processing', 'Shipped', 'Delivered']

const STATUS_STEP: Record<string, number> = {
    Processing: 1, Confirmed: 1, Shipped: 2, Delivered: 3, Cancelled: 0,
}

export default function OrderDetailsPage() {
    const { id } = useParams<{ id: string }>()
    const order = MOCK_ORDERS.find(o => o.id === id) ?? MOCK_ORDERS[0]
    const activeStep = STATUS_STEP[order.status] ?? 0

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="section-sd py-8 md:py-12" style={{ padding: '50px 0 50px 0' }}>

                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div>
                        <Link href="/profile/orders" className="text-[12px] font-medium mb-2 flex items-center gap-1" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                            ← Back to Orders
                        </Link>
                        <h1 className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>Order Details</h1>
                        <p className="text-[13px] mt-0.5 font-mono" style={{ color: 'var(--text-secondary)' }}>{order.id}</p>
                    </div>
                    <span
                        className={`badge-sd text-[13px] px-4 py-1.5 ${order.status === 'Delivered' ? 'badge-green' :
                            order.status === 'Cancelled' ? '' : 'badge-accent'
                            }`}
                        style={order.status === 'Cancelled' ? { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' } : {}}
                    >
                        {order.status}
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
                    <div className="flex flex-col gap-6">

                        <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                            <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                                <h2 className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ color: 'var(--bg)' }}>Delivery Progress</h2>
                            </div>
                            <div className="p-6">
                                <div className="relative flex items-start justify-between">
                                    <div className="absolute left-3.5 right-3.5 h-0.5 top-[14px] z-0" style={{ background: 'var(--border)' }} />
                                    <div
                                        className="absolute left-3.5 h-0.5 top-[14px] z-0 transition-all duration-700"
                                        style={{ background: 'var(--accent)', width: `calc(${(activeStep / (STEPS.length - 1)) * 100}% - 7px)` }}
                                    />
                                    {STEPS.map((s, i) => (
                                        <div key={s} className="flex flex-col items-center gap-2 z-10 flex-1 px-1">
                                            <div
                                                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                                                style={{
                                                    background: i <= activeStep ? 'var(--accent)' : 'var(--bg)',
                                                    border: `2px solid ${i <= activeStep ? 'var(--accent)' : 'var(--border)'}`,
                                                    color: i <= activeStep ? '#fff' : 'var(--text-muted)',
                                                }}
                                            >
                                                {i < activeStep ? '✓' : i + 1}
                                            </div>
                                            <span className="text-[10px] text-center font-medium" style={{ color: i <= activeStep ? 'var(--text)' : 'var(--text-muted)' }}>
                                                {s}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                            <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                                <h2 className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ color: 'var(--bg)' }}>Items ({order.items.length})</h2>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>📗</div>
                                        <div className="flex-1 min-w-0">
                                            <Link href={`/item/${item.id}`} className="text-[14px] font-semibold truncate block" style={{ color: 'var(--text)', textDecoration: 'none' }}>{item.title}</Link>
                                            <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>by {item.seller.name}</div>
                                        </div>
                                        <div className="text-[14px] font-bold flex-shrink-0" style={{ color: 'var(--text)' }}>₱{item.price.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                            <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                                <h2 className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ color: 'var(--bg)' }}>Shipping Information</h2>
                            </div>
                            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {[
                                    { label: 'Deliver To', value: '123 Mabini St, Manila' },
                                    { label: 'Shipping Method', value: order.shipping.method },
                                    { label: 'Payment', value: order.payment },
                                    { label: 'Order Date', value: order.date },
                                ].map(info => (
                                    <div key={info.label}>
                                        <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{info.label}</div>
                                        <div className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>{info.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl p-4 flex items-center justify-between gap-4" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: 'var(--accent)' }}>
                                    {order.items[0].seller.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{order.items[0].seller.name}</div>
                                    <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Seller</div>
                                </div>
                            </div>
                            <Link href={`/messages?seller=${order.items[0].seller.id}`} className="btn-secondary text-[12px] py-1.5 px-4">
                                Message
                            </Link>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {order.status === 'Delivered' && (
                                <Link href={`/review/${order.id}`} className="btn-primary text-[14px]">
                                    ⭐ Leave a Review
                                </Link>
                            )}
                            {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                                <button className="btn-secondary text-[14px]" style={{ color: '#dc2626', borderColor: '#fecaca' }}>
                                    Return / Dispute
                                </button>
                            )}
                            <Link href="/contact" className="btn-ghost text-[14px]">
                                Contact Support
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl p-5 sticky top-[80px]" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                        <h3 className="text-[14px] font-bold mb-4" style={{ color: 'var(--text)' }}>Order Summary</h3>
                        {[
                            { label: 'Subtotal', val: `₱${order.total.toLocaleString()}` },
                            { label: 'Shipping', val: '₱80' },
                            { label: 'Discount', val: '−₱0' },
                        ].map(row => (
                            <div key={row.label} className="flex justify-between text-[13px] mb-2">
                                <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                                <span style={{ color: 'var(--text)' }}>{row.val}</span>
                            </div>
                        ))}
                        <hr className="divider-sd my-3" />
                        <div className="flex justify-between text-[15px] font-bold">
                            <span style={{ color: 'var(--text)' }}>Total</span>
                            <span style={{ color: 'var(--text)' }}>₱{(order.total + 80).toLocaleString()}</span>
                        </div>
                        <div className="mt-4 p-3 rounded-lg text-[12px] flex items-center gap-2" style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
                            <span>💳</span><span>{order.payment}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}