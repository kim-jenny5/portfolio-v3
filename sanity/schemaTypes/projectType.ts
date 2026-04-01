import { defineField, defineType } from 'sanity';

export const projectType = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	fields: [
		// ── Homepage card ──────────────────────────────────────────────────────
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title' },
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Short Description',
			type: 'string',
			validation: (rule) => rule.required().max(160)
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: { layout: 'tags' }
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover Image',
			type: 'image',
			options: { hotspot: true }
		}),

		// ── Project hero ───────────────────────────────────────────────────────
		defineField({
			name: 'projectNumber',
			title: 'Project Number',
			type: 'string'
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string'
		}),
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'text',
			rows: 3
		}),
		// ── Overview bar ───────────────────────────────────────────────────────
		defineField({
			name: 'overview',
			title: 'Overview',
			type: 'object',
			fields: [
				defineField({
					name: 'timeline',
					title: 'Timeline',
					type: 'string'
				}),
				defineField({
					name: 'tools',
					title: 'Tools',
					type: 'array',
					of: [{ type: 'string' }],
					options: { layout: 'tags' }
				}),
				defineField({
					name: 'deliverables',
					title: 'Deliverables',
					type: 'array',
					of: [{ type: 'string' }],
					options: { layout: 'tags' }
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
								defineField({ name: 'url', title: 'URL', type: 'url' })
							],
							preview: { select: { title: 'label', subtitle: 'url' } }
						}
					]
				})
			]
		}),

		// ── Case study body ────────────────────────────────────────────────────
		defineField({
			name: 'sections',
			title: 'Case Study Sections',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'section',
					title: 'Section',
					fields: [
						defineField({
							name: 'title',
							title: 'Section Title',
							type: 'string',
							validation: (rule) => rule.required()
						}),
						defineField({
							name: 'body',
							title: 'Body',
							type: 'array',
							of: [{ type: 'block' }]
						})
					],
					preview: { select: { title: 'title' } }
				}
			]
		})
	],

	preview: {
		select: { title: 'title', subtitle: 'projectNumber', media: 'coverImage' },
		prepare({ title, subtitle, media }) {
			return { title, subtitle: subtitle ? `#${subtitle}` : undefined, media };
		}
	}
});
