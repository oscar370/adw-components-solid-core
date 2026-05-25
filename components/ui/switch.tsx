import { splitProps, type JSX } from "solid-js";
import { cn } from "../../lib/utils";

type SwitchProps = {
	children?: JSX.Element;
	title?: string;
	classList?: {
		root?: string;
		title?: string;
	};
	checked?: boolean;
	onChange?: (
		e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement },
	) => void;
	required?: boolean;
	name?: string;
	disabled?: boolean;
	id?: string;
};

export function Switch(props: SwitchProps) {
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

			<div class="flex items-center">
				<div class="relative inline-flex cursor-pointer items-center">
					<input
						type="checkbox"
						class="peer sr-only"
						required={local.required}
						{...rest}
					/>
					<div class="peer bg-button-pressed peer-checked:bg-accent-background peer-focus-visible:outline-border h-6 w-11 rounded-full peer-focus-visible:outline-3 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
				</div>
			</div>
		</label>
	);
}
