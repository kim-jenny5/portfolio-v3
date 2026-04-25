'use client';

import { useState, useRef, useEffect } from 'react';

export type NewsletterBrand = {
	_key: string;
	name: string;
	fileUrl?: string;
};

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
		>
			{direction === 'left' ? (
				<path
					d="M10 3L5 8L10 13"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			) : (
				<path
					d="M6 3L11 8L6 13"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			)}
		</svg>
	);
}

export function NewsletterPreview({
	brands = [],
}: {
	brands?: NewsletterBrand[];
}) {
	const [activeKey, setActiveKey] = useState(brands[0]?._key ?? '');
	const [htmlCache, setHtmlCache] = useState<Record<string, string>>({});
	const [iframeHeight, setIframeHeight] = useState<number | undefined>(
		undefined,
	);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const active = brands.find((b) => b._key === activeKey) ?? brands[0];
	const currentIndex = brands.findIndex((b) => b._key === activeKey);

	// Fetch HTML whenever the active brand changes
	useEffect(() => {
		if (!active?.fileUrl) return;
		if (htmlCache[active._key] !== undefined) return;

		fetch(active.fileUrl)
			.then((r) => r.text())
			.then((html) =>
				setHtmlCache((prev) => ({ ...prev, [active._key]: html })),
			)
			.catch(() =>
				setHtmlCache((prev) => ({
					...prev,
					[active._key]:
						'<p style="padding:2rem;font-family:sans-serif">Failed to load newsletter.</p>',
				})),
			);
	}, [active, htmlCache]);

	// Reset height when active brand changes
	useEffect(() => {
		setIframeHeight(undefined);
	}, [activeKey]);

	const handleLoad = () => {
		try {
			const doc = iframeRef.current?.contentDocument;
			if (doc) setIframeHeight(doc.documentElement.scrollHeight);
		} catch {
			// guard against cross-origin edge cases
		}
	};

	const handleSwitch = (key: string) => {
		setActiveKey(key);
		setIframeHeight(undefined);
	};

	const goTo = (index: number) => {
		const wrapped = ((index % brands.length) + brands.length) % brands.length;
		handleSwitch(brands[wrapped]._key);
	};

	if (!brands.length) return null;

	const currentHtml = active ? htmlCache[active._key] : undefined;

	return (
		<div className="flex h-full w-full flex-col gap-4 overflow-hidden bg-white lg:flex-row">
			{/* ── Mobile/tablet carousel (hidden on lg+) ──────────────────────── */}
			<div className="flex items-center border border-neutral-200 bg-white lg:hidden">
				<button
					onClick={() => goTo(currentIndex - 1)}
					aria-label="Previous brand"
					className="flex h-15 w-15 shrink-0 cursor-pointer items-center justify-center text-blue-900/50 transition-colors hover:bg-neutral-50 hover:text-blue-900"
				>
					<ChevronIcon direction="left" />
				</button>

				<div className="flex flex-1 flex-col items-center gap-1 py-3">
					<span
						key={activeKey}
						className="font-inter text-[11px] font-bold tracking-[1px] text-blue-700 uppercase"
					>
						{active?.name}
					</span>
					<span className="font-inter text-[10px] text-blue-900/40">
						{currentIndex + 1} / {brands.length}
					</span>
				</div>

				<button
					onClick={() => goTo(currentIndex + 1)}
					aria-label="Next brand"
					className="flex h-15 w-15 shrink-0 cursor-pointer items-center justify-center text-blue-900/50 transition-colors hover:bg-neutral-50 hover:text-blue-900"
				>
					<ChevronIcon direction="right" />
				</button>
			</div>

			{/* ── Desktop sidebar (hidden below lg) ───────────────────────────── */}
			<div className="hidden h-fit w-[200px] shrink-0 flex-col border border-neutral-200 bg-white lg:flex">
				{brands.map((brand) => {
					const isActive = brand._key === activeKey;
					return (
						<button
							key={brand._key}
							onClick={() => handleSwitch(brand._key)}
							className={[
								'w-full cursor-pointer border-l-[3px] px-6 py-4 text-left font-inter text-[11px] font-bold tracking-[1px] uppercase transition-colors duration-150',
								isActive
									? 'border-blue-500 bg-lavender-50 text-blue-700'
									: 'border-transparent text-blue-900/60 hover:bg-neutral-100',
							].join(' ')}
						>
							{brand.name}
						</button>
					);
				})}
			</div>

			{/* ── Preview pane ─────────────────────────────────────────────────── */}
			<div className="flex max-h-screen flex-1 flex-col border">
				<div className="flex flex-col overflow-hidden bg-white">
					{currentHtml !== undefined ? (
						<iframe
							key={activeKey}
							ref={iframeRef}
							srcDoc={currentHtml}
							title={`${active?.name} newsletter preview`}
							onLoad={handleLoad}
							className="w-full border-0"
							style={{ height: iframeHeight ?? 800 }}
						/>
					) : (
						<div className="flex items-center justify-center py-20">
							<span className="font-inter text-sm text-blue-900/40">
								Loading…
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
