import { defineField, defineType } from 'sanity';

export const imageBlock = defineType({
	name: 'imageBlock',
	title: 'Image Block',
	type: 'object',
	fields: [
		defineField({
			name: 'layout',
			title: 'Layout',
			type: 'string',
			options: {
				list: [
					{ title: 'Image - Left', value: 'imageLeft' },
					{ title: 'Image - Right', value: 'imageRight' },
					{ title: 'Image - Full', value: 'imageFull' },
				],
				layout: 'radio',
			},
			initialValue: 'imageFull',
			validation: (r) => r.required(),
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
			validation: (r) => r.required(),
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
		}),
		defineField({
			name: 'headingBody',
			title: 'Heading Body',
			description: 'Text that appears directly under the heading, before the image.',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'imageBody',
			title: 'Image Body',
			description: 'Standalone text that appears below the image.',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'bg',
			title: 'Background',
			type: 'string',
			options: {
				list: [
					{ title: 'White', value: 'white' },
					{ title: 'Neutral', value: 'neutral' },
					{ title: 'Accent', value: 'accent' },
				],
				layout: 'radio',
			},
			initialValue: 'neutral',
		}),
	],
	preview: {
		select: { layout: 'layout', heading: 'heading', media: 'image' },
		prepare: ({ layout, heading, media }) => ({
			title: heading ?? 'Image Block',
			subtitle: layout,
			media,
		}),
	},
});
