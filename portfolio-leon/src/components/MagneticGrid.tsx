import { useEffect, useRef } from "react";

export default function MagneticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const spacing = 40;
    const points: any[] = [];

    // create grid points
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        points.push({
          x,
          y,
          baseX: x,
          baseY: y,
        });
      }
    }

    let mouse = { x: width / 2, y: height / 2 };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let p of points) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const radius = 150;

        if (dist < radius) {
          const force = (radius - dist) / radius;

          p.x -= dx * force * 0.08;
          p.y -= dy * force * 0.08;
        }

        // return to original position (spring effect)
        p.x += (p.baseX - p.x) * 0.05;
        p.y += (p.baseY - p.y) * 0.05;
      }

      // draw grid
      ctx.beginPath();
      for (let p of points) {
        ctx.rect(p.x, p.y, 1, 1);
      }
      ctx.fillStyle = "rgba(139, 61, 255, 0.6)";
      ctx.fill();

      requestAnimationFrame(animate);
    }

    animate();

    // resize handling
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}