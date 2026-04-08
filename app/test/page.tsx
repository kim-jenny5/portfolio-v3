export default function TestPage() {
	return (
		<main className="min-h-screen space-y-20 bg-background p-12 text-foreground">
			<h1 className="text-4xl font-bold">Design Token Test Page</h1>

			{/* ── COLOR SWATCHES ─────────────────────────────────────────────── */}
			<section className="space-y-6">
				<h2 className="border-b border-border pb-2 text-2xl font-bold">
					Colors
				</h2>

				<div>
					<p className="mb-3 text-sm font-bold tracking-widest text-muted-foreground uppercase">
						Brand Palette
					</p>
					<div className="flex flex-wrap gap-3">
						{[
							{ name: 'neutral-50', bg: 'bg-neutral-50' },
							{ name: 'neutral-100', bg: 'bg-neutral-100' },
							{ name: 'neutral-200', bg: 'bg-neutral-200' },
							{ name: 'blue-500', bg: 'bg-blue-500' },
							{ name: 'blue-700', bg: 'bg-blue-700' },
							{ name: 'blue-800', bg: 'bg-blue-800' },
							{ name: 'blue-900', bg: 'bg-blue-900' },
							{ name: 'lavender-50', bg: 'bg-lavender-50' },
						].map(({ name, bg }) => (
							<div key={name} className="flex flex-col items-center gap-1">
								<div
									className={`${bg} h-16 w-16 rounded-lg border border-border`}
								/>
								<span className="text-xs text-muted-foreground">{name}</span>
							</div>
						))}
					</div>
				</div>

				<div>
					<p className="mb-3 text-sm font-bold tracking-widest text-muted-foreground uppercase">
						Semantic / shadcn
					</p>
					<div className="flex flex-wrap gap-3">
						{[
							{ name: 'background', className: 'bg-background' },
							{ name: 'foreground', className: 'bg-foreground' },
							{ name: 'card', className: 'bg-card' },
							{ name: 'primary', className: 'bg-primary' },
							{ name: 'primary-fg', className: 'bg-primary-foreground' },
							{ name: 'secondary', className: 'bg-secondary' },
							{ name: 'muted', className: 'bg-muted' },
							{ name: 'muted-fg', className: 'bg-muted-foreground' },
							{ name: 'accent', className: 'bg-accent' },
							{ name: 'accent-fg', className: 'bg-accent-foreground' },
							{ name: 'border', className: 'bg-border' },
							{ name: 'destructive', className: 'bg-destructive' },
						].map(({ name, className }) => (
							<div key={name} className="flex flex-col items-center gap-1">
								<div
									className={`${className} h-16 w-16 rounded-lg border border-border`}
								/>
								<span className="text-xs text-muted-foreground">{name}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── TYPOGRAPHY ─────────────────────────────────────────────────── */}
			<section className="space-y-6">
				<h2 className="border-b border-border pb-2 text-2xl font-bold">
					Typography
				</h2>
				<div className="space-y-6">
					<div>
						<span className="mb-1 block text-xs tracking-widest text-muted-foreground uppercase">
							h1 — 3rem / 800 / -0.075em
						</span>
						<p
							style={{
								fontSize: 'var(--text-h1)',
								lineHeight: 'var(--text-h1--line-height)',
								letterSpacing: 'var(--text-h1--letter-spacing)',
								fontWeight: 'var(--text-h1--font-weight)',
							}}
						>
							Portfolio
						</p>
					</div>
					<div>
						<span className="mb-1 block text-xs tracking-widest text-muted-foreground uppercase">
							h2 — 2rem / 700 / -0.075em
						</span>
						<p
							style={{
								fontSize: 'var(--text-h2)',
								lineHeight: 'var(--text-h2--line-height)',
								letterSpacing: 'var(--text-h2--letter-spacing)',
								fontWeight: 'var(--text-h2--font-weight)',
							}}
						>
							Selected Projects
						</p>
					</div>
					<div>
						<span className="mb-1 block text-xs tracking-widest text-muted-foreground uppercase">
							h3 — 1.125rem / 700 / -0.028em
						</span>
						<p
							style={{
								fontSize: 'var(--text-h3)',
								lineHeight: 'var(--text-h3--line-height)',
								letterSpacing: 'var(--text-h3--letter-spacing)',
								fontWeight: 'var(--text-h3--font-weight)',
							}}
						>
							Project Title Goes Here
						</p>
					</div>
					<div>
						<span className="mb-1 block text-xs tracking-widest text-muted-foreground uppercase">
							body — 1rem / 400
						</span>
						<p
							style={{
								fontSize: 'var(--text-body)',
								lineHeight: 'var(--text-body--line-height)',
								fontWeight: 'var(--text-body--font-weight)',
							}}
						>
							This is body text. A short description of a project, kept under 80
							characters.
						</p>
					</div>
					<div>
						<span className="mb-1 block text-xs tracking-widest text-muted-foreground uppercase">
							logo — 1.5rem / 800 / -0.05em
						</span>
						<p
							style={{
								fontSize: 'var(--text-logo)',
								lineHeight: 'var(--text-logo--line-height)',
								letterSpacing: 'var(--text-logo--letter-spacing)',
								fontWeight: 'var(--text-logo--font-weight)',
							}}
						>
							YourName
						</p>
					</div>
					<div>
						<span className="mb-1 block text-xs tracking-widest text-muted-foreground uppercase">
							nav — 0.875rem / 700 / -0.029em
						</span>
						<p
							style={{
								fontSize: 'var(--text-nav)',
								lineHeight: 'var(--text-nav--line-height)',
								letterSpacing: 'var(--text-nav--letter-spacing)',
								fontWeight: 'var(--text-nav--font-weight)',
							}}
						>
							Work &nbsp;&nbsp; About &nbsp;&nbsp; Contact
						</p>
					</div>
					<div>
						<span className="mb-1 block text-xs tracking-widest text-muted-foreground uppercase">
							badge — 0.75rem / 700 / 0.083em
						</span>
						<p
							style={{
								fontSize: 'var(--text-badge)',
								lineHeight: 'var(--text-badge--line-height)',
								letterSpacing: 'var(--text-badge--letter-spacing)',
								fontWeight: 'var(--text-badge--font-weight)',
							}}
						>
							REACT &nbsp; FIGMA &nbsp; NEXT.JS
						</p>
					</div>
					<div>
						<span className="mb-1 block text-xs tracking-widest text-muted-foreground uppercase">
							contact — 0.75rem / 700 / 0.083em
						</span>
						<p
							style={{
								fontSize: 'var(--text-contact)',
								lineHeight: 'var(--text-contact--line-height)',
								letterSpacing: 'var(--text-contact--letter-spacing)',
								fontWeight: 'var(--text-contact--font-weight)',
							}}
						>
							HELLO@YOURSITE.COM
						</p>
					</div>
				</div>
			</section>

			{/* ── SPACING ────────────────────────────────────────────────────── */}
			<section className="space-y-6">
				<h2 className="border-b border-border pb-2 text-2xl font-bold">
					Spacing / Radius
				</h2>
				<div className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Border radius scale (base: 0.625rem)
					</p>
					<div className="flex flex-wrap items-end gap-4">
						{[
							{ label: 'sm', className: 'rounded-sm' },
							{ label: 'md', className: 'rounded-md' },
							{ label: 'lg', className: 'rounded-lg' },
							{ label: 'xl', className: 'rounded-xl' },
							{ label: '2xl', className: 'rounded-2xl' },
							{ label: '3xl', className: 'rounded-3xl' },
							{ label: '4xl', className: 'rounded-4xl' },
						].map(({ label, className }) => (
							<div key={label} className="flex flex-col items-center gap-1">
								<div className={`${className} h-12 w-12 bg-primary`} />
								<span className="text-xs text-muted-foreground">{label}</span>
							</div>
						))}
					</div>
				</div>

				<div>
					<p className="mb-4 text-sm text-muted-foreground">
						Tailwind spacing scale (your most-used increments)
					</p>
					<div className="flex flex-wrap items-end gap-2">
						{[1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24].map((step) => (
							<div key={step} className="flex flex-col items-center gap-1">
								<div
									className="w-3 bg-blue-500"
									style={{ height: `${step * 4}px` }}
								/>
								<span className="text-xs text-muted-foreground">{step}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── SHADCN COMPONENTS ──────────────────────────────────────────── */}
			<section className="space-y-6">
				<h2 className="border-b border-border pb-2 text-2xl font-bold">
					shadcn Components
				</h2>

				<div className="flex flex-wrap items-center gap-3">
					<button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
						Primary
					</button>
					<button className="rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground">
						Secondary
					</button>
					<button className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
						Accent
					</button>
					<button className="rounded-lg bg-destructive px-4 py-2 text-sm font-bold text-white">
						Destructive
					</button>
					<button className="rounded-lg border border-border px-4 py-2 text-sm font-bold text-foreground">
						Outline
					</button>
				</div>

				<div className="max-w-sm space-y-3 rounded-xl border border-border bg-card p-6 text-card-foreground">
					<p
						style={{
							fontSize: 'var(--text-h3)',
							fontWeight: 'var(--text-h3--font-weight)',
							letterSpacing: 'var(--text-h3--letter-spacing)',
						}}
					>
						Project Title
					</p>
					<p
						style={{
							fontSize: 'var(--text-body)',
							fontWeight: 'var(--text-body--font-weight)',
						}}
						className="text-muted-foreground"
					>
						A short project description kept under 80 characters.
					</p>
					<div className="flex flex-wrap gap-2 pt-1">
						{['React', 'Figma', 'Next.js'].map((tag) => (
							<span
								key={tag}
								className="rounded bg-accent px-2 py-0.5 text-accent-foreground"
								style={{
									fontSize: 'var(--text-badge)',
									letterSpacing: 'var(--text-badge--letter-spacing)',
									fontWeight: 'var(--text-badge--font-weight)',
								}}
							>
								{tag}
							</span>
						))}
					</div>
				</div>

				<div className="max-w-sm rounded-xl border border-border bg-muted p-4 text-muted-foreground">
					<p className="text-xs">
						Muted surface — used for subtle backgrounds, inputs, secondary
						areas.
					</p>
				</div>
			</section>
		</main>
	);
}
