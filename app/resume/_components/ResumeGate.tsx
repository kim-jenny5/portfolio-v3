'use client';

import { useState, FormEvent } from 'react';

export function ResumeGate() {
	const [pin, setPin] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [shaking, setShaking] = useState(false);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(false);

		try {
			const res = await fetch('/api/resume/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ pin }),
			});

			if (res.ok) {
				const blob = await res.blob();
				const blobUrl = URL.createObjectURL(blob);
				window.open(blobUrl, '_blank');
				window.location.href = '/';
			} else {
				setError(true);
				setShaking(true);
				setTimeout(() => setShaking(false), 400);
				setPin('');
			}
		} catch {
			setError(true);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-neutral-50">
			<div className="flex w-full max-w-[240px] flex-col gap-6 px-4">
				<span className="font-inter text-xs font-bold tracking-wide text-blue-500 uppercase">
					Enter access code
				</span>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<input
							type="password"
							value={pin}
							onChange={(e) => setPin(e.target.value)}
							placeholder="••••"
							autoFocus
							className={`w-full border-b border-neutral-200 bg-transparent py-3 font-inter text-base text-blue-900 transition-colors duration-200 outline-none placeholder:text-neutral-200 focus:border-blue-500 ${shaking ? 'animate-shake' : ''} `}
						/>
						{error && (
							<span className="font-inter text-sm text-[#e24b4a]">
								Incorrect code
							</span>
						)}
					</div>

					<button
						type="submit"
						disabled={loading || !pin}
						className="cursor-pointer bg-blue-900 px-6 py-3 font-inter text-sm font-bold text-neutral-50 transition-colors duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-900"
					>
						{loading ? 'Checking…' : 'Continue →'}
					</button>
				</form>
			</div>
		</div>
	);
}
