'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ href: '/', label: 'Work' },
	{ href: '/about', label: 'About' },
	{ href: '/resume', label: 'Resume' },
	{ href: '/contact', label: 'Contact' }
];

export function NavLinks() {
	const pathname = usePathname();

	return (
		<nav className='flex items-center gap-7'>
			{links.map(({ href, label }) => (
				<Link
					key={href}
					href={href}
					className={`nav-link ${pathname === href ? 'active' : ''}`}
				>
					{label}
				</Link>
			))}
		</nav>
	);
}
