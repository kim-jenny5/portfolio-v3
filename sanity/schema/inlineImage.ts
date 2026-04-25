import { defineField, defineType } from 'sanity';

export const inlineImage = defineType({
	name: 'inlineImage',
	title: 'Image',
	type: 'object',
	fields: [
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
			],
			validation: (r) => r.required(),
		}),
		defineField({
			name: 'caption',
			title: 'Caption',
			type: 'string',
		}),
	],
	preview: {
		select: { media: 'image', caption: 'caption' },
		prepare: ({ media, caption }) => ({ title: caption ?? 'Image', media }),
	},
});
