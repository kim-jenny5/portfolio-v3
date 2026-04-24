import { defineField, defineType } from 'sanity';

export const newsletterPreview = defineType({
	name: 'newsletterPreview',
	title: 'Newsletter Preview',
	type: 'object',
	fields: [
		defineField({
			name: 'brands',
			title: 'Brands',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'brand',
					title: 'Brand',
					fields: [
						defineField({
							name: 'name',
							title: 'Brand Name',
							type: 'string',
							validation: (r) => r.required(),
						}),
						defineField({
							name: 'file',
							title: 'Newsletter HTML File',
							type: 'file',
							options: { accept: '.html,text/html' },
							validation: (r) => r.required(),
						}),
					],
					preview: { select: { title: 'name' } },
				},
			],
		}),
	],
	preview: {
		select: { brands: 'brands' },
		prepare: ({ brands }) => ({
			title: 'Newsletter Preview',
			subtitle: `${brands?.length ?? 0} brand${brands?.length !== 1 ? 's' : ''}`,
		}),
	},
});
