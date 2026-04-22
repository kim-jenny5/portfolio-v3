import { defineField, defineType } from 'sanity';

export const projectType = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	fields: [
		// ── Identity ────────────────────────────────────────────────────────────
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (r) => r.required(),
		}),

		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title' },
			validation: (r) => r.required(),
		}),

		defineField({
			name: 'projectNumber',
			title: 'Project Number',
			type: 'string',
		}),

		defineField({
			name: 'status',
			title: 'Status',
			type: 'string',
			options: {
				list: ['shipped', 'unshipped', 'in-progress', 'speculative'],
				layout: 'radio',
			},
		}),

		defineField({
			name: 'projectType',
			title: 'Project Type',
			type: 'string',
			options: {
				list: [
					'professional',
					'freelance',
					'personal',
					'open-source',
					'speculative',
				],
				layout: 'radio',
			},
		}),

		// ── Card / listing ──────────────────────────────────────────────────────
		defineField({
			name: 'description',
			title: 'Short Description',
			type: 'string',
			validation: (r) => r.required().max(160),
		}),

		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: { layout: 'tags' },
		}),

		defineField({
			name: 'coverImage',
			title: 'Cover Image',
			type: 'image',
			options: { hotspot: true },
		}),

		// ── Hero ────────────────────────────────────────────────────────────────
		defineField({ name: 'category', title: 'Category', type: 'string' }),

		defineField({
			name: 'subtitle',
			title: 'Subtitle / Lede',
			type: 'text',
			rows: 3,
		}),

		defineField({
			name: 'demonstrates',
			title: 'What This Project Demonstrates',
			description:
				'1–3 short phrases — e.g. "Component architecture", "Interaction design under constraints"',
			type: 'array',
			of: [{ type: 'string' }],
			options: { layout: 'tags' },
		}),

		// ── Snapshot metadata ───────────────────────────────────────────────────
		defineField({
			name: 'snapshot',
			title: 'Project Snapshot',
			type: 'object',
			fields: [
				defineField({ name: 'role', title: 'My Role', type: 'string' }),
				defineField({ name: 'timeline', title: 'Timeline', type: 'string' }),
				defineField({
					name: 'stack',
					title: 'Stack / Technologies',
					description: 'Frameworks, libraries, languages — the actual tech',
					type: 'array',
					of: [{ type: 'string' }],
					options: { layout: 'tags' },
				}),
				defineField({
					name: 'tools',
					title: 'Tools',
					description: 'Design, dev, CMS, and workflow tools',
					type: 'array',
					of: [{ type: 'string' }],
					options: { layout: 'tags' },
				}),
				defineField({
					name: 'deliverables',
					title: 'Deliverables',
					type: 'array',
					of: [{ type: 'string' }],
					options: { layout: 'tags' },
				}),
				defineField({
					name: 'links',
					title: 'Links',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({ name: 'label', title: 'Label', type: 'string' }),
								defineField({ name: 'url', title: 'URL', type: 'url' }),
							],
							preview: { select: { title: 'label', subtitle: 'url' } },
						},
					],
				}),
			],
		}),

		// ── Structured case study sections ──────────────────────────────────────
		// These are the opinionated sections for engineering case studies.
		// Keeping them as typed top-level fields (not just freeform sections)
		// means the content stays consistent across projects.

		defineField({
			name: 'problem',
			title: 'The Problem',
			type: 'array',
			of: [{ type: 'block' }],
		}),

		defineField({
			name: 'constraints',
			title: 'Constraints',
			type: 'array',
			of: [{ type: 'block' }],
		}),

		defineField({
			name: 'approach',
			title: 'My Approach',
			type: 'array',
			of: [{ type: 'block' }],
		}),

		defineField({
			name: 'interactionAndUI',
			title: 'Interaction and UI Decisions',
			type: 'array',
			of: [{ type: 'block' }],
		}),

		defineField({
			name: 'implementation',
			title: 'Implementation Details',
			type: 'array',
			of: [{ type: 'block' }],
		}),

		defineField({
			name: 'outcome',
			title: 'Outcome / Impact',
			type: 'array',
			of: [{ type: 'block' }],
		}),

		defineField({
			name: 'reflection',
			title: "What I'd Improve Next",
			type: 'array',
			of: [{ type: 'block' }],
		}),

		// ── Optional overflow ────────────────────────────────────────────────────
		// For supplemental content, media callouts, code snippets, etc.
		// that don't fit neatly into the structured sections above.
		defineField({
			name: 'sections',
			title: 'Additional Sections',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'section',
					fields: [
						defineField({
							name: 'title',
							title: 'Section Title',
							type: 'string',
							validation: (r) => r.required(),
						}),
						defineField({
							name: 'body',
							title: 'Body',
							type: 'array',
							of: [{ type: 'block' }],
						}),
					],
					preview: { select: { title: 'title' } },
				},
			],
		}),
	],

	preview: {
		select: { title: 'title', subtitle: 'projectNumber', media: 'coverImage' },
		prepare({ title, subtitle, media }) {
			return { title, subtitle: subtitle ? `#${subtitle}` : undefined, media };
		},
	},
});
