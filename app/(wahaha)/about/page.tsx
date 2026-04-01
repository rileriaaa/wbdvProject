import Link from 'next/link'

const STATS = [
    { value: '1,200+', label: 'Active Listings' },
    { value: '800+', label: 'Student Users' },
    { value: '50+', label: 'Partner Schools' },
    { value: '4.9★', label: 'Average Rating' },
]
const VALUES = [
    { icon: '♿', title: 'Accessibility', desc: 'Making quality education affordable for every student.' },
    { icon: '🔒', title: 'Trust & Safety', desc: 'Verified sellers and buyer protection on every transaction.' },
    { icon: '🌍', title: 'Community', desc: 'Built by students, for students across campuses.' },
    { icon: '⚡', title: 'Speed', desc: 'Fast listings, quick transactions, same-day campus pickup.' },
]
const TEAM = [
    { name: 'Ashley James Naval', role: 'Team Leader ,Lead Developer, UI/UX Architect, Information Architecture' },
    { name: 'Chris Hular', role: 'UI/UX Designer' },
    { name: 'Kurt Angelo Aves', role: 'UI/UX Designer' },
    { name: 'Blu Oloquina', role: 'UI/UX Designer' },
    { name: 'Karl Justin Salas', role: 'Content Manager' },
    { name: 'April Jane Salvador', role: 'Content Manager' },
]
const STACK = ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vercel']

export default function AboutPage() {
    return (
        <div style={{ background: 'var(--bg)' }}>

            <section style={{ background: 'var(--text)' }} className="py-16 md:py-24">
                <div className="section-sd grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>About Scholar&apos;s Den</p>
                        <h1 className="text-[36px] md:text-[46px] font-bold leading-tight mb-5 text-white">
                            Affordable learning materials for every student.
                        </h1>
                        <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            Scholar&apos;s Den is a student-built marketplace that connects buyers and sellers of textbooks,
                            school supplies, and educational materials — making quality learning resources more accessible
                            and affordable across campuses.
                        </p>
                    </div>
                    <div className="hidden lg:block w-full h-[280px] rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="w-full h-full flex items-center justify-center text-6xl">📚</div>
                    </div>
                </div>
            </section>

            <section className="py-12" style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
                <div className="section-sd">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {STATS.map(s => (
                            <div key={s.label} className="text-center">
                                <div className="text-[36px] font-bold mb-1" style={{ color: 'var(--text)' }}>{s.value}</div>
                                <div className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="section-sd">
                    <div className="max-w-[700px] mx-auto text-center mb-14">
                        <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Our Mission</p>
                        <h2 className="text-[28px] md:text-[34px] font-bold mb-4" style={{ color: 'var(--text)' }}>
                            Making education more accessible, one listing at a time.
                        </h2>
                        <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            We built Scholar&apos;s Den because we know firsthand how expensive it is to be a student.
                            Our platform lets students buy affordable second-hand materials and sell what they no longer
                            need — keeping the academic community sustainable and connected.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {VALUES.map(v => (
                            <div key={v.title} className="p-5 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                                <div className="text-3xl mb-3">{v.icon}</div>
                                <h3 className="text-[15px] font-bold mb-2" style={{ color: 'var(--text)' }}>{v.title}</h3>
                                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
                <div className="section-sd">
                    <div className="text-center mb-12">
                        <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Meet the Team</p>
                        <h2 className="text-[28px] font-bold" style={{ color: 'var(--text)' }}>The people behind Scholar&apos;s Den</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                        {TEAM.map(member => (
                            <div key={member.name} className="flex flex-col items-center text-center">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-[18px] font-bold text-white mb-3"
                                    style={{ background: 'var(--accent)' }}
                                >
                                    {member.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                </div>
                                <div className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{member.name}</div>
                                <div className="text-[11px] mt-0.5 leading-snug" style={{ color: 'var(--text-muted)' }}>{member.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="section-sd">
                    <div className="flex items-center gap-4 flex-wrap">
                        <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Built With</p>
                        {STACK.map(t => (
                            <span key={t} className="badge-sd badge-neutral text-[12px] px-4 py-1.5">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20" style={{ background: 'var(--text)' }}>
                <div className="section-sd text-center">
                    <h2 className="text-[28px] md:text-[36px] font-bold mb-4 text-white">Ready to start saving?</h2>
                    <p className="text-[15px] mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>Join the student marketplace today.</p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <Link href="/signup" className="btn-primary text-[14px] py-3 px-8">Create Free Account</Link>
                        <Link href="/browse" className="btn-secondary text-[14px] py-3 px-8" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>Browse Listings</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}