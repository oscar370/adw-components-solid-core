import { splitProps, type ComponentProps, type JSX } from "solid-js";
import { cn } from "../../lib/utils";

type SelectRowProps = ComponentProps<"select"> & {
	title: string;
	subtitle?: string;
	icon?: JSX.Element;
	classList?: {
		root?: string;
		label?: string;
		icon?: string;
		title?: string;
		subtitle?: string;
	};
};

export function SelectRow(props: SelectRowProps) {
	const [local, rest] = splitProps(props, [
		"title",
		"subtitle",
		"icon",
		"classList",
		"class",
	]);

	return (
		<li class={local.classList?.root}>
			<label
				class={cn(
					"group flex min-h-12 w-full items-center px-4 transition-colors",
					"hover:bg-hover",
					local.classList?.label,
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
								"text-dim-foreground text-sm",
								local.classList?.subtitle,
							)}
						>
							{local.subtitle}
						</span>
					)}
				</div>

				<select
					class={cn(
						"bg-button rounded-md p-2 disabled:cursor-not-allowed disabled:opacity-60",
						local.class,
					)}
					{...rest}
				/>
			</label>
		</li>
	);
}
