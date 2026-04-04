'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

const links = [
	{ href: '/', label: 'Work' },
	{ href: '/about', label: 'About' }
];

// Social links — set via NEXT_PUBLIC_EMAIL, NEXT_PUBLIC_LINKEDIN_URL, NEXT_PUBLIC_GITHUB_URL
const socials = [
	{
		label: 'Email',
		href: process.env.NEXT_PUBLIC_EMAIL
			? `mailto:${process.env.NEXT_PUBLIC_EMAIL}`
			: 'mailto:hello@jennykim.design',
		external: false
	},
	{
		label: 'LinkedIn',
		href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://linkedin.com/in/jennykim',
		external: true
	},
	{
		label: 'GitHub',
		href: process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/jennykim',
		external: true
	}
];

// ── Mobile menu ────────────────────────────────────────────────────────────

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const pathname = usePathname();
	const [animating, setAnimating] = useState(false);
	const [visible, setVisible] = useState(false);

	const isActive = (href: string) => {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	};

	useEffect(() => {
		if (isOpen) {
			setVisible(true);
			// Double rAF gives the browser a chance to paint before animating in
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setAnimating(true));
			});
			document.body.style.overflow = 'hidden';
		} else {
			setAnimating(false);
			const timer = setTimeout(() => setVisible(false), 280);
			document.body.style.overflow = '';
			return () => clearTimeout(timer);
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	const handleNavClick = useCallback(() => onClose(), [onClose]);

	if (!visible) return null;

	const year = new Date().getFullYear();

	return createPortal(
		<div className='fixed inset-0 z-[60] md:hidden'>
			{/* Backdrop */}
			<div
				className='absolute inset-0 transition-opacity duration-200 ease-in-out'
				style={{
					backgroundColor: 'rgba(30,27,75,0.4)',
					opacity: animating ? 1 : 0
				}}
				onClick={onClose}
			/>

			{/* Drawer panel — full width slide-in */}
			<div
				className='absolute top-0 right-0 bottom-0 w-full bg-neutral-50 flex flex-col'
				style={{
					transform: animating ? 'translateX(0)' : 'translateX(100%)',
					transitionProperty: 'transform',
					transitionDuration: animating ? '280ms' : '220ms',
					transitionTimingFunction: animating ? 'ease-out' : 'ease-in'
				}}
			>
				{/* Zone 1 — Header strip */}
				<div className='h-[68px] shrink-0 border-b border-neutral-200 flex items-center justify-between px-6'>
					<Link
						href='/'
						className='font-manrope font-[800] text-[24px] text-blue-900 lowercase tracking-[-1.2px] hover:text-blue-500 transition-colors duration-200'
						onClick={handleNavClick}
					>
						jennykim.
					</Link>
					<button
						className='text-blue-900 hover:text-blue-500 transition-colors duration-200 p-2 -mr-2'
						onClick={onClose}
						aria-label='Close navigation menu'
					>
						{/* Sharp-cornered X to match the design system */}
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='square'
						>
							<line x1='4' y1='4' x2='16' y2='16' />
							<line x1='16' y1='4' x2='4' y2='16' />
						</svg>
					</button>
				</div>

				{/* Zone 2 — Nav links */}
				<div className='flex-1 px-6 pt-12 pb-8 overflow-y-auto'>
					<div className='border-t border-neutral-200'>
						{links.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className='group flex items-center justify-between py-6 border-b border-neutral-200'
								onClick={handleNavClick}
							>
								<span
									className={`font-manrope font-[800] text-[40px] leading-[1.1] tracking-tighter transition-colors duration-200 ${
										isActive(href)
											? 'text-blue-500'
											: 'text-blue-900 group-hover:text-blue-500'
									}`}
								>
									{label}
								</span>
								<ArrowUpRight
									size={20}
									className='text-blue-900 opacity-40 group-hover:opacity-100 transition-opacity duration-200'
								/>
							</Link>
						))}
					</div>
				</div>

				{/* Zone 3 — Social / contact strip */}
				<div className='px-6 pb-10'>
					<span className='font-inter font-bold text-xs uppercase tracking-wide text-blue-500 block mb-4'>
						Connect
					</span>
					<div className='flex items-center gap-6'>
						{socials.map((social, i) => (
							<div key={social.label} className='flex items-center gap-6'>
								<a
									href={social.href}
									className='font-inter font-bold text-xs uppercase tracking-wide text-blue-900 hover:text-blue-500 transition-colors duration-200'
									{...(social.external
										? { target: '_blank', rel: 'noopener noreferrer' }
										: {})}
								>
									{social.label}
								</a>
								{i < socials.length - 1 && (
									<div className='w-px h-3 bg-neutral-200' />
								)}
							</div>
						))}
					</div>
					<span className='font-inter text-xs text-neutral-200 block mt-4'>
						© {year} jennykim.
					</span>
				</div>
			</div>
		</div>,
		document.body
	);
}

// ── NavLinks ───────────────────────────────────────────────────────────────

export function NavLinks() {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	// Close menu automatically on route change
	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	const isActive = (href: string) => {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	};

	return (
		<>
			{/* Desktop nav */}
			<nav className='hidden md:flex items-center gap-7'>
				{links.map(({ href, label }) => (
					<Link
						key={href}
						href={href}
						className={`nav-link ${isActive(href) ? 'active' : ''}`}
					>
						{label}
					</Link>
				))}
			</nav>

			{/* Mobile hamburger */}
			<button
				className='md:hidden flex flex-col justify-center gap-[5px] p-1'
				onClick={() => setMenuOpen(true)}
				aria-label='Open navigation menu'
				aria-expanded={menuOpen}
			>
				<span className='block w-5 h-[2px] bg-blue-900' />
				<span className='block w-5 h-[2px] bg-blue-900' />
				<span className='block w-5 h-[2px] bg-blue-900' />
			</button>

			<MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
		</>
	);
}
