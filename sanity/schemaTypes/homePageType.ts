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
					name: 'headline',
					title: 'Headline',
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
		}),
		defineField({
			name: 'selectedProjects',
			title: 'Selected Projects',
			type: 'object',
			fields: [
				defineField({
					name: 'sectionTitle',
					title: 'Section Title',
					type: 'string',
					initialValue: 'Selected Projects',
					validation: (rule) => rule.required()
				}),
				defineField({
					name: 'projects',
					title: 'Projects',
					type: 'array',
					of: [{ type: 'reference', to: [{ type: 'project' }] }],
					validation: (rule) => rule.max(6)
				})
			]
		})
	]
});
