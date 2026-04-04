type TechBadgeProps = {
	label: string;
};

export function TechBadge({ label }: TechBadgeProps) {
	return (
		<span className='inline-flex items-center bg-lavender-50 text-blue-700 text-badge uppercase px-2 py-1.5'>
			{label}
		</span>
	);
}
