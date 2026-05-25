import { cva, type VariantProps } from "class-variance-authority";
import {
	splitProps,
	type ComponentProps,
	type JSX,
	type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
	"hover:after:bg-hover relative flex h-fit min-h-8 w-fit cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg px-2 after:absolute after:inset-0 after:transition-colors disabled:cursor-not-allowed disabled:opacity-60",
	{
		variants: {
			variant: {
				regular: "bg-button",
				flat: "bg-transparent shadow-none",
				suggested: "bg-accent-background text-accent-foreground",
				destructive: "bg-destructive-background text-destructive",
				pressed: "bg-button-pressed",
			},
		},
		defaultVariants: {
			variant: "regular",
		},
	},
);

type ButtonProps<T extends ValidComponent> = ComponentProps<T> &
	VariantProps<typeof buttonVariants> & {
		as?: T;
		children?: JSX.Element;
	};

export function Button<T extends ValidComponent = "button">(
	props: ButtonProps<T>,
) {
	const [local, rest] = splitProps(props, [
		"variant",
		"class",
		"as",
		"children",
	]);

	const componentTag = () => local.as || ("button" as ValidComponent);

	return (
		<Dynamic
			component={componentTag()}
			class={cn(buttonVariants({ variant: local.variant }), local.class)}
			{...rest}
		>
			{local.children}
		</Dynamic>
	);
}
