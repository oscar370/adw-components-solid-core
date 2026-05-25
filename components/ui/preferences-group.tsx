import { splitProps, type JSX } from "solid-js";
import { cn } from "../../lib/utils";

type PreferencesGroupProps = {
	children?: JSX.Element;
	title?: string;
	description?: string;
	actions?: JSX.Element;
	classList?: {
		root?: string;
		header?: string;
		title?: string;
		description?: string;
		list?: string;
	};
};

export function PreferencesGroup(props: PreferencesGroupProps) {
	const [local] = splitProps(props, [
		"title",
		"description",
		"actions",
		"classList",
		"children",
	]);

	const shouldRenderHeader = () =>
		!!(local.title || local.description || local.actions);

	return (
		<section class={cn("w-full", local.classList?.root)}>
			{shouldRenderHeader() && (
				<header class={cn("mb-1 flex items-center", local.classList?.header)}>
					<div class="flex-1">
						{local.title && (
							<span class={cn("font-bold", local.classList?.title)}>
								{local.title}
							</span>
						)}

						{local.description && (
							<p
								class={cn(
									"text-window-foreground/60 text-xs",
									local.classList?.description,
								)}
							>
								{local.description}
							</p>
						)}
					</div>

					{local.actions}
				</header>
			)}

			<ul
				class={cn(
					"bg-list-box-background divide-shade/30 flex w-full flex-col divide-y overflow-hidden rounded-xl shadow-sm",
					local.classList?.list,
				)}
			>
				{local.children}
			</ul>
		</section>
	);
}
