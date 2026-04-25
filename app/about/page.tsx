import Image from 'next/image';
import { Fragment } from 'react';
import { sanityFetch } from '@/sanity/lib/live';
import { ABOUT_PAGE_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import { TechBadge } from '@/components/TechBadge';

type PtBlock = {
	_key?: string;
	children?: { _key?: string; text?: string; marks?: string[] }[];
};

function renderHeadingBlocks(
	blocks: PtBlock[] | undefined,
	fallback?: string,
): React.ReactNode {
	if (!blocks?.length) return fallback;
	return blocks.map((block, bi) =>
		block.children?.map((span, si) => {
			const content = span.text ?? '';
			if (span.marks?.includes('code')) {
				return (
					<code
						key={span._key ?? si}
						className="rounded-lg bg-neutral-200 px-3 py-1.5 font-mono text-[0.85em] tracking-tight"
					>
						{content}
					</code>
				);
			}
			return <Fragment key={span._key ?? si}>{content}</Fragment>;
		}),
	);
}

export default async function AboutPage() {
	const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
	const profileImage = data?.profileImage
		? urlFor(data.profileImage).width(768).height(576).fit('crop').url()
		: null;

	const headline = data?.hero?.headline;
	const subline = data?.hero?.subline;
	const stats: string[] = data?.hero?.stats;
	const storyHeading = renderHeadingBlocks(
		data?.storyHeading,
		'The story so far.',
	);
	const story: string[] =
		data?.story && data.story.split(/\n\n+/).filter(Boolean);
	const skillsHeading = renderHeadingBlocks(data?.skillsHeading);
	const skills: { name: string; tags: string[] }[] = data?.skills;

	return (
		<>
			{/* ── Section 1: Intro ────────────────────────────────────────────── */}
			<section className="w-full bg-neutral-50">
				<div className="mx-auto max-w-content px-6 pt-20 pb-12 max-md:pb-16 max-sm:pb-12 md:px-8 lg:px-8">
					<span className="mb-6 block font-inter text-xs font-bold tracking-wide text-blue-500 uppercase">
						About
					</span>

					<div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
						{/* Left: text */}
						<div className="flex-1">
							<div className="relative">
								{/* Decorative rect — desktop only */}
								<span
									aria-hidden="true"
									className="absolute top-[4px] left-[280px] -z-10 hidden h-[56px] w-[200px] bg-lavender-50 opacity-40 lg:block"
								/>
								<h1 className="relative font-manrope text-[32px] leading-[1.1] font-[800] tracking-[-2px] text-blue-900 md:text-[40px] lg:text-[48px] lg:tracking-[-3.6px]">
									{headline}
								</h1>
							</div>

							<p className="mt-8 max-w-[768px] font-inter text-base leading-[1.6] text-blue-800">
								{subline}
							</p>

							{/* Stat blocks */}
							<div className="mt-8 flex flex-wrap items-center gap-4">
								{stats.map((stat, i) => (
									<div key={stat} className="flex items-center gap-4">
										<span className="font-inter text-xs font-bold tracking-wide text-blue-500 uppercase">
											{stat}
										</span>
										{i < stats.length - 1 && (
											<div className="h-4 w-px bg-neutral-200" />
										)}
									</div>
								))}
							</div>
						</div>

						{/* Right: profile photo */}
						{profileImage && (
							<div className="img-zoom mt-8 w-full shrink-0 self-end md:max-w-sm lg:mt-0 lg:w-auto lg:max-w-none lg:self-start">
								<Image
									src={profileImage}
									alt={data.profileImage?.alt ?? 'Jenny Kim'}
									width={384}
									height={288}
									className="aspect-4/3 w-full object-cover"
									priority
								/>
							</div>
						)}
					</div>
				</div>
			</section>

			<div className="h-px w-full bg-blue-900 opacity-10" />

			{/* ── Section 2: Story ────────────────────────────────────────────── */}
			<section className="w-full bg-neutral-100">
				<div className="mx-auto max-w-content px-6 py-24 max-md:py-16 max-sm:py-12 md:px-8 lg:px-8">
					<div className="flex flex-col gap-16 lg:flex-row">
						<div className="shrink-0 lg:w-1/3">
							<h2 className="font-manrope text-[32px] leading-[1.5] font-bold tracking-tighter text-blue-900">
								{storyHeading}
							</h2>
						</div>
						<div className="flex flex-1 flex-col gap-6">
							{story.map((text, i) => (
								<p
									key={i}
									className="font-inter text-base leading-[1.7] text-blue-900"
								>
									{text}
								</p>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── Section 3: Skills ───────────────────────────────────────────── */}
			<section className="w-full bg-blue-900">
				<div className="mx-auto max-w-content px-6 py-24 max-md:py-16 max-sm:py-12 md:px-8 lg:px-8">
					<span className="mb-4 block font-inter text-xs font-bold tracking-wide text-lavender-50 uppercase">
						Stack
					</span>
					<h2 className="mb-12 font-manrope text-[32px] leading-[1.5] font-bold tracking-tighter text-white">
						{skillsHeading}
					</h2>
					<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
						{skills.map((cat) => (
							<div
								key={cat.name}
								className="border-l-2 border-neutral-200 pl-6"
							>
								<h3 className="tracking-snug mb-4 font-manrope text-[18px] leading-[1.2] font-bold text-neutral-50 uppercase">
									{cat.name}
								</h3>
								<div className="flex flex-wrap gap-2">
									{cat.tags.map((tag) => (
										<TechBadge key={tag} label={tag} />
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
