import { Fragment } from 'react';
import {
	EnvelopeSimple,
	LinkedinLogo,
	GithubLogo
} from '@phosphor-icons/react/dist/ssr';

const contactLinks = [
	{
		href: 'mailto:hello@jennykim.design',
		label: 'Email',
		Icon: EnvelopeSimple
	},
	{
		href: 'https://linkedin.com/in/jennykim',
		label: 'LinkedIn',
		Icon: LinkedinLogo
	},
	{ href: 'https://github.com/jennykim', label: 'GitHub', Icon: GithubLogo }
];

export function Sidebar() {
	return (
		<aside className='w-16 border-l border-neutral-200 flex flex-col items-center justify-center py-48 gap-8'>
			{contactLinks.map(({ href, label, Icon }, i) => (
				<Fragment key={href}>
					{i > 0 && <div className='w-px h-8 bg-neutral-200' />}
					<a
						href={href}
						className='social-link'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Icon size={14} weight='bold' />
						{label}
					</a>
				</Fragment>
			))}
		</aside>
	);
}
