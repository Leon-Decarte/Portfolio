import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 26;

const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
    new URL(`../assets/editedFrames/f${i + 1}.png`, import.meta.url).href
);

const FACE_POSITION = 0.35;
const ZOOM_MAX = 1.5;

export default function ScrollFigure() {
    const [frameIndex, setFrameIndex] = useState(0);

    const imgRef = useRef<HTMLImageElement>(null);
    const rafRef = useRef<number | null>(null);

    const layoutRef = useRef({
        introTop: 0,
        introHeight: 0,
        frameH: 0,
        frameW: 0,
    });

    const measureLayout = () => {
        const intro = document.getElementById("intro");
        const frameEl = document.querySelector(
            ".scroll-figure-frame"
        ) as HTMLElement | null;

        if (!intro || !frameEl) return;

        layoutRef.current = {
            introTop: intro.offsetTop,
            introHeight: intro.offsetHeight,
            frameH: frameEl.offsetHeight,
            frameW: frameEl.offsetWidth,
        };
    };

    const compute = () => {
        const img = imgRef.current;
        if (!img) return;

        const { introTop, introHeight, frameH, frameW } = layoutRef.current;

        const scrollStart = introTop;
        const scrollEnd = introTop + introHeight - frameH;
        const scrollRange = Math.max(scrollEnd - scrollStart, 1);

        const scrollY = window.scrollY;
        const progress = Math.min(
            Math.max((scrollY - scrollStart) / scrollRange, 0),
            1
        );

        // Frame index
        const index = Math.min(
            Math.floor(progress * TOTAL_FRAMES),
            TOTAL_FRAMES - 1
        );

        setFrameIndex((prev) => (prev === index ? prev : index));

        // Zoom
        const scale = 1 + (ZOOM_MAX - 1) * progress;

        // Image aspect
        const imgNaturalW = img.naturalWidth || 1080;
        const imgNaturalH = img.naturalHeight || 1920;
        const aspectRatio = imgNaturalH / imgNaturalW;

        const renderedW = frameW;
        const renderedH = renderedW * aspectRatio;

        // Face lock
        const faceY = renderedH * FACE_POSITION;
        const offsetY = frameH / 2 - faceY;

        // Apply transform (no React re-render)
        img.style.transform = `
      translateY(${offsetY}px)
      scale(${scale})
    `;
    };

    useEffect(() => {
        // Preload frames
        frames.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(compute);
        };

        const onResize = () => {
            measureLayout();
            compute();
        };

        const firstImg = new Image();
        firstImg.src = frames[0];
        firstImg.onload = () => {
            measureLayout();
            compute();
        };

        measureLayout();
        compute();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className="intro-figure">
            <div className="scroll-figure-frame">
                <img
                    ref={imgRef}
                    src={frames[frameIndex]}
                    alt=""
                    className="scroll-figure-img"
                />
            </div>
        </div>
    );
}