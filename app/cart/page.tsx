'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCart, removeFromCart, updateCartQty, clearCart, toggleWishlist } from '../(lib)/storage'
import type { CartItem } from '@/types'

export default function CartPage() {
    const router = useRouter()
    const [cart, setCart] = useState<CartItem[]>([])
    const [promoCode, setPromoCode] = useState('')
    const [promoMsg, setPromoMsg] = useState<{ text: string; ok: boolean } | null>(null)
    const [discount, setDiscount] = useState(0)

    useEffect(() => { setCart(getCart()) }, [])

    function handleQty(id: string, qty: number) {
        const updated = updateCartQty(id, qty)
        setCart(updated)
    }

    function handleRemove(id: string) {
        const updated = removeFromCart(id)
        setCart(updated)
    }

    function handleSaveForLater(item: CartItem) {
        toggleWishlist(item)
        handleRemove(item.id)
    }

    function handleClearCart() {
        clearCart()
        setCart([])
    }

    function applyPromo() {
        if (promoCode.toUpperCase() === 'SCHOLAR10') {
            setDiscount(0.10)
            setPromoMsg({ text: '10% discount applied!', ok: true })
        } else if (promoCode.toUpperCase() === 'STUDENT20') {
            setDiscount(0.20)
            setPromoMsg({ text: '20% student discount applied!', ok: true })
        } else {
            setDiscount(0)
            setPromoMsg({ text: 'Invalid promo code.', ok: false })
        }
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    const shipping = cart.length > 0 ? 80 : 0
    const discAmt = Math.round(subtotal * discount)
    const total = subtotal + shipping - discAmt

    if (cart.length === 0) {
        return (
            <div style={{ background: 'var(--bg)', minHeight: '60vh', padding: '50px 0' }}>
                <div className="section-sd min-h-[60vh] flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-[24px] font-bold mb-2" style={{ color: 'var(--text)' }}>Your cart is empty</h2>
                    <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
                        Looks like you haven&apos;t added anything yet.
                    </p>
                    <Link href="/browse" className="btn-primary text-[14px]">Browse Listings</Link>
                </div>
            </div>
        )
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '70vh', padding: '50px 0 50px 0' }}>
            <div className="section-sd py-8 md:py-12" >

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-[26px] font-bold" style={{ color: 'var(--text)' }}>Shopping Cart</h1>
                        <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button onClick={handleClearCart} className="btn-ghost text-[13px]" style={{ color: '#dc2626' }}>
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

                    <div className="flex flex-col gap-4">

                        {/* <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                            <span>Product</span>
                            <span className="text-center">Price</span>
                            <span className="text-center">Quantity</span>
                            <span className="text-center">Subtotal</span>
                            <span />
                        </div> */}

                        {cart.map(item => (
                            <div
                                key={item.id}
                                className="py-4"
                                style={{ borderBottom: '1px solid var(--border)' }}
                            >
                                {/* Top row: image + info + remove (all screen sizes) */}
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                                        style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
                                    >
                                        📗
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/item/${item.id}`} className="text-[14px] font-semibold line-clamp-2" style={{ color: 'var(--text)', textDecoration: 'none' }}>
                                            {item.title}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>by {item.seller.name}</span>
                                            <span className="badge-sd badge-neutral text-[10px]">{item.condition}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2">
                                            <button onClick={() => handleSaveForLater(item)} className="text-[11px] font-medium" style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                                Save for later
                                            </button>
                                            <button onClick={() => handleRemove(item.id)} className="text-[11px] font-medium" style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    {/* ✕ remove — desktop only */}
                                    <button onClick={() => handleRemove(item.id)} className="hidden md:flex w-7 h-7 items-center justify-center rounded-full text-[12px] flex-shrink-0" style={{ background: 'var(--bg-muted)', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                        ✕
                                    </button>
                                </div>

                                {/* Bottom row: price + qty + subtotal */}
                                <div className="flex items-center justify-between mt-3 pl-[76px] flex-wrap gap-3">
                                    {/* Price */}
                                    <div className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                                        <span className="text-[10px] uppercase tracking-widest block mb-0.5" style={{ color: 'var(--text-muted)' }}>Price</span>
                                        <span className="font-semibold" style={{ color: 'var(--text)' }}>₱{item.price.toLocaleString()}</span>
                                    </div>

                                    {/* Qty stepper */}
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest block mb-0.5 text-center" style={{ color: 'var(--text-muted)' }}>Qty</span>
                                        <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                                            <button onClick={() => handleQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-lg" style={{ background: 'var(--bg-subtle)', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>−</button>
                                            <span className="w-8 text-center text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{item.qty}</span>
                                            <button onClick={() => handleQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-lg" style={{ background: 'var(--bg-subtle)', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>+</button>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="text-right">
                                        <span className="text-[10px] uppercase tracking-widest block mb-0.5" style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                        <span className="text-[14px] font-bold" style={{ color: 'var(--text)' }}>₱{(item.price * item.qty).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Link href="/browse" className="btn-ghost text-[13px] w-fit mt-2">
                            ← Continue Shopping
                        </Link>
                    </div>

                    <div className="rounded-xl p-6 sticky top-[80px]" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                        <h2 className="text-[16px] font-bold mb-5" style={{ color: 'var(--text)' }}>Order Summary</h2>

                        <div className="flex flex-col gap-3 mb-5">
                            <div className="flex justify-between text-[14px]">
                                <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                                <span style={{ color: 'var(--text)' }}>₱{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[14px]">
                                <span style={{ color: 'var(--text-secondary)' }}>Shipping Fee</span>
                                <span style={{ color: 'var(--text)' }}>₱{shipping}</span>
                            </div>
                            {discAmt > 0 && (
                                <div className="flex justify-between text-[14px]">
                                    <span style={{ color: '#16a34a' }}>Discount</span>
                                    <span style={{ color: '#16a34a' }}>−₱{discAmt.toLocaleString()}</span>
                                </div>
                            )}
                            <hr className="divider-sd" />
                            <div className="flex justify-between text-[16px] font-bold">
                                <span style={{ color: 'var(--text)' }}>Total</span>
                                <span style={{ color: 'var(--text)' }}>₱{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                                Promo Code
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={e => setPromoCode(e.target.value)}
                                    placeholder="Enter code"
                                    className="input-sd h-[38px] text-[13px] flex-1"
                                />
                                <button onClick={applyPromo} className="btn-primary h-[38px] px-4 text-[13px] flex-shrink-0">
                                    Apply
                                </button>
                            </div>
                            {promoMsg && (
                                <p className="text-[11px] mt-1.5" style={{ color: promoMsg.ok ? '#16a34a' : '#dc2626' }}>
                                    {promoMsg.text}
                                </p>
                            )}
                            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Try: SCHOLAR10, STUDENT20</p>
                        </div>

                        <button onClick={() => router.push('/checkout')} className="btn-primary h-[48px] w-full text-[15px] mb-3">
                            Proceed to Checkout →
                        </button>
                        <button onClick={() => { toggleWishlist(cart[0]); }} className="btn-secondary h-[42px] w-full text-[13px] flex items-center justify-center gap-2">
                            🤍 Save All to Wishlist
                        </button>

                        <div className="flex items-center justify-center gap-4 mt-4">
                            {['🔒 Secure', '✅ Verified', '🛡️ Protected'].map(b => (
                                <span key={b} className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{b}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}