import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 26;

const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
    new URL(`../assets/editedFrames/f${i + 1}.png`, import.meta.url).href
);

function preloadFrames() {
    frames.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

export default function ScrollFigure() {
    const [frameIndex, setFrameIndex] = useState(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        preloadFrames();

        const update = () => {
            const intro = document.getElementById("intro");
            if (!intro) return;

            const introTop = intro.offsetTop;
            const introHeight = intro.offsetHeight;
            const viewH = window.innerHeight;
            const navH = 64;
            const figureH = viewH - navH;

            // Scroll range over which frames play:
            // starts when intro top reaches nav bottom,
            // ends when intro bottom reaches viewport bottom
            const scrollStart = introTop;
            const scrollEnd = introTop + introHeight - figureH;
            const scrollRange = Math.max(scrollEnd - scrollStart, 1);

            const scrollY = window.scrollY;
            const progress = Math.min(Math.max((scrollY - scrollStart) / scrollRange, 0), 1);
            const index = Math.min(Math.floor(progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);

            setFrameIndex((prev) => (prev === index ? prev : index));
        };

        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", update);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className="intro-figure">
            <div className="scroll-figure-frame">
                <img
                    src={frames[frameIndex]}
                    alt=""
                    className="scroll-figure-img"
                />
            </div>
        </div>
    );
}