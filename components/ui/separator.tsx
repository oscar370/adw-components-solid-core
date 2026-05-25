import { cva } from "class-variance-authority";
import { splitProps, type ComponentProps } from "solid-js";
import { cn } from "../../lib/utils";

const separatorVariants = cva("bg-window-foreground/15 border-none", {
	variants: {
		orientation: {
			horizontal: "align-none my-2 block h-px w-full",
			vertical: "mx-2 inline-block h-full w-px align-middle",
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

type SeparatorProps = ComponentProps<"div"> & {
	orientation?: "horizontal" | "vertical";
};

export function Separator(props: SeparatorProps) {
	const [local, rest] = splitProps(props, ["orientation", "class"]);

	const orientation = () => local.orientation || "horizontal";

	return (
		<div
			role="separator"
			aria-orientation={orientation()}
			class={cn(separatorVariants({ orientation: orientation() }), local.class)}
			{...rest}
		/>
	);
}
