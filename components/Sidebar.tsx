import { Fragment } from 'react';
import {
	EnvelopeSimple,
	LinkedinLogo,
	GithubLogo
} from '@phosphor-icons/react/dist/ssr';

// Set your social links via environment variables:
//   NEXT_PUBLIC_EMAIL, NEXT_PUBLIC_LINKEDIN_URL, NEXT_PUBLIC_GITHUB_URL
const contactLinks = [
	{
		href: process.env.NEXT_PUBLIC_EMAIL
			? `mailto:${process.env.NEXT_PUBLIC_EMAIL}`
			: 'mailto:hello@jennykim.design',
		label: 'Email',
		Icon: EnvelopeSimple,
		external: false
	},
	{
		href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://linkedin.com/in/jennykim',
		label: 'LinkedIn',
		Icon: LinkedinLogo,
		external: true
	},
	{
		href: process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/jennykim',
		label: 'GitHub',
		Icon: GithubLogo,
		external: true
	}
];

export function Sidebar() {
	return (
		<aside className='hidden lg:flex fixed left-0 top-0 h-screen w-16 z-40 bg-[#f8f8fb] border-r border-neutral-200 flex-col items-center justify-center gap-8'>
			{contactLinks.map(({ href, label, Icon, external }, i) => (
				<Fragment key={href}>
					{/* Divider between Email and LinkedIn */}
					{i === 1 && <div className='w-px h-12 bg-neutral-200' />}
					<a
						href={href}
						className='social-link hover:text-blue-900 transition-colors duration-200'
						{...(external
							? { target: '_blank', rel: 'noopener noreferrer' }
							: {})}
					>
						<Icon size={14} weight='bold' />
						{label}
					</a>
				</Fragment>
			))}
		</aside>
	);
}
