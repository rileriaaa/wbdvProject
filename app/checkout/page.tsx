'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, clearCart } from '../(lib)/storage'
import type { CartItem } from '@/types'

type Step = 1 | 2 | 3

interface ShippingForm {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    province: string
    zip: string
    method: string
}

type PaymentMethod = 'card' | 'gcash' | 'bank' | 'cod'

export default function CheckoutPage() {
    const router = useRouter()
    const [cart, setCart] = useState<CartItem[]>([])
    const [step, setStep] = useState<Step>(1)
    const [payment, setPayment] = useState<PaymentMethod>('gcash')
    const [loading, setLoading] = useState(false)

    const [shipping, setShipping] = useState<ShippingForm>({
        fullName: '', email: '', phone: '',
        address: '', city: '', province: '', zip: '',
        method: 'standard',
    })

    const [errors, setErrors] = useState<Partial<ShippingForm>>({})

    useEffect(() => { setCart(getCart()) }, [])

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
    const shippingFee = shipping.method === 'express' ? 150 : shipping.method === 'pickup' ? 0 : 80
    const total = subtotal + shippingFee

    const SHIPPING_METHODS = [
        { id: 'standard', label: 'Standard Delivery', desc: '3–5 Business Days', fee: 80 },
        { id: 'express', label: 'Express Delivery', desc: '1–2 Business Days', fee: 150 },
        { id: 'pickup', label: 'Pick-up (On Campus)', desc: 'Available Mon–Sat', fee: 0 },
    ]

    const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: string }[] = [
        { id: 'gcash', label: 'GCash', icon: '📱' },
        { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
        { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
        { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
    ]

    function validateStep1(): boolean {
        const e: Partial<ShippingForm> = {}
        if (!shipping.fullName.trim()) e.fullName = 'Required'
        if (!shipping.email.trim()) e.email = 'Required'
        if (!shipping.phone.trim()) e.phone = 'Required'
        if (!shipping.address.trim()) e.address = 'Required'
        if (!shipping.city.trim()) e.city = 'Required'
        if (!shipping.province.trim()) e.province = 'Required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    function handleNext() {
        if (step === 1 && !validateStep1()) return
        setStep(s => Math.min(3, s + 1) as Step)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function handlePlaceOrder() {
        setLoading(true)
        await new Promise(r => setTimeout(r, 1200))
        clearCart()
        setLoading(false)
        router.push('/order/confirm')
    }

    const StepIndicator = () => (
        <div className="flex items-center gap-2 mb-8">
            {([
                { n: 1, label: 'Shipping' },
                { n: 2, label: 'Payment' },
                { n: 3, label: 'Review' },
            ] as { n: Step; label: string }[]).map((s, i) => (
                <div key={s.n} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0"
                            style={{
                                background: step >= s.n ? 'var(--text)' : 'var(--bg-muted)',
                                color: step >= s.n ? 'var(--bg)' : 'var(--text-muted)',
                                border: `2px solid ${step >= s.n ? 'var(--text)' : 'var(--border)'}`,
                            }}
                        >
                            {step > s.n ? '✓' : s.n}
                        </div>
                        <span
                            className="text-[13px] font-medium hidden sm:block"
                            style={{ color: step >= s.n ? 'var(--text)' : 'var(--text-muted)' }}
                        >
                            {s.label}
                        </span>
                    </div>
                    {i < 2 && <div className="flex-1 h-px min-w-[24px]" style={{ background: step > s.n ? 'var(--text)' : 'var(--border)' }} />}
                </div>
            ))}
        </div>
    )

    const OrderSummaryPanel = () => (
        <div className="rounded-xl p-5 sticky top-[80px]" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
            <h3 className="text-[14px] font-bold mb-4" style={{ color: 'var(--text)' }}>Order Summary</h3>
            <div className="flex flex-col gap-3 mb-4">
                {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>📗</div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-medium truncate" style={{ color: 'var(--text)' }}>{item.title}</div>
                            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Qty: {item.qty}</div>
                        </div>
                        <div className="text-[13px] font-semibold flex-shrink-0" style={{ color: 'var(--text)' }}>₱{(item.price * item.qty).toLocaleString()}</div>
                    </div>
                ))}
            </div>
            <hr className="divider-sd mb-3" />
            {[
                { label: 'Subtotal', val: `₱${subtotal.toLocaleString()}` },
                { label: 'Shipping', val: shippingFee === 0 ? 'FREE' : `₱${shippingFee}` },
            ].map(row => (
                <div key={row.label} className="flex justify-between text-[13px] mb-2">
                    <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                    <span style={{ color: shippingFee === 0 && row.label === 'Shipping' ? '#16a34a' : 'var(--text)' }}>{row.val}</span>
                </div>
            ))}
            <hr className="divider-sd my-3" />
            <div className="flex justify-between text-[15px] font-bold">
                <span style={{ color: 'var(--text)' }}>Total</span>
                <span style={{ color: 'var(--text)' }}>₱{total.toLocaleString()}</span>
            </div>
            <p className="text-[10px] mt-3 text-center" style={{ color: 'var(--text-muted)' }}>🔒 Secured Checkout</p>
        </div>
    )

    const field = (
        label: string, key: keyof ShippingForm,
        props: React.InputHTMLAttributes<HTMLInputElement> = {}
    ) => (
        <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
            <input
                {...props}
                value={shipping[key] as string}
                onChange={e => { setShipping(s => ({ ...s, [key]: e.target.value })); setErrors(ev => ({ ...ev, [key]: undefined })) }}
                className="input-sd h-[42px] text-[14px]"
                style={errors[key] ? { borderColor: '#dc2626' } : {}}
            />
            {errors[key] && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors[key]}</p>}
        </div>
    )

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="section-sd py-8 md:py-12" style={{ padding: '50px 10px 50px 10px' }}>
                <h1 className="text-[26px] font-bold mb-6" style={{ color: 'var(--text)' }}>Checkout</h1>
                <StepIndicator />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
                    <div>

                        {step === 1 && (
                            <div className="flex flex-col gap-6">
                                <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                                    <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                                        <h2 className="text-[12px] font-bold uppercase tracking-widest text-white"
                                            style={{ color: 'var(--bg)' }}>① Shipping Information</h2>
                                    </div>
                                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {field('Full Name', 'fullName', { placeholder: 'e.g. Ashley Naval' })}
                                        {field('Email', 'email', { type: 'email', placeholder: 'your@email.com' })}
                                        {field('Phone Number', 'phone', { placeholder: '+63 9XX XXX XXXX' })}
                                        <div className="sm:col-span-2">
                                            {field('Street Address', 'address', { placeholder: 'e.g. 123 Mabini St, Brgy. Poblacion' })}
                                        </div>
                                        {field('City', 'city', { placeholder: 'Manila' })}
                                        {field('Province', 'province', { placeholder: 'Metro Manila' })}
                                        {field('ZIP Code', 'zip', { placeholder: '1000' })}
                                    </div>
                                </div>

                                <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                                    <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                                        <h2 className="text-[12px] font-bold uppercase tracking-widest text-white"
                                            style={{ color: 'var(--bg)' }}>② Shipping Method</h2>
                                    </div>
                                    <div className="p-5 flex flex-col gap-3">
                                        {SHIPPING_METHODS.map(m => (
                                            <label
                                                key={m.id}
                                                className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all"
                                                style={{
                                                    border: `1.5px solid ${shipping.method === m.id ? 'var(--accent)' : 'var(--border)'}`,
                                                    background: shipping.method === m.id ? 'var(--accent-light)' : 'var(--bg-subtle)',
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    value={m.id}
                                                    checked={shipping.method === m.id}
                                                    onChange={() => setShipping(s => ({ ...s, method: m.id }))}
                                                    style={{ accentColor: 'var(--accent)' }}
                                                />
                                                <div className="flex-1">
                                                    <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{m.label}</div>
                                                    <div className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{m.desc}</div>
                                                </div>
                                                <span className="text-[14px] font-bold" style={{ color: m.fee === 0 ? '#16a34a' : 'var(--text)' }}>
                                                    {m.fee === 0 ? 'FREE' : `₱${m.fee}`}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ color: 'var(--bg)' }} >③ Payment Option</h2>
                                </div>
                                <div className="p-5 flex flex-col gap-3">
                                    {PAYMENT_METHODS.map(m => (
                                        <label
                                            key={m.id}
                                            className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all"
                                            style={{
                                                border: `1.5px solid ${payment === m.id ? 'var(--accent)' : 'var(--border)'}`,
                                                background: payment === m.id ? 'var(--accent-light)' : 'var(--bg-subtle)',
                                            }}
                                        >
                                            <input
                                                type="radio" name="payment" value={m.id}
                                                checked={payment === m.id}
                                                onChange={() => setPayment(m.id)}
                                                style={{ accentColor: 'var(--accent)' }}
                                            />
                                            <span className="text-xl">{m.icon}</span>
                                            <span className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>{m.label}</span>
                                        </label>
                                    ))}

                                    {payment === 'card' && (
                                        <div className="mt-2 p-4 rounded-xl flex flex-col gap-3" style={{ background: 'var(--bg-muted)', border: '1px dashed var(--border-strong)' }}>
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>Card Number</label>
                                                <input type="text" placeholder="1234 5678 9012 3456" className="input-sd h-[42px] text-[14px]" maxLength={19} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>Expiry</label>
                                                    <input type="text" placeholder="MM / YY" className="input-sd h-[42px] text-[14px]" maxLength={7} />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>CVV</label>
                                                    <input type="text" placeholder="•••" className="input-sd h-[42px] text-[14px]" maxLength={3} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex flex-col gap-5">
                                {[
                                    {
                                        title: 'Shipping Information',
                                        content: (
                                            <div className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
                                                <div className="font-semibold" style={{ color: 'var(--text)' }}>{shipping.fullName}</div>
                                                <div>{shipping.address}, {shipping.city}, {shipping.province} {shipping.zip}</div>
                                                <div>{shipping.email} · {shipping.phone}</div>
                                                <div className="mt-1 font-medium" style={{ color: 'var(--text)' }}>
                                                    {SHIPPING_METHODS.find(m => m.id === shipping.method)?.label} · Est. {shipping.method === 'express' ? '1–2' : shipping.method === 'pickup' ? 'same day' : '3–5'} days
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        title: 'Payment Method',
                                        content: (
                                            <div className="flex items-center gap-2 text-[14px]" style={{ color: 'var(--text)' }}>
                                                <span className="text-xl">{PAYMENT_METHODS.find(m => m.id === payment)?.icon}</span>
                                                <span className="font-semibold">{PAYMENT_METHODS.find(m => m.id === payment)?.label}</span>
                                            </div>
                                        ),
                                    },
                                ].map(section => (
                                    <div key={section.title} className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                                        <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
                                            <h3 className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>{section.title}</h3>
                                            <button onClick={() => setStep(section.title.includes('Shipping') ? 1 : 2)} className="text-[12px] font-medium" style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                                        </div>
                                        <div className="p-5">{section.content}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-6">
                            {step > 1 ? (
                                <button onClick={() => setStep(s => Math.max(1, s - 1) as Step)} className="btn-secondary text-[14px]">
                                    ← Back
                                </button>
                            ) : (
                                <button onClick={() => router.push('/cart')} className="btn-ghost text-[14px]">
                                    ← Back to Cart
                                </button>
                            )}

                            {step < 3 ? (
                                <button onClick={handleNext} className="btn-primary text-[14px] px-8">
                                    Continue →
                                </button>
                            ) : (
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                    className="btn-primary text-[14px] px-8 h-[48px]"
                                    style={{ opacity: loading ? 0.7 : 1 }}
                                >
                                    {loading ? 'Placing order…' : '🛒 Place Order'}
                                </button>
                            )}
                        </div>
                    </div>

                    <OrderSummaryPanel />
                </div>
            </div>
        </div>
    )
}