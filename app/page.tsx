'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProductCard from './(comps)/productCard'
import { PRODUCTS, CATEGORIES } from './(lib)/mockdata'
import { getUser } from './(lib)/storage'
import type { Product, Category, User } from '@/types'

const STATS = [
  { value: '1,200+', label: 'Active Listings' },
  { value: '800+', label: 'Student Sellers' },
  { value: '50+', label: 'Partner Schools' },
  { value: '4.9★', label: 'Avg. Rating' },
]

const TRUST = [
  { icon: '🔒', label: 'Secure Payments', desc: 'All transactions are protected' },
  { icon: '✅', label: 'Verified Sellers', desc: 'Real students, verified listings' },
  { icon: '🚀', label: 'Fast Delivery', desc: 'Same-day pickup available on campus' },
  { icon: '🛡️', label: 'Buyer Protection', desc: 'Disputes resolved within 24 hours' },
]

const PROMOS = [
  {
    tag: 'LIMITED OFFER',
    title: 'End-of-Semester Sale',
    desc: 'Up to 60% off on used textbooks. Stock up before next sem!',
    cta: 'Shop Now →',
    href: '/browse?cat=textbooks',
    dark: true,
  },
  {
    tag: 'NEW ARRIVALS',
    title: 'Fresh Listings This Week',
    desc: 'Brand new items added daily by students near you.',
    cta: 'Browse New →',
    href: '/browse?sort=newest',
    dark: false,
  },
]

export default function LandingPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const sorted = (PRODUCTS as Product[]).sort((a, b) => b.rating - a.rating)
    setFeaturedProducts(sorted.slice(0, 8))
    setUser(getUser())
  }, [])

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) router.push(`/browse?q=${encodeURIComponent(q)}`)
    else router.push('/browse')
  }

  function handleCategoryClick(catId: string) {
    setActiveCategory(catId)
    if (catId === 'all') router.push('/browse')
    else router.push(`/browse?cat=${catId}`)
  }

  return (
    <div>

      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--dark-surface)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(var(--bg) 1px, transparent 1px),
              linear-gradient(90deg, var(--bg) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="section-sd relative z-10">
          <div className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="fade-up">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-5"
                style={{
                  background: 'rgba(212,82,42,0.15)',
                  border: '1px solid rgba(212,82,42,0.3)',
                  color: '#f87c55',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#f87c55] animate-pulse" />
                Student Marketplace · Buy &amp; Sell
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.1] tracking-tight mb-5"
                style={{ color: '#ffffff', fontFamily: 'var(--font-sans)' }}
              >
                Your campus
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #f87c55, #d4522a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  secondhand store.
                </span>
              </h1>

              <p
                className="text-[16px] leading-relaxed mb-8 max-w-[480px]"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Buy and sell textbooks, school supplies, and learning materials with
                fellow students. Save money. Earn money. Keep it on campus.
              </p>

              <form onSubmit={handleSearch} className="flex gap-2 max-w-[480px] mb-6">
                <div className="relative flex-1">
                  <span
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    🔍
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search for textbooks, supplies…"
                    className="w-full h-[48px] pl-10 pr-4 rounded-lg text-[14px] outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff',
                      fontFamily: 'var(--font-sans)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                      e.currentTarget.style.borderColor = 'rgba(212,82,42,0.6)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary h-[48px] px-6 text-[14px] flex-shrink-0"
                >
                  Search
                </button>
              </form>

              <div className="flex items-center gap-3 flex-wrap">
                <Link href="/browse" className="btn-primary text-[14px] py-2.5 px-6">
                  Browse Listings
                </Link>
                <Link
                  href={user ? '/profile/seller/listings/new' : '/signup'}
                  className="text-[14px] font-medium flex items-center gap-1.5"
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
                >
                  {user ? 'Start Selling →' : 'Sign Up Free →'}
                </Link>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4 fade-up fade-up-2">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="text-[32px] font-bold mb-1"
                    style={{ color: '#fff', fontFamily: 'var(--font-sans)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-8"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
        />
      </section>

      <section
        className="sticky top-[60px] z-40 py-3"
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="section-sd">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <span className="text-[12px] font-semibold flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
              Browse:
            </span>
            {(CATEGORIES as Category[]).map((cat: Category) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium flex-shrink-0 transition-all"
                style={{
                  background: activeCategory === cat.id ? 'var(--text)' : 'var(--bg-subtle)',
                  color: activeCategory === cat.id ? 'var(--bg)' : 'var(--text-secondary)',
                  border: `1px solid ${activeCategory === cat.id ? 'var(--text)' : 'var(--border)'}`,
                  cursor: 'pointer',
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="section-sd">
          {/* Header */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
                Featured Listings
              </p>
              <h2 className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>
                Recently added near you
              </h2>
            </div>
            <Link
              href="/browse"
              className="text-[13px] font-medium hidden sm:block"
              style={{ color: 'var(--accent)', textDecoration: 'none' }}
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/browse" className="btn-secondary text-[14px]">
              View All Listings
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4 pb-12">
        <div className="section-sd">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROMOS.map((promo, i) => (
              <Link
                key={i}
                href={promo.href}
                className="group block p-6 md:p-8 rounded-xl transition-transform hover:-translate-y-1"
                style={{
                  background: promo.dark ? 'var(--dark-surface)' : 'var(--accent-light)',
                  border: `1px solid ${promo.dark ? 'transparent' : 'var(--accent-border)'}`,
                  textDecoration: 'none',
                }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-widest mb-2 block"
                  style={{ color: promo.dark ? 'rgba(255,255,255,0.4)' : 'var(--accent)' }}
                >
                  {promo.tag}
                </span>
                <h3
                  className="text-[20px] font-bold mb-2"
                  style={{ color: promo.dark ? '#fff' : 'var(--text)' }}
                >
                  {promo.title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed mb-4"
                  style={{ color: promo.dark ? 'rgba(255,255,255,0.5)' : 'var(--text-secondary)' }}
                >
                  {promo.desc}
                </p>
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: promo.dark ? '#f87c55' : 'var(--accent)' }}
                >
                  {promo.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}
      >
        <div className="section-sd">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {TRUST.map((t, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 md:p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                  style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
                >
                  {t.icon}
                </div>
                <h3 className="text-[14px] font-semibold mb-1" style={{ color: 'var(--text)' }}>
                  {t.label}
                </h3>
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-14 md:py-20"
        style={{ background: 'var(--bg)' }}
      >
        <div className="section-sd text-center">
          <p
            className="text-[12px] font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Join the Community
          </p>
          <h2
            className="text-[32px] md:text-[40px] font-bold mb-4 tracking-tight"
            style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}
          >
            Start buying and selling today.
          </h2>
          <p
            className="text-[15px] max-w-[480px] mx-auto mb-8 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Join thousands of students who are already saving money and earning from their
            unused books and supplies.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href={user ? '/seller/listings/new' : '/signup'} className="btn-primary text-[14px] py-3 px-8">
              {user ? 'Create a Listing' : 'Create Free Account'}
            </Link>
            <Link href="/browse" className="btn-secondary text-[14px] py-3 px-8">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}