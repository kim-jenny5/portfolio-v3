import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, previewToken } from '../env';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	perspective: 'previewDrafts',
	token: previewToken,
	stega: {
		studioUrl: '/studio',
	},
});
