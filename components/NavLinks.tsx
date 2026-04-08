'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';

const links = [
	{ href: '/', label: 'Work' },
	{ href: '/about', label: 'About' },
];

// Social links — set via NEXT_PUBLIC_EMAIL, NEXT_PUBLIC_LINKEDIN_URL, NEXT_PUBLIC_GITHUB_URL
const socials = [
	{
		label: 'Email',
		href: process.env.NEXT_PUBLIC_EMAIL
			? `mailto:${process.env.NEXT_PUBLIC_EMAIL}`
			: 'mailto:hello@jennykim.design',
		external: false,
	},
	{
		label: 'LinkedIn',
		href:
			process.env.NEXT_PUBLIC_LINKEDIN_URL ??
			'https://linkedin.com/in/jennykim',
		external: true,
	},
	{
		label: 'GitHub',
		href: process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/jennykim',
		external: true,
	},
	{
		label: 'Resume',
		href: '/resume',
		external: false,
	},
];

// ── Mobile menu ────────────────────────────────────────────────────────────

function MobileMenu({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
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
		<div className="fixed inset-0 z-[60] lg:hidden">
			{/* Backdrop */}
			<div
				className="absolute inset-0 transition-opacity duration-200 ease-in-out"
				style={{
					backgroundColor: 'rgba(30,27,75,0.4)',
					opacity: animating ? 1 : 0,
				}}
				onClick={onClose}
			/>

			{/* Drawer panel — full width slide-in */}
			<div
				className="absolute top-0 right-0 bottom-0 flex w-full flex-col bg-neutral-50"
				style={{
					transform: animating ? 'translateX(0)' : 'translateX(100%)',
					transitionProperty: 'transform',
					transitionDuration: animating ? '280ms' : '220ms',
					transitionTimingFunction: animating ? 'ease-out' : 'ease-in',
				}}
			>
				{/* Zone 1 — Header strip */}
				<div className="flex h-[68px] shrink-0 items-center justify-between border-b border-neutral-200 px-6">
					<Link
						href="/"
						className="font-manrope text-[24px] font-[800] tracking-[-1.2px] text-blue-900 lowercase transition-colors duration-200 hover:text-blue-500"
						onClick={handleNavClick}
					>
						jennykim.
					</Link>
					<button
						className="-mr-2 p-2 text-blue-900 transition-colors duration-200 hover:text-blue-500"
						onClick={onClose}
						aria-label="Close navigation menu"
					>
						{/* Sharp-cornered X to match the design system */}
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="square"
						>
							<line x1="4" y1="4" x2="16" y2="16" />
							<line x1="16" y1="4" x2="4" y2="16" />
						</svg>
					</button>
				</div>

				{/* Zone 2 — Nav links */}
				<div className="flex-1 overflow-y-auto px-6 pt-12 pb-8">
					<div className="border-t border-neutral-200">
						{links.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className="group flex items-center justify-between border-b border-neutral-200 py-6"
								onClick={handleNavClick}
							>
								<span
									className={`font-manrope text-4xl leading-[1.1] font-[800] tracking-tighter transition-colors duration-200 ${
										isActive(href)
											? 'text-blue-500'
											: 'text-blue-900 group-hover:text-blue-500'
									}`}
								>
									{label}
								</span>
								<ArrowUpRightIcon
									size={20}
									className="text-blue-900 opacity-40 transition-opacity duration-200 group-hover:opacity-100"
								/>
							</Link>
						))}
					</div>
				</div>

				{/* Zone 3 — Social / contact strip */}
				<div className="px-6 pb-10">
					<span className="mb-5 block font-inter text-xl font-bold tracking-wide text-blue-500 uppercase">
						Connect
					</span>
					<div className="flex flex-wrap items-center gap-x-7 gap-y-3">
						{socials.map((social, i) => (
							<div key={social.label} className="flex items-center gap-7">
								<a
									href={social.href}
									className="font-inter text-2xl font-bold tracking-wide text-blue-900 uppercase transition-colors duration-200 hover:text-blue-500"
									{...(social.external
										? { target: '_blank', rel: 'noopener noreferrer' }
										: {})}
								>
									{social.label}
								</a>
								{i < socials.length - 1 && (
									<div className="h-4 w-px bg-neutral-200" />
								)}
							</div>
						))}
					</div>
					<span className="mt-5 block font-inter text-xs text-neutral-200">
						© {year} jennykim.
					</span>
				</div>
			</div>
		</div>,
		document.body,
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
			<nav className="hidden items-center gap-7 lg:flex">
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
				className="flex flex-col justify-center gap-[5px] p-1 lg:hidden"
				onClick={() => setMenuOpen(true)}
				aria-label="Open navigation menu"
				aria-expanded={menuOpen}
			>
				<span className="block h-[2px] w-5 bg-blue-900" />
				<span className="block h-[2px] w-5 bg-blue-900" />
				<span className="block h-[2px] w-5 bg-blue-900" />
			</button>

			<MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
		</>
	);
}
