import useEmblaCarousel, {
	type CreateEmblaCarouselType,
} from "embla-carousel-solid";
import { ChevronLeft, ChevronRight } from "lucide-solid";
import {
	createContext,
	createEffect,
	createSignal,
	onCleanup,
	splitProps,
	useContext,
	type ComponentProps,
	type JSX,
} from "solid-js";
import { cn } from "../../lib/utils";
import { Button } from "./button";

type EmblaCarouselRefType = ReturnType<typeof useEmblaCarousel>[0];
type EmblaCarouselApiType = ReturnType<typeof useEmblaCarousel>[1];

type CarouselContextState = {
	carouselRef: EmblaCarouselRefType;
	api: EmblaCarouselApiType;
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: () => boolean;
	canScrollNext: () => boolean;
};

const CarouselContext = createContext<CarouselContextState | null>(null);

export function useCarousel() {
	const context = useContext(CarouselContext);
	if (!context) {
		throw new Error("useCarousel must be used within a CarouselProvider");
	}
	return context;
}

type CarouselProps = ComponentProps<"div"> & {
	opts?: Parameters<typeof useEmblaCarousel>[0];
	plugins?: Parameters<typeof useEmblaCarousel>[1];
};

export function CarouselProvider(props: CarouselProps) {
	const [local, rest] = splitProps(props, [
		"opts",
		"plugins",
		"class",
		"children",
	]);
	const [carouselRef, api] = useEmblaCarousel(local.opts, local.plugins);

	const [canScrollPrev, setCanScrollPrev] = createSignal(false);
	const [canScrollNext, setCanScrollNext] = createSignal(false);

	const onSelect = (
		emblaApi: NonNullable<ReturnType<CreateEmblaCarouselType[1]>>,
	) => {
		if (!emblaApi) return;
		setCanScrollPrev(emblaApi.canScrollPrev());
		setCanScrollNext(emblaApi.canScrollNext());
	};

	const scrollPrev = () => {
		const currentApi = api();
		if (currentApi) currentApi.scrollPrev();
	};

	const scrollNext = () => {
		const currentApi = api();
		if (currentApi) currentApi.scrollNext();
	};

	const handleKeyDown: JSX.EventHandlerUnion<HTMLDivElement, KeyboardEvent> = (
		event,
	) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			scrollPrev();
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			scrollNext();
		}
	};

	createEffect(() => {
		const currentApi = api();
		if (!currentApi) return;

		onSelect(currentApi);
		currentApi.on("reInit", onSelect);
		currentApi.on("select", onSelect);

		onCleanup(() => {
			currentApi.off("reInit", onSelect);
			currentApi.off("select", onSelect);
		});
	});

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api,
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}
		>
			<div
				class={cn("relative", local.class)}
				onKeyDown={handleKeyDown}
				role="region"
				aria-roledescription="carousel"
				{...rest}
			>
				{local.children}
			</div>
		</CarouselContext.Provider>
	);
}

export function Carousel(props: ComponentProps<"div">) {
	const [local, rest] = splitProps(props, ["class"]);
	const context = useCarousel();

	return (
		<div ref={context.carouselRef} class="overflow-hidden">
			<div class={cn("-ml-4 flex", local.class)} {...rest} />
		</div>
	);
}

export function CarouselItem(props: ComponentProps<"div">) {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			role="group"
			aria-roledescription="slide"
			class={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", local.class)}
			{...rest}
		/>
	);
}

export function CarouselPrevious(props: ComponentProps<typeof Button>) {
	const [local, rest] = splitProps(props, ["class", "variant"]);
	const context = useCarousel();

	return (
		<Button
			variant={local.variant || "regular"}
			class={cn(
				"absolute top-1/2 -left-12 size-8 -translate-y-1/2 touch-manipulation rounded-full p-0",
				local.class,
			)}
			disabled={!context.canScrollPrev()}
			onClick={context.scrollPrev}
			{...rest}
		>
			<ChevronLeft />
			<span class="sr-only">Previous slide</span>
		</Button>
	);
}

export function CarouselNext(props: ComponentProps<typeof Button>) {
	const [local, rest] = splitProps(props, ["class", "variant"]);
	const context = useCarousel();

	return (
		<Button
			variant={local.variant || "regular"}
			class={cn(
				"absolute top-1/2 -right-12 size-8 -translate-y-1/2 touch-manipulation rounded-full p-0",
				local.class,
			)}
			disabled={!context.canScrollNext()}
			onClick={context.scrollNext}
			{...rest}
		>
			<ChevronRight />
			<span class="sr-only">Next slide</span>
		</Button>
	);
}
