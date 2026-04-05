'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS, SELLERS } from '../../(lib)/mockdata'
import { addToCart, toggleWishlist, isWishlisted, isLoggedIn } from '../../(lib)/storage'
import ProductCard from '../../(comps)/productCard'
import type { Product } from '@/types'

const CONDITION_BADGE: Record<string, string> = {
    'Like New': 'badge-green',
    'Good': 'badge-neutral',
    'Fair': 'badge-yellow',
}

export default function ItemDetailPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const product = (PRODUCTS as Product[]).find(p => p.id === id)

    const [activeImg, setActiveImg] = useState(0)
    const [wishlisted, setWishlisted] = useState(false)
    const [added, setAdded] = useState(false)
    const [qty, setQty] = useState(1)

    useEffect(() => {
        if (product) setWishlisted(isWishlisted(product.id))
    }, [product])

    if (!product) {
        return (
            <div className="section-sd py-24 text-center">
                <div className="text-5xl mb-4">📭</div>
                <h2 className="text-[22px] font-bold mb-2" style={{ color: 'var(--text)' }}>Item not found</h2>
                <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>This listing may have been removed.</p>
                <Link href="/browse" className="btn-primary text-[14px]">Browse Listings</Link>
            </div>
        )
    }

    const seller = SELLERS.find(s => s.id === product.seller.id)
    const related = (PRODUCTS as Product[]).filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null
    const images = product.images.length > 0 ? product.images : ['', '', '', '']

    const MOCK_REVIEWS = [
        { name: 'Juan D.', rating: 5, text: 'Great condition, exactly as described! Fast response from the seller.', date: '2 weeks ago' },
        { name: 'Ana R.', rating: 4, text: 'Good deal. Minor marks on the cover but the content is perfectly readable.', date: '1 month ago' },
    ]

    function handleAddToCart() {
        if (!isLoggedIn()) { router.push('/login?redirect=/cart'); return }
        addToCart(product!, qty)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    function handleWishlist() {
        if (!isLoggedIn()) { router.push('/login?redirect=/profile'); return }
        const updated = toggleWishlist(product!)
        setWishlisted(updated.some(i => i.id === product!.id))
    }

    return (
        <div style={{ background: 'var(--bg)' }}>

            <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                <div className="section-sd py-2.5">
                    <nav className="flex items-center gap-2 text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
                        <span>›</span>
                        <Link href="/browse" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Browse</Link>
                        <span>›</span>
                        <Link href={`/browse?cat=${product.category}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', textTransform: 'capitalize' }}>{product.category}</Link>
                        <span>›</span>
                        <span className="truncate max-w-[200px]" style={{ color: 'var(--text)' }}>{product.title}</span>
                    </nav>
                </div>
            </div>

            <div className="section-sd py-8 md:py-12" style={{ padding: '50px 0 50px 0 ' }}>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">

                    <div>
                        <div
                            className="relative rounded-xl overflow-hidden mb-3 flex items-center justify-center"
                            style={{
                                background: 'var(--bg-muted)',
                                border: '1.5px solid var(--border)',
                                aspectRatio: '4/3',
                            }}
                        >
                            <span className="text-8xl select-none">
                                {product.category === 'textbooks' ? '📗' :
                                    product.category === 'supplies' ? '✏️' :
                                        product.category === 'art' ? '🎨' :
                                            product.category === 'electronics' ? '💻' : '📦'}
                            </span>
                            {discount && (
                                <div className="absolute top-3 left-3 badge-sd badge-accent text-[11px] font-bold">
                                    -{discount}% OFF
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {images.slice(0, 4).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className="rounded-lg overflow-hidden flex items-center justify-center text-2xl"
                                    style={{
                                        width: 64, height: 64, flexShrink: 0,
                                        background: 'var(--bg-muted)',
                                        border: `2px solid ${activeImg === i ? 'var(--accent)' : 'var(--border)'}`,
                                        cursor: 'pointer',
                                    }}
                                >
                                    📗
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">

                        <div>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="badge-sd badge-neutral text-[11px] capitalize">{product.category}</span>
                                {product.edition && <span className="badge-sd badge-neutral text-[11px]">{product.edition} Ed.</span>}
                                <span className={`badge-sd ${CONDITION_BADGE[product.condition] ?? 'badge-neutral'} text-[11px]`}>{product.condition}</span>
                            </div>
                            <h1 className="text-[22px] md:text-[26px] font-bold leading-snug" style={{ color: 'var(--text)' }}>
                                {product.title}
                            </h1>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-[32px] font-bold" style={{ color: 'var(--text)' }}>
                                ₱{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-[16px] line-through" style={{ color: 'var(--text-muted)' }}>
                                        ₱{product.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="badge-sd badge-accent text-[12px]">Save {discount}%</span>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="stars">
                                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                            </span>
                            <span className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{product.rating}</span>
                            <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>({product.reviewCount} reviews)</span>
                        </div>

                        <hr className="divider-sd" />

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Condition', value: product.condition },
                                { label: 'Stock', value: `${product.stock} left` },
                                { label: 'Subject', value: product.subject },
                                { label: 'Edition', value: product.edition ?? 'N/A' },
                            ].map(d => (
                                <div key={d.label} className="p-3 rounded-lg" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{d.label}</div>
                                    <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{d.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex items-center rounded-lg overflow-hidden"
                                    style={{ border: '1.5px solid var(--border)' }}
                                >
                                    <button
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors"
                                        style={{ background: 'var(--bg-subtle)', border: 'none', cursor: 'pointer', color: 'var(--text)' }}
                                    >−</button>
                                    <span className="w-10 text-center text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{qty}</span>
                                    <button
                                        onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                                        className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors"
                                        style={{ background: 'var(--bg-subtle)', border: 'none', cursor: 'pointer', color: 'var(--text)' }}
                                    >+</button>
                                </div>
                                <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                                    {product.stock} available
                                </span>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="btn-primary h-[48px] text-[15px] w-full"
                                style={{ background: added ? '#16a34a' : 'var(--accent)' }}
                            >
                                {added ? '✓ Added to Cart' : '🛒 Add to Cart'}
                            </button>

                            <button
                                onClick={handleWishlist}
                                className="btn-secondary h-[44px] text-[14px] w-full flex items-center justify-center gap-2"
                            >
                                {wishlisted ? '❤️ Saved to Wishlist' : '🤍 Add to Wishlist'}
                            </button>

                            <button
                                onClick={() => {
                                    if (!isLoggedIn()) { router.push('/login?redirect=/messages'); return }
                                    router.push(`/messages?seller=${product.seller.id}`)
                                }}
                                className="btn-ghost h-[44px] text-[14px] w-full flex items-center justify-center gap-2"
                                style={{ border: '1.5px solid var(--border)', cursor: 'pointer' }}
                            >
                                💬 Message Seller
                            </button>
                        </div>

                        <div
                            className="flex items-center justify-between p-4 rounded-xl"
                            style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
                                    style={{ background: 'var(--accent)' }}
                                >
                                    {product.seller.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>{product.seller.name}</div>
                                    <div className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--text-muted)' }}>
                                        <span className="stars text-[11px]">★</span>
                                        <span>{product.seller.rating}</span>
                                        <span>· {product.seller.responseTime}</span>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href={`/seller/${product.seller.id}`}
                                className="btn-secondary text-[12px] py-1.5 px-4"
                            >
                                View Profile
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            {product.tags.map(tag => (
                                <span key={tag} className="badge-sd badge-neutral text-[11px]">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{ border: '1.5px solid var(--border)' }}
                    >
                        <div className="px-5 py-3" style={{ background: 'var(--dark-surface)', borderBottom: '1.5px solid var(--border)' }}>
                            <h2 className="text-[13px] font-bold uppercase tracking-widest text-white">Product Description</h2>
                        </div>
                        <div className="p-5" style={{ background: 'var(--bg-subtle)' }}>
                            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                        <div className="px-5 py-3" style={{ background: 'var(--dark-surface)' }}>
                            <h2 className="text-[13px] font-bold uppercase tracking-widest text-white">Ratings &amp; Reviews</h2>
                        </div>
                        <div className="p-5" style={{ background: 'var(--bg-subtle)' }}>
                            <div className="flex items-start gap-8 mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                                <div className="text-center flex-shrink-0">
                                    <div className="text-[48px] font-bold leading-none" style={{ color: 'var(--text)' }}>{product.rating}</div>
                                    <div className="stars my-1">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</div>
                                    <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{product.reviewCount} reviews</div>
                                </div>
                                <div className="flex-1">
                                    {[5, 4, 3, 2, 1].map(star => {
                                        const pct = star === 5 ? 75 : star === 4 ? 20 : star === 3 ? 5 : 0
                                        return (
                                            <div key={star} className="flex items-center gap-2 mb-1.5">
                                                <span className="text-[12px] w-4 text-right" style={{ color: 'var(--text-secondary)' }}>{star}</span>
                                                <span className="stars text-[10px]">★</span>
                                                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
                                                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
                                                </div>
                                                <span className="text-[11px] w-6" style={{ color: 'var(--text-muted)' }}>{pct}%</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                {MOCK_REVIEWS.map((rev, i) => (
                                    <div key={i} className={i < MOCK_REVIEWS.length - 1 ? 'pb-5' : ''} style={i < MOCK_REVIEWS.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: 'var(--text-secondary)' }}>
                                                    {rev.name[0]}
                                                </div>
                                                <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{rev.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="stars text-[12px]">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                                                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{rev.date}</span>
                                            </div>
                                        </div>
                                        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rev.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-6">
                                <button className="btn-secondary text-[13px] h-[38px] px-6">View All Reviews</button>
                            </div>
                        </div>
                    </div>
                </div>

                {related.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[20px] font-bold" style={{ color: 'var(--text)' }}>Related Items</h2>
                            <Link href={`/browse?cat=${product.category}`} className="text-[13px]" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                                View all →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}