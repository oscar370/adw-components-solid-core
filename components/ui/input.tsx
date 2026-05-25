import { splitProps, type ComponentProps } from "solid-js";
import { cn } from "../../lib/utils";

type InputProps = ComponentProps<"input"> & {
	title?: string;
	classList?: {
		root?: string;
		title?: string;
	};
};

export function Input(props: InputProps) {
	const [local, rest] = splitProps(props, [
		"title",
		"classList",
		"class",
		"required",
	]);

	return (
		<label
			class={cn("flex w-full flex-col-reverse gap-0.5", local.classList?.root)}
		>
			<input
				class={cn(
					"bg-button peer min-h-8 w-full cursor-text rounded-lg px-2 outline-none disabled:cursor-not-allowed disabled:opacity-60",
					"user-invalid:bg-destructive-background user-invalid:text-destructive",
					"aria-invalid:bg-destructive-background aria-invalid:text-destructive",
					local.class,
				)}
				required={local.required}
				{...rest}
			/>

			{local.title && (
				<div
					class={cn(
						"ml-px",
						"peer-user-invalid:text-destructive",
						"peer-aria-invalid:text-destructive",
						local.classList?.title,
					)}
				>
					<span>{local.title}</span>
					{local.required && <span class="text-destructive">*</span>}
				</div>
			)}
		</label>
	);
}
