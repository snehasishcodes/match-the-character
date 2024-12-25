import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
	title: "Match The Anime",
	description: "Match anime characters with their respective anime series.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
					{children}
			</body>
		</html>
	);
}
