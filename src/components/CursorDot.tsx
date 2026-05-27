import { useEffect, useRef } from "react";

export default function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;

    let mouseX = 0;
    let mouseY = 0;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      // smooth follow (important)
      x += (mouseX - x) * 0.2;
      y += (mouseY - y) * 0.2;

      dot.style.transform = `translate(${x}px, ${y}px)`;

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div ref={ref} className="cursor-dot" />;
}