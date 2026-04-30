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
			hidden: ({ parent }) => parent?.size === 'imageRow',
			validation: (r) =>
				r.custom((val, ctx) => {
					if ((ctx.parent as { size?: string })?.size === 'imageRow') return true;
					if (!val) return 'Required';
					return true;
				}),
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
					{ title: 'Image Row', value: 'imageRow' },
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
			name: 'images',
			title: 'Images',
			type: 'array',
			hidden: ({ parent }) => parent?.size !== 'imageRow',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
				},
			],
			validation: (r) =>
				r.custom((val, ctx) => {
					if ((ctx.parent as { size?: string })?.size !== 'imageRow') return true;
					if (!val || (val as unknown[]).length < 2) return 'Add at least 2 images';
					if ((val as unknown[]).length > 4) return 'Maximum 4 images';
					return true;
				}),
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
