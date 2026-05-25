import { PanelLeft } from "lucide-solid";
import {
	createContext,
	createEffect,
	createSignal,
	onCleanup,
	splitProps,
	useContext,
	type ComponentProps,
	type JSX,
	type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const SIDEBAR_WIDTH = "12rem";
const SIDEBAR_WIDTH_MOBILE = "14rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextState = {
	isDesktopOpen: () => boolean;
	isMobileOpen: () => boolean;
	toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextState | null>(null);

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
}

export function SidebarProvider(
	props: ComponentProps<"div"> & { defaultDesktopOpen?: boolean },
) {
	const [local, rest] = splitProps(props, ["class", "defaultDesktopOpen"]);

	const [isDesktopOpen, setIsDesktopOpen] = createSignal(
		local.defaultDesktopOpen ?? true,
	);
	const [isMobileOpen, setIsMobileOpen] = createSignal(false);

	const toggleSidebar = () => {
		setIsDesktopOpen((prev) => !prev);
		setIsMobileOpen((prev) => !prev);
	};

	createEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
	});

	return (
		<SidebarContext.Provider
			value={{ isDesktopOpen, isMobileOpen, toggleSidebar }}
		>
			<div class={cn("flex min-h-svh w-full", local.class)} {...rest} />
		</SidebarContext.Provider>
	);
}

export function Sidebar(props: ComponentProps<"aside">) {
	const [local, rest] = splitProps(props, ["class", "style", "children"]);
	const context = useSidebar();

	const mobileStyle = () =>
		Object.assign(
			{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			typeof local.style === "object" ? local.style : {},
		);

	const desktopStyle = () =>
		Object.assign(
			{ "--sidebar-width": SIDEBAR_WIDTH },
			typeof local.style === "object" ? local.style : {},
		);

	return (
		<>
			<div class="md:hidden">
				<button
					aria-label="Close sidebar"
					onClick={context.toggleSidebar}
					class={cn(
						"fixed inset-0 z-40 bg-[#0006] transition-opacity",
						context.isMobileOpen()
							? "cursor-pointer opacity-100"
							: "pointer-events-none opacity-0",
					)}
					aria-hidden={!context.isMobileOpen()}
					tabIndex={-1}
				/>
				<aside
					style={mobileStyle()}
					class={cn(
						"bg-sidebar-background text-sidebar-foreground fixed top-0 left-0 z-50 h-svh w-(--sidebar-width) transition-transform duration-300 ease-in-out",
						context.isMobileOpen() ? "translate-x-0" : "-translate-x-full",
						local.class,
					)}
					aria-modal="true"
					role="dialog"
				>
					{local.children}
				</aside>
			</div>

			<aside
				style={desktopStyle()}
				{...rest}
				class={cn(
					"bg-sidebar-background text-sidebar-foreground shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out max-md:hidden",
					context.isDesktopOpen() ? "w-(--sidebar-width)" : "w-0",
					local.class,
				)}
			>
				<div class="flex h-full w-(--sidebar-width) flex-col">
					{local.children}
				</div>
			</aside>
		</>
	);
}

export function SidebarTrigger(props: ComponentProps<typeof Button>) {
	const context = useSidebar();

	return (
		<Button
			class="size-8 rounded-full px-1.5"
			variant="flat"
			onClick={context.toggleSidebar}
			{...props}
		>
			<PanelLeft /> <span class="sr-only">Toggle Sidebar</span>
		</Button>
	);
}

export function SidebarContent(props: ComponentProps<"div">) {
	const [local, rest] = splitProps(props, ["class"]);
	return (
		<div
			class={cn("flex min-h-0 flex-1 flex-col overflow-auto px-1", local.class)}
			{...rest}
		/>
	);
}

export function SidebarMenu(props: ComponentProps<"ul">) {
	const [local, rest] = splitProps(props, ["class"]);
	return (
		<ul
			class={cn("flex w-full min-w-0 flex-col gap-1", local.class)}
			{...rest}
		/>
	);
}

export function SidebarMenuItem(props: ComponentProps<"li">) {
	const [local, rest] = splitProps(props, ["class"]);
	return <li class={cn(local.class)} {...rest} />;
}

type SidebarMenuButtonProps<T extends ValidComponent> = ComponentProps<T> & {
	isActive?: boolean;
	as?: T;
	children?: JSX.Element;
	class?: string;
};

export function SidebarMenuButton<T extends ValidComponent = "button">(
	props: SidebarMenuButtonProps<T>,
) {
	const [local, rest] = splitProps(props, [
		"isActive",
		"class",
		"children",
		"as",
	]);

	const componentTag = () => local.as || ("button" as ValidComponent);

	return (
		<Dynamic
			component={componentTag()}
			class={cn(
				"relative flex min-h-8 w-full cursor-pointer items-center justify-start gap-1.5 overflow-hidden rounded-lg px-2 disabled:cursor-not-allowed disabled:opacity-60",
				local.isActive && "bg-button-pressed",
				"hover:after:bg-hover focus:after:bg-hover after:absolute after:inset-0 after:transition-colors",
				local.class,
			)}
			{...rest}
		>
			{local.children}
		</Dynamic>
	);
}

export function SidebarHeader(props: ComponentProps<"header">) {
	const [local, rest] = splitProps(props, ["class"]);
	return (
		<header
			class={cn(
				"flex min-h-8 flex-col items-center justify-center",
				local.class,
			)}
			{...rest}
		/>
	);
}
