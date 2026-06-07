// ScrollFigure.tsx – version corrigée (sans snap, sans casse)
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

    // Préchargement
    useEffect(() => {
        frames.forEach(src => { const img = new Image(); img.src = src; });
    }, []);

    const calculateProgress = () => {
        if (!introRef.current || !stickyRef.current) return 0;
        const intro = introRef.current;
        const sticky = stickyRef.current;

        const start = intro.offsetTop;
        const end = intro.offsetTop + intro.offsetHeight - sticky.offsetHeight;
        const scroll = window.scrollY;
        let progress = (scroll - start) / (end - start);
        return Math.min(1, Math.max(0, progress));
    };

    const animate = () => {
        // 1. Progrès brut
        let raw = calculateProgress();

        // 2. Limitation de la variation pour éviter les sauts (CORRECTION 1)
        const MAX_DELTA = 0.03; // ajustable
        let delta = raw - targetProgress.current;
        if (Math.abs(delta) > MAX_DELTA) {
            delta = Math.sign(delta) * MAX_DELTA;
        }
        targetProgress.current += delta;

        // 3. Lissage (un peu plus rapide qu'avant pour suivre)
        smoothedProgress.current += (targetProgress.current - smoothedProgress.current) * 0.2;
        const progress = Math.min(1, Math.max(0, smoothedProgress.current));

        // 4. Frame index
        const newIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
        setFrameIndex(newIndex);

        // 5. Zoom
        const ZOOM_MAX = 1.6;
        const BASE_SCALE = 1.08;
        setScale(BASE_SCALE + (ZOOM_MAX - BASE_SCALE) * progress);

        rafRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        introRef.current = document.querySelector(".intro-figure");
        stickyRef.current = document.querySelector(".scroll-sticky");

        const onScroll = () => {
            // L'animation tourne déjà, on n'a rien à faire ici
            // Mais on force parfois un petit recalage après le scroll
            if (rafRef.current) return; // déjà en cours
            rafRef.current = requestAnimationFrame(animate);
        };

        const onResize = () => {
            targetProgress.current = calculateProgress();
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        // Démarre l'animation
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

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