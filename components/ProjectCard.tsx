import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

type ProjectCardProps = {
	_id: string;
	title: string;
	description: string;
	tags?: string[];
	coverImage?: SanityImageSource;
};

export function ProjectCard({ title, description, tags, coverImage }: ProjectCardProps) {
	return (
		<div className='project-card'>
			<div className='project-card-image aspect-[4/3]'>
				{coverImage ? (
					<Image
						src={urlFor(coverImage).width(800).height(600).url()}
						alt={title}
						width={800}
						height={600}
						className='w-full h-full object-cover'
					/>
				) : (
					<div className='w-full h-full bg-neutral-200' />
				)}
			</div>
			<div className='project-card-details'>
				<div className='project-card-meta'>
					<h3 className='font-manrope text-h3 text-blue-900 uppercase'>{title}</h3>
					<p className='text-body text-blue-800 mt-1'>{description}</p>
					{tags && tags.length > 0 && (
						<div className='project-card-badges'>
							{tags.map((tag) => (
								<span key={tag} className='tag'>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
				<ArrowUpRight size={24} className='text-blue-900 flex-shrink-0 mt-1' />
			</div>
		</div>
	);
}
