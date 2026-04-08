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
					validation: (rule) => rule.required(),
				}),
				defineField({
					name: 'subline',
					title: 'Subline',
					type: 'text',
					rows: 3,
					validation: (rule) => rule.required(),
				}),
				defineField({
					name: 'stats',
					title: 'Stats',
					description:
						'Short labels displayed below the subline (e.g. "5+ years experience")',
					type: 'array',
					of: [{ type: 'string' }],
					options: { layout: 'tags' },
				}),
			],
		}),
		defineField({
			name: 'storyHeading',
			title: 'Story Heading',
			type: 'string',
		}),
		defineField({
			name: 'story',
			title: 'Story',
			description: 'Leave a blank line between paragraphs.',
			type: 'text',
			rows: 10,
		}),
		defineField({
			name: 'skillsHeading',
			title: 'Skills Heading',
			type: 'string',
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
							title: 'Category',
							type: 'string',
							options: {
								list: [
									{ title: 'Frontend', value: 'Frontend' },
									{ title: 'Design', value: 'Design' },
									{ title: 'Backend', value: 'Backend' },
									{ title: 'Tools', value: 'Tools' },
								],
								layout: 'dropdown',
							},
							validation: (rule) => rule.required(),
						}),
						defineField({
							name: 'tags',
							title: 'Tags',
							type: 'array',
							of: [{ type: 'string' }],
							options: { layout: 'tags' },
						}),
					],
					preview: { select: { title: 'name' } },
				},
			],
		}),
	],
});
