import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/live';
import { ABOUT_PAGE_QUERY } from '@/sanity/queries';
import { TechBadge } from '@/components/TechBadge';

const FALLBACK_STATS = ['5+ years experience', 'NYC based', 'Open to work'];

const FALLBACK_STORY = [
	"I started my career at a small design agency in Brooklyn, where I quickly realized that the most impactful products come from blurring the line between design and engineering. I became the person who could translate a Figma comp into pixel-perfect, accessible code — and push back when the design didn't serve the user.",
	'From there I moved into product engineering at a Series B fintech startup, leading the frontend architecture for a real-time trading dashboard used by over 40,000 active users. I built their component library from scratch, established design tokens, and introduced a culture of visual regression testing.',
	"Most recently I've been consulting independently — helping early-stage teams ship their first production interfaces and scale-ups modernize legacy design systems. I care deeply about craft, clarity, and the small details that compound into trust.",
	"I studied Computer Science at NYU with a minor in Visual Arts. When I'm not coding, I'm usually sketching typefaces, running along the East River, or nerding out about information architecture.",
];

const FALLBACK_SKILLS = [
	{
		name: 'Frontend',
		tags: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'shadcn/ui'],
	},
	{
		name: 'Design',
		tags: ['Figma', 'Framer', 'Design Systems', 'Prototyping'],
	},
	{
		name: 'Tooling',
		tags: ['Node.js', 'Vercel', 'Git', 'Storybook', 'Vitest'],
	},
	{ name: 'Blockchain', tags: ['Solidity', 'Web3.js', 'Hardhat', 'IPFS'] },
];

export default async function AboutPage() {
	const profilePicUrl = process.env.PROFILE_PIC_URL ? '/api/profile-pic' : null;
	const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });

	const headline =
		data?.hero?.headline ??
		"I'm Jenny. Engineer by craft, designer by instinct.";
	const subline =
		data?.hero?.subline ??
		"I'm a product-focused frontend engineer based in NYC with 5+ years building performant, accessible interfaces at the intersection of design systems and complex data. I care about the craft of UI — the typography, the spacing, the micro-interactions — as much as the architecture underneath.";
	const stats: string[] = data?.hero?.stats ?? FALLBACK_STATS;
	const story: string[] = data?.story
		? data.story.split(/\n\n+/).filter(Boolean)
		: FALLBACK_STORY;
	const skills: { name: string; tags: string[] }[] =
		data?.skills ?? FALLBACK_SKILLS;

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
						{profilePicUrl && (
							<div className="img-zoom mt-8 w-full shrink-0 self-end md:max-w-sm lg:mt-0 lg:w-auto lg:max-w-none lg:self-start">
								<Image
									src={profilePicUrl}
									alt="Jenny Kim"
									width={276}
									height={345}
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
						<div className="shrink-0 lg:w-[38%]">
							<h2 className="font-manrope text-[32px] leading-[1.5] font-bold tracking-tighter text-blue-900">
								The story so far.
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
						Tools I reach for.
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
