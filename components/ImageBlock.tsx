import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface ImageBlockProps {
	layout: 'imageLeft' | 'imageRight' | 'imageFull';
	image: {
		asset: { _ref?: string; _type: string; url?: string };
		alt?: string;
		hotspot?: unknown;
	};
	heading?: string;
	headingBody?: string;
	imageBody?: string;
}

export function ImageBlock({
	layout,
	image,
	heading,
	headingBody,
	imageBody,
}: ImageBlockProps) {
	const isRow = layout === 'imageLeft' || layout === 'imageRight';
	const src = image.asset.url
		? `${image.asset.url}?w=1440`
		: urlFor(image as Parameters<typeof urlFor>[0])
				.width(1440)
				.url();

	const imageEl = isRow ? (
		<div className="relative aspect-[4/3] w-full overflow-hidden md:w-1/2 md:shrink-0">
			<Image
				src={src}
				alt={image.alt ?? ''}
				fill
				className="object-cover"
				sizes="(max-width: 768px) 100vw, 50vw"
			/>
		</div>
	) : (
		<Image
			src={src}
			alt={image.alt ?? ''}
			width={0}
			height={0}
			sizes="100vw"
			// className="m-auto h-auto w-full max-w-3/4"
			className="m-auto h-auto w-full xl:max-w-3/4"
		/>
	);

	const headingEl =
		heading || headingBody ? (
			<div className={['flex flex-col gap-2', isRow ? 'flex-1' : ''].join(' ')}>
				{heading && (
					<h3 className="font-manrope text-lg leading-[1.3] font-bold tracking-tight text-blue-900">
						{heading}
					</h3>
				)}
				{headingBody && (
					<p className="font-inter text-sm leading-[1.65] text-blue-900">
						{headingBody}
					</p>
				)}
			</div>
		) : null;

	const imageBodyEl = imageBody ? (
		<p className="font-inter text-sm leading-[1.65] text-blue-900">
			{imageBody}
		</p>
	) : null;

	if (layout === 'imageFull') {
		return (
			<div className="flex flex-col gap-4">
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
