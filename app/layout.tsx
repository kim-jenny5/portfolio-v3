import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { VisualEditing } from 'next-sanity/visual-editing';
import { SanityLive } from '@/sanity/lib/live';
import { draftMode } from 'next/headers';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin']
});

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Jenny // design engineer',
	description: 'Welcome to my portfolio website!'
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isEnabled } = await draftMode();

	return (
		<html
			lang='en'
			className={cn('h-full', 'antialiased', manrope.variable, inter.variable)}
		>
			<body className='min-h-full flex flex-col'>
				<Header />
				<div className='flex flex-1'>
					<main className='flex-1'>{children}</main>
					<Sidebar />
				</div>
				<Footer />
				<SanityLive />
				{isEnabled && <VisualEditing />}
			</body>
		</html>
	);
}
