export function parseInlineCode(text: string): React.ReactNode {
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
