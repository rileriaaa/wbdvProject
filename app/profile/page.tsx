'use client'

import { useState, useEffect } from 'react'
import { getUser, setUser as saveUser, getWishlist } from '../(lib)/storage'
import { PRODUCTS } from '../(lib)/mockdata'
import ProductCard from '../(comps)/productCard'
import type { User, Product } from '@/types'

export default function MyProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [saved, setSaved] = useState(false)
    const [wishlist, setWishlist] = useState<Product[]>([])

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '', school: '',
    })

    useEffect(() => {
        const u = getUser()
        if (u) {
            setUser(u)
            setForm({ firstName: u.firstName, lastName: u.lastName, email: u.email, phone: '', school: u.school })
        }
        setWishlist(getWishlist())
    }, [])

    function handleSave(e: React.FormEvent) {
        e.preventDefault()
        if (!user) return
        const updated: User = { ...user, ...form }
        saveUser(updated)
        setUser(updated)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const wishlistProducts = (PRODUCTS as Product[]).filter(p => wishlist.some(w => w.id === p.id)).slice(0, 5)

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>My Profile</h1>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Personal Information</h2>
                </div>
                <form onSubmit={handleSave} className="p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {([
                            { key: 'firstName', label: 'First Name', placeholder: 'Ashley' },
                            { key: 'lastName', label: 'Last Name', placeholder: 'Naval' },
                            { key: 'email', label: 'Email', placeholder: 'you@email.com', span: true },
                            { key: 'phone', label: 'Phone', placeholder: '+63 9XX XXX XXXX' },
                            { key: 'school', label: 'School / University', placeholder: 'PUP, UST, DLSU…' },
                        ] as { key: keyof typeof form; label: string; placeholder: string; span?: boolean }[]).map(f => (
                            <div key={f.key} className={f.span ? 'sm:col-span-2' : ''}>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>{f.label}</label>
                                <input
                                    type={f.key === 'email' ? 'email' : 'text'}
                                    value={form[f.key]}
                                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                    placeholder={f.placeholder}
                                    className="input-sd h-[42px]"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="btn-primary h-[42px] px-8 text-[14px]"
                        style={{ background: saved ? '#16a34a' : 'var(--accent)' }}
                    >
                        {saved ? '✓ Saved!' : 'Save Changes'}
                    </button>
                </form>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Saved Addresses</h2>
                </div>
                <div className="p-5">
                    <div className="p-4 rounded-xl flex items-center justify-between mb-3" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="badge-sd badge-accent text-[10px]">Default</span>
                            </div>
                            <div className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>123 Mabini St, Brgy. Poblacion</div>
                            <div className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>Manila, Metro Manila 1000</div>
                        </div>
                        <button className="btn-ghost text-[12px] py-1.5">Edit</button>
                    </div>
                    <button className="btn-secondary text-[13px] h-[38px] px-5">+ Add New Address</button>
                </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Wishlist</h2>
                </div>
                <div className="p-5">
                    {wishlistProducts.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-2">🤍</div>
                            <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>No saved items yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {wishlistProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}