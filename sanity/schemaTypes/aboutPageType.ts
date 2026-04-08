import { defineField, defineType } from 'sanity';

export const aboutPageType = defineType({
	name: 'aboutPage',
	title: 'About Page',
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
					rows: 3,
					validation: (rule) => rule.required()
				}),
				defineField({
					name: 'stats',
					title: 'Stats',
					description: 'Short labels displayed below the subline (e.g. "5+ years experience")',
					type: 'array',
					of: [{ type: 'string' }],
					options: { layout: 'tags' }
				})
			]
		}),
		defineField({
			name: 'story',
			title: 'Story Paragraphs',
			description: 'Each item is one paragraph in the "The story so far" section.',
			type: 'array',
			of: [{ type: 'text', rows: 4 }]
		}),
		defineField({
			name: 'skills',
			title: 'Tech Stack',
			description: 'Skill categories shown in the "Tools I reach for" section.',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'name',
							title: 'Category Name',
							type: 'string',
							validation: (rule) => rule.required()
						}),
						defineField({
							name: 'tags',
							title: 'Tags',
							type: 'array',
							of: [{ type: 'string' }],
							options: { layout: 'tags' }
						})
					],
					preview: { select: { title: 'name' } }
				}
			]
		})
	]
});
