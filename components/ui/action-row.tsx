import {
	splitProps,
	type ComponentProps,
	type JSX,
	type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "../../lib/utils";

type ActionRowProps<T extends ValidComponent> = ComponentProps<T> & {
	title: string;
	subtitle?: string;
	icon?: JSX.Element;
	action?: JSX.Element;
	property?: boolean;
	as?: T;
	classList?: {
		root?: string;
		icon?: string;
		title?: string;
		subtitle?: string;
		action?: string;
	};
	onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
};

export function ActionRow<T extends ValidComponent = "div">(
	props: ActionRowProps<T>,
) {
	const [local, rest] = splitProps(props, [
		"title",
		"subtitle",
		"icon",
		"action",
		"property",
		"as",
		"classList",
		"class",
		"onClick",
	]);

	const componentTag = () => local.as || ("div" as ValidComponent);
	const isInteractive = () => componentTag() !== "div";

	return (
		<li class={cn(local.classList?.root)}>
			<Dynamic
				component={componentTag()}
				class={cn(
					"flex min-h-12 w-full items-center px-4 transition-colors",
					isInteractive() && "hover:bg-hover cursor-pointer",
					!isInteractive() && "select-text",
					local.class,
				)}
				onClick={local.onClick}
				{...rest}
			>
				{local.icon && (
					<div class={cn("mr-2", local.classList?.icon)}>{local.icon}</div>
				)}

				<div class="flex min-w-0 flex-1 flex-col gap-px text-left">
					<span
						class={cn(
							local.property
								? "text-window-foreground/60 text-sm"
								: "leading-tight",
							local.classList?.title,
						)}
					>
						{local.title}
					</span>
					{local.subtitle && (
						<span
							class={cn(
								!local.property
									? "text-window-foreground/60 text-sm"
									: "leading-tight",
								local.classList?.subtitle,
							)}
						>
							{local.subtitle}
						</span>
					)}
				</div>

				<div class={cn("ml-4 flex items-center", local.classList?.action)}>
					{local.action}
				</div>
			</Dynamic>
		</li>
	);
}
