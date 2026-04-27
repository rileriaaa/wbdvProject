'use client'

import { useState } from 'react'
import { removeUser } from '../../(lib)/storage'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AccountSettingsPage() {
    const router = useRouter()
    const [saved, setSaved] = useState<string | null>(null)
    const [notifs, setNotifs] = useState({ orderUpdates: true, newMessages: true, promotions: false, reviewReminders: true })
    const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
    const [pwError, setPwError] = useState('')
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    function handleSaveNotifs() {
        const toastId = toast.loading('Saving notifications...')
        setTimeout(() => {
            setSaved('notifs')
            setTimeout(() => setSaved(null), 2000)
            toast.success('Notification preferences saved!', { id: toastId, duration: 2000 })
        }, 600)
    }

    function handleChangePassword(e: React.FormEvent) {
        e.preventDefault()
        if (!pwForm.current) { setPwError('Enter your current password'); return }
        if (pwForm.newPw.length < 8) { setPwError('Min. 8 characters'); return }
        if (pwForm.newPw !== pwForm.confirm) { setPwError('Passwords do not match'); return }
        setPwError('')

        const toastId = toast.loading('Updating password...')
        setTimeout(() => {
            setSaved('password')
            setPwForm({ current: '', newPw: '', confirm: '' })
            setTimeout(() => setSaved(null), 2000)
            toast.success('Password updated!', { id: toastId, duration: 2000 })
        }, 600)
    }

    function handleLogout() {
        toast.loading('Logging out...')
        setTimeout(() => {
            removeUser()
            router.push('/')
        }, 800)
    }

    function handleDeleteAccount() {
        toast.error('Account deleted.', { duration: 2000 })
        setTimeout(() => {
            removeUser()
            router.push('/')
        }, 800)
    }

    const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
        <button
            onClick={onToggle}
            className="w-10 h-5 rounded-full relative transition-colors flex-shrink-0"
            style={{ background: on ? 'var(--accent)' : 'var(--border)', border: 'none', cursor: 'pointer' }}
        >
            <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: on ? '22px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
        </button>
    )

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>Account Settings</h1>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ color: 'var(--bg)' }}>Change Password</h2>
                </div>
                <form onSubmit={handleChangePassword} className="p-5 flex flex-col gap-4">
                    {([
                        { key: 'current', label: 'Current Password', placeholder: '••••••••' },
                        { key: 'newPw', label: 'New Password', placeholder: 'Min. 8 characters' },
                        { key: 'confirm', label: 'Confirm New Password', placeholder: 'Re-enter new password' },
                    ] as { key: keyof typeof pwForm; label: string; placeholder: string }[]).map(f => (
                        <div key={f.key}>
                            <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>{f.label}</label>
                            <input
                                type="password"
                                value={pwForm[f.key]}
                                onChange={e => { setPwForm(p => ({ ...p, [f.key]: e.target.value })); setPwError('') }}
                                placeholder={f.placeholder}
                                className="input-sd h-[42px]"
                            />
                        </div>
                    ))}
                    {pwError && <p className="text-[12px]" style={{ color: '#dc2626' }}>{pwError}</p>}
                    <button type="submit" className="btn-primary h-[42px] w-fit px-8 text-[14px]" style={{ background: saved === 'password' ? '#16a34a' : 'var(--accent)' }}>
                        {saved === 'password' ? '✓ Password Updated' : 'Update Password →'}
                    </button>
                </form>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ color: 'var(--bg)' }}>Notification Preferences</h2>
                </div>
                <div className="p-5 flex flex-col gap-4">
                    {([
                        { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about your orders' },
                        { key: 'newMessages', label: 'New Messages', desc: 'Alerts for new messages' },
                        { key: 'promotions', label: 'Promotions & Deals', desc: 'Sales and special offers' },
                        { key: 'reviewReminders', label: 'Review Reminders', desc: 'Reminders to leave reviews' },
                    ] as { key: keyof typeof notifs; label: string; desc: string }[]).map(n => (
                        <div key={n.key} className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>{n.label}</div>
                                <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{n.desc}</div>
                            </div>
                            <Toggle on={notifs[n.key]} onToggle={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))} />
                        </div>
                    ))}
                    <button onClick={handleSaveNotifs} className="btn-primary h-[40px] w-fit px-8 text-[13px] mt-2" style={{ background: saved === 'notifs' ? '#16a34a' : 'var(--accent)' }}>
                        {saved === 'notifs' ? '✓ Saved' : 'Save Preferences'}
                    </button>
                </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                <div className="px-5 py-3" style={{ background: 'var(--text)' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ color: 'var(--bg)' }}>Linked Accounts</h2>
                </div>
                <div className="p-5">
                    <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🌐</span>
                            <div>
                                <div className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>Google</div>
                                <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Not connected</div>
                            </div>
                        </div>
                        <button className="btn-secondary text-[12px] py-1.5 px-4">Connect</button>
                    </div>
                </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid #fecaca' }}>
                <div className="px-5 py-3" style={{ background: '#fef2f2' }}>
                    <h2 className="text-[12px] font-bold uppercase tracking-widest" style={{ color: '#dc2626' }}>Danger Zone</h2>
                </div>
                <div className="p-5 flex items-center gap-3 flex-wrap">
                    <button onClick={handleLogout} className="btn-secondary text-[14px] h-[42px] px-6">
                        🚪 Log Out
                    </button>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="btn-secondary text-[14px] h-[42px] px-6"
                        style={{ borderColor: '#fecaca', color: '#dc2626' }}
                    >
                        🗑️ Delete Account
                    </button>
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="w-full max-w-[380px] rounded-2xl p-6" style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
                        <h3 className="text-[18px] font-bold mb-2" style={{ color: 'var(--text)' }}>Delete Account?</h3>
                        <p className="text-[14px] mb-5" style={{ color: 'var(--text-secondary)' }}>This action is irreversible. All your data, listings, and order history will be permanently deleted.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary flex-1 text-[14px]">Cancel</button>
                            <button onClick={handleDeleteAccount} className="flex-1 btn-primary text-[14px]" style={{ background: '#dc2626' }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}