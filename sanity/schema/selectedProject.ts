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
			options: { layout: 'tags' },
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
			name: 'status',
			title: 'Status',
			type: 'string',
			options: {
				list: ['shipped', 'unshipped', 'in-progress', 'speculative'],
				layout: 'radio',
			},
			group: 'detail',
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
					name: 'stack',
					title: 'Stack',
					description: 'Frameworks, libraries, languages — the actual tech',
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
		defineField({
			name: 'problem',
			title: 'The Problem',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'detail',
		}),
		defineField({
			name: 'constraints',
			title: 'Constraints',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'detail',
		}),
		defineField({
			name: 'approach',
			title: 'My Approach',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'detail',
		}),
		defineField({
			name: 'interactionAndUI',
			title: 'Interaction and UI Decisions',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'detail',
		}),
		defineField({
			name: 'implementation',
			title: 'Implementation Details',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'detail',
		}),
		defineField({
			name: 'outcome',
			title: 'Outcome / Impact',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'detail',
		}),
		defineField({
			name: 'reflection',
			title: "What I'd Improve Next",
			type: 'array',
			of: [{ type: 'block' }],
			group: 'detail',
		}),
		defineField({
			name: 'sections',
			title: 'Additional Sections',
			type: 'array',
			group: 'detail',
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
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'image',
		},
	},
});
