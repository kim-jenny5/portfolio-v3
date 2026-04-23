function parseInlineCode(text: string): React.ReactNode {
	const parts = text.split(/(`[^`]+`)/g);
	if (parts.length === 1) return text;
	return parts.map((part, i) =>
		part.startsWith('`') && part.endsWith('`') ? (
			<code key={i} className="rounded bg-neutral-200 px-1 py-px font-mono text-[0.85em]">
				{part.slice(1, -1)}
			</code>
		) : (
			part
		),
	);
}

const bgClass: Record<string, string> = {
	white: 'bg-white',
	'neutral-50': 'bg-neutral-50',
	'neutral-100': 'bg-neutral-100',
};

const accentTextClass: Record<string, string> = {
	'blue-500': 'text-blue-500',
	'blue-700': 'text-blue-700',
	'blue-900': 'text-blue-900',
};

const accentBorderClass: Record<string, string> = {
	'blue-500': 'border-blue-500',
	'blue-700': 'border-blue-700',
	'blue-900': 'border-blue-900',
};

interface AccentCardProps {
	label: string;
	description?: string;
	bg?: string;
	accentColor?: string;
}

export function AccentCard({
	label,
	description,
	bg = 'neutral-100',
	accentColor = 'blue-500',
}: AccentCardProps) {
	return (
		<div
			className={[
				bgClass[bg] ?? 'bg-neutral-100',
				'border-l-[3px]',
				accentBorderClass[accentColor] ?? 'border-blue-500',
				'flex flex-col gap-2 px-5 py-5 sm:px-6',
			].join(' ')}
		>
			<p
				className={[
					'font-inter text-[11px] font-bold tracking-[1.2px] uppercase',
					accentTextClass[accentColor] ?? 'text-blue-500',
				].join(' ')}
			>
				{label}
			</p>
			{description && (
				<p className="font-inter text-sm leading-[1.6] text-blue-900">{parseInlineCode(description)}</p>
			)}
		</div>
	);
}
