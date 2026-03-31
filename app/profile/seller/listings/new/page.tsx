'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { CategoryId, Condition } from '@/types'

interface ProductForm {
    title: string
    description: string
    category: CategoryId
    condition: Condition
    subject: string
    edition: string
    author: string
    price: string
    originalPrice: string
    stock: string
    promoEnabled: boolean
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
    { id: 'textbooks', label: 'Textbooks' },
    { id: 'supplies', label: 'School Supplies' },
    { id: 'art', label: 'Art Materials' },
    { id: 'lab', label: 'Lab Equipment' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'misc', label: 'Miscellaneous' },
]

const CONDITIONS: Condition[] = ['Like New', 'Good', 'Fair']

export default function AddEditProductPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isEdit = !!searchParams.get('edit')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Partial<ProductForm>>({})

    const [form, setForm] = useState<ProductForm>({
        title: '', description: '', category: 'textbooks', condition: 'Good',
        subject: '', edition: '', author: '', price: '', originalPrice: '',
        stock: '1', promoEnabled: false,
    })

    function set(key: keyof ProductForm, value: string | boolean) {
        setForm(p => ({ ...p, [key]: value }))
        setErrors(p => ({ ...p, [key]: undefined }))
    }

    function validate() {
        const e: Partial<ProductForm> = {}
        if (!form.title.trim()) e.title = 'Title is required'
        if (!form.price.trim() || isNaN(Number(form.price))) e.price = 'Valid price required'
        if (!form.stock.trim() || isNaN(Number(form.stock))) e.stock = 'Valid stock required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    async function handlePublish() {
        if (!validate()) return
        setLoading(true)
        await new Promise(r => setTimeout(r, 900))
        setLoading(false)
        router.push('/seller/listings')
    }

    async function handleDraft() {
        setLoading(true)
        await new Promise(r => setTimeout(r, 600))
        setLoading(false)
        router.push('/seller/listings')
    }

    const label = (text: string) => (
        <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>{text}</label>
    )

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>
                {isEdit ? 'Edit Listing' : 'Add New Listing'}
            </h1>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Product Information</h2>
                </div>
                <div className="p-5 grid grid-cols-1 gap-4">
                    <div>
                        {label('Product Title')}
                        <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Calculus: Early Transcendentals 8th Edition" className="input-sd h-[42px]" style={errors.title ? { borderColor: '#dc2626' } : {}} />
                        {errors.title && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.title}</p>}
                    </div>
                    <div>
                        {label('Product Description')}
                        <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the item condition, what's included, notes for the buyer…" className="input-sd" style={{ height: 100, resize: 'none', paddingTop: 10 }} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            {label('Category')}
                            <select value={form.category} onChange={e => set('category', e.target.value as CategoryId)} className="input-sd h-[42px]" style={{ cursor: 'pointer' }}>
                                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                            </select>
                        </div>
                        <div>
                            {label('Condition')}
                            <select value={form.condition} onChange={e => set('condition', e.target.value as Condition)} className="input-sd h-[42px]" style={{ cursor: 'pointer' }}>
                                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            {label('Subject (optional)')}
                            <input value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="e.g. Mathematics, Chemistry" className="input-sd h-[42px]" />
                        </div>
                        <div>
                            {label('Edition (optional)')}
                            <input value={form.edition} onChange={e => set('edition', e.target.value)} placeholder="e.g. 8th, 2nd" className="input-sd h-[42px]" />
                        </div>
                        <div className="sm:col-span-2">
                            {label('Author (optional)')}
                            <input value={form.author} onChange={e => set('author', e.target.value)} placeholder="e.g. James Stewart" className="input-sd h-[42px]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Product Photos</h2>
                </div>
                <div className="p-5">
                    <div className="grid grid-cols-4 gap-3 mb-3">
                        {[0, 1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer"
                                style={{ background: 'var(--bg-muted)', border: '2px dashed var(--border)' }}
                            >
                                <span className="text-2xl mb-1">📷</span>
                                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Add Photo</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Drag & drop or click to upload. Max 10 photos, JPG or PNG only.</p>
                </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white">Pricing &amp; Stock</h2>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        {label('Selling Price (₱)')}
                        <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. 320" className="input-sd h-[42px]" style={errors.price ? { borderColor: '#dc2626' } : {}} />
                        {errors.price && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.price}</p>}
                    </div>
                    <div>
                        {label('Original Price (₱)')}
                        <input type="number" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="e.g. 580" className="input-sd h-[42px]" />
                    </div>
                    <div>
                        {label('Stock Count')}
                        <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} min={1} className="input-sd h-[42px]" style={errors.stock ? { borderColor: '#dc2626' } : {}} />
                        {errors.stock && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.stock}</p>}
                    </div>
                    <div className="sm:col-span-3">
                        <div
                            className="flex items-center justify-between p-4 rounded-xl"
                            style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}
                        >
                            <div>
                                <div className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>Enable Promotional Price</div>
                                <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Show discounted price with strikethrough original</div>
                            </div>
                            <button
                                type="button"
                                onClick={() => set('promoEnabled', !form.promoEnabled)}
                                className="w-10 h-5 rounded-full relative transition-colors"
                                style={{ background: form.promoEnabled ? 'var(--accent)' : 'var(--border)', border: 'none', cursor: 'pointer' }}
                            >
                                <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: form.promoEnabled ? '22px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <button onClick={handlePublish} disabled={loading} className="btn-primary text-[14px] h-[48px] px-8" style={{ opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Publishing…' : 'Publish Listing →'}
                </button>
                <button onClick={handleDraft} disabled={loading} className="btn-secondary text-[14px] h-[48px] px-8">
                    Save as Draft
                </button>
            </div>
        </div>
    )
}