import { useEffect, useRef } from "react";

export default function DotGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let x = mouseX;
    let y = mouseY;

    let lastMove = Date.now();
    let active = true;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMove = Date.now();

      if (!active) {
        el.style.setProperty("--active", "1");
        active = true;
      }
    };

    window.addEventListener("mousemove", onMove);

    const animate = () => {
      // smooth follow (IMPORTANT for softness)
      x += (mouseX - x) * 0.08;
      y += (mouseY - y) * 0.08;

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);

      // slow fade after 1s idle
      if (Date.now() - lastMove > 1000 && active) {
        el.style.setProperty("--active", "0");
        active = false;
      }

      requestAnimationFrame(animate);
    };

    // start active
    el.style.setProperty("--active", "1");

    animate();

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ref} className="dot-grid" />;
}