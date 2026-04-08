export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className='border-t border-neutral-200 lg:ml-16'>
			<div className='max-w-content mx-auto px-6 md:px-8 py-6 flex justify-between items-center'>
				<span className='font-manrope font-bold text-xs lowercase tracking-[-0.023em] text-blue-900'>
					jennykim.
				</span>
				<span className='font-manrope font-bold text-xs uppercase tracking-[-0.023em] text-blue-900'>
					©{year}
				</span>
			</div>
		</footer>
	);
}
