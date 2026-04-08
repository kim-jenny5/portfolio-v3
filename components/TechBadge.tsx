type TechBadgeProps = {
	label: string;
};

export function TechBadge({ label }: TechBadgeProps) {
	return (
		<span className="inline-flex items-center bg-lavender-50 px-2 py-1.5 text-badge text-blue-700 uppercase">
			{label}
		</span>
	);
}
