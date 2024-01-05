"use client";
import Link from "next/link";
import { Slider } from "@/components/shadcn/ui/slider";
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";

export default function Slidy({
	name,
	description,
	def,
	fnChange,
	min,
	max,
	step = 1,
}: any) {
	const [value, setValue] = useState(def || 10);

	function handleChange(value: any) {
		setValue(value[0]);
		if (fnChange) fnChange(value[0]);
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between">
				<div className="text-muted-foreground font-sans text-sm font-semibold flex items-center gap-1">
					{name}{" "}
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<PiInfo />
							</TooltipTrigger>
							<TooltipContent>
								<p className="font-normal text-xs">
									{description}
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="text-foreground font-semibold">{value}</div>
			</div>
			<Slider
				defaultValue={[value]}
				max={max}
				min={min}
				step={step}
				value={[def]}
				onValueChange={handleChange}
			/>
		</div>
	);
}

import { PiInfo } from "react-icons/pi";
