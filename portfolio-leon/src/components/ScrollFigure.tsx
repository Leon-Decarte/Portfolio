import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 26;
const FRAME_PATH = (n: number) => `/frames/f${n}.png`;

function preloadFrames() {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
    }
}

export default function ScrollFigure() {
    const [frame, setFrame] = useState(1);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        preloadFrames();

        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            rafRef.current = requestAnimationFrame(() => {
                const intro = document.getElementById("intro");
                if (!intro) return;

                const rect = intro.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Progress from when intro hits top → when it leaves viewport
                let progress = -rect.top / (rect.height - windowHeight);

                // clamp
                progress = Math.min(Math.max(progress, 0), 1);

                const index = Math.min(
                    Math.floor(progress * TOTAL_FRAMES) + 1,
                    TOTAL_FRAMES
                );

                setFrame((prev) => (prev === index ? prev : index));
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
    <div className="scroll-figure-frame">
        <img
            src={FRAME_PATH(frame)}
            alt=""
            className="scroll-figure-img"
        />
    </div>
);
}