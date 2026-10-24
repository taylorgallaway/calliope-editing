'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" aria-label="Calliope Editing home" className="site-header__logo">
          <img src="/logo.png" alt="Calliope Editing" width="645" height="585" />
        </Link>
        <nav aria-label="Main" className="site-nav">
          <Link href="/" className={pathname === '/' ? 'is-active' : undefined}>
            Services &amp; Pricing
          </Link>
          <Link href="/faq" className={pathname === '/faq' ? 'is-active' : undefined}>
            FAQ
          </Link>
          <Link href="/inquire" className="site-nav__cta">
            Inquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
