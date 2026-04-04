const DATA_TYPES = [
    { icon: '👤', label: 'Account Info', desc: 'Name, email, school, profile data' },
    { icon: '📊', label: 'Data Usage', desc: 'How you interact with the platform' },
    { icon: '💻', label: 'Device Info', desc: 'Browser, OS, and device identifiers' },
    { icon: '📍', label: 'Location Data', desc: 'General location for delivery purposes' },
]

const SECTIONS = [
    {
        id: 'info-collect', title: '1. Information We Collect',
        content: 'We collect information you provide directly (account details, listings, messages) and information collected automatically (usage data, device info). We use cookies and similar technologies to improve your experience.'
    },
    {
        id: 'how-we-use', title: '2. How We Use Your Information',
        content: 'We use your information to provide and improve our services, process transactions, send notifications you\'ve opted into, prevent fraud, and comply with legal obligations. We never sell your personal data to third parties.'
    },
    {
        id: 'sharing', title: '3. Information Sharing',
        content: 'We share your information only with: other users (as needed for transactions), service providers (payment processing, hosting), and as required by law. We do not sell, rent, or trade your personal information.'
    },
    {
        id: 'your-rights', title: '4. Your Rights',
        content: 'You have the right to access, correct, or delete your personal data. You can opt out of marketing communications at any time. To exercise these rights, contact us at privacy@scholarsden.com.'
    },
    {
        id: 'cookies', title: '5. Cookies',
        content: 'We use essential cookies for site functionality (authentication, cart state) and optional analytics cookies. You can manage cookie preferences through your browser settings.'
    },
    {
        id: 'security', title: '6. Data Security',
        content: 'We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.'
    },
    {
        id: 'retention', title: '7. Data Retention',
        content: 'We retain your data for as long as your account is active or as needed to provide services. You can request deletion of your account and associated data at any time through Account Settings.'
    },
    {
        id: 'contact', title: '8. Contact Us',
        content: 'For privacy-related questions, contact our team at privacy@scholarsden.com or through our Contact Us page.'
    },
]

const SHARING_TABLE = [
    { who: 'Other Users', what: 'Profile info, listings, messages', why: 'Facilitating transactions' },
    { who: 'Payment Processors', what: 'Transaction data', why: 'Processing payments' },
    { who: 'Hosting Providers', what: 'All platform data (encrypted)', why: 'Infrastructure' },
    { who: 'Law Enforcement', what: 'As required by law', why: 'Legal compliance' },
]

export default function PrivacyPage() {
    return (
        <div style={{ background: 'var(--bg)' }}>
            <section className="py-12" style={{ background: 'var(--dark-surface)' }}>
                <div className="section-sd">
                    <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Legal</p>
                    <h1 className="text-[32px] font-bold text-white mb-2">Privacy Policy</h1>
                    <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.45)' }}>Last updated: January 1, 2024</p>
                </div>
            </section>

            <div className="section-sd py-12 md:py-16" style={{ padding: '50px 0 50px 0' }}>
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

                    <nav className="sticky top-[80px] hidden lg:block">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Contents</h3>
                        <div className="flex flex-col gap-1">
                            {SECTIONS.map(s => (
                                <a key={s.id} href={`#${s.id}`} className="text-[12px] py-1.5 px-2 rounded-lg" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                                    {s.title}
                                </a>
                            ))}
                        </div>
                    </nav>

                    <div className="max-w-[740px]">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                            {DATA_TYPES.map(d => (
                                <div key={d.label} className="flex flex-col items-center text-center p-4 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                                    <span className="text-2xl mb-2">{d.icon}</span>
                                    <div className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{d.label}</div>
                                    <div className="text-[11px] mt-0.5 leading-snug" style={{ color: 'var(--text-muted)' }}>{d.desc}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-10">
                            {SECTIONS.map(s => (
                                <div key={s.id} id={s.id}>
                                    <h2 className="text-[18px] font-bold mb-3" style={{ color: 'var(--text)' }}>{s.title}</h2>
                                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.content}</p>

                                    {s.id === 'sharing' && (
                                        <div className="mt-5 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                                            <div className="grid grid-cols-3 gap-4 px-5 py-3 text-[11px] font-bold uppercase tracking-widest" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                                                <span>Who</span><span>What</span><span>Why</span>
                                            </div>
                                            {SHARING_TABLE.map(row => (
                                                <div key={row.who} className="grid grid-cols-3 gap-4 px-5 py-3 text-[13px]" style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                                                    <span className="font-medium" style={{ color: 'var(--text)' }}>{row.who}</span>
                                                    <span>{row.what}</span>
                                                    <span>{row.why}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {s.id === 'your-rights' && (
                                        <div className="mt-4 flex flex-col gap-2">
                                            {['Access your personal data', 'Correct inaccurate data', 'Request data deletion', 'Opt out of marketing emails', 'Data portability on request'].map(right => (
                                                <div key={right} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                                                    <span style={{ color: '#16a34a' }}>✓</span> {right}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {s.id === 'cookies' && (
                                        <div className="mt-4 p-4 rounded-xl" style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}>
                                            <p className="text-[13px]" style={{ color: 'var(--accent)' }}>
                                                🍪 We only use essential cookies required for authentication and cart state. We do not use tracking cookies without your consent.
                                            </p>
                                        </div>
                                    )}

                                    {s.id !== SECTIONS[SECTIONS.length - 1].id && <hr className="divider-sd mt-8" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}