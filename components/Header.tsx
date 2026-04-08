import Link from 'next/link';
import { NavLinks } from './NavLinks';

export function Header() {
	return (
		<header className="fixed top-0 right-0 left-0 z-50 h-[68px] border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-sm lg:left-16">
			<div className="mx-auto flex h-full max-w-content items-center justify-between px-6 md:px-8">
				<Link
					href="/"
					className="font-manrope text-logo font-[800] tracking-[-1.2px] text-blue-900 lowercase transition-colors duration-200 hover:text-blue-500"
				>
					jennykim.
				</Link>
				<NavLinks />
			</div>
		</header>
	);
}
