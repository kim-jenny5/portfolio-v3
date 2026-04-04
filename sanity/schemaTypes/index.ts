import { type SchemaTypeDefinition } from 'sanity';
import { homePageType } from './homePageType';
import { projectType } from './projectType';
import { selectedProjectType } from './selectedProjectType';
import { sideProjectType } from './sideProjectType';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [homePageType, projectType, selectedProjectType, sideProjectType]
};
