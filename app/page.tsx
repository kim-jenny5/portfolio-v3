import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { sanityFetch } from '@/sanity/lib/live';
import {
	HOME_HERO_QUERY,
	SELECTED_PROJECTS_QUERY,
	SIDE_PROJECTS_QUERY,
} from '@/sanity/queries';
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
	4: 'lg:col-span-7 lg:row-start-2',
};

// ── Portable Text headline renderer ────────────────────────────────────────

type PTSpan = { _key: string; _type: 'span'; text: string; marks: string[] };
type PTBlock = { _key: string; _type: 'block'; children: PTSpan[] };

const HIGHLIGHT_CLASS =
	'[background:linear-gradient(transparent_0.2em,var(--color-lavender-50)_0.2em)] [box-decoration-break:clone]';

function renderHeadlineBlocks(blocks: PTBlock[]) {
	return blocks.map((block, bi) => (
		<Fragment key={block._key ?? bi}>
			{bi > 0 && <br />}
			{block.children.map((span, si) => {
				const parts = span.text.split('\n');
				const content = parts.map((part, pi) => (
					<Fragment key={pi}>
						{pi > 0 && <br />}
						{part}
					</Fragment>
				));
				return span.marks.includes('highlight') ? (
					<span key={span._key ?? si} className={HIGHLIGHT_CLASS}>
						{content}
					</span>
				) : (
					<Fragment key={span._key ?? si}>{content}</Fragment>
				);
			})}
		</Fragment>
	));
}

// ── Hero ───────────────────────────────────────────────────────────────────

async function HeroSection() {
	const { data } = await sanityFetch({ query: HOME_HERO_QUERY });

	const headline: PTBlock[] = data?.hero?.headline;
	const subline = data?.hero?.subline;

	return (
		<section className="w-full bg-neutral-50">
			<div className="mx-auto max-w-content px-6 pt-20 max-md:pt-14 max-sm:pt-10 md:px-8">
				<div className="relative max-w-[916px]">
					<h1 className="relative font-manrope text-[32px] leading-[1.1] font-[800] tracking-[-2px] text-blue-900 md:text-[40px] lg:text-[48px] lg:tracking-[-3.6px]">
						{renderHeadlineBlocks(headline)}
					</h1>
				</div>

				<p className="mt-[30px] max-w-[768px] pb-20 font-inter text-base leading-[1.6] text-blue-800 max-md:pb-16 max-sm:pb-12">
					{subline}
				</p>
			</div>
		</section>
	);
}

// ── Selected Projects ──────────────────────────────────────────────────────

function SelectedProjectsSection({
	projects,
}: {
	projects: SelectedProject[];
}) {
	return (
		<section className="w-full bg-neutral-100">
			<div className="mx-auto max-w-content px-6 py-24 max-md:py-16 max-sm:py-12 md:px-8">
				<div className="mb-12 flex items-baseline justify-between">
					<h2 className="font-manrope text-[32px] font-bold tracking-tighter text-blue-900">
						Selected Projects
					</h2>
					<Link
						href="/#projects"
						className="hidden font-inter text-sm font-bold tracking-[-0.4px] text-blue-500 transition-colors duration-200 hover:underline sm:block"
					>
						View all →
					</Link>
				</div>

				{/* Bento grid */}
				<div
					id="projects"
					className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-12 lg:gap-8"
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
		<li className="border-b border-[#e0e0e9] first:border-t first:border-[#e0e0e9]">
			<a
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
				className="group flex items-center gap-8 py-7 max-md:gap-6 max-md:py-6 max-sm:gap-4 max-sm:py-5"
			>
				{/* Thumbnail */}
				<div className="img-zoom h-[110px] w-40 shrink-0 bg-neutral-200 max-md:h-20 max-md:w-[120px] max-sm:h-[60px] max-sm:w-[88px] md:w-40 lg:w-40">
					{project.thumbnail ? (
						<Image
							src={project.thumbnail}
							alt={project.thumbnailAlt || project.name}
							width={160}
							height={110}
							className="h-full w-full object-cover grayscale"
						/>
					) : null}
				</div>

				{/* Details */}
				<div className="flex min-w-0 flex-1 flex-col gap-1.5">
					<p className="font-manrope text-[18px] font-bold tracking-[-0.5px] text-blue-900 uppercase transition-colors duration-200 group-hover:text-blue-500">
						{project.name}
					</p>
					<p className="truncate font-inter text-base text-blue-800">
						{project.description}
					</p>
					<div className="flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<TechBadge key={tag} label={tag} />
						))}
					</div>
				</div>

				{/* Arrow */}
				<div className="ml-auto shrink-0 pl-6 opacity-50 transition-opacity duration-200 group-hover:opacity-100">
					<ArrowUpRightIcon size={14} className="text-blue-900" />
				</div>
			</a>
		</li>
	);
}

function OtherThingsSection({ projects }: { projects: SideProject[] }) {
	const githubUrl =
		process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/jennykim';

	return (
		<section className="w-full bg-neutral-50">
			<div className="mx-auto max-w-content px-6 py-24 max-md:py-16 max-sm:py-12 md:px-8">
				{/* Header */}
				<div className="mb-12 flex flex-col gap-2">
					<span className="font-inter text-xs font-bold tracking-wide text-blue-500 uppercase">
						Otherwise
					</span>
					<h2 className="font-manrope text-[32px] font-bold tracking-tighter text-blue-900">
						&amp; Other Things.
					</h2>
				</div>

				{/* List */}
				<ul role="list" className="list-none">
					{projects.map((project) => (
						<SideProjectRow key={project._id} project={project} />
					))}
				</ul>

				{/* Footer link — desktop only */}
				<div className="mt-4 hidden justify-end lg:flex">
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="font-inter text-xs font-bold tracking-wide text-blue-500 uppercase transition-colors duration-200 hover:underline"
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
		query: SELECTED_PROJECTS_QUERY,
	});
	const { data: sideProjects } = await sanityFetch({
		query: SIDE_PROJECTS_QUERY,
	});

	return (
		<>
			<HeroSection />
			<SelectedProjectsSection
				projects={(selectedProjects as SelectedProject[]) ?? []}
			/>
			<div className="border-t border-[#e0e0e9]" />
			<OtherThingsSection projects={(sideProjects as SideProject[]) ?? []} />
		</>
	);
}
