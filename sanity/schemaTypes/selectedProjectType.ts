import { defineField, defineType } from 'sanity';

export const selectedProjectType = defineType({
	name: 'selectedProject',
	title: 'Selected Project',
	type: 'document',
	fields: [
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
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: { layout: 'tags' },
			validation: (rule) => rule.required().min(1).max(4)
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
					type: 'string'
				})
			],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url'
		}),
		defineField({
			name: 'order',
			title: 'Order',
			type: 'number',
			description:
				'1 = large (8 cols), 2 = small right (4 cols), 3 = small left (5 cols), 4 = medium right (7 cols)',
			validation: (rule) => rule.required().min(1).max(4)
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published At',
			type: 'datetime'
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'image'
		}
	}
});
