import { type SchemaTypeDefinition } from 'sanity';
import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { selectedProject } from './selectedProject';
import { sideProject } from './sideProject';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [homePage, aboutPage, selectedProject, sideProject],
};
