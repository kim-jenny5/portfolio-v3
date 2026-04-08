import Image from 'next/image';
import { TechBadge } from '@/components/TechBadge';

const stats = ['5+ years experience', 'NYC based', 'Open to work'];

const storyParagraphs = [
	"I started my career at a small design agency in Brooklyn, where I quickly realized that the most impactful products come from blurring the line between design and engineering. I became the person who could translate a Figma comp into pixel-perfect, accessible code — and push back when the design didn't serve the user.",
	'From there I moved into product engineering at a Series B fintech startup, leading the frontend architecture for a real-time trading dashboard used by over 40,000 active users. I built their component library from scratch, established design tokens, and introduced a culture of visual regression testing.',
	"Most recently I've been consulting independently — helping early-stage teams ship their first production interfaces and scale-ups modernize legacy design systems. I care deeply about craft, clarity, and the small details that compound into trust.",
	"I studied Computer Science at NYU with a minor in Visual Arts. When I'm not coding, I'm usually sketching typefaces, running along the East River, or nerding out about information architecture."
];

const skillCategories = [
	{
		name: 'Frontend',
		tags: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'shadcn/ui']
	},
	{
		name: 'Design',
		tags: ['Figma', 'Framer', 'Design Systems', 'Prototyping']
	},
	{
		name: 'Tooling',
		tags: ['Node.js', 'Vercel', 'Git', 'Storybook', 'Vitest']
	},
	{
		name: 'Blockchain',
		tags: ['Solidity', 'Web3.js', 'Hardhat', 'IPFS']
	}
];

const values = [
	{
		num: '01',
		title: 'Collaboration First',
		body: 'Great products are built with teams, not for them. I believe in shared ownership, open critique, and designing in the open so that every stakeholder feels heard.'
	},
	{
		num: '02',
		title: 'Ship & Iterate',
		body: 'Perfectionism is the enemy of progress. I prefer fast feedback loops, incremental releases, and learning from real users over polishing in isolation.'
	},
	{
		num: '03',
		title: 'Craft at Scale',
		body: "Attention to detail doesn't have to slow you down. With the right systems — tokens, components, automation — you can maintain quality at any velocity."
	}
];

