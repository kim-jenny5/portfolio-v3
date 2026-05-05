export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-neutral-200 lg:ml-16">
			<div className="mx-auto flex max-w-content items-center justify-between px-6 py-6 md:px-8">
				<span className="font-manrope text-xs font-bold tracking-[-0.023em] text-blue-900 lowercase">
					jennykim.
				</span>
				<div className="flex items-center gap-6">
					<span className="hidden font-inter text-xs font-bold text-blue-900/60 md:block">
						Custom built with Next.js + Sanity.
					</span>
					<span className="font-manrope text-xs font-bold tracking-[-0.023em] text-blue-900 uppercase">
						©{year}
					</span>
				</div>
			</div>
		</footer>
	);
}
