import { defineField, defineType } from 'sanity';

export const paragraphBlock = defineType({
	name: 'paragraphBlock',
	title: 'Paragraph Block',
	type: 'object',
	fields: [
		defineField({
			name: 'textAlign',
			title: 'Text Alignment',
			type: 'string',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Center', value: 'center' },
					{ title: 'Right', value: 'right' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			initialValue: 'left',
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [
				{ type: 'block' },
				{ type: 'accentCardGroup' },
				{ type: 'titleCardGroup' },
				{ type: 'statCardGroup' },
			],
		}),
	],
	preview: {
		select: { content: 'content' },
		prepare({ content }: { content?: { children?: { text?: string }[] }[] }) {
			const firstText = content
				?.find((b) => b.children)
				?.children?.map((s) => s.text ?? '')
				.join('') ?? '';
			return { title: firstText ? `"${firstText.slice(0, 60)}"` : '(Paragraph Block)' };
		},
	},
});
