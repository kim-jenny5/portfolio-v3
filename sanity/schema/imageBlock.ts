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
					{ title: 'Image - Row', value: 'imageRow' },
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
			hidden: ({ parent }) => parent?.layout === 'imageRow',
			validation: (r) => r.custom((val, ctx) => {
				if ((ctx.parent as { layout?: string })?.layout !== 'imageRow' && !val) return 'Required';
				return true;
			}),
		}),
		defineField({
			name: 'images',
			title: 'Images',
			type: 'array',
			hidden: ({ parent }) => parent?.layout !== 'imageRow',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
				},
			],
			validation: (r) =>
				r.custom((val, ctx) => {
					if ((ctx.parent as { layout?: string })?.layout !== 'imageRow') return true;
					if (!val || (val as unknown[]).length < 2) return 'Add at least 2 images';
					if ((val as unknown[]).length > 4) return 'Maximum 4 images';
					return true;
				}),
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
			hidden: ({ parent }) => parent?.layout !== 'imageFull',
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
			name: 'accent',
			title: 'Accent background',
			description: 'Use the dark accent (blue-900) background instead of the auto-alternating white/neutral.',
			type: 'boolean',
			initialValue: false,
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
