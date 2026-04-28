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
			name: 'size',
			title: 'Layout',
			type: 'string',
			options: {
				list: [
					{ title: 'Full', value: 'imageFull' },
					{ title: 'Image Left', value: 'imageLeft' },
					{ title: 'Image Right', value: 'imageRight' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			initialValue: 'imageFull',
		}),
		defineField({
			name: 'displaySize',
			title: 'Size',
			type: 'string',
			options: {
				list: [
					{ title: 'Small', value: 'sm' },
					{ title: 'Medium', value: 'md' },
					{ title: 'Large', value: 'lg' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			initialValue: 'lg',
			hidden: ({ parent }) => parent?.size !== 'imageFull',
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
