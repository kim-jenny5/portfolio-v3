import { defineField, defineType } from 'sanity';

export const videoBlock = defineType({
	name: 'videoBlock',
	title: 'Video Block',
	type: 'object',
	fields: [
		defineField({
			name: 'video',
			title: 'Video',
			type: 'file',
			options: { accept: 'video/*' },
			validation: (r) => r.required(),
		}),
		defineField({
			name: 'size',
			title: 'Size',
			type: 'string',
			options: {
				list: [
					{ title: 'Small', value: 'sm' },
					{ title: 'Medium', value: 'md' },
					{ title: 'Large', value: 'lg' },
				],
				layout: 'radio',
			},
			initialValue: 'md',
		}),
		defineField({
			name: 'textAlign',
			title: 'Text Alignment',
			type: 'string',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Center', value: 'center' },
					{ title: 'Right', value: 'right' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			initialValue: 'left',
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
		}),
		defineField({
			name: 'headingBody',
			title: 'Heading Body',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'caption',
			title: 'Caption',
			type: 'string',
		}),
		defineField({
			name: 'accent',
			title: 'Accent background',
			description: 'Use the dark accent (blue-900) background instead of the auto-alternating white/neutral.',
			type: 'boolean',
			initialValue: false,
		}),
	],
	preview: {
		select: { heading: 'heading' },
		prepare: ({ heading }) => ({
			title: heading ?? 'Video Block',
			subtitle: 'video',
		}),
	},
});
