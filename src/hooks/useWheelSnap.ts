// hooks/useWheelSnap.ts
import { useEffect, useRef } from "react";

export default function useWheelSnap() {
    const isScrolling = useRef(false);
    const scrollTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Ne rien faire si on est déjà en train de scroller automatiquement
            if (isScrolling.current) return;

            const hero = document.getElementById("hero");
            const about = document.getElementById("about");

            if (!hero || !about) return;

            const heroRect = hero.getBoundingClientRect();
            const aboutRect = about.getBoundingClientRect();

            // Si le hero est visible en haut de l'écran (entre -50px et 150px)
            // ET qu'on scroll vers le bas (deltaY > 0)
            if (heroRect.top >= -50 && heroRect.top <= 150 && e.deltaY > 0) {
                e.preventDefault();
                isScrolling.current = true;

                const navHeight = 64;
                const aboutTop = about.offsetTop - navHeight;
                
                // Scroll plus lent - durée augmentée
                window.scrollTo({
                    top: aboutTop,
                    behavior: "smooth"
                });

                setTimeout(() => {
                    isScrolling.current = false;
                }, 1000); // Attend 1 seconde avant de réactiver
            }

            // Si about est visible en haut de l'écran
            // ET qu'on scroll vers le haut (deltaY < 0)
            if (aboutRect.top >= -50 && aboutRect.top <= 150 && e.deltaY < 0) {
                e.preventDefault();
                isScrolling.current = true;

                const navHeight = 64;
                const heroTop = hero.offsetTop - navHeight;
                
                // Scroll plus lent - durée augmentée
                window.scrollTo({
                    top: heroTop,
                    behavior: "smooth"
                });

                setTimeout(() => {
                    isScrolling.current = false;
                }, 1000); // Attend 1 seconde avant de réactiver
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, []);
}