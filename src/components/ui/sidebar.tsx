"use client";
import { useSidebarStore } from "@/state/sidebar-store";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RiOpenaiFill } from "react-icons/ri";
import { Separator } from "../shadcn/ui/separator";
import { usePathname } from "next/navigation";

import { RiTerminalBoxLine } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import { ArrowRightLeftIcon, ChevronLeft } from "lucide-react";

interface SidebarProps {
	//children: React.ReactNode;
}

export default function Sidebar() {
	const { isOpen, toggleSidebar, closeSidebar, openHovering, closeHovering } =
		useSidebarStore();

	return (
		<aside
			className={cn(
				"fixed top-0 bottom-0 left-0 border-r transition-all overflow-hidden=false z-50 px-2.5 py-4 bg-background",
				{
					"w-[57px]": !isOpen,
					"w-[250px]": isOpen,
				}
			)}
		>
			<div className={cn("transition-all  flex flex-col  relative")}>
				<button
					onClick={toggleSidebar}
					className="w-5 h-5 rounded-full flex items-center justify-center  absolute -right-[15.5px] -top-2 border bg-background"
				>
					<ArrowRightLeftIcon className="w-3 text-slate-600" />
				</button>
				<Link
					href="/"
					className="self-start translate-x-1 flex justify-between w-[90%] items-center overflow-hidden"
				>
					<div className="flex items-center gap-3">
						<RiOpenaiFill className="text-3xl flex-shrink-0 " />
						<span className="text-sm font-bold font-mono line-clamp-1 flex-shrink-0">
							ChatGPT API
						</span>
					</div>

					<div className="">
						{/* <ChevronLeft className="text-slate-500 w-4" /> */}
					</div>
				</Link>

				<Separator className="my-4 opacity-100" />

				<div className="flex flex-col gap-2">
					<SidebarItem icon={<RiTerminalBoxLine />} href="/chat">
						Chat
					</SidebarItem>
					<SidebarItem icon={<MdOutlineSettings />} href="/settings">
						Settings
					</SidebarItem>
				</div>
			</div>
		</aside>
	);
}

interface SidebarItemProps {
	icon: React.ReactNode;
	href?: string;
	children?: React.ReactNode;
}
export function SidebarItem({ icon, href, children }: SidebarItemProps) {
	const { isOpen, toggleSidebar, isHovering } = useSidebarStore();
	const pathname = usePathname();

	if (!href)
		return (
			<div>
				<div>{icon}</div>
				<div>{children}</div>
			</div>
		);

	return (
		<Link
			href={href}
			className={cn(
				"flex items-center gap-4 text-muted-foreground px-1.5 py-1 transition-all rounded-md ",
				{
					"bg-green-100 text-green-700 font-semibold":
						pathname.endsWith(href),

					"hover:bg-slate-100 hover:text-black rounded":
						!pathname.endsWith(href),
				},
				"overflow-hidden hover:overflow-visible hover:gap-5 transition-all group"
			)}
		>
			<div className="text-2xl">{icon}</div>
			<div
				className={cn("font-medium transition-all", {
					" group-hover:bg-green-100 px-2 rounded":
						!isOpen && pathname.endsWith(href),
					"group-hover:bg-slate-100 px-2 rounded":
						!isOpen && !pathname.endsWith(href),
				})}
			>
				{children}
			</div>
		</Link>
	);
}
