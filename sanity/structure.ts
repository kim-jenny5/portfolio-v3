import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Home Page')
				.child(S.document().schemaType('homePage').documentId('homePage')),
			S.listItem()
				.title('About Page')
				.child(S.document().schemaType('aboutPage').documentId('aboutPage')),
			S.divider(),
			S.documentTypeListItem('selectedProject').title('Selected Projects'),
			S.documentTypeListItem('sideProject').title('Other Things'),
		]);
