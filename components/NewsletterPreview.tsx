'use client';

import { useState, useRef, useEffect } from 'react';

export type NewsletterBrand = {
	_key: string;
	name: string;
	fileUrl?: string;
};

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
			// cross-origin fallback — won't happen with srcdoc but guard anyway
		}
	};

	const handleSwitch = (key: string) => {
		setActiveKey(key);
		setIframeHeight(undefined);
	};

	if (!brands.length) return null;

	const currentHtml = active ? htmlCache[active._key] : undefined;

	return (
		<div className="flex w-full gap-x-4 overflow-hidden bg-white md:flex-row">
			{/* ── Tab sidebar ─────────────────────────────────────────────────── */}
			<div className="flex h-fit shrink-0 flex-col border border-neutral-200 bg-white py-2 md:w-[200px]">
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
			<div className="flex h-screen flex-1 flex-col border">
				<div className="flex flex-col overflow-hidden bg-white">
					{/* Content */}
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
