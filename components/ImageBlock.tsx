import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

type SanityImage = {
	asset: { _ref?: string; _type: string; url?: string };
	alt?: string;
	hotspot?: unknown;
};

interface ImageBlockProps {
	layout: 'imageFull' | 'imageRow';
	size?: 'sm' | 'md' | 'lg';
	textAlign?: 'left' | 'center' | 'right';
	image?: SanityImage;
	images?: SanityImage[];
	heading?: string;
	headingBody?: string;
	imageBody?: string;
	accent?: boolean;
}

function imgSrc(image: SanityImage, w: number): string | null {
	if (!image.asset) return null;
	return image.asset.url
		? `${image.asset.url}?w=${w}&fit=max`
		: urlFor(image as Parameters<typeof urlFor>[0]).width(w).fit('max').url();
}

const fullSizeClass: Record<string, string> = {
	sm: 'mx-auto w-full md:max-w-1/2',
	md: 'mx-auto w-full xl:max-w-3/4',
	lg: 'w-full',
};

const textAlignClass: Record<string, string> = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
};

export function ImageBlock({
	layout,
	size = 'md',
	textAlign = 'left',
	image,
	images,
	heading,
	headingBody,
	imageBody,
	accent = false,
}: ImageBlockProps) {
	const src = image ? imgSrc(image, 1440) : null;

	const imageEl = src ? (
		<Image
			src={src}
			alt={image?.alt ?? ''}
			width={0}
			height={0}
			sizes="100vw"
			className={`h-auto ${fullSizeClass[size]}`}
		/>
	) : null;

	const headingColor = accent ? 'text-white' : 'text-blue-900';
	const bodyColor = accent ? 'text-neutral-50' : 'text-blue-900';

	const headingEl =
		heading || headingBody ? (
			<div className="flex flex-col gap-2">
				{heading && (
					<h3 className={`font-manrope text-lg leading-[1.3] font-bold tracking-tight ${headingColor}`}>
						{heading}
					</h3>
				)}
				{headingBody && (
					<p className={`font-inter text-sm leading-[1.65] ${bodyColor}`}>
						{headingBody}
					</p>
				)}
			</div>
		) : null;

	const imageBodyEl = imageBody ? (
		<p className={`font-inter text-sm leading-[1.65] ${bodyColor}`}>
			{imageBody}
		</p>
	) : null;

	if (layout === 'imageRow' && images?.length) {
		return (
			<div className="flex flex-col gap-4">
				{(heading || headingBody) && (
					<div className="flex flex-col gap-2">
						{heading && (
							<h3 className={`font-manrope text-lg font-bold leading-[1.3] tracking-tight ${headingColor}`}>
								{heading}
							</h3>
						)}
						{headingBody && (
							<p className={`font-inter text-sm leading-[1.65] ${bodyColor}`}>{headingBody}</p>
						)}
					</div>
				)}
				<div className="flex flex-col gap-3 sm:flex-row">
					{images.map((img, i) => {
						const s = imgSrc(img, 1600);
						if (!s) return null;
						return (
							<div key={i} className="relative aspect-[4/3] w-full overflow-hidden rounded sm:flex-1">
								<Image
									src={s}
									alt={img.alt ?? ''}
									fill
									className="object-cover"
									sizes={`(max-width: 640px) 100vw, ${Math.round(100 / images.length)}vw`}
								/>
							</div>
						);
					})}
				</div>
				{imageBody && (
					<p className={`font-inter text-sm leading-[1.65] ${bodyColor}`}>{imageBody}</p>
				)}
			</div>
		);
	}

	if (layout === 'imageFull') {
		const alignCls = textAlignClass[textAlign];
		return (
			<div className={`flex flex-col gap-4 ${alignCls}`}>
				{headingEl}
				{imageEl}
				{imageBodyEl}
			</div>
		);
	}

}
