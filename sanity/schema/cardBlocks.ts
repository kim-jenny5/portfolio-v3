import { defineField, defineType } from 'sanity';

const bgOptions = [
	{ title: 'White', value: 'white' },
	{ title: 'Neutral 100', value: 'neutral-100' },
	{ title: 'Neutral 50', value: 'neutral-50' },
];

const titleCardBgOptions = [
	{ title: 'White', value: 'white' },
	{ title: 'Neutral 100', value: 'neutral-100' },
	{ title: 'Neutral 50', value: 'neutral-50' },
	{ title: 'Blue 900', value: 'blue-900' },
];

const accentColorOptions = [
	{ title: 'Blue 500', value: 'blue-500' },
	{ title: 'Blue 700', value: 'blue-700' },
	{ title: 'Blue 900', value: 'blue-900' },
];

const titleColorOptions = [
	{ title: 'Blue 500', value: 'blue-500' },
	{ title: 'Blue 700', value: 'blue-700' },
	{ title: 'Blue 900', value: 'blue-900' },
	{ title: 'Lavender 50', value: 'lavender-50' },
	{ title: 'White', value: 'white' },
];

// ── Accent Card Group ─────────────────────────────────────────────────────────
// Left border accent, small uppercase label, description text.

export const accentCardGroup = defineType({
	name: 'accentCardGroup',
	title: 'Accent Cards',
	type: 'object',
	fields: [
		defineField({
			name: 'bg',
			title: 'Card Background',
			type: 'string',
			options: { list: bgOptions, layout: 'radio' },
			initialValue: 'neutral-100',
		}),
		defineField({
			name: 'accentColor',
			title: 'Accent Color',
			description: 'Controls the left border and label text color.',
			type: 'string',
			options: { list: accentColorOptions, layout: 'radio' },
			initialValue: 'blue-500',
		}),
		defineField({
			name: 'cards',
			title: 'Cards',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'item',
					title: 'Card',
					fields: [
						defineField({
							name: 'label',
							title: 'Label',
							type: 'string',
							validation: (r) => r.required(),
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 3,
						}),
					],
					preview: { select: { title: 'label', subtitle: 'description' } },
				},
			],
		}),
	],
	preview: {
		select: { cards: 'cards' },
		prepare: ({ cards }) => ({
			title: 'Accent Cards',
			subtitle: `${cards?.length ?? 0} card${cards?.length !== 1 ? 's' : ''}`,
		}),
	},
});

// ── Title Card Group ──────────────────────────────────────────────────────────
// Bold title heading, description text.

export const titleCardGroup = defineType({
	name: 'titleCardGroup',
	title: 'Title Cards',
	type: 'object',
	fields: [
		defineField({
			name: 'bg',
			title: 'Card Background',
			type: 'string',
			options: { list: titleCardBgOptions, layout: 'radio' },
			initialValue: 'white',
		}),
		defineField({
			name: 'accentColor',
			title: 'Title Color',
			type: 'string',
			options: { list: titleColorOptions, layout: 'radio' },
			initialValue: 'blue-900',
		}),
		defineField({
			name: 'cards',
			title: 'Cards',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'item',
					title: 'Card',
					fields: [
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: (r) => r.required(),
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 4,
						}),
					],
					preview: { select: { title: 'title', subtitle: 'description' } },
				},
			],
		}),
	],
	preview: {
		select: { cards: 'cards' },
		prepare: ({ cards }) => ({
			title: 'Title Cards',
			subtitle: `${cards?.length ?? 0} card${cards?.length !== 1 ? 's' : ''}`,
		}),
	},
});

// ── Stat Card Group ───────────────────────────────────────────────────────────
// Large display number/value, small uppercase label.

export const statCardGroup = defineType({
	name: 'statCardGroup',
	title: 'Stat Cards',
	type: 'object',
	fields: [
		defineField({
			name: 'bg',
			title: 'Card Background',
			type: 'string',
			options: { list: bgOptions, layout: 'radio' },
			initialValue: 'neutral-100',
		}),
		defineField({
			name: 'accentColor',
			title: 'Label Color',
			type: 'string',
			options: { list: accentColorOptions, layout: 'radio' },
			initialValue: 'blue-700',
		}),
		defineField({
			name: 'cards',
			title: 'Cards',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'item',
					title: 'Card',
					fields: [
						defineField({
							name: 'value',
							title: 'Value',
							type: 'string',
							validation: (r) => r.required(),
						}),
						defineField({
							name: 'label',
							title: 'Label',
							type: 'string',
							validation: (r) => r.required(),
						}),
					],
					preview: { select: { title: 'value', subtitle: 'label' } },
				},
			],
		}),
	],
	preview: {
		select: { cards: 'cards' },
		prepare: ({ cards }) => ({
			title: 'Stat Cards',
			subtitle: `${cards?.length ?? 0} card${cards?.length !== 1 ? 's' : ''}`,
		}),
	},
});
