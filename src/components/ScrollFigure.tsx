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

    const targetProgress = useRef(0);
    const smoothedProgress = useRef(0);
    const rafRef = useRef<number | null>(null);

    // ----------------------------
    // Preload images
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
    // Smooth animation loop (IMPORTANT PART)
    // ----------------------------
    const animate = () => {
        // 1. get raw scroll progress
        targetProgress.current = calculateProgress();

        // 2. smooth it (THIS is your requested line, placed correctly)
        smoothedProgress.current +=
            (targetProgress.current - smoothedProgress.current) * 0.15;

        const progress = smoothedProgress.current;

        // 3. frame calculation
        const frame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(progress * (TOTAL_FRAMES - 1))
        );

        setFrameIndex(frame);

        // 4. scale animation
        const ZOOM_MAX = 1.6;
        const BASE_SCALE = 1.08;

        setScale(BASE_SCALE + (ZOOM_MAX - BASE_SCALE) * progress);

        // 5. keep loop alive
        rafRef.current = requestAnimationFrame(animate);
    };

    // ----------------------------
    // Effects
    // ----------------------------

    
    useEffect(() => {
        introRef.current = document.querySelector(".intro-figure");
        stickyRef.current = document.querySelector(".scroll-sticky");

        const onScroll = () => {
            // DO NOT run update directly — only trigger RAF loop if needed
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        const onResize = () => {
            // optional: force recalculation
            targetProgress.current = calculateProgress();
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        // start animation loop once
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
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