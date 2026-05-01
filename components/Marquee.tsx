'use client';

interface MarqueeImage {
	url: string;
	alt?: string;
}

interface MarqueeProps {
	label?: string;
	images: MarqueeImage[];
	accent?: boolean;
}

export function Marquee({ label, images, accent = false }: MarqueeProps) {
	if (!images?.length) return null;

	const labelColor = accent ? 'text-white/40' : 'text-blue-900/40';
	const imgClass = accent
		? 'brightness-0 invert opacity-50'
		: 'grayscale opacity-40';

	return (
		<>
			<style>{`
				@keyframes marquee-scroll {
					from { transform: translateX(0); }
					to { transform: translateX(-50%); }
				}
				.marquee-animate { animation: marquee-scroll 60s linear infinite; }
			`}</style>
			<div className="flex flex-col gap-6">
				{label && (
					<p className={`text-center font-inter text-xs font-bold uppercase tracking-[1px] ${labelColor}`}>
						{label}
					</p>
				)}
				<div
					className="overflow-hidden"
					style={{
						maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
						WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
					}}
				>
					<div className="flex w-max select-none marquee-animate">
						{[0, 1].map((set) => (
							<div key={set} className="flex items-center gap-16 px-8">
								{images.map((img, i) => (
									<img
										key={i}
										src={img.url}
										alt={img.alt ?? ''}
										className={`max-h-7 w-auto object-contain ${imgClass}`}
									/>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
