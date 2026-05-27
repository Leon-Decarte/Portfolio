import { useEffect, useRef } from "react";

export default function GridBackground() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let mouseX = 0;
        let mouseY = 0;

        let currentX = window.innerWidth / 2;
        let currentY = window.innerHeight / 2;

        const handleMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("mousemove", handleMove);

        const animate = () => {
            // smooth follow (important for premium feel)
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            el.style.setProperty("--x", `${currentX}px`);
            el.style.setProperty("--y", `${currentY}px`);

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMove);
        };
    }, []);

    return <div ref={ref} className="grid-bg" />;
}