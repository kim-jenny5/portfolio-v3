'use client';

import { useState, FormEvent } from 'react';

export function ResumeGate() {
	const [pin, setPin] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [shaking, setShaking] = useState(false);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(false);

		try {
			const res = await fetch('/api/resume/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ pin })
			});

			const data = await res.json();

			if (data.success && data.url) {
				setSuccess(true);
				window.open(data.url, '_blank', 'noopener,noreferrer');
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
		<div className='flex items-center justify-center min-h-[calc(100vh-68px)] bg-neutral-50'>
			<div className='flex flex-col gap-6 w-full max-w-[240px] px-4'>
				<span className='font-inter font-bold text-xs uppercase tracking-wide text-blue-500'>
					Enter access code
				</span>

				{success ? (
					<p className='font-inter text-sm text-blue-900'>Opening your resume…</p>
				) : (
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<div className='flex flex-col gap-1'>
							<input
								type='password'
								value={pin}
								onChange={(e) => setPin(e.target.value)}
								placeholder='••••'
								autoFocus
								className={`
									bg-transparent border-b border-neutral-200 outline-none py-3
									font-inter text-base text-blue-900 placeholder:text-neutral-200
									focus:border-blue-500 transition-colors duration-200 w-full
									${shaking ? 'animate-shake' : ''}
								`}
							/>
							{error && (
								<span className='font-inter text-sm text-[#e24b4a]'>
									Incorrect code
								</span>
							)}
						</div>

						<button
							type='submit'
							disabled={loading || !pin}
							className='font-inter font-bold text-sm text-neutral-50 bg-blue-900 px-6 py-3 transition-colors duration-200 hover:bg-blue-500 disabled:opacity-50'
						>
							{loading ? 'Checking…' : 'Continue →'}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
