import { Fragment } from 'react';
import {
	EnvelopeSimpleIcon,
	LinkedinLogoIcon,
	GithubLogoIcon,
	FileTextIcon,
} from '@phosphor-icons/react/dist/ssr';

// Set your social links via environment variables:
//   NEXT_PUBLIC_EMAIL, NEXT_PUBLIC_LINKEDIN_URL, NEXT_PUBLIC_GITHUB_URL
const contactLinks = [
	{
		href: process.env.NEXT_PUBLIC_EMAIL
			? `mailto:${process.env.NEXT_PUBLIC_EMAIL}`
			: 'mailto:hello@jennykim.design',
		label: 'Email',
		Icon: EnvelopeSimpleIcon,
		external: false,
	},
	{
		href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
		label: 'LinkedIn',
		Icon: LinkedinLogoIcon,
		external: true,
	},
	{
		href: process.env.NEXT_PUBLIC_GITHUB_URL,
		label: 'GitHub',
		Icon: GithubLogoIcon,
		external: true,
	},
	{
		href: '/resume',
		label: 'Resume',
		Icon: FileTextIcon,
		external: false,
	},
];

export function Sidebar() {
	return (
		<aside className="fixed top-0 left-0 z-40 hidden h-screen w-16 flex-col items-center justify-center gap-8 border-r border-neutral-200 bg-neutral-50 lg:flex">
			{contactLinks.map(({ href, label, Icon, external }, i) => (
				<Fragment key={label}>
					{(i === 1 || i === 3) && <div className="h-12 w-px bg-neutral-200" />}
					<a
						href={href}
						className="social-link"
						{...(external
							? { target: '_blank', rel: 'noopener noreferrer' }
							: {})}
					>
						{label}
						<Icon size={14} weight="bold" className="rotate-180" />
					</a>
				</Fragment>
			))}
		</aside>
	);
}
