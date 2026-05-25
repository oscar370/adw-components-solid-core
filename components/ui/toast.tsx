import {
	CircleCheck,
	Info,
	Loader2,
	OctagonX,
	TriangleAlert,
} from "lucide-solid";
import { Toaster as Sonner, type ToasterProps } from "solid-sonner";

export function Toaster({ ...rest }: ToasterProps) {
	return (
		<Sonner
			icons={{
				success: <CircleCheck class="size-4" />,
				info: <Info class="size-4" />,
				warning: <TriangleAlert class="size-4" />,
				error: <OctagonX class="size-4" />,
				loading: <Loader2 class="size-4 animate-spin" />,
			}}
			toastOptions={{
				classNames: {
					toast: "bg-popover-background! text-popover-foreground! border-none!",
					closeButton: "bg-button! text-window-foreground! border-shade/15!",
				},
			}}
			closeButton={true}
			{...rest}
		/>
	);
}
