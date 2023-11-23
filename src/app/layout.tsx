import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "OpenAI API",
	description: "",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Sidebar />
				<div className="pl-[57px]  ">
					<main className="px-2  ">{children}</main>
				</div>
			</body>
		</html>
	);
}
