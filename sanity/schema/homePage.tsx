import { defineField, defineType } from 'sanity';

const HighlightDecorator = ({ children }: { children: React.ReactNode }) => (
	<span
		style={{
			background: 'linear-gradient(transparent 0.2em, #ffebff 0.2em)',
			boxDecorationBreak: 'clone',
			WebkitBoxDecorationBreak: 'clone',
		}}
	>
		{children}
	</span>
);

export const homePage = defineType({
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
					description:
						'Select any text and click "Highlight" to apply the lavender mark.',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [{ title: 'Normal', value: 'normal' }],
							lists: [],
							marks: {
								decorators: [
								{
									title: 'Highlight',
									value: 'highlight',
									component: HighlightDecorator,
								},
							],
								annotations: [],
							},
						},
					],
					validation: (rule) => rule.required(),
				}),
				defineField({
					name: 'subline',
					title: 'Subline',
					type: 'text',
					rows: 2,
					validation: (rule) => rule.required(),
				}),
			],
		}),
	],
});
