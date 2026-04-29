import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

type SanityImage = {
	asset: { _ref?: string; _type: string; url?: string };
	alt?: string;
	hotspot?: unknown;
};

interface ImageBlockProps {
	layout: 'imageLeft' | 'imageRight' | 'imageFull' | 'imageRow';
	size?: 'sm' | 'md' | 'lg';
	textAlign?: 'left' | 'center' | 'right';
	image?: SanityImage;
	images?: SanityImage[];
	heading?: string;
	headingBody?: string;
	imageBody?: string;
	accent?: boolean;
}

function imgSrc(image: SanityImage, w: number) {
	return image.asset.url
		? `${image.asset.url}?w=${w}`
		: urlFor(image as Parameters<typeof urlFor>[0]).width(w).url();
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
	const isRow = layout === 'imageLeft' || layout === 'imageRight';
	const src = image ? imgSrc(image, 1440) : '';

	const imageEl = isRow && image ? (
		<div className="relative aspect-[4/3] w-full overflow-hidden md:w-1/2 md:shrink-0">
			<Image
				src={src}
				alt={image.alt ?? ''}
				fill
				className="object-cover"
				sizes="(max-width: 768px) 100vw, 50vw"
			/>
		</div>
	) : image ? (
		<Image
			src={src}
			alt={image.alt ?? ''}
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
			<div className={['flex flex-col gap-2', isRow ? 'flex-1' : ''].join(' ')}>
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
					{images.map((img, i) => (
						<div key={i} className="relative aspect-[4/3] w-full overflow-hidden rounded sm:flex-1">
							<Image
								src={imgSrc(img, 800)}
								alt={img.alt ?? ''}
								fill
								className="object-cover"
								sizes="(max-width: 640px) 100vw, 25vw"
							/>
						</div>
					))}
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

	// image-left / image-right: heading+headingBody in text column, imageBody full-width below
	return (
		<div className="flex flex-col gap-4">
			<div
				className={[
					'flex flex-col gap-5 md:flex-row md:items-start md:gap-8',
					layout === 'imageRight' ? 'md:flex-row-reverse' : '',
				]
					.filter(Boolean)
					.join(' ')}
			>
				{imageEl}
				{headingEl}
			</div>
			{imageBodyEl}
		</div>
	);
}
