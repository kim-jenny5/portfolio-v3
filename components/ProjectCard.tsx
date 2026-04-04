import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { TechBadge } from '@/components/TechBadge';

export type SelectedProject = {
	_id: string;
	title: string;
	slug: { current: string };
	subtitle: string;
	tags: string[];
	image: string;
	imageAlt?: string;
	url?: string;
	order: number;
};

const ASPECT_RATIO: Record<number, string> = {
	1: 'aspect-[16/9]',
	2: 'aspect-square',
	3: 'aspect-[4/3]',
	4: 'aspect-[16/9]'
};

type ProjectCardProps = {
	project: SelectedProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
	const href = project.url ?? `/work/${project.slug.current}`;
	const isExternal = !!project.url;
	const aspectClass = ASPECT_RATIO[project.order] ?? 'aspect-[4/3]';

	return (
		<Link
			href={href}
			{...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
			className='group flex flex-col gap-6 w-full'
		>
			{/* Image */}
			<div className={`relative w-full overflow-hidden bg-neutral-200 ${aspectClass}`}>
				{project.image ? (
					<>
						<Image
							src={project.image}
							alt={project.imageAlt || project.title}
							fill
							className='object-cover grayscale'
							sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw'
						/>
						{/* Hover overlay */}
						<div className='absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300' />
					</>
				) : (
					<div className='w-full h-full bg-neutral-200' />
				)}
			</div>

			{/* Details */}
			<div className='flex justify-between items-start'>
				<div className='flex flex-col gap-1'>
					<h3 className='font-manrope font-bold text-[18px] uppercase tracking-[-0.5px] text-blue-900 group-hover:text-blue-500 transition-colors duration-200'>
						{project.title}
					</h3>
					<p className='font-inter text-base text-blue-800'>{project.subtitle}</p>
					{project.tags && project.tags.length > 0 && (
						<div className='flex flex-wrap gap-2 pt-2'>
							{project.tags.map((tag) => (
								<TechBadge key={tag} label={tag} />
							))}
						</div>
					)}
				</div>
				<ArrowUpRight
					size={16}
					className='text-blue-900 flex-shrink-0 mt-1 opacity-50 group-hover:opacity-100 transition-opacity duration-200'
				/>
			</div>
		</Link>
	);
}
