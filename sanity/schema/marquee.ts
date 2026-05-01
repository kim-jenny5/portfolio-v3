import { defineField, defineType } from 'sanity';

export const marquee = defineType({
	name: 'marquee',
	title: 'Marquee',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			description: 'Optional heading above the marquee, e.g. "Featured In"',
			type: 'string',
		}),
		defineField({
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [
				{
					type: 'image',
					options: { hotspot: false },
					fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
				},
			],
			validation: (r) => r.required().min(1),
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
		select: { label: 'label' },
		prepare: ({ label }) => ({
			title: label ?? 'Marquee',
			subtitle: 'marquee',
		}),
	},
});
