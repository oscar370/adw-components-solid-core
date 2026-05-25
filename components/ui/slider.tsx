import { splitProps, type ComponentProps } from "solid-js";
import { cn } from "../../lib/utils";

type SliderProps = ComponentProps<"input"> & {
	title?: string;
	classList?: {
		root?: string;
		title?: string;
	};
};

export function Slider(props: SliderProps) {
	const [local, rest] = splitProps(props, ["title", "classList", "required"]);

	return (
		<label
			class={cn("flex w-full items-center gap-0.5", local.classList?.root)}
		>
			{local.title && (
				<div class={cn("ml-px flex-1", local.classList?.title)}>
					<span>{local.title}</span>
					{local.required && <span class="text-destructive">*</span>}
				</div>
			)}

			<input
				class={cn(
					"outline-none disabled:cursor-not-allowed disabled:opacity-60",
				)}
				type="range"
				required={local.required}
				{...rest}
			/>
		</label>
	);
}
