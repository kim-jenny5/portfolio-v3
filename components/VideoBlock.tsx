'use client';

import { useRef, useState } from 'react';
import { SpeakerSimpleHigh, SpeakerSimpleSlash } from '@phosphor-icons/react';

const fullSizeClass: Record<string, string> = {
	sm: 'mx-auto w-full md:max-w-1/2',
	md: 'mx-auto w-full xl:max-w-3/4',
	lg: 'w-full',
};

const textAlignClass: Record<string, string> = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
};

interface VideoBlockProps {
	videoUrl: string;
	size?: 'sm' | 'md' | 'lg';
	textAlign?: 'left' | 'center' | 'right';
	heading?: string;
	headingBody?: string;
	caption?: string;
	hasAudio?: boolean;
	accent?: boolean;
}

export function VideoBlock({
	videoUrl,
	size = 'md',
	textAlign = 'left',
	heading,
	headingBody,
	caption,
	hasAudio = true,
	accent = false,
}: VideoBlockProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [muted, setMuted] = useState(true);
	const [hovered, setHovered] = useState(false);

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !muted;
			setMuted(!muted);
		}
	};

	const headingColor = accent ? 'text-white' : 'text-blue-900';
	const bodyColor = accent ? 'text-neutral-50' : 'text-blue-900';

	return (
		<div className={`flex flex-col gap-4 rounded ${textAlignClass[textAlign]}`}>
			{(heading || headingBody) && (
				<div className="flex flex-col gap-2">
					{heading && (
						<h3
							className={`font-manrope text-lg leading-[1.3] font-bold tracking-tight ${headingColor}`}
						>
							{heading}
						</h3>
					)}
					{headingBody && (
						<p className={`font-inter text-sm leading-[1.65] ${bodyColor}`}>
							{headingBody}
						</p>
					)}
				</div>
			)}
			<div
				className={`group relative overflow-hidden rounded ${fullSizeClass[size]}`}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<video
					ref={videoRef}
					src={videoUrl}
					autoPlay
					loop
					muted
					playsInline
					className="h-auto w-full"
				/>
				{hasAudio && (
					<button
						onClick={toggleMute}
						aria-label={muted ? 'Unmute video' : 'Mute video'}
						className={[
							'absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 font-inter text-xs font-bold text-white backdrop-blur-sm transition-opacity duration-150',
							hovered ? 'opacity-100' : 'opacity-0',
						].join(' ')}
					>
						{muted ? (
							<>
								<SpeakerSimpleSlash size={13} weight="bold" />
								Unmute
							</>
						) : (
							<>
								<SpeakerSimpleHigh size={13} weight="bold" />
								Mute
							</>
						)}
					</button>
				)}
			</div>
			{caption && (
				<p
					className={`font-inter text-xs leading-[1.5] ${accent ? 'text-neutral-50/60' : 'text-blue-900/50'}`}
				>
					{caption}
				</p>
			)}
		</div>
	);
}
