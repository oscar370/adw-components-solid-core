import {
	CircleCheck,
	Info,
	LoaderCircle,
	OctagonX,
	TriangleAlert,
	X,
} from "lucide-solid";
import { Toaster as Sonner, type ToasterProps } from "solid-sonner";

export function Toaster(props: ToasterProps) {
	return (
		<Sonner
			icons={{
				success: <CircleCheck class="size-4" />,
				info: <Info class="size-4" />,
				warning: <TriangleAlert class="size-4" />,
				error: <OctagonX class="size-4" />,
				loading: <LoaderCircle class="size-4 animate-spin" />,
				close: <X class="size-4 bg-none!" />,
			}}
			toastOptions={{
				classNames: {
					toast: "bg-black/70! rounded-full! text-white! border-none!",
					closeButton:
						"right-0! top-[45%]! left-auto! [background:none]! border-none! text-white! shadow-none!",
				},
			}}
			closeButton={true}
			visibleToasts={1}
			position="bottom-center"
			{...props}
		/>
	);
}
