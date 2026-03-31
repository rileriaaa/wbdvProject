'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductCard from '../(comps)/productCard'
import { PRODUCTS, CATEGORIES } from '../(lib)/mockdata'
import type { Product, Category } from '@/types'

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low → High' },
    { value: 'price_desc', label: 'Price: High → Low' },
    { value: 'rating', label: 'Top Rated' },
]

const CONDITIONS = ['Like New', 'Good', 'Fair']
const PAGE_SIZE = 6

// ── Inner component — safe to use useSearchParams() here ─────────────────
function BrowseContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get('q') || '')
    const [category, setCategory] = useState(searchParams.get('cat') || 'all')
    const [sort, setSort] = useState(searchParams.get('sort') || 'newest')
    const [conditions, setConditions] = useState<string[]>([])
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [page, setPage] = useState(1)
    const [filtered, setFiltered] = useState<Product[]>([])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const applyFilters = useCallback(() => {
        let result = [...PRODUCTS] as Product[]

        if (query) result = result.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some(t => t.includes(query.toLowerCase()))
        )
        if (category && category !== 'all') result = result.filter(p => p.category === category)
        if (conditions.length) result = result.filter(p => conditions.includes(p.condition))
        if (minPrice) result = result.filter(p => p.price >= Number(minPrice))
        if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice))

        switch (sort) {
            case 'price_asc': result.sort((a, b) => a.price - b.price); break
            case 'price_desc': result.sort((a, b) => b.price - a.price); break
            case 'rating': result.sort((a, b) => b.rating - a.rating); break
            default: result.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        }

        setFiltered(result)
        setPage(1)
    }, [query, category, sort, conditions, minPrice, maxPrice])

    useEffect(() => { applyFilters() }, [applyFilters])

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        applyFilters()
    }

    function toggleCondition(c: string) {
        setConditions(prev =>
            prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
        )
    }

    function clearFilters() {
        setQuery(''); setCategory('all'); setSort('newest')
        setConditions([]); setMinPrice(''); setMaxPrice('')
    }

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    const hasFilters = query || category !== 'all' || conditions.length || minPrice || maxPrice

    const FilterSidebar = () => (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Category</h3>
                <div className="flex flex-col gap-1">
                    {(CATEGORIES as Category[]).map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-left w-full transition-colors"
                            style={{
                                background: category === cat.id ? 'var(--accent-light)' : 'transparent',
                                color: category === cat.id ? 'var(--accent)' : 'var(--text-secondary)',
                                fontWeight: category === cat.id ? 600 : 400,
                                border: 'none', cursor: 'pointer',
                            }}
                        >
                            <span>{cat.icon}</span> {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Price Range (₱)</h3>
                <div className="flex items-center gap-2">
                    <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" className="input-sd h-[36px] text-[13px]" />
                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                    <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" className="input-sd h-[36px] text-[13px]" />
                </div>
                <button onClick={applyFilters} className="btn-primary w-full h-[34px] text-[12px] mt-2">Apply</button>
            </div>

            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Condition</h3>
                <div className="flex flex-col gap-2">
                    {CONDITIONS.map(c => (
                        <label key={c} className="flex items-center gap-2.5 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={conditions.includes(c)}
                                onChange={() => toggleCondition(c)}
                                style={{ accentColor: 'var(--accent)', width: 15, height: 15 }}
                            />
                            <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{c}</span>
                        </label>
                    ))}
                </div>
            </div>

            {hasFilters && (
                <button onClick={clearFilters} className="btn-ghost text-[12px] text-left px-0" style={{ color: '#dc2626' }}>
                    ✕ Clear all filters
                </button>
            )}
        </div>
    )

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="section-sd py-8">

                <div className="mb-6">
                    <h1 className="text-[24px] font-bold mb-1" style={{ color: 'var(--text)' }}>Browse Listings</h1>
                    <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                        {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
                        {query && <> for &ldquo;<strong>{query}</strong>&rdquo;</>}
                    </p>
                </div>

                <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <form onSubmit={handleSearch} className="flex-1 min-w-[200px] relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>🔍</span>
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search books, supplies, materials…"
                            className="input-sd pl-9 h-[40px] text-[13px]"
                        />
                    </form>

                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className="input-sd h-[40px] text-[13px] w-auto pr-8"
                        style={{ cursor: 'pointer' }}
                    >
                        {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>

                    <button
                        onClick={() => setSidebarOpen(v => !v)}
                        className="btn-secondary h-[40px] px-4 text-[13px] flex items-center gap-2 lg:hidden"
                    >
                        🎛️ Filters {hasFilters ? `(${[query, category !== 'all' ? 1 : 0, ...conditions, minPrice, maxPrice].filter(Boolean).length})` : ''}
                    </button>
                </div>

                {hasFilters && (
                    <div className="flex items-center gap-2 flex-wrap mb-5">
                        {query && (
                            <span className="badge-sd badge-neutral flex items-center gap-1">
                                Search: {query}
                                <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>✕</button>
                            </span>
                        )}
                        {category !== 'all' && (
                            <span className="badge-sd badge-accent flex items-center gap-1">
                                {CATEGORIES.find(c => c.id === category)?.label}
                                <button onClick={() => setCategory('all')} style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>✕</button>
                            </span>
                        )}
                        {conditions.map(c => (
                            <span key={c} className="badge-sd badge-neutral flex items-center gap-1">
                                {c}
                                <button onClick={() => toggleCondition(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>✕</button>
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex gap-8 items-start">

                    <aside className="w-[220px] flex-shrink-0 hidden lg:block sticky top-[80px]">
                        <FilterSidebar />
                    </aside>

                    {sidebarOpen && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
                            <div
                                className="absolute left-0 top-0 bottom-0 w-[280px] p-6 overflow-y-auto"
                                style={{ background: 'var(--bg)', boxShadow: 'var(--shadow-lg)' }}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>Filters</h2>
                                    <button onClick={() => setSidebarOpen(false)} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center">✕</button>
                                </div>
                                <FilterSidebar />
                            </div>
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        {paginated.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-5xl mb-4">🔍</div>
                                <h3 className="text-[18px] font-bold mb-2" style={{ color: 'var(--text)' }}>No results found</h3>
                                <p className="text-[14px] mb-4" style={{ color: 'var(--text-secondary)' }}>
                                    Try adjusting your filters or search terms.
                                </p>
                                <button onClick={clearFilters} className="btn-primary text-[13px]">Clear Filters</button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                    {paginated.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-8">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="btn-secondary h-[36px] px-3 text-[13px]"
                                            style={{ opacity: page === 1 ? 0.4 : 1 }}
                                        >
                                            ← Prev
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p)}
                                                className="w-9 h-9 rounded-lg text-[13px] font-medium transition-colors"
                                                style={{
                                                    background: page === p ? 'var(--text)' : 'var(--bg-subtle)',
                                                    color: page === p ? 'var(--bg)' : 'var(--text-secondary)',
                                                    border: `1px solid ${page === p ? 'var(--text)' : 'var(--border)'}`,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="btn-secondary h-[36px] px-3 text-[13px]"
                                            style={{ opacity: page === totalPages ? 0.4 : 1 }}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ── Outer page — wraps inner in Suspense so useSearchParams() is safe ─────
export default function BrowsePage() {
    return (
        <Suspense fallback={
            <div className="section-sd py-20 text-center">
                <div className="text-4xl mb-3">📚</div>
                <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>Loading listings…</p>
            </div>
        }>
            <BrowseContent />
        </Suspense>
    )
}