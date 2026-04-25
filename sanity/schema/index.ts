import { type SchemaTypeDefinition } from 'sanity';
import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { selectedProject } from './selectedProject';
import { sideProject } from './sideProject';
import { accentCardGroup, titleCardGroup, statCardGroup } from './cardBlocks';
import { imageBlock } from './imageBlock';
import { inlineImage } from './inlineImage';
import { newsletterPreview } from './newsletterPreview';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [homePage, aboutPage, selectedProject, sideProject, accentCardGroup, titleCardGroup, statCardGroup, imageBlock, inlineImage, newsletterPreview],
};
