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

	if (match) {
		return NextResponse.json({
			success: true,
			url: process.env.RESUME_PDF_URL
		});
	}

	return NextResponse.json({ success: false }, { status: 401 });
}
