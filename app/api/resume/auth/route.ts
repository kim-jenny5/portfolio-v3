import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';

export async function POST(request: NextRequest) {
	const { pin } = await request.json();

	const expectedPin = process.env.RESUME_PIN;
	if (!expectedPin) {
		return NextResponse.json({ success: false }, { status: 500 });
	}

	// Hash both values to normalize length before constant-time comparison
	const pinHash = createHash('sha256')
		.update(String(pin ?? ''))
		.digest();
	const expectedHash = createHash('sha256').update(expectedPin).digest();

	const match = timingSafeEqual(pinHash, expectedHash);

	if (!match) {
		return NextResponse.json({ success: false }, { status: 401 });
	}

	// Fetch the private blob server-side using the read/write token,
	// then stream the PDF bytes to the client so the private URL
	// never needs to be exposed or accessed from the browser.
	const pdfRes = await fetch(process.env.RESUME_PDF_URL!, {
		headers: {
			Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`
		}
	});

	if (!pdfRes.ok) {
		return NextResponse.json({ success: false }, { status: 502 });
	}

	const pdf = await pdfRes.arrayBuffer();

	return new NextResponse(pdf, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="resume.pdf"'
		}
	});
}
