'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PRODUCTS } from '../../../(lib)/mockdata'
import type { Product } from '@/types'

type ListingTab = 'All' | 'Active' | 'Sold' | 'Inactive'

const MY_LISTINGS = (PRODUCTS as Product[]).slice(0, 5).map((p, i) => ({
    ...p,
    listingStatus: i === 4 ? 'Inactive' : 'Active' as 'Active' | 'Sold' | 'Inactive',
}))

export default function ManageListingsPage() {
    const [activeTab, setActiveTab] = useState<ListingTab>('All')
    const [listings, setListings] = useState(MY_LISTINGS)

    const tabs: ListingTab[] = ['All', 'Active', 'Sold', 'Inactive']
    const filtered = listings.filter(l => activeTab === 'All' || l.listingStatus === activeTab)

    function handleDelete(id: string) {
        setListings(prev => prev.filter(l => l.id !== id))
    }

    const STATUS_BADGE: Record<string, string> = {
        Active: 'badge-green',
        Sold: 'badge-neutral',
        Inactive: 'badge-yellow',
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>My Listings</h1>
                    <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{listings.length} Active listings</p>
                </div>
                <Link href="/profile/seller/listings/new" className="btn-primary text-[14px]">+ Add New Listing</Link>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide" style={{ borderBottom: '1.5px solid var(--border)' }}>

                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="px-4 py-2.5 text-[13px] font-medium flex-shrink-0"
                        style={{
                            color: activeTab === tab ? 'var(--accent)' : 'var(--text-secondary)',
                            borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
                            background: 'none', border: 'none',
                            borderBottomStyle: 'solid', borderBottomWidth: 2,
                            borderBottomColor: activeTab === tab ? 'var(--accent)' : 'transparent',
                            marginBottom: -2, cursor: 'pointer',
                        }}
                    >
                        {tab} ({listings.filter(l => tab === 'All' || l.listingStatus === tab).length})
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-5xl mb-3">📭</div>
                    <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>No listings here.</p>
                    <Link href="/profile/seller/listings/new" className="btn-primary text-[13px] mt-4 inline-flex">Add New Listing</Link>
                </div>
            ) : (
                <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>

                    {/* Desktop table header — hidden on mobile */}
                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 text-[11px] font-bold uppercase tracking-widest" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                        <span>Product</span>
                        <span className="text-center">Price</span>
                        <span className="text-center">Stock</span>
                        <span className="text-center">Status</span>
                        <span>Actions</span>
                    </div>

                    {filtered.map((listing, i) => (
                        <div
                            key={listing.id}
                            style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}
                        >
                            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>📗</div>
                                    <div className="min-w-0">
                                        <div className="text-[13px] font-semibold truncate" style={{ color: 'var(--text)' }}>{listing.title}</div>
                                        <div className="text-[11px] capitalize" style={{ color: 'var(--text-muted)' }}>{listing.category}</div>
                                    </div>
                                </div>
                                <div className="text-center text-[13px] font-semibold" style={{ color: 'var(--text)' }}>₱{listing.price.toLocaleString()}</div>
                                <div className="text-center text-[13px]" style={{ color: listing.stock <= 1 ? '#dc2626' : 'var(--text)' }}>{listing.stock} left</div>
                                <div className="flex justify-center">
                                    <span className={`badge-sd ${STATUS_BADGE[listing.listingStatus]}`}>{listing.listingStatus}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/profile/seller/listings/new?edit=${listing.id}`} className="btn-secondary text-[11px] py-1 px-3 h-[30px]">Edit</Link>
                                    <button onClick={() => handleDelete(listing.id)} className="btn-ghost text-[11px] py-1 px-3 h-[30px]" style={{ color: '#dc2626' }}>Delete</button>
                                </div>
                            </div>

                            {/* ── Mobile card ── */}
                            <div className="flex md:hidden items-start gap-3 px-4 py-4">
                                <div className="w-11 h-11 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>📗</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <div className="text-[13px] font-semibold truncate" style={{ color: 'var(--text)' }}>{listing.title}</div>
                                            <div className="text-[11px] capitalize mt-0.5" style={{ color: 'var(--text-muted)' }}>{listing.category}</div>
                                        </div>
                                        <span className={`badge-sd ${STATUS_BADGE[listing.listingStatus]} flex-shrink-0`}>{listing.listingStatus}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>₱{listing.price.toLocaleString()}</span>
                                        <span className="text-[11px]" style={{ color: listing.stock <= 1 ? '#dc2626' : 'var(--text-muted)' }}>{listing.stock} left</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Link href={`/profile/seller/listings/new?edit=${listing.id}`} className="btn-secondary text-[11px] py-1 px-3 h-[30px]">Edit</Link>
                                        <button onClick={() => handleDelete(listing.id)} className="btn-ghost text-[11px] py-1 px-3 h-[30px]" style={{ color: '#dc2626' }}>Delete</button>
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