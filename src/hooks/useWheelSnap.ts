// hooks/useWheelSnap.ts
import { useEffect, useRef } from "react";

export function useWheelSnap() {
    const isScrolling = useRef(false);

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

                window.scrollTo({
                    top: aboutTop,
                    behavior: "smooth"
                });

                setTimeout(() => {
                    isScrolling.current = false;
                }, 600);
            }

            // Si about est visible en haut de l'écran
            // ET qu'on scroll vers le haut (deltaY < 0)
            if (aboutRect.top >= -50 && aboutRect.top <= 150 && e.deltaY < 0) {
                e.preventDefault();
                isScrolling.current = true;

                const navHeight = 64;
                const heroTop = hero.offsetTop - navHeight;

                window.scrollTo({
                    top: heroTop,
                    behavior: "smooth"
                });

                setTimeout(() => {
                    isScrolling.current = false;
                }, 600);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);
}