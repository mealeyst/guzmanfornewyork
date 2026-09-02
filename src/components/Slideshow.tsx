import { useEffect, useState } from "react";

type SlideshowImage = {
    src: string;
    alt: string;
    objectPosition?: string;
};

type Props = {
    images: SlideshowImage[];
    intervalMs?: number;
    className?: string;
    aspectClass?: string;
    activeDotClass?: string;
};

export default function Slideshow({
    images,
    intervalMs = 5000,
    className = "max-w-sm",
    aspectClass = "aspect-[4/5]",
    activeDotClass = "bg-brand-navy",
}: Props) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || images.length <= 1) return;
        const id = window.setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, intervalMs);
        return () => window.clearInterval(id);
    }, [paused, intervalMs, images.length]);

    const go = (next: number) => {
        setPaused(true);
        const length = images.length;
        setIndex(((next % length) + length) % length);
    };

    return (
        <div className={`relative w-full ${className}`}>
            <div className={`relative ${aspectClass} overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-gray-100`}>
                {images.map((img, i) => (
                    <img
                        key={img.src}
                        src={img.src}
                        alt={img.alt}
                        style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                            i === index ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden={i !== index}
                    />
                ))}

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => go(index - 1)}
                            aria-label="Previous photo"
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 hover:bg-white text-brand-navy w-9 h-9 flex items-center justify-center shadow text-xl leading-none"
                        >
                            &#8249;
                        </button>
                        <button
                            type="button"
                            onClick={() => go(index + 1)}
                            aria-label="Next photo"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 hover:bg-white text-brand-navy w-9 h-9 flex items-center justify-center shadow text-xl leading-none"
                        >
                            &#8250;
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="mt-3 flex justify-center gap-2">
                    {images.map((img, i) => (
                        <button
                            key={img.src}
                            type="button"
                            onClick={() => go(i)}
                            aria-label={`Show photo ${i + 1}`}
                            aria-current={i === index}
                            className={`h-2 w-2 rounded-full transition-colors ${
                                i === index ? activeDotClass : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
