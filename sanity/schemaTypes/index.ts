import { type SchemaTypeDefinition } from 'sanity';
import { homePageType } from './homePageType';
import { projectType } from './projectType';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [homePageType, projectType]
};
