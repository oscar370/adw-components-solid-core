import {
	createContext,
	splitProps,
	useContext,
	type ComponentProps,
	type JSX,
} from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "../../lib/utils";
import { Button } from "./button";

type DialogContextState = {
	dialogRef: HTMLDialogElement | ((el: HTMLDialogElement) => void);
	closeDialog: () => void;
	openDialog: () => void;
};

const DialogContext = createContext<DialogContextState | null>(null);

export function useDialog() {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("useDialog must be used within a DialogProvider");
	}
	return context;
}

export function DialogProvider(props: { children?: JSX.Element }) {
	let dialogElement: HTMLDialogElement | undefined;

	const closeDialog = () => dialogElement?.close();
	const openDialog = () => dialogElement?.showModal();

	const setDialogRef = (el: HTMLDialogElement) => {
		dialogElement = el;
	};

	return (
		<DialogContext.Provider
			value={{ dialogRef: setDialogRef, closeDialog, openDialog }}
		>
			{props.children}
		</DialogContext.Provider>
	);
}

type DialogProps = ComponentProps<"div"> & {
	classList?: {
		root?: string;
		backdrop?: string;
	};
};

export function Dialog(props: DialogProps) {
	const [local, rest] = splitProps(props, ["class", "children", "classList"]);
	const context = useDialog();

	return (
		<Portal mount={document.body}>
			<dialog
				class={cn(
					"pointer-events-auto invisible fixed inset-0 m-0 grid h-full max-h-none w-full max-w-none place-items-center overflow-clip overscroll-contain bg-[#0000] p-0 text-inherit opacity-0 open:visible open:bg-[#0006] open:opacity-100",
					"group transition-discrete",
					"transition-opacity duration-200 ease-out",
					"starting:open:invisible starting:open:opacity-0",
					local.classList?.root,
				)}
				ref={context.dialogRef}
			>
				<div
					class={cn(
						"bg-dialog-background text-dialog-foreground col-start-1 row-start-1 max-h-dvh w-[90%] max-w-lg overflow-y-auto overscroll-contain rounded-lg p-6",
						"opacity-0 transition-opacity duration-200 ease-out",
						"group-open:opacity-100",
						"starting:group-open:opacity-0",
						local.class,
					)}
					{...rest}
				>
					{local.children}
				</div>

				<div
					class={cn(
						"z-[-1] col-start-1 row-start-1 grid place-self-stretch bg-[#0000]",
						local.classList?.backdrop,
					)}
				>
					<button class="cursor-pointer" onClick={context.closeDialog}>
						<span class="sr-only">Close dialog</span>
					</button>
				</div>
			</dialog>
		</Portal>
	);
}

export function DialogTrigger(props: ComponentProps<typeof Button>) {
	const [local, rest] = splitProps(props, ["children", "onClick"]);
	const context = useDialog();

	const handleClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
		e,
	) => {
		context.openDialog();
		if (typeof local.onClick === "function") {
			local.onClick(e);
		} else if (local.onClick) {
			local.onClick[0](local.onClick[1], e);
		}
	};

	return (
		<Button {...rest} onClick={handleClick}>
			{local.children}
		</Button>
	);
}

export function DialogClose(props: ComponentProps<typeof Button>) {
	const [local, rest] = splitProps(props, ["children", "variant", "onClick"]);
	const context = useDialog();

	const handleClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
		e,
	) => {
		context.closeDialog();
		if (typeof local.onClick === "function") {
			local.onClick(e);
		} else if (local.onClick) {
			local.onClick[0](local.onClick[1], e);
		}
	};

	return (
		<Button
			variant={local.variant || "pressed"}
			{...rest}
			onClick={handleClick}
		>
			{local.children}
		</Button>
	);
}
