import Link from 'next/link'
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import '../globals.css'

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
    { href: '/profile/seller/listings/new', label: 'Sell an Item' },
    { href: '/profile/settings', label: 'Account Settings' },
]

const supportLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/terms-and-conditions', label: 'Terms of Service' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
]

const socialLinks: { icon: IconType; title: string; href: string }[] = [
    { icon: FaFacebook, title: 'Facebook', href: 'https://www.facebook.com/shlynavtiff/' },
    { icon: FaInstagram, title: 'Instagram', href: 'https://www.instagram.com/rileriaaa/' },
    { icon: FaGithub, title: 'Github', href: 'https://github.com/rileriaaa' },
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
                                {socialLinks.map(s => (
                                    <a key={s.title} href={s.href} target='_blank' className="footer-social" title={s.title} aria-label={s.title}>
                                        <s.icon size={14} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                                Quick Links
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
                        <div className="flex items-center gap-1.5">
                            <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>developed & designed by</span>
                            <span className="relative flex h-[7px] w-[7px] flex-shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#FF69B4' }} />
                                <span className="relative inline-flex rounded-full h-[7px] w-[7px]" style={{ background: '#FF69B4' }} />
                            </span>

                            <a

                                href="https://www.rileriaaa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[12px] font-bold animated-credit"
                                style={{
                                    display: 'inline-block',
                                    background: 'linear-gradient(90deg,#a855f7,#ec4899,#6366f1,#a855f7,#ec4899)',
                                    backgroundSize: '200% auto',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                rileriaaa.me
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/terms-and-conditions" className="footer-link text-[12px]">Terms</Link>
                            <Link href="/privacy-policy" className="footer-link text-[12px]">Privacy</Link>
                        </div>
                    </div>
                </div>
            </footer >
        </>
    )
}