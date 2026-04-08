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
		params: { slug }
	});

	if (!project) notFound();

	return (
		<section className='w-full'>
			<div className='max-w-content mx-auto px-6 md:px-8 pt-20 pb-24'>
				{project.image && (
					<div className='img-zoom relative w-full aspect-[16/9] bg-neutral-200 mb-12'>
						<Image
							src={project.image}
							alt={project.imageAlt || project.title}
							fill
							className='object-cover'
							priority
						/>
					</div>
				)}

				<span className='font-inter font-bold text-xs uppercase tracking-wide text-blue-500 block mb-4'>
					Case Study
				</span>
				<h1 className='font-manrope font-[800] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-2px] lg:tracking-[-3.6px] text-blue-900 mb-4'>
					{project.title}
				</h1>
				<p className='font-inter text-base leading-[1.6] text-blue-800 max-w-[768px] mb-6'>
					{project.subtitle}
				</p>
				{project.tags && project.tags.length > 0 && (
					<div className='flex flex-wrap gap-2'>
						{project.tags.map((tag: string) => (
							<TechBadge key={tag} label={tag} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}
