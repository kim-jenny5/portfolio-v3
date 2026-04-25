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

interface StatCardProps {
	value: string;
	label: string;
	bg?: string;
	accentColor?: string;
}

export function StatCard({
	value,
	label,
	bg = 'neutral-100',
	accentColor = 'blue-700',
}: StatCardProps) {
	return (
		<div className={[bgClass[bg] ?? 'bg-neutral-100', 'flex flex-col gap-1 px-6 py-5'].join(' ')}>
			<p className="font-manrope text-[32px] font-[800] leading-none tracking-[-2px] text-blue-900 sm:text-[40px]">
				{value}
			</p>
			<p
				className={[
					'font-inter text-xs font-bold tracking-[1px] uppercase',
					accentTextClass[accentColor] ?? 'text-blue-700',
				].join(' ')}
			>
				{label}
			</p>
		</div>
	);
}
