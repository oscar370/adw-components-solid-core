import { ChevronDown } from "lucide-solid";
import { splitProps, type JSX } from "solid-js";
import { cn } from "../../lib/utils";

export type ExpanderRowProps = {
	title: string;
	subtitle?: string;
	icon?: JSX.Element;
	classList?: {
		root?: string;
		summary?: string;
		icon?: string;
		title?: string;
		subtitle?: string;
		content?: string;
	};
	children: JSX.Element;
};

export function ExpanderRow(props: ExpanderRowProps) {
	const [local] = splitProps(props, [
		"title",
		"subtitle",
		"icon",
		"classList",
		"children",
	]);

	return (
		<li
			class={cn(
				"border-expander-row-border rounded-xl border",
				local.classList?.root,
			)}
		>
			<details class="group">
				<summary
					class={cn(
						"flex min-h-12 w-full cursor-pointer items-center px-4 transition-colors",
						"hover:bg-hover",
						"list-none [&::-webkit-details-marker]:hidden",
						local.classList?.summary,
					)}
				>
					{local.icon && (
						<div class={cn("mr-2", local.classList?.icon)}>{local.icon}</div>
					)}

					<div class="flex min-w-0 flex-1 flex-col gap-px text-left">
						<span class={cn("leading-tight", local.classList?.title)}>
							{local.title}
						</span>
						{local.subtitle && (
							<span
								class={cn(
									"text-window-foreground/60 text-sm",
									local.classList?.subtitle,
								)}
							>
								{local.subtitle}
							</span>
						)}
					</div>

					<div class="ml-4 flex items-center">
						<ChevronDown class="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
					</div>
				</summary>

				<div
					class={cn(
						"bg-window-background divide-expander-row-border divide-y rounded-b-xl",
						local.classList?.content,
					)}
				>
					{local.children}
				</div>
			</details>
		</li>
	);
}