export default function AboutPage() {
	const profilePicUrl = process.env.PROFILE_PIC_URL ? '/api/profile-pic' : null;

	return (
		<>
			{/* ── Section 1: Intro ────────────────────────────────────────────── */}
			<section className='w-full bg-neutral-50'>
				<div className='max-w-content mx-auto px-6 md:px-8 lg:px-8 pt-20 pb-12 max-md:pb-16 max-sm:pb-12'>
					<span className='font-inter font-bold text-xs uppercase tracking-wide text-blue-500 block mb-6'>
						About
					</span>

					<div className='flex flex-col lg:flex-row lg:items-start lg:gap-16'>
						{/* Left: text */}
						<div className='flex-1'>
							<div className='relative'>
								{/* Decorative rect — desktop only */}
								<span
									aria-hidden='true'
									className='hidden lg:block absolute top-[4px] left-[280px] w-[200px] h-[56px] bg-lavender-50 opacity-40 -z-10'
								/>
								<h1 className='relative font-manrope font-[800] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-2px] lg:tracking-[-3.6px] text-blue-900'>
									I&apos;m Jenny. Engineer by craft, designer by instinct.
								</h1>
							</div>

							<p className='mt-8 font-inter text-base leading-[1.6] text-blue-800 max-w-[768px]'>
								I&apos;m a product-focused frontend engineer based in NYC with
								5+ years building performant, accessible interfaces at the
								intersection of design systems and complex data. I care about
								the craft of UI — the typography, the spacing, the
								micro-interactions — as much as the architecture underneath.
							</p>

							{/* Stat blocks */}
							<div className='flex items-center gap-4 mt-8 flex-wrap'>
								{stats.map((stat, i) => (
									<div key={stat} className='flex items-center gap-4'>
										<span className='font-inter font-bold text-xs uppercase tracking-wide text-blue-500'>
											{stat}
										</span>
										{i < stats.length - 1 && (
											<div className='w-px h-4 bg-neutral-200' />
										)}
									</div>
								))}
							</div>
						</div>

						{/* Right: profile photo */}
						{profilePicUrl && (
							// <div className='shrink-0 mt-8 lg:mt-0 w-full max-w-[276px] md:max-w-sm lg:max-w-none lg:w-auto'>
							<div className='shrink-0 mt-8 lg:mt-0 w-full md:max-w-sm lg:max-w-none lg:w-auto self-end lg:self-start'>
								<Image
									src={profilePicUrl}
									alt='Jenny Kim'
									width={276}
									height={345}
									className='object-cover w-full aspect-4/3 rounded-xs'
									priority
								/>
							</div>
						)}
					</div>
				</div>
			</section>

			<div className='h-px bg-blue-900 opacity-10 w-full' />

			{/* ── Section 2: Story ────────────────────────────────────────────── */}
			<section className='w-full bg-neutral-100'>
				<div className='max-w-content mx-auto px-6 md:px-8 lg:px-8 py-24 max-md:py-16 max-sm:py-12'>
					<div className='flex flex-col lg:flex-row gap-16'>
						<div className='lg:w-[38%] shrink-0'>
							<h2 className='font-manrope font-bold text-[32px] leading-[1.5] tracking-tighter text-blue-900'>
								The story so far.
							</h2>
						</div>
						<div className='flex-1 flex flex-col gap-6'>
							{storyParagraphs.map((text, i) => (
								<p
									key={i}
									className='font-inter text-base leading-[1.7] text-blue-900'
								>
									{text}
								</p>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── Section 3: Skills ───────────────────────────────────────────── */}
			<section className='w-full bg-white'>
				<div className='max-w-content mx-auto px-6 md:px-8 lg:px-8 py-24 max-md:py-16 max-sm:py-12'>
					<span className='font-inter font-bold text-xs uppercase tracking-wide text-blue-500 block mb-4'>
						Stack
					</span>
					<h2 className='font-manrope font-bold text-[32px] leading-[1.5] tracking-tighter text-blue-900 mb-12'>
						Tools I reach for.
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
						{skillCategories.map((cat) => (
							<div
								key={cat.name}
								className='border-l-2 border-neutral-200 pl-6'
							>
								<h3 className='font-manrope font-bold text-[18px] leading-[1.2] uppercase tracking-snug text-blue-900 mb-4'>
									{cat.name}
								</h3>
								<div className='flex flex-wrap gap-2'>
									{cat.tags.map((tag) => (
										<TechBadge key={tag} label={tag} />
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Section 4: Values ───────────────────────────────────────────── */}
			<section className='w-full bg-blue-900'>
				<div className='max-w-content mx-auto px-6 md:px-8 lg:px-8 py-24 max-md:py-16 max-sm:py-12'>
					<div className='flex flex-col lg:flex-row gap-16'>
						<div className='lg:w-[38%] shrink-0'>
							<span className='font-inter font-bold text-xs uppercase tracking-wide text-lavender-50 block mb-4'>
								Values
							</span>
							<h2 className='font-manrope font-bold text-[32px] leading-[1.5] tracking-tighter text-white'>
								How I work.
							</h2>
						</div>
						<div className='flex-1 flex flex-col gap-12'>
							{values.map((v) => (
								<div key={v.num} className='border-l-2 border-white/20 pl-6'>
									<span className='font-manrope font-bold text-[32px] text-lavender-50'>
										{v.num}
									</span>
									<h3 className='font-manrope font-bold text-[18px] leading-[1.2] uppercase tracking-snug text-white mt-2'>
										{v.title}
									</h3>
									<p className='font-inter text-base leading-[1.6] text-neutral-200 mt-2'>
										{v.body}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
