import { sanityFetch } from '@/sanity/lib/live';
import { homePageQuery } from '@/sanity/queries';
import { ProjectCard } from '@/components/ProjectCard';

export default async function Home() {
	const { data } = await sanityFetch({ query: homePageQuery });

	return (
		<>
			<section className='px-8 pt-[111px] pb-16 flex flex-col gap-[1.875rem]'>
				<h1 className='font-manrope text-h1 text-blue-900'>
					{data?.hero?.headline ?? "Hi, I'm Jenny. I design and build interfaces that make things easier to understand."}
				</h1>
				<p className='text-body text-blue-700'>
					{data?.hero?.subline ?? 'Building thoughtful, high-fidelity interfaces shaped by usability, structure, and collaboration.'}
				</p>
			</section>
			<div className='divider' />
			<section className='py-24 px-8 bg-neutral-100'>
				<h2 className='font-manrope text-h2 text-blue-900 uppercase'>
					{data?.selectedProjects?.sectionTitle ?? 'Selected Projects'}
				</h2>
				<div className='grid grid-cols-2 gap-8 mt-8'>
					{data?.selectedProjects?.projects?.map((project: any) => (
						<ProjectCard key={project._id} {...project} />
					))}
				</div>
			</section>
		</>
	);
}
