import Image from 'next/image';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { WORK_PROJECT_QUERY, ALL_PROJECTS_NAV_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import { AccentCard } from '@/components/cards/AccentCard';
import { TitleCard } from '@/components/cards/TitleCard';
import { StatCard } from '@/components/cards/StatCard';
import { ImageBlock } from '@/components/ImageBlock';
import { ProjectNav } from '@/components/ProjectNav';

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
	caption?: string;
	image?: {
		asset: { _ref?: string; _type: string; url?: string };
		alt?: string;
		hotspot?: unknown;
	};
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

function Blocks({ value }: { value: PtBlock[] | undefined }) {
	if (!value?.length) return null;
	return (
		<div className="flex flex-col gap-4">
			{value.map((block, i) => {
				// ── Card groups ──────────────────────────────────────────────
				if (block._type === 'accentCardGroup') {
					const cards = block.cards ?? [];
					return (
						<div
							key={block._key ?? i}
							className="grid grid-cols-1 gap-4 sm:grid-cols-2"
						>
							{cards.map((card, ci) => (
								<AccentCard
									key={card._key ?? ci}
									label={card.label ?? ''}
									description={card.description}
									bg={block.bg}
									accentColor={block.accentColor}
								/>
							))}
						</div>
					);
				}

				if (block._type === 'titleCardGroup') {
					const cards = block.cards ?? [];
					return (
						<div
							key={block._key ?? i}
							className="flex flex-col gap-4 lg:flex-row"
						>
							{cards.map((card, ci) => (
								<TitleCard
									key={card._key ?? ci}
									title={card.title ?? ''}
									description={card.description}
									bg={block.bg}
									accentColor={block.accentColor}
								/>
							))}
						</div>
					);
				}

				if (block._type === 'statCardGroup') {
					const cards = block.cards ?? [];
					return (
						<div
							key={block._key ?? i}
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
						</div>
					);
				}

				// ── Inline image ──────────────────────────────────────────────
				if (block._type === 'inlineImage' && block.image) {
					const src = block.image.asset?.url
						? `${block.image.asset.url}?w=1200`
						: urlFor(block.image as Parameters<typeof urlFor>[0])
								.width(1200)
								.url();
					return (
						<figure key={block._key ?? i} className="flex flex-col gap-2">
							<div className="relative w-full overflow-hidden rounded">
								<Image
									src={src}
									alt={block.image.alt ?? ''}
									width={1200}
									height={800}
									className="mt-4 h-auto w-full object-cover"
									sizes="(max-width: 1024px) 100vw, 800px"
								/>
							</div>
							{block.caption && (
								<figcaption className="font-inter text-xs leading-[1.5] text-blue-900/50">
									{block.caption}
								</figcaption>
							)}
						</figure>
					);
				}

				// ── Standard blocks ──────────────────────────────────────────
				if (block._type !== 'block') return null;

				const children = block.children?.map((span, si) =>
					renderSpan(span, block.markDefs, si),
				);
				const style = block.style ?? 'normal';

				if (style === 'h2')
					return (
						<h2
							key={block._key ?? i}
							className="font-manrope text-[22px] leading-[1.4] font-bold tracking-[-1.2px] text-blue-900 sm:text-[32px] sm:tracking-[-2.4px]"
						>
							{children}
						</h2>
					);
				if (style === 'h3')
					return (
						<h3
							key={block._key ?? i}
							className="font-manrope text-lg leading-[1.3] font-bold tracking-tight text-blue-900"
						>
							{children}
						</h3>
					);
				return (
					<p
						key={block._key ?? i}
						className="font-inter text-base leading-[1.65] text-blue-900"
					>
						{children}
					</p>
				);
			})}
		</div>
	);
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
			<div className="mx-auto max-w-content px-6 py-10 sm:py-16 md:px-8">
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

// ── Page ──────────────────────────────────────────────────────────────────────

type ContentItem =
	| {
			_type: 'contentSection';
			_key?: string;
			title: string;
			content: PtBlock[];
	  }
	| {
			_type: 'imageBlock';
			_key?: string;
			layout: 'imageLeft' | 'imageRight' | 'imageFull';
			bg?: 'white' | 'neutral' | 'accent';
			image: {
				asset: { url?: string; _ref?: string; _type: string };
				alt?: string;
				hotspot?: unknown;
			};
			heading?: string;
			headingBody?: string;
			imageBody?: string;
	  };

export default async function WorkPage({ params }: Props) {
	const { slug } = await params;
	const [{ data: p }, { data: allProjects }] = await Promise.all([
		sanityFetch({ query: WORK_PROJECT_QUERY, params: { slug } }),
		sanityFetch({ query: ALL_PROJECTS_NAV_QUERY }),
	]);

	if (!p) notFound();

	const currentIndex = allProjects?.findIndex(
		(proj: { slug: string }) => proj.slug === slug,
	) ?? -1;
	const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
	const nextProject =
		currentIndex !== -1 && currentIndex < allProjects.length - 1
			? allProjects[currentIndex + 1]
			: null;

	const typeLabel = p.projectType
		? p.projectType.charAt(0).toUpperCase() + p.projectType.slice(1)
		: null;
	const stackStr = p.snapshot?.stack?.join(', ') ?? null;

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

	return (
		<>
			{/* ── Hero ──────────────────────────────────────────────────────────── */}
			<div className="overflow-hidden bg-blue-900">
				<div className="mx-auto max-w-content px-6 md:px-8">
					<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
						{/* Title block */}
						<div className="flex flex-1 flex-col gap-4 pt-10 pb-7 lg:py-12">
							{p.projectNumber && (
								<p
									aria-hidden="true"
									className="-mb-2 font-manrope text-[64px] leading-none font-[800] tracking-[-4px] text-white opacity-15 select-none lg:-mb-4 lg:text-[96px] lg:tracking-[-7px]"
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
				</div>
			</div>

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
													className="tag"
												>
													{l.label} ↗
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

			{/* ── Content ───────────────────────────────────────────────────────── */}
			{contentItems.map((item, i) => {
				if (item._type === 'imageBlock') {
					return (
						<div
							key={item._key ?? i}
							className={
								item.bg === 'white'
									? 'bg-white'
									: item.bg === 'accent'
										? 'bg-blue-900'
										: 'bg-neutral-50'
							}
						>
							<div className="mx-auto max-w-content px-6 py-10 sm:py-16 md:px-8">
								<ImageBlock
									layout={item.layout ?? 'imageFull'}
									image={item.image}
									heading={item.heading}
									headingBody={item.headingBody}
									imageBody={item.imageBody}
								/>
							</div>
						</div>
					);
				}

				if (item._type === 'contentSection') {
					sectionCount += 1;
					const number = String(sectionCount).padStart(2, '0');
					const bg = sectionCount % 2 === 0 ? 'neutral' : 'white';
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
