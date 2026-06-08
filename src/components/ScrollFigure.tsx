import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 26;
const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
    new URL(`../assets/editedFrames/f${i + 1}.png`, import.meta.url).href
);

export default function ScrollFigure() {
    const introRef = useRef<HTMLElement | null>(null);
    const stickyRef = useRef<HTMLElement | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const rafRef = useRef<number | null>(null);
    const frameImagesRef = useRef<HTMLImageElement[]>([]);
    const lastIndexRef = useRef(0);
    const lastScaleRef = useRef(1.08);

    useEffect(() => {
        // Précharger toutes les images
        const promises = frames.map(src => {
            return new Promise<HTMLImageElement>((resolve) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.src = src;
            });
        });
        Promise.all(promises).then(images => {
            frameImagesRef.current = images;
            if (imgRef.current && images[0]) {
                imgRef.current.src = images[0].src;
            }
        });
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
        const progress = calculateProgress();
        const newIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
        const newScale = 1.08 + (1.6 - 1.08) * progress;

        // Changement de l'image uniquement si l'index a changé
        if (newIndex !== lastIndexRef.current) {
            const imgObj = frameImagesRef.current[newIndex];
            if (imgObj && imgRef.current) {
                imgRef.current.src = imgObj.src;
                lastIndexRef.current = newIndex;
            }
        }

        // Changement du scale uniquement si différent (évite d'écrire sans arrêt)
        if (Math.abs(newScale - lastScaleRef.current) > 0.001) {
            if (imgRef.current) {
                imgRef.current.style.transform = `translateX(12%) scale(${newScale})`;
                lastScaleRef.current = newScale;
            }
        }

        rafRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        introRef.current = document.querySelector(".intro-figure");
        stickyRef.current = document.querySelector(".scroll-sticky");

        const onScroll = () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        const onResize = () => {
            // Peut recalculer si besoin
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
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
                        ref={imgRef}
                        alt="Scroll animation frame"
                        className="scroll-figure-img"
                        style={{
                            transform: "translateX(12%) scale(1.08)",
                            willChange: "transform",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}