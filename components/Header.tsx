import Link from 'next/link';
import { NavLinks } from './NavLinks';

export function Header() {
	return (
		<header className='fixed top-0 left-0 lg:left-16 right-0 z-50 h-[68px] bg-neutral-50/90 backdrop-blur-sm border-b border-neutral-200'>
			<div className='max-w-content mx-auto px-6 md:px-8 h-full flex items-center justify-between'>
				<Link
					href='/'
					className='font-manrope text-logo font-[800] text-blue-900 lowercase tracking-[-1.2px] hover:text-blue-500 transition-colors duration-200'
				>
					jennykim.
				</Link>
				<NavLinks />
			</div>
		</header>
	);
}
