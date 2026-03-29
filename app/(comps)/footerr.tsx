import Link from 'next/link'

const shopLinks = [
    { href: '/browse', label: 'Browse All' },
    { href: '/browse?cat=textbooks', label: 'Textbooks' },
    { href: '/browse?cat=supplies', label: 'School Supplies' },
    { href: '/browse?cat=art', label: 'Art Materials' },
    { href: '/browse?cat=electronics', label: 'Electronics' },
]

const accountLinks = [
    { href: '/profile', label: 'My Profile' },
    { href: '/profile/orders', label: 'Purchase History' },
    { href: '/cart', label: 'Cart' },
    { href: '/seller/listings', label: 'Sell an Item' },
    { href: '/login', label: 'Log In' },
]

const supportLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
]

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
    return (
        <div className="flex flex-col gap-2">
            {links.map(l => (
                <Link
                    key={l.href}
                    href={l.href}
                    className="footer-link text-[13px]"
                >
                    {l.label}
                </Link>
            ))}
        </div>
    )
}

export default function Footer() {
    return (
        <>
            <style>{`
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-link:hover { color: var(--text); }

        .footer-social {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          background: var(--bg-muted);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .footer-social:hover {
          background: var(--border);
          color: var(--text);
        }
      `}</style>

            <footer className='py-12' style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
                <div className="section-sd py-12 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-7 h-7 rounded-md flex items-center justify-center text-sm"
                                    style={{ background: 'var(--accent)' }}
                                >
                                    📚
                                </div>
                                <span className="font-bold text-[15px]" style={{ color: 'var(--text)' }}>
                                    Scholar&apos;s Den
                                </span>
                            </div>
                            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                A student marketplace for buying and selling textbooks, supplies, and educational materials.
                            </p>
                            <div className="flex gap-2 mt-4">
                                {[
                                    { label: 'F', title: 'Facebook' },
                                    { label: 'I', title: 'Instagram' },
                                    { label: 'X', title: 'Twitter/X' },
                                ].map(s => (
                                    <a key={s.label} href="#" className="footer-social" title={s.title}>
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                                Shop
                            </h3>
                            <FooterLinkList links={shopLinks} />
                        </div>

                        <div>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                                Account
                            </h3>
                            <FooterLinkList links={accountLinks} />
                        </div>

                        <div>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                                Support
                            </h3>
                            <FooterLinkList links={supportLinks} />
                        </div>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 pt-6"
                        style={{ borderTop: '1px solid var(--border)' }}
                    >
                        <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                            developed by rileriaaa.me
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="/terms" className="footer-link text-[12px]">Terms</Link>
                            <Link href="/privacy" className="footer-link text-[12px]">Privacy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}