import Link from 'next/link';
import { NavLinks } from './NavLinks';

export function Header() {
	return (
		<header>
			<div className='flex items-center justify-between px-8 h-[68px]'>
				<Link
					href='/'
					className='font-manrope text-logo font-[800] text-blue-900 lowercase tracking-[var(--text-logo--letter-spacing)]'
				>
					jennykim.
				</Link>
				<NavLinks />
			</div>
			<div className='divider' />
		</header>
	);
}
