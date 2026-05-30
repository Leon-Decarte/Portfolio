// ScrollFigure.tsx - Stable version
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 26;

const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
    new URL(`../assets/editedFrames/f${i + 1}.png`, import.meta.url).href
);

export default function ScrollFigure() {
    const [frameIndex, setFrameIndex] = useState(0);
    const [scale, setScale] = useState(1);

    const introRef = useRef<HTMLElement | null>(null);
    const stickyRef = useRef<HTMLElement | null>(null);

    const progressRef = useRef(0);

    // ----------------------------
    // Preload images (safe version)
    // ----------------------------
    useEffect(() => {
        frames.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // ----------------------------
    // Progress calculation
    // ----------------------------
    const calculateProgress = () => {
        if (!introRef.current || !stickyRef.current) return 0;

        const intro = introRef.current;
        const sticky = stickyRef.current;

        const start = intro.offsetTop;
        const end = intro.offsetTop + intro.offsetHeight - sticky.offsetHeight;

        const scroll = window.scrollY;

        const progress = (scroll - start) / (end - start);

        return Math.min(1, Math.max(0, progress));
    };

    // ----------------------------
    // Update animation
    // ----------------------------
    const update = () => {
        const progress = calculateProgress();
        progressRef.current = progress;

        const frame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(progress * (TOTAL_FRAMES - 1))
        );

        setFrameIndex(frame);

        const ZOOM_MAX = 1.6;
        const BASE_SCALE = 1.08;

        setScale(BASE_SCALE + (ZOOM_MAX - BASE_SCALE) * progress);
    };

    // ----------------------------
    // Effects
    // ----------------------------
    useEffect(() => {
        introRef.current = document.querySelector(".intro-figure");
        stickyRef.current = document.querySelector(".scroll-sticky");

        const onScroll = () => requestAnimationFrame(update);
        const onResize = () => update();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        // initial run (important for correct first frame)
        update();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // ----------------------------
    // Render
    // ----------------------------
    return (
        <div ref={introRef as any} className="intro-figure reveal-up" data-delay="6">
            <div ref={stickyRef as any} className="scroll-sticky">
                <div className="scroll-figure-frame">
                    <img
                        src={frames[frameIndex]}
                        alt="Scroll animation frame"
                        className="scroll-figure-img"
                        style={{
                            transform: `translateX(12%) scale(${scale})`,
                            willChange: "transform",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}