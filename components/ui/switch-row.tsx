import { splitProps, type JSX } from "solid-js";
import { cn } from "../../lib/utils";

type SwitchRowProps = {
	children?: JSX.Element;
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
	checked?: boolean;
	onChange?: (
		e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement },
	) => void;
	name?: string;
	disabled?: boolean;
	id?: string;
};

export function SwitchRow(props: SwitchRowProps) {
	const [local, rest] = splitProps(props, [
		"title",
		"subtitle",
		"icon",
		"classList",
	]);

	return (
		<li class={local.classList?.root}>
			<label
				class={cn(
					"flex min-h-12 w-full items-center px-4 transition-colors",
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

				<div class="flex items-center">
					<div class="relative inline-flex cursor-pointer items-center">
						<input type="checkbox" class="peer sr-only" {...rest} />
						<div class="peer bg-button-pressed peer-checked:bg-accent-background peer-focus-visible:outline-border h-6 w-11 rounded-full peer-focus-visible:outline-3 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
					</div>
				</div>
			</label>
		</li>
	);
}
