import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { sanityFetch } from '@/sanity/lib/live';
import { WORK_PROJECT_QUERY, ALL_PROJECTS_NAV_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import { AccentCard } from '@/components/cards/AccentCard';
import { TitleCard } from '@/components/cards/TitleCard';
import { StatCard } from '@/components/cards/StatCard';
import { ImageBlock } from '@/components/ImageBlock';
import { VideoBlock } from '@/components/VideoBlock';
import { ProjectNav } from '@/components/ProjectNav';
import { NewsletterPreview } from '@/components/NewsletterPreview';
import { Marquee } from '@/components/Marquee';

type Props = { params: Promise<{ slug: string }> };

// ── Portable Text types ───────────────────────────────────────────────────────

type PtSpan = {
	_key?: string;
	_type: string;
	text?: string;
	marks?: string[];
};

type PtBlock = {
	_key?: string;
	_type: string;
	style?: string;
	children?: PtSpan[];
	markDefs?: { _key: string; _type: string; href?: string }[];
	// card group shapes
	bg?: string;
	accentColor?: string;
	cards?: {
		_key?: string;
		label?: string;
		title?: string;
		value?: string;
		description?: string;
	}[];
	// inlineImage shape
	size?: 'imageFull' | 'imageLeft' | 'imageRight' | 'imageRow';
	displaySize?: 'sm' | 'md' | 'lg';
	caption?: string;
	image?: {
		asset: { _ref?: string; _type: string; url?: string };
		alt?: string;
		hotspot?: unknown;
	};
	images?: {
		asset: { _ref?: string; _type: string; url?: string };
		alt?: string;
		hotspot?: unknown;
	}[];
	// newsletterPreview shape
	brands?: import('@/components/NewsletterPreview').NewsletterBrand[];
};

// ── Portable Text renderer ────────────────────────────────────────────────────

function renderSpan(span: PtSpan, defs: PtBlock['markDefs'], i: number) {
	const text = span.text ?? '';
	const marks = span.marks ?? [];

	let el: React.ReactNode = text;
	if (marks.includes('code'))
		el = (
			<code key={i} className="bg-neutral-200 px-1 py-px font-mono text-[13px]">
				{text}
			</code>
		);
	else if (marks.includes('strong') && marks.includes('em'))
		el = (
			<strong key={i}>
				<em>{text}</em>
			</strong>
		);
	else if (marks.includes('strong')) el = <strong key={i}>{text}</strong>;
	else if (marks.includes('em')) el = <em key={i}>{text}</em>;
	else el = <span key={i}>{text}</span>;

	const linkKey = marks.find(
		(m) => !['strong', 'em', 'code', 'underline'].includes(m),
	);
	if (linkKey) {
		const def = defs?.find((d) => d._key === linkKey);
		if (def?.href)
			return (
				<a
					key={i}
					href={def.href}
					target="_blank"
					rel="noopener noreferrer"
					className="underline hover:text-blue-500"
				>
					{el}
				</a>
			);
	}
	return el;
}

function renderStandardBlock(block: PtBlock, key: string | number) {
	const children = block.children?.map((span, si) =>
		renderSpan(span, block.markDefs, si),
	);
	const style = block.style ?? 'normal';
	if (style === 'h2')
		return (
			<h2
				key={key}
				className="font-manrope text-[22px] leading-[1.4] font-bold tracking-[-1.2px] text-blue-900 sm:text-[32px] sm:tracking-[-2.4px]"
			>
				{children}
			</h2>
		);
	if (style === 'h3')
		return (
			<h3
				key={key}
				className="font-manrope text-lg leading-[1.3] font-bold tracking-tight text-blue-900"
			>
				{children}
			</h3>
		);
	return (
		<p key={key} className="font-inter text-base leading-[1.65] text-blue-900">
			{children}
		</p>
	);
}

const inlineFullSizeClass: Record<string, string> = {
	sm: 'mx-auto w-full md:max-w-1/2',
	md: 'mx-auto w-full xl:max-w-3/4',
	lg: 'w-full',
};

function blockPlainText(block: PtBlock): string {
	return block.children?.map((s) => s.text ?? '').join('') ?? '';
}

function Blocks({
	value,
	textAlign = 'left',
}: {
	value: PtBlock[] | undefined;
	textAlign?: 'left' | 'center' | 'right';
}) {
	if (!value?.length) return null;
	const elements: React.ReactNode[] = [];
	let i = 0;

	while (i < value.length) {
		const block = value[i];
		const key = block._key ?? i;

		// ── Card groups ──────────────────────────────────────────────
		if (block._type === 'accentCardGroup') {
			const cards = block.cards ?? [];
			elements.push(
				<div key={key} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{cards.map((card, ci) => (
						<AccentCard
							key={card._key ?? ci}
							label={card.label ?? ''}
							description={card.description}
							bg={block.bg}
							accentColor={block.accentColor}
						/>
					))}
				</div>,
			);
			i++;
			continue;
		}

		if (block._type === 'titleCardGroup') {
			const cards = block.cards ?? [];
			elements.push(
				<div key={key} className="flex flex-col gap-4 lg:flex-row lg:flex-wrap">
					{cards.map((card, ci) => (
						<div key={card._key ?? ci} className="flex lg:flex-1 lg:basis-[30%]">
							<TitleCard
								title={card.title ?? ''}
								description={card.description}
								bg={block.bg}
								accentColor={block.accentColor}
							/>
						</div>
					))}
				</div>,
			);
			i++;
			continue;
		}

		if (block._type === 'statCardGroup') {
			const cards = block.cards ?? [];
			elements.push(
				<div
					key={key}
					className="grid grid-cols-1 gap-px bg-neutral-200 sm:grid-cols-3"
				>
					{cards.map((card, ci) => (
						<StatCard
							key={card._key ?? ci}
							value={card.value ?? ''}
							label={card.label ?? ''}
							bg={block.bg}
							accentColor={block.accentColor}
						/>
					))}
				</div>,
			);
			i++;
			continue;
		}

		// ── Inline image ──────────────────────────────────────────────
		if (block._type === 'inlineImage' && block.size === 'imageRow' && block.images?.length) {
			elements.push(
				<figure key={key} className="flex flex-col gap-2">
					<div className="flex flex-col gap-3 sm:flex-row">
						{block.images.map((img, ii) => {
							const imgSrc = img.asset?.url
								? `${img.asset.url}?w=1600&fit=max`
								: urlFor(img as Parameters<typeof urlFor>[0]).width(1600).fit('max').url();
							return (
								<div key={ii} className="relative aspect-[4/3] w-full overflow-hidden rounded sm:flex-1">
									<Image
										src={imgSrc}
										alt={img.alt ?? ''}
										fill
										quality={90}
										className="object-cover"
										sizes={`(max-width: 640px) calc(100vw - 48px), calc((min(992px, 100vw - 64px) - ${(block.images!.length - 1) * 12}px) / ${block.images!.length})`}
									/>
								</div>
							);
						})}
					</div>
					{block.caption && (
						<figcaption className="text-center font-inter text-xs leading-[1.5] text-blue-900/70">
							{block.caption}
						</figcaption>
					)}
				</figure>,
			);
			i++;
			continue;
		}

		if (block._type === 'inlineImage' && block.image) {
			const layout = block.size ?? 'imageFull';
			const src = block.image.asset?.url
				? `${block.image.asset.url}?w=1200`
				: urlFor(block.image as Parameters<typeof urlFor>[0])
						.width(1200)
						.url();

			if (layout === 'imageLeft' || layout === 'imageRight') {
				// Paired block is handled by the standard-block look-ahead below.
				// If we reach here, the image has no preceding paragraph — render solo.
				const isLeft = layout === 'imageLeft';
				elements.push(
					<div
						key={key}
						className={[
							'flex flex-col gap-5 md:flex-row md:items-start md:gap-8',
							isLeft ? '' : 'md:flex-row-reverse',
						]
							.filter(Boolean)
							.join(' ')}
					>
						<div className="flex flex-col gap-2 md:w-1/2 md:shrink-0">
							<div className="overflow-hidden rounded">
								<Image
									src={src}
									alt={block.image.alt ?? ''}
									width={800}
									height={600}
									className="h-auto w-full object-cover"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</div>
							{block.caption && (
								<p className="text-center font-inter text-xs leading-[1.5] text-blue-900/70">
									{block.caption}
								</p>
							)}
						</div>
					</div>,
				);
				i++;
				continue;
			}

			// imageFull
			const inlineSizeCls = inlineFullSizeClass[block.displaySize ?? 'lg'];
			elements.push(
				<figure key={key} className={`flex flex-col gap-2 ${inlineSizeCls}`}>
					<div className="overflow-hidden rounded">
						<Image
							src={src}
							alt={block.image.alt ?? ''}
							width={1200}
							height={800}
							className="h-auto w-full"
							sizes="(max-width: 1024px) 100vw, 800px"
						/>
					</div>
					{block.caption && (
						<figcaption className="text-center font-inter text-xs leading-[1.5] text-blue-900/70">
							{block.caption}
						</figcaption>
					)}
				</figure>,
			);
			i++;
			continue;
		}

		// ── Newsletter preview ────────────────────────────────────────
		if (block._type === 'newsletterPreview') {
			elements.push(<NewsletterPreview key={key} brands={block.brands} />);
			i++;
			continue;
		}

		// ── Standard blocks ──────────────────────────────────────────
		if (block._type === 'block') {
			// Detect triple-backtick fenced code blocks
			if (blockPlainText(block).trim() === '```') {
				const codeLines: string[] = [];
				let j = i + 1;
				while (j < value.length) {
					const inner = value[j];
					if (
						inner._type === 'block' &&
						blockPlainText(inner).trim() === '```'
					) {
						j++;
						break;
					}
					codeLines.push(blockPlainText(inner));
					j++;
				}
				elements.push(
					<pre
						key={key}
						className="overflow-x-auto rounded bg-neutral-100 px-5 py-4 font-mono text-[13px] leading-relaxed text-blue-900"
					>
						<code>{codeLines.join('\n')}</code>
					</pre>,
				);
				i = j;
				continue;
			}

			const next = value[i + 1];
			if (
				next?._type === 'inlineImage' &&
				next.image &&
				(next.size === 'imageLeft' || next.size === 'imageRight')
			) {
				const isLeft = next.size === 'imageLeft';
				const src = next.image.asset?.url
					? `${next.image.asset.url}?w=1200`
					: urlFor(next.image as Parameters<typeof urlFor>[0])
							.width(1200)
							.url();
				// Text is first in DOM so mobile (flex-col) shows paragraph before image.
				// On desktop, flip row direction to restore image-left/image-right positioning.
				elements.push(
					<div
						key={key}
						className={[
							'flex flex-col gap-5 md:flex-row md:items-start md:gap-8',
							isLeft ? 'md:flex-row-reverse' : '',
						]
							.filter(Boolean)
							.join(' ')}
					>
						<div className="flex-1">{renderStandardBlock(block, key)}</div>
						<div className="flex flex-col gap-2 md:w-1/2 md:shrink-0">
							<div className="overflow-hidden rounded">
								<Image
									src={src}
									alt={next.image.alt ?? ''}
									width={800}
									height={600}
									className="h-auto w-full object-cover"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</div>
							{next.caption && (
								<p className="text-center font-inter text-xs leading-[1.5] text-blue-900/70">
									{next.caption}
								</p>
							)}
						</div>
					</div>,
				);
				i += 2;
				continue;
			}
			elements.push(renderStandardBlock(block, key));
		}

		i++;
	}

	const alignClass =
		textAlign === 'center'
			? 'text-center'
			: textAlign === 'right'
				? 'text-right'
				: 'text-left';
	return <div className={`flex flex-col gap-4 ${alignClass}`}>{elements}</div>;
}

// ── Layout ────────────────────────────────────────────────────────────────────

function SectionLabel({ number, title }: { number: string; title: string }) {
	return (
		<div>
			<p className="mb-1 font-inter text-[10px] font-bold tracking-[1.8px] text-blue-500 uppercase">
				{number}
			</p>
			<p className="font-inter text-xs font-bold tracking-[1px] text-blue-900 uppercase">
				{title}
			</p>
		</div>
	);
}

function Section({
	number,
	title,
	bg = 'white',
	children,
}: {
	number: string;
	title: string;
	bg?: 'white' | 'neutral' | 'accent';
	children: React.ReactNode;
}) {
	return (
		<div className={bg === 'white' ? 'bg-white' : 'bg-neutral-50'}>
			<div className="mx-auto max-w-content px-6 py-10 md:px-8">
				<div className="mb-10 h-px w-full bg-blue-900 opacity-10" />
				<div className="flex flex-col lg:flex-row lg:gap-10">
					<div className="mb-5 shrink-0 lg:mb-0 lg:w-[248px]">
						<SectionLabel number={number} title={title} />
					</div>
					<div className="min-w-0 flex-1">{children}</div>
				</div>
			</div>
		</div>
	);
}

function ParagraphSection({
	bg = 'white',
	children,
}: {
	bg?: 'white' | 'neutral';
	children: React.ReactNode;
}) {
	return (
		<div className={bg === 'white' ? 'bg-white' : 'bg-neutral-50'}>
			<div className="mx-auto max-w-content px-6 py-10 md:px-8">
				<div className="mb-10 h-px w-full bg-blue-900 opacity-10" />
				{children}
			</div>
		</div>
	);
}

// ── Page ──────────────────────────────────────────────────────────────────────

type ContentItem =
	| {
			_type: 'contentSection';
			_key?: string;
			title: string;
			content: PtBlock[];
	  }
	| {
			_type: 'paragraphBlock';
			_key?: string;
			textAlign?: 'left' | 'center' | 'right';
			content: PtBlock[];
	  }
	| {
			_type: 'imageBlock';
			_key?: string;
			layout: 'imageFull' | 'imageRow';
			size?: 'sm' | 'md' | 'lg';
			textAlign?: 'left' | 'center' | 'right';
			accent?: boolean;
			image?: {
				asset: { url?: string; _ref?: string; _type: string };
				alt?: string;
				hotspot?: unknown;
			};
			images?: {
				asset: { url?: string; _ref?: string; _type: string };
				alt?: string;
				hotspot?: unknown;
			}[];
			heading?: string;
			headingBody?: string;
			imageBody?: string;
	  }
	| {
			_type: 'videoBlock';
			_key?: string;
			videoUrl?: string;
			size?: 'sm' | 'md' | 'lg';
			textAlign?: 'left' | 'center' | 'right';
			heading?: string;
			headingBody?: string;
			caption?: string;
			hasAudio?: boolean;
			accent?: boolean;
	  }
	| {
			_type: 'marquee';
			_key?: string;
			label?: string;
			accent?: boolean;
			images?: { url?: string; alt?: string }[];
	  }
	| {
			_type: 'newsletterPreview';
			_key?: string;
			brands?: import('@/components/NewsletterPreview').NewsletterBrand[];
	  };

export default async function WorkPage({ params }: Props) {
	const { slug } = await params;
	const [{ data: p }, { data: allProjects }] = await Promise.all([
		sanityFetch({ query: WORK_PROJECT_QUERY, params: { slug } }),
		sanityFetch({ query: ALL_PROJECTS_NAV_QUERY }),
	]);

	if (!p) notFound();

	const currentIndex =
		allProjects?.findIndex((proj: { slug: string }) => proj.slug === slug) ??
		-1;
	const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
	const nextProject =
		currentIndex !== -1 && currentIndex < allProjects.length - 1
			? allProjects[currentIndex + 1]
			: null;

	const typeLabel = p.snapshot?.projectType
		? p.snapshot.projectType.charAt(0).toUpperCase() +
			p.snapshot.projectType.slice(1)
		: null;
	const stackStr = p.tags?.join(', ') ?? null;

	type OverviewCol =
		| { label: string; value: string; links?: never }
		| { label: string; links: { label: string; url: string }[]; value?: never };

	const overviewItems: OverviewCol[] = [
		typeLabel ? { label: 'Type', value: typeLabel } : null,
		p.snapshot?.role ? { label: 'Role', value: p.snapshot.role } : null,
		stackStr ? { label: 'Stack', value: stackStr } : null,
		p.snapshot?.timeline
			? { label: 'Timeline', value: p.snapshot.timeline }
			: null,
		p.snapshot?.links?.length
			? { label: 'Links', links: p.snapshot.links }
			: null,
	].filter(Boolean) as OverviewCol[];

	// Build numbered sections from unified content[]
	const contentItems: ContentItem[] = p.content ?? [];
	let sectionCount = 0;
	let blockIndex = 0; // counts all non-newsletterPreview blocks for bg alternation
	let lastBg = 'bg-white'; // tracks previous block's bg for marquee inheritance

	return (
		<>
			{/* ── Hero + snapshot wrapper ───────────────────────────────────────── */}
			<div
				className={p.heroImageUrl ? 'flex h-[calc(100dvh-68px)] flex-col' : ''}
			>
				{/* ── Hero ──────────────────────────────────────────────────────────── */}
				<div
					className={`relative overflow-hidden bg-blue-900 ${p.heroImageUrl ? 'flex flex-1 flex-col justify-end' : ''}`}
				>
					{p.heroImageUrl && (
						<Image
							src={`${p.heroImageUrl}?w=1800`}
							alt=""
							aria-hidden="true"
							fill
							className="object-cover object-center opacity-20"
							sizes="100vw"
							priority
						/>
					)}
					<div className="relative mx-auto w-full max-w-content px-6 py-10 md:px-8 lg:py-12">
						{p.projectNumber && (
							<p
								aria-hidden="true"
								className="font-manrope text-[64px] leading-none font-[800] tracking-[-4px] text-white opacity-30 select-none lg:text-[96px] lg:tracking-[-7px]"
							>
								{p.projectNumber.padStart(2, '0')}
							</p>
						)}
						<div>
							<div className="mb-5 h-px w-full bg-white opacity-[0.12]" />
							{p.category && (
								<p className="mb-2.5 font-inter text-xs font-bold tracking-[1px] text-lavender-50 uppercase">
									{p.category}
								</p>
							)}
							<h1 className="mb-4 font-manrope text-[30px] leading-[1.1] font-[800] tracking-[-1.5px] text-white sm:text-[40px] lg:text-[48px] lg:tracking-[-3.6px]">
								{p.title}
								{p.company && (
									<span className="ml-2.5 font-inter text-base font-bold tracking-normal text-white/40 lg:text-xl">
										{p.company}
									</span>
								)}
							</h1>
							{p.description && (
								<p className="max-w-[640px] font-inter text-sm leading-[1.55] text-neutral-100 lg:text-base">
									{p.description}
								</p>
							)}
						</div>
					</div>
				</div>
				{/* end hero */}

				{/* ── Overview bar ──────────────────────────────────────────────────── */}
				{overviewItems.length > 0 && (
					<div className="border-b border-neutral-200 bg-neutral-100">
						<div className="mx-auto max-w-content px-6 md:px-8">
							<div className="grid grid-cols-1 md:auto-cols-fr md:grid-flow-col">
								{overviewItems.map((col, i) => (
									<div
										key={col.label}
										className={[
											'flex flex-col gap-1 py-4 lg:py-5',
											i < overviewItems.length - 1
												? 'border-b border-neutral-200 md:border-r md:border-b-0 md:pr-4 lg:pr-6'
												: '',
											i > 0 ? 'md:pl-4 lg:pl-6' : '',
										]
											.filter(Boolean)
											.join(' ')}
									>
										<p className="font-inter text-xs font-bold tracking-[1px] text-blue-500 uppercase">
											{col.label}
										</p>
										{col.links ? (
											<div className="mt-0.5 flex flex-wrap gap-1.5">
												{col.links.map((l) => (
													<a
														key={l.label}
														href={l.url}
														target="_blank"
														rel="noopener noreferrer"
														className="tag inline-flex items-center gap-1"
													>
														{l.label}
														<ArrowUpRightIcon size={11} />
													</a>
												))}
											</div>
										) : (
											<p className="font-inter text-[13px] font-bold tracking-[-0.4px] text-blue-900">
												{col.value}
											</p>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
			{/* end hero+snapshot wrapper */}

			{/* ── Content ───────────────────────────────────────────────────────── */}
			{contentItems.map((item, i) => {
				if (item._type === 'marquee' && item.images?.length) {
					const isAccent = item.accent === true;
					const bgClass = isAccent ? 'bg-blue-900' : lastBg;
					return (
						<div key={item._key ?? i} className={bgClass}>
							<div className="mx-auto max-w-content px-6 py-10 md:px-8">
								<Marquee
									label={item.label}
									images={item.images.filter((img) => img.url).map((img) => ({ url: img.url!, alt: img.alt }))}
									accent={isAccent}
								/>
							</div>
						</div>
					);
				}

				if (item._type === 'newsletterPreview') {
					return (
						<div key={item._key ?? i} className="bg-white">
							<div className="mx-auto max-w-content px-6 py-10 md:px-8">
								<div className="mb-10 h-px w-full bg-blue-900 opacity-10" />
								<NewsletterPreview brands={item.brands} />
							</div>
						</div>
					);
				}

				if (item._type === 'imageBlock') {
					const isAccent = item.accent === true;
					const bgClass = isAccent
						? 'bg-blue-900'
						: blockIndex++ % 2 === 0
							? 'bg-white'
							: 'bg-neutral-50';
					lastBg = bgClass;
					return (
						<div key={item._key ?? i} className={bgClass}>
							<div className="mx-auto max-w-content px-6 py-10 md:px-8">
								<ImageBlock
									layout={item.layout ?? 'imageFull'}
									size={item.size}
									textAlign={item.textAlign}
									image={item.image}
									images={item.images}
									heading={item.heading}
									headingBody={item.headingBody}
									imageBody={item.imageBody}
									accent={isAccent}
								/>
							</div>
						</div>
					);
				}

				if (item._type === 'videoBlock' && item.videoUrl) {
					const isAccent = item.accent === true;
					const bgClass = isAccent
						? 'bg-blue-900'
						: blockIndex++ % 2 === 0
							? 'bg-white'
							: 'bg-neutral-50';
					lastBg = bgClass;
					return (
						<div key={item._key ?? i} className={bgClass}>
							<div className="mx-auto max-w-content px-6 py-10 md:px-8">
								<VideoBlock
									videoUrl={item.videoUrl}
									size={item.size}
									textAlign={item.textAlign}
									heading={item.heading}
									headingBody={item.headingBody}
									caption={item.caption}
									hasAudio={item.hasAudio ?? true}
									accent={isAccent}
								/>
							</div>
						</div>
					);
				}

				if (item._type === 'paragraphBlock') {
					blockIndex++;
					const bg = blockIndex % 2 === 0 ? 'neutral' : 'white';
					lastBg = bg === 'neutral' ? 'bg-neutral-50' : 'bg-white';
					return (
						<ParagraphSection key={item._key ?? i} bg={bg}>
							<Blocks value={item.content} textAlign={item.textAlign} />
						</ParagraphSection>
					);
				}

				if (item._type === 'contentSection') {
					sectionCount += 1;
					blockIndex++;
					const number = String(sectionCount).padStart(2, '0');
					const bg = blockIndex % 2 === 0 ? 'neutral' : 'white';
					lastBg = bg === 'neutral' ? 'bg-neutral-50' : 'bg-white';
					return (
						<Section
							key={item._key ?? i}
							number={number}
							title={item.title}
							bg={bg}
						>
							<Blocks value={item.content} />
						</Section>
					);
				}

				return null;
			})}

			{/* ── Project navigation ────────────────────────────────────────── */}
			<ProjectNav prev={prevProject} next={nextProject} />
		</>
	);
}
