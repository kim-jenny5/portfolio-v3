import { defineField, defineType } from 'sanity';

export const sideProject = defineType({
	name: 'sideProject',
	title: 'Side Project',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'string',
			validation: (rule) => rule.required(),
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
					type: 'string',
				}),
			],
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published Date',
			type: 'date',
			validation: (rule) => rule.required(),
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
					preview: {
						select: { title: 'label', subtitle: 'url' },
					},
				},
			],
		}),
	],
	preview: {
		select: {
			title: 'name',
			media: 'thumbnail',
		},
	},
});
