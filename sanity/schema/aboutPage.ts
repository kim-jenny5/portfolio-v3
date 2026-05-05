import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
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
					options: { sortable: true },
				}),
			],
		}),
		defineField({
			name: 'profileImage',
			title: 'Profile Image',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt Text',
					type: 'string',
				}),
			],
		}),
		defineField({
			name: 'storyHeading',
			title: 'Story Heading',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
					marks: {
						decorators: [{ title: 'Code', value: 'code' }],
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Link',
								fields: [
									defineField({ name: 'href', type: 'url', title: 'URL' }),
								],
							},
						],
					},
				},
			],
		}),
		defineField({
			name: 'story',
			title: 'Story',
			description: 'Leave a blank line between paragraphs.',
			type: 'text',
			rows: 10,
		}),
		defineField({
			name: 'skillsSection',
			title: 'Tools I Reach For',
			type: 'object',
			fields: [
				defineField({
					name: 'label',
					title: 'Label',
					description: 'Eyebrow label shown above the heading (e.g. "Stack").',
					type: 'string',
				}),
				defineField({
					name: 'heading',
					title: 'Heading',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [{ title: 'Normal', value: 'normal' }],
							lists: [],
							marks: {
								decorators: [{ title: 'Code', value: 'code' }],
								annotations: [],
							},
						},
					],
				}),
				defineField({
					name: 'skills',
					title: 'Tech Stack',
					description: 'Skill categories shown in the section.',
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
									options: { sortable: true },
								}),
							],
							preview: { select: { title: 'name' } },
						},
					],
				}),
			],
		}),
		defineField({
			name: 'siteSection',
			title: 'This Site',
			type: 'object',
			fields: [
				defineField({
					name: 'heading',
					title: 'Heading',
					type: 'string',
				}),
				defineField({
					name: 'body',
					title: 'Body',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [{ title: 'Normal', value: 'normal' }],
							lists: [],
							marks: {
								decorators: [{ title: 'Code', value: 'code' }],
								annotations: [],
							},
						},
					],
				}),
				defineField({
					name: 'links',
					title: 'Links',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({ name: 'label', title: 'Label', type: 'string' }),
								defineField({ name: 'url', title: 'URL', type: 'url' }),
							],
							preview: { select: { title: 'label', subtitle: 'url' } },
						},
					],
					options: { sortable: true },
				}),
			],
		}),
	],
});
