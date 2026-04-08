import Image from 'next/image';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { WORK_PROJECT_QUERY } from '@/sanity/queries';
import { TechBadge } from '@/components/TechBadge';

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function WorkPage({ params }: Props) {
	const { slug } = await params;
	const { data: project } = await sanityFetch({
		query: WORK_PROJECT_QUERY,
		params: { slug },
	});

	if (!project) notFound();

	return (
		<section className="w-full">
			<div className="mx-auto max-w-content px-6 pt-20 pb-24 md:px-8">
				{project.image && (
					<div className="img-zoom relative mb-12 aspect-[16/9] w-full bg-neutral-200">
						<Image
							src={project.image}
							alt={project.imageAlt || project.title}
							fill
							className="object-cover"
							priority
						/>
					</div>
				)}

				<span className="mb-4 block font-inter text-xs font-bold tracking-wide text-blue-500 uppercase">
					Case Study
				</span>
				<h1 className="mb-4 font-manrope text-[32px] leading-[1.1] font-[800] tracking-[-2px] text-blue-900 md:text-[40px] lg:text-[48px] lg:tracking-[-3.6px]">
					{project.title}
				</h1>
				<p className="mb-6 max-w-[768px] font-inter text-base leading-[1.6] text-blue-800">
					{project.subtitle}
				</p>
				{project.tags && project.tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{project.tags.map((tag: string) => (
							<TechBadge key={tag} label={tag} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}
