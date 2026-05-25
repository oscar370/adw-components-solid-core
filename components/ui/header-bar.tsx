import { cva, type VariantProps } from "class-variance-authority";
import { splitProps, type ComponentProps, type JSX } from "solid-js";
import { cn } from "../../lib/utils";

const headerBarVariants = cva(
	"grid min-h-8 w-full grid-cols-3 items-center justify-center border-b px-2",
	{
		variants: {
			variant: {
				regular: "bg-headerbar-background border-headerbar-border/15",
				flat: "border-none bg-transparent",
			},
		},
		defaultVariants: {
			variant: "regular",
		},
	},
);

type HeaderBarProps = ComponentProps<"header"> & {
	left?: JSX.Element;
	center?: JSX.Element;
	right?: JSX.Element;
	classList?: {
		left?: string;
		center?: string;
		right?: string;
	};
} & VariantProps<typeof headerBarVariants>;

export function HeaderBar(props: HeaderBarProps) {
	const [local, rest] = splitProps(props, [
		"left",
		"center",
		"right",
		"variant",
		"classList",
		"class",
	]);

	return (
		<header
			class={cn(headerBarVariants({ variant: local.variant }), local.class)}
			{...rest}
		>
			<div
				class={cn(
					"col-start-1 flex w-full items-center justify-start",
					local.classList?.left,
				)}
			>
				{local.left}
			</div>
			<div
				class={cn(
					"col-start-2 flex w-full items-center justify-center",
					local.classList?.center,
				)}
			>
				{local.center}
			</div>
			<div
				class={cn(
					"col-start-3 flex w-full items-center justify-end",
					local.classList?.right,
				)}
			>
				{local.right}
			</div>
		</header>
	);
}
