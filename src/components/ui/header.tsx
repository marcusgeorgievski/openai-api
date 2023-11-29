import Link from "next/link";

interface HeaderProps {
	children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
	return (
		<header className="border-b h-[57px] fixed top-0 flex items-center  pb-1 pl-4 ">
			<h1 className="font-bold text-2xl translate-y-1">{children}</h1>
		</header>
	);
}
