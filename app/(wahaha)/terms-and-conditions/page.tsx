const SECTIONS = [
    {
        id: 'acceptance', title: '1. Acceptance of Terms',
        content: 'By accessing or using Scholar\'s Den, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. We reserve the right to update these terms at any time, and continued use of the platform constitutes acceptance of any changes.'
    },
    {
        id: 'eligibility', title: '2. Eligibility',
        content: 'You must be at least 13 years old to use Scholar\'s Den. Users under 18 must have parental consent. By creating an account, you confirm that all information you provide is accurate and that you are eligible to use this service.'
    },
    {
        id: 'accounts', title: '3. User Accounts',
        content: 'You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use of your account. Each user may only maintain one active account. Scholar\'s Den reserves the right to terminate accounts that violate these terms.'
    },
    {
        id: 'listings', title: '4. Listings & Products',
        content: 'Sellers are responsible for the accuracy of their listings. Items must be accurately described, including condition, edition, and any defects. Scholar\'s Den reserves the right to remove listings that violate our policies or are deemed inappropriate. All transactions are between buyers and sellers — Scholar\'s Den facilitates but does not guarantee transactions.'
    },
    {
        id: 'prohibited', title: '5. Prohibited Items',
        content: 'The following items are not allowed on Scholar\'s Den: counterfeit items, pirated materials, illegal substances, weapons, adult content, and items unrelated to education. Violation of this policy may result in account suspension.'
    },
    {
        id: 'transactions', title: '6. Transactions & Payments',
        content: 'All transactions are subject to our payment processing terms. Buyers are responsible for reviewing listings carefully before purchase. Refunds and disputes are handled according to our Buyer Protection policy. Scholar\'s Den charges no listing fees but may introduce service fees in the future with prior notice.'
    },
    {
        id: 'conduct', title: '7. User Conduct',
        content: 'You agree not to: harass other users, post false information, attempt to circumvent our platform, use automated tools to scrape data, or engage in fraudulent transactions. Violations may result in permanent account termination.'
    },
    {
        id: 'privacy', title: '8. Privacy',
        content: 'Your use of Scholar\'s Den is subject to our Privacy Policy, which is incorporated into these Terms by reference. We collect and process personal data as described in our Privacy Policy.'
    },
    {
        id: 'ip', title: '9. Intellectual Property',
        content: 'Scholar\'s Den and its original content, features, and functionality are owned by the Scholar\'s Den team. You retain ownership of content you post but grant us a license to display and process it for platform operations.'
    },
    {
        id: 'disclaimer', title: '10. Disclaimer of Warranties',
        content: 'Scholar\'s Den is provided "as is" without warranties of any kind. We do not guarantee the accuracy of listings, the quality of items, or the conduct of users. Use the platform at your own risk.'
    },
    {
        id: 'contact', title: '11. Contact',
        content: 'For questions about these Terms, contact us at legal@scholarsden.com or through our Contact Us page.'
    },
]
export default function TermsPage() {
    return (
        <div style={{ background: 'var(--bg)' }}>
            <section className="py-12" style={{ background: 'var(--dark-surface)' }}>
                {/* Added px-4 sm:px-6 for mobile padding */}
                <div className="section-sd px-4 sm:px-6 lg:px-0">
                    <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Legal</p>
                    <h1 className="text-[32px] font-bold text-white mb-2">Terms of Service</h1>
                    <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.45)' }}>Last updated: April 26, 2026</p>
                </div>
            </section>

            <div className="section-sd py-12 md:py-16 px-4 sm:px-6 lg:px-0" style={{ padding: '50px 10px 50px 10px' }}>
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

                    {/* Added self-start so sticky works correctly */}
                    <nav className="sticky top-[80px] hidden lg:block self-start">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Contents</h3>
                        <div className="flex flex-col gap-1">
                            {SECTIONS.map(s => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="text-[12px] py-1.5 px-2 rounded-lg transition-colors"
                                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                                >
                                    {s.title}
                                </a>
                            ))}
                        </div>
                    </nav>

                    {/* Added w-full so it doesn't overflow on mobile */}
                    <div className="max-w-[740px] w-full">
                        <div className="p-5 rounded-xl mb-8" style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}>
                            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--accent)' }}>
                                Please read these Terms of Service carefully before using Scholar&apos;s Den. By using our platform, you agree to be bound by these terms.
                            </p>
                        </div>

                        <div className="flex flex-col gap-10">
                            {SECTIONS.map(s => (
                                <div key={s.id} id={s.id}>
                                    <h2 className="text-[18px] font-bold mb-3" style={{ color: 'var(--text)' }}>{s.title}</h2>
                                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.content}</p>
                                    {s.id === 'prohibited' && (
                                        <div className="mt-4 p-4 rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                                            <p className="text-[13px] font-semibold mb-2" style={{ color: '#dc2626' }}>⚠️ Prohibited Items Include:</p>
                                            <ul className="text-[13px] space-y-1" style={{ color: '#dc2626' }}>
                                                {['Counterfeit or pirated materials', 'Illegal substances or weapons', 'Adult content of any kind', 'Items unrelated to education', 'Stolen property'].map(item => (
                                                    <li key={item}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {s.id !== SECTIONS[SECTIONS.length - 1].id && (
                                        <hr className="divider-sd mt-8" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}