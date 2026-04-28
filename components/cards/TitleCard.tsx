import { parseInlineCode } from './parseInlineCode';

const bgClass: Record<string, string> = {
	white: 'bg-white',
	'neutral-50': 'bg-neutral-50',
	'neutral-100': 'bg-neutral-100',
	'blue-900': 'bg-blue-900',
};

const titleTextClass: Record<string, string> = {
	'blue-500': 'text-blue-500',
	'blue-700': 'text-blue-700',
	'blue-900': 'text-blue-900',
	'lavender-50': 'text-lavender-50',
	white: 'text-white',
};

interface TitleCardProps {
	title: string;
	description?: string;
	bg?: string;
	accentColor?: string;
}

export function TitleCard({
	title,
	description,
	bg = 'white',
	accentColor = 'blue-900',
}: TitleCardProps) {
	const isDark = bg === 'blue-900';
	return (
		<div
			className={[
				bgClass[bg] ?? 'bg-white',
				'flex flex-1 flex-col gap-3 px-6 py-7',
			].join(' ')}
		>
			<p
				className={[
					'font-inter text-xs font-bold tracking-[1px] uppercase',
					titleTextClass[accentColor] ?? 'text-blue-900',
				].join(' ')}
			>
				{parseInlineCode(title)}
			</p>
			{description && (
				<p
					className={[
						'font-inter text-sm leading-[1.65] opacity-85',
						isDark ? 'text-neutral-100' : 'text-blue-900',
					].join(' ')}
				>
					{description}
				</p>
			)}
		</div>
	);
}
