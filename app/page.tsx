import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { sanityFetch } from '@/sanity/lib/live';
import { HOME_HERO_QUERY, SELECTED_PROJECTS_QUERY, SIDE_PROJECTS_QUERY } from '@/sanity/queries';
import { ProjectCard, type SelectedProject } from '@/components/ProjectCard';
import { TechBadge } from '@/components/TechBadge';

type SideProject = {
	_id: string;
	name: string;
	description: string;
	tags: string[];
	thumbnail?: string;
	thumbnailAlt?: string;
	url: string;
};

const GRID_CONFIG: Record<number, string> = {
	1: 'lg:col-span-8 lg:row-start-1',
	2: 'lg:col-span-4 lg:row-start-1',
	3: 'lg:col-span-5 lg:row-start-2',
	4: 'lg:col-span-7 lg:row-start-2'
};

// ── Hero ───────────────────────────────────────────────────────────────────

async function HeroSection() {
	const { data } = await sanityFetch({ query: HOME_HERO_QUERY });

	const prefix =
		data?.hero?.headlinePrefix ??
		"Hi, I'm Jenny.\nI design and build interfaces that";
	const highlight =
		data?.hero?.headlineHighlight ?? 'make things easier to understand.';
	const subline =
		data?.hero?.subline ??
		'Building thoughtful, high-fidelity interfaces shaped by usability, structure, and collaboration.';

	const prefixLines = prefix.split('\n');

	return (
		<section className='w-full bg-neutral-50'>
			<div className='max-w-content mx-auto px-6 md:px-8 pt-20 max-md:pt-14 max-sm:pt-10'>
				<div className='max-w-[916px] relative'>
					<h1 className='relative font-manrope font-[800] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-2px] lg:tracking-[-3.6px] text-blue-900'>
						{prefixLines.map((line, i) => (
							<Fragment key={i}>
								{i > 0 && <br />}
								{line}
							</Fragment>
						))}{' '}
						<span className='[background:linear-gradient(transparent_0.2em,var(--color-lavender-50)_0.2em)] [box-decoration-break:clone]'>
							{highlight}
						</span>
					</h1>
				</div>

				<p className='mt-[30px] pb-20 max-md:pb-16 max-sm:pb-12 font-inter text-base leading-[1.6] text-blue-800 max-w-[768px]'>
					{subline}
				</p>
			</div>
		</section>
	);
}

// ── Selected Projects ──────────────────────────────────────────────────────

function SelectedProjectsSection({
	projects
}: {
	projects: SelectedProject[];
}) {
	return (
		<section className='w-full bg-neutral-100'>
			<div className='max-w-content mx-auto px-6 md:px-8 py-24 max-md:py-16 max-sm:py-12'>
				<div className='flex justify-between items-baseline mb-12'>
					<h2 className='font-manrope font-bold text-[32px] tracking-tighter text-blue-900'>
						Selected Projects
					</h2>
					<Link
						href='/#projects'
						className='hidden sm:block font-inter font-bold text-sm tracking-[-0.4px] text-blue-500 hover:underline transition-colors duration-200'
					>
						View all →
					</Link>
				</div>

				{/* Bento grid */}
				<div
					id='projects'
					className='grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-12 lg:gap-8'
				>
					{projects.map((project) => (
						<div key={project._id} className={GRID_CONFIG[project.order] ?? ''}>
							<ProjectCard project={project} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ── Other Things ───────────────────────────────────────────────────────────

function SideProjectRow({ project }: { project: SideProject }) {
	return (
		<li className='border-b border-[#e0e0e9] first:border-t first:border-[#e0e0e9]'>
			<a
				href={project.url}
				target='_blank'
				rel='noopener noreferrer'
				className='group flex items-center gap-8 py-7 max-md:gap-6 max-md:py-6 max-sm:gap-4 max-sm:py-5'
			>
				{/* Thumbnail */}
				<div className='shrink-0 w-40 h-[110px] md:w-40 lg:w-40 max-md:w-[120px] max-md:h-20 max-sm:w-[88px] max-sm:h-[60px] bg-neutral-200 overflow-hidden'>
					{project.thumbnail ? (
						<Image
							src={project.thumbnail}
							alt={project.thumbnailAlt || project.name}
							width={160}
							height={110}
							className='w-full h-full object-cover grayscale'
						/>
					) : null}
				</div>

				{/* Details */}
				<div className='flex flex-col gap-1.5 flex-1 min-w-0'>
					<p className='font-manrope font-bold text-[18px] uppercase tracking-[-0.5px] text-blue-900 group-hover:text-blue-500 transition-colors duration-200'>
						{project.name}
					</p>
					<p className='font-inter text-base text-blue-800 truncate'>
						{project.description}
					</p>
					<div className='flex flex-wrap gap-2'>
						{project.tags.map((tag) => (
							<TechBadge key={tag} label={tag} />
						))}
					</div>
				</div>

				{/* Arrow */}
				<div className='ml-auto shrink-0 pl-6 opacity-50 group-hover:opacity-100 transition-opacity duration-200'>
					<ArrowUpRightIcon size={14} className='text-blue-900' />
				</div>
			</a>
		</li>
	);
}

function OtherThingsSection({ projects }: { projects: SideProject[] }) {
	const githubUrl =
		process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/jennykim';

	return (
		<section className='w-full bg-neutral-50'>
			<div className='max-w-content mx-auto px-6 md:px-8 py-24 max-md:py-16 max-sm:py-12'>
				{/* Header */}
				<div className='flex flex-col gap-2 mb-12'>
					<span className='font-inter font-bold text-xs uppercase tracking-wide text-blue-500'>
						Otherwise
					</span>
					<h2 className='font-manrope font-bold text-[32px] tracking-tighter text-blue-900'>
						&amp; Other Things.
					</h2>
				</div>

				{/* List */}
				<ul role='list' className='list-none'>
					{projects.map((project) => (
						<SideProjectRow key={project._id} project={project} />
					))}
				</ul>

				{/* Footer link — desktop only */}
				<div className='mt-4 justify-end hidden lg:flex'>
					<a
						href={githubUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='font-inter font-bold text-xs uppercase tracking-wide text-blue-500 hover:underline transition-colors duration-200'
					>
						More on GitHub →
					</a>
				</div>
			</div>
		</section>
	);
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function Home() {
	const { data: selectedProjects } = await sanityFetch({
		query: SELECTED_PROJECTS_QUERY
	});
	const { data: sideProjects } = await sanityFetch({
		query: SIDE_PROJECTS_QUERY
	});

	return (
		<>
			<HeroSection />
			<SelectedProjectsSection
				projects={(selectedProjects as SelectedProject[]) ?? []}
			/>
			<div className='border-t border-[#e0e0e9]' />
			<OtherThingsSection projects={(sideProjects as SideProject[]) ?? []} />
		</>
	);
}
