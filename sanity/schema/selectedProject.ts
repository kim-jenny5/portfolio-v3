import { defineField, defineType } from 'sanity';

export const selectedProject = defineType({
	name: 'selectedProject',
	title: 'Selected Project',
	type: 'document',
	groups: [
		{ name: 'overview', title: 'Home Page Overview', default: true },
		{ name: 'detail', title: 'Project Page' },
	],
	fields: [
		defineField({
			name: 'heroImage',
			title: 'Hero Image',
			type: 'image',
			description:
				'Optional. Displayed to the right of the project title in the hero.',
			options: { hotspot: true },
			fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
			group: 'detail',
		}),
		// ── Shared ──────────────────────────────────────────────────────────────
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			group: ['overview', 'detail'],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description:
				'The URL path for this project on the portfolio (e.g. /work/my-project)',
			options: { source: 'title' },
			group: 'overview',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: { sortable: true },
			group: ['overview', 'detail'],
			validation: (rule) => rule.required().min(1),
		}),

		// ── Home Page Overview ───────────────────────────────────────────────────
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			group: 'overview',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt Text',
					type: 'string',
				}),
			],
			group: 'overview',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'order',
			title: 'Order',
			type: 'number',
			description:
				'1 = large (8 cols), 2 = small right (4 cols), 3 = small left (5 cols), 4 = medium right (7 cols)',
			group: 'overview',
			validation: (rule) => rule.required().min(1).max(4),
		}),

		// ── Project Page ─────────────────────────────────────────────────────────
		defineField({
			name: 'projectNumber',
			title: 'Project Number',
			type: 'string',
			group: 'detail',
		}),
		defineField({
			name: 'company',
			title: 'Company',
			type: 'string',
			description: 'The company this project was done for, if applicable.',
			group: 'detail',
		}),
		defineField({
			name: 'description',
			title: 'Short Description',
			type: 'string',
			group: 'detail',
			validation: (r) => r.max(180),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			group: 'detail',
		}),
		defineField({
			name: 'snapshot',
			title: 'Project Snapshot',
			type: 'object',
			group: 'detail',
			fields: [
				defineField({ name: 'role', title: 'My Role', type: 'string' }),
				defineField({ name: 'timeline', title: 'Timeline', type: 'string' }),
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

		// ── Unified content array ─────────────────────────────────────────────────
		// Items are either a contentSection (numbered, titled section) or a top-level imageBlock
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			group: 'detail',
			of: [
				{
					type: 'object',
					name: 'contentSection',
					title: 'Content Section',
					fields: [
						defineField({
							name: 'title',
							title: 'Section Title',
							type: 'string',
							validation: (r) => r.required(),
						}),
						defineField({
							name: 'content',
							title: 'Content',
							type: 'array',
							of: [
								{ type: 'block' },
								{ type: 'accentCardGroup' },
								{ type: 'titleCardGroup' },
								{ type: 'statCardGroup' },
								{ type: 'inlineImage' },
								{ type: 'newsletterPreview' },
							],
						}),
					],
					preview: { select: { title: 'title' } },
				},
				{ type: 'paragraphBlock' },
				{ type: 'imageBlock' },
				{ type: 'videoBlock' },
				{ type: 'marquee' },
				{ type: 'newsletterPreview' },
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'image',
		},
	},
});
