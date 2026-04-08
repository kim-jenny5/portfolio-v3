import { NextResponse } from 'next/server';

export async function GET() {
	const url = process.env.PROFILE_PIC_URL;
	if (!url) return new NextResponse(null, { status: 404 });

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
		},
	});

	if (!res.ok) return new NextResponse(null, { status: 502 });

	const contentType = res.headers.get('content-type') ?? 'image/jpeg';
	const buffer = await res.arrayBuffer();

	return new NextResponse(buffer, {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=86400',
		},
	});
}
