import { defineField, defineType } from 'sanity';

export const sideProjectType = defineType({
	name: 'sideProject',
	title: 'Side Project',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: { layout: 'tags' },
			validation: (rule) => rule.required().min(1).max(3)
		}),
		defineField({
			name: 'thumbnail',
			title: 'Thumbnail',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt Text',
					type: 'string'
				})
			]
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published Date',
			type: 'date',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'publishedAt',
			media: 'thumbnail'
		}
	}
});
