import { defineField, defineType } from 'sanity';

export const homePageType = defineType({
	name: 'homePage',
	title: 'Home Page',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'object',
			fields: [
				defineField({
					name: 'headlinePrefix',
					title: 'Headline — before highlight',
					description: 'Press Enter to create a line break.',
					type: 'text',
					rows: 2,
					validation: (rule) => rule.required()
				}),
				defineField({
					name: 'headlineHighlight',
					title: 'Headline — highlighted portion',
					description: 'This text is rendered with the lavender highlight.',
					type: 'string',
					validation: (rule) => rule.required()
				}),
				defineField({
					name: 'subline',
					title: 'Subline',
					type: 'text',
					rows: 2,
					validation: (rule) => rule.required()
				})
			]
		})
	]
});
