import { splitProps, type ComponentProps } from "solid-js";
import { cn } from "../../lib/utils";

type SelectProps = ComponentProps<"select"> & {
	title?: string;
	classList?: {
		root?: string;
		title?: string;
	};
};

export function Select(props: SelectProps) {
	const [local, rest] = splitProps(props, [
		"title",
		"classList",
		"class",
		"required",
	]);

	return (
		<label class={cn("flex w-full flex-col gap-0.5", local.classList?.root)}>
			{local.title && (
				<div class={cn("ml-px", local.classList?.title)}>
					<span>{local.title}</span>
					{local.required && <span class="text-destructive">*</span>}
				</div>
			)}

			<select
				class={cn(
					"bg-button min-h-8 w-full rounded-lg px-2 disabled:cursor-not-allowed disabled:opacity-60",
					local.class,
				)}
				required={local.required}
				{...rest}
			/>
		</label>
	);
}
