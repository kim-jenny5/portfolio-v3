import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { client } from '@/sanity/lib/client';

export async function GET(request: Request) {
	const { isValid, redirectTo = '/' } = await validatePreviewUrl(
		client,
		request.url
	);

	if (!isValid) {
		return new Response('Invalid preview URL', { status: 401 });
	}

	const draft = await draftMode();
	draft.enable();

	redirect(redirectTo);
}
