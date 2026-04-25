import Link from 'next/link';

type NavProject = { slug: string; title: string };

function ArrowIcon({ className }: { className?: string }) {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden="true"
		>
			<path
				d="M1.75 7H12.25M8.75 3.5L12.25 7L8.75 10.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function PrevPanel({ project }: { project: NavProject | null }) {
	const inner = (
		<>
			<ArrowIcon className="shrink-0 rotate-180 text-blue-900" />
			<div className="flex flex-col gap-1">
				<span className="font-inter text-[10px] font-bold tracking-[1.35px] text-blue-500 uppercase">
					Previous Project
				</span>
				{project && (
					<span className="font-manrope text-sm font-bold tracking-[-0.45px] text-blue-900 uppercase">
						{project.title}
					</span>
				)}
			</div>
		</>
	);

	if (!project)
		return (
			<div className="flex h-[120px] flex-1 items-center gap-3 bg-white pl-6 opacity-[0.33]">
				{inner}
			</div>
		);

	return (
		<Link
			href={`/work/${project.slug}`}
			className="flex h-[120px] flex-1 items-center gap-3 bg-white pl-6 transition-opacity hover:opacity-70"
		>
			{inner}
		</Link>
	);
}

function NextPanel({ project }: { project: NavProject | null }) {
	const inner = (
		<>
			<div className="flex flex-col items-end gap-1">
				<span className="font-inter text-[10px] font-bold tracking-[1.35px] text-blue-500 uppercase">
					Next Project
				</span>
				{project && (
					<span className="font-manrope text-sm font-bold tracking-[-0.45px] text-blue-900 uppercase">
						{project.title}
					</span>
				)}
			</div>
			<ArrowIcon className="shrink-0 text-blue-900" />
		</>
	);

	if (!project)
		return (
			<div className="flex h-[120px] flex-1 items-center justify-end gap-3 bg-neutral-100 px-6 opacity-[0.33]">
				{inner}
			</div>
		);

	return (
		<Link
			href={`/work/${project.slug}`}
			className="flex h-[120px] flex-1 items-center justify-end gap-3 bg-neutral-100 px-6 transition-opacity hover:opacity-70"
		>
			{inner}
		</Link>
	);
}

export function ProjectNav({
	prev,
	next,
}: {
	prev: NavProject | null;
	next: NavProject | null;
}) {
	return (
		<div className="flex gap-px border-t border-neutral-200 bg-neutral-200">
			<PrevPanel project={prev} />
			<NextPanel project={next} />
		</div>
	);
}
