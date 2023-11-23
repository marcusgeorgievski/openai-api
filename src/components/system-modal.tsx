import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { ScrollArea } from "./shadcn/ui/scroll-area";

interface SystemModalProps {
	//children: React.ReactNode;
}

export default function SystemModal({ message, className }: any) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button className={className}>
					<span className="text-sm text-slate-500 mr-3">
						System instructions:
					</span>
					{message.content}
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>System Instructions:</AlertDialogTitle>
					{/* <AlertDialogDescription> */}
					<ScrollArea className="h-[210px] text-left whitespace-pre-wrap text-sm text-muted-foreground">
						{message.content}
					</ScrollArea>
					{/* </AlertDialogDescription> */}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
