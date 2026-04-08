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
	subsets: ['latin'],
	weight: ['700', '800'],
	variable: '--font-manrope',
});

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'Jenny // design engineer',
	description: 'Welcome to my portfolio website!',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isEnabled } = await draftMode();

	return (
		<html
			lang="en"
			className={cn('h-full', 'antialiased', manrope.variable, inter.variable)}
		>
			<body className="flex min-h-full flex-col bg-neutral-50">
				<Header />
				<Sidebar />
				<main className="flex-1 pt-[68px] lg:ml-16">{children}</main>
				<Footer />
				<SanityLive />
				{isEnabled && <VisualEditing />}
			</body>
		</html>
	);
}
