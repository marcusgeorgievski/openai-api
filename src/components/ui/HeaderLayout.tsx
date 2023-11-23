"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
	children: React.ReactNode;
}

export default function HeaderLayout() {
	const pathname = usePathname();

	if (pathname === "/") return <></>;
	return (
		<header className="border-b h-[57px]  flex items-center  pb-1 pl-4 sticky top-0 bg-background  z-40">
			<h1 className="font-bold text-2xl translate-y-1">
				{pathname[1].toUpperCase() + pathname.slice(2)}
			</h1>
		</header>
	);
}
