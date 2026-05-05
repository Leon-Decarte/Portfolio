// ScrollFigure.tsx - Version améliorée
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 26;
const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
    new URL(`../assets/editedFrames/f${i + 1}.png`, import.meta.url).href
);

export default function ScrollFigure() {
    const [frameIndex, setFrameIndex] = useState(0);
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const targetProgressRef = useRef(0);
    const currentProgressRef = useRef(0);

    useEffect(() => {
        // Préchargement des images
        frames.forEach(src => { const img = new Image(); img.src = src; });

        const calculateProgress = () => {
    // Récupère les éléments
    const introFigure = document.querySelector(".intro-figure") as HTMLElement;
    const scrollSticky = document.querySelector(".scroll-sticky") as HTMLElement;
    
    if (!introFigure || !scrollSticky) return 0;
    
    // Récupère les positions absolues dans la page
    const introFigureTop = introFigure.offsetTop;
    const introFigureHeight = introFigure.offsetHeight;
    const stickyHeight = scrollSticky.offsetHeight;
    
    // Point de départ du sticky (quand il commence à être visible)
    const startPoint = introFigureTop;
    
    // Point d'arrivée du sticky (quand son bas atteint le bas du parent)
    const endPoint = introFigureTop + introFigureHeight - stickyHeight;
    
    // Position actuelle du scroll
    const currentScroll = window.scrollY;
    
    // Calcul du progrès
    let progress = (currentScroll - startPoint) / (endPoint - startPoint);
    progress = Math.min(Math.max(progress, 0), 1);
    
    return progress;
};

        const updateAnimation = () => {
            const rawProgress = calculateProgress();
            // Lissage exponentiel pour une animation fluide
            targetProgressRef.current = rawProgress;
            currentProgressRef.current = currentProgressRef.current * 0.92 + targetProgressRef.current * 0.08;

            const progress = currentProgressRef.current;

            // Mise à jour frame index
            const newIndex = Math.min(
                Math.floor(progress * TOTAL_FRAMES),
                TOTAL_FRAMES - 1
            );
            setFrameIndex(prev => prev === newIndex ? prev : newIndex);

            // Mise à jour scale (zoom progressif)
            const ZOOM_MAX = 1.5;
            const newScale = 1 + (ZOOM_MAX - 1) * progress;
            setScale(newScale);

            rafRef.current = requestAnimationFrame(updateAnimation);
        };
        
        const handleScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(updateAnimation);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        handleScroll(); // Initialisation

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="intro-figure">
            <div className="scroll-sticky">
                <div className="scroll-figure-frame">
                    <img
                        src={frames[frameIndex]}
                        alt="Scroll animation frame"
                        className="scroll-figure-img"
                        style={{
                            transform: `scale(${scale})`,
                            transition: 'transform 0.05s linear'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}