'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { addToCart, toggleWishlist, isWishlisted, isLoggedIn } from '../(lib)/storage'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface ProductCardProps {
    product: Product
    onCartUpdate?: () => void
}

const CATEGORY_ICONS: Record<string, string> = {
    textbooks: '📚',
    supplies: '✏️',
    art: '🎨',
    lab: '🔬',
    electronics: '💻',
    misc: '📦',
}

const CONDITION_BADGE: Record<string, string> = {
    'Like New': 'badge-green',
    'Good': 'badge-neutral',
    'Fair': 'badge-yellow',
}

export default function ProductCard({ product, onCartUpdate }: ProductCardProps) {
    const router = useRouter()
    const [wishlisted, setWishlisted] = useState<boolean>(() => isWishlisted(product.id))
    const [added, setAdded] = useState<boolean>(false)

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : null

    const conditionBadge = CONDITION_BADGE[product.condition] ?? 'badge-neutral'
    const categoryIcon = CATEGORY_ICONS[product.category] ?? '📦'

    function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        if (!isLoggedIn()) {
            router.push('/login?redirect=/cart')
            return
        }

        const toastId = toast.loading('Adding to cart...')

        setTimeout(() => {
            addToCart(product)
            onCartUpdate?.()
            setAdded(true)
            setTimeout(() => setAdded(false), 1500)
            toast.success(`${product.title} added to cart!`, {
                position: 'top-center',
                id: toastId,
                duration: 2000,
            })
        }, 600)


    }

    function handleWishlist(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        if (!isLoggedIn()) {
            router.push('/login?redirect=/profile')
            return
        }
        const updated = toggleWishlist(product)
        setWishlisted(updated.some(i => i.id === product.id))
    }

    return (
        <Link href={`/item/${product.id}`} style={{ textDecoration: 'none' }}>
            <div
                className="card-sd group cursor-pointer h-full flex flex-col"
                style={{ borderRadius: 'var(--radius-md)' }}
            >
                <div
                    className="relative overflow-hidden"
                    style={{
                        background: 'var(--bg-muted)',
                        aspectRatio: '4/3',
                        borderBottom: '1px solid var(--border)',
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center text-5xl select-none">
                        {categoryIcon}
                    </div>

                    {discount !== null && (
                        <div className="absolute top-2 left-2 badge-sd badge-accent text-[10px] font-bold">
                            -{discount}%
                        </div>
                    )}

                    <button
                        onClick={handleWishlist}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm
                       opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-150"
                        style={{
                            background: wishlisted ? 'var(--accent)' : 'var(--bg)',
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-sm)',
                        }}
                        title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        {wishlisted ? '❤️' : '🤍'}
                    </button>
                </div>

                <div className="p-3 flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`badge-sd ${conditionBadge} text-[10px]`}>
                            {product.condition}
                        </span>
                        <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                            {categoryIcon}
                        </span>
                    </div>

                    <h3
                        className="text-[13px] font-semibold leading-snug line-clamp-2 flex-1"
                        style={{ color: 'var(--text)' }}
                    >
                        {product.title}
                    </h3>

                    <div className="flex items-center gap-1">
                        <span className="stars text-[11px]">
                            {'★'.repeat(Math.round(product.rating))}
                            {'☆'.repeat(5 - Math.round(product.rating))}
                        </span>
                        <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                            ({product.reviewCount})
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-auto pt-1">
                        <div className="flex flex-col items-baseline ">
                            <span className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>
                                ₱{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                                <span className="text-[11px] line-through" style={{ color: 'var(--text-muted)' }}>
                                    ₱{product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="text-[11px] font-semibold px-3 py-1.5 rounded-md transition-colors flex-shrink-0 text-white"
                            style={{
                                background: added ? '#16a34a' : 'var(--accent)',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {added ? '✓ Added' : '+ Cart'}
                        </button>
                    </div>

                    {/* Seller */}
                    <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                        by {product.seller.name}
                    </p>
                </div>
            </div>
        </Link>
    )
}