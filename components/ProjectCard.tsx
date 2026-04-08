import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { TechBadge } from '@/components/TechBadge';

export type SelectedProject = {
	_id: string;
	title: string;
	slug: string;
	subtitle: string;
	tags: string[];
	image: string;
	imageAlt?: string;
	order: number;
};

const ASPECT_RATIO: Record<number, string> = {
	1: 'aspect-[16/9]',
	2: 'aspect-square',
	3: 'aspect-[4/3]',
	4: 'aspect-[16/9]',
};

type ProjectCardProps = {
	project: SelectedProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
	const href = `/work/${project.slug}`;
	const aspectClass = ASPECT_RATIO[project.order] ?? 'aspect-[4/3]';

	return (
		<Link href={href} className="group flex w-full flex-col gap-6">
			{/* Image */}
			<div className={`img-zoom relative w-full bg-neutral-200 ${aspectClass}`}>
				{project.image ? (
					<>
						<Image
							src={project.image}
							alt={project.imageAlt || project.title}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
						/>
						{/* Hover overlay */}
						<div className="absolute inset-0 bg-blue-900 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
					</>
				) : (
					<div className="h-full w-full bg-neutral-200" />
				)}
			</div>

			{/* Details */}
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-1">
					<h3 className="font-manrope text-[18px] font-bold tracking-[-0.5px] text-blue-900 uppercase transition-colors duration-200 group-hover:text-blue-500">
						{project.title}
					</h3>
					<p className="font-inter text-base text-blue-800">
						{project.subtitle}
					</p>
					{project.tags && project.tags.length > 0 && (
						<div className="flex flex-wrap gap-2 pt-2">
							{project.tags.map((tag) => (
								<TechBadge key={tag} label={tag} />
							))}
						</div>
					)}
				</div>
				<ArrowUpRightIcon
					size={16}
					className="mt-1 flex-shrink-0 text-blue-900 opacity-50 transition-opacity duration-200 group-hover:opacity-100"
				/>
			</div>
		</Link>
	);
}
