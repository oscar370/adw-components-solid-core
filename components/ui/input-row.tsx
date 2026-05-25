import { splitProps, type ComponentProps } from "solid-js";
import { cn } from "../../lib/utils";

type InputRowProps = ComponentProps<"input"> & {
	title?: string;
	classList?: {
		root?: string;
		label?: string;
		title?: string;
	};
};

export function InputRow(props: InputRowProps) {
	const [local, rest] = splitProps(props, ["title", "classList", "class"]);

	return (
		<li class={local.classList?.root}>
			<label
				class={cn(
					"flex min-h-12 w-full flex-col items-start justify-center px-4 transition-colors",
					"hover:bg-hover cursor-text",
					"has-user-invalid:bg-destructive-background has-user-invalid:text-destructive-foreground",
					"has-aria-invalid:bg-destructive-background has-aria-invalid:text-destructive-foreground",
					local.classList?.label,
				)}
			>
				{local.title && (
					<span
						class={cn(
							"text-window-foreground/60 text-sm leading-tight",
							local.classList?.title,
						)}
					>
						{local.title}
					</span>
				)}

				<input
					class={cn(
						"w-full cursor-text outline-none disabled:cursor-not-allowed disabled:opacity-60",
						local.class,
					)}
					{...rest}
				/>
			</label>
		</li>
	);
}
