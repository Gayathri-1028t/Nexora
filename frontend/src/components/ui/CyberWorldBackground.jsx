import { useEffect, useRef } from "react";

function CyberWorldBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle definitions
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    const particles = [];
    const connectionDistance = 120;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2.5 + 1;
        // Cyan (#00E5FF) or Purple (#7C3AED)
        this.color = Math.random() > 0.4 ? "rgba(0, 229, 255, 0.6)" : "rgba(124, 58, 237, 0.5)";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (push away slightly)
        if (mouseRef.current.x !== null) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Data streams (matrix-style falling data packets)
    const streamCount = 8;
    const streams = [];
    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: Math.random() * width,
        y: Math.random() * -height,
        speed: Math.random() * 2 + 1,
        length: Math.floor(Math.random() * 12) + 5,
        chars: Array.from({ length: 20 }, () => (Math.random() > 0.5 ? "1" : "0")),
      });
    }

    const drawGrid = () => {
      // Perspective Grid Lines
      ctx.strokeStyle = "rgba(0, 229, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 80;

      // Draw vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawStreams = () => {
      ctx.font = "9px 'Orbitron', monospace";
      ctx.fillStyle = "rgba(0, 229, 255, 0.25)";
      
      streams.forEach((stream) => {
        for (let i = 0; i < stream.length; i++) {
          const char = stream.chars[(Math.floor(Date.now() / 150) + i) % stream.chars.length];
          const alpha = 1 - i / stream.length;
          ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.15})`;
          ctx.fillText(char, stream.x, stream.y - i * 14);
        }
        
        stream.y += stream.speed;
        if (stream.y > height + 200) {
          stream.y = -100;
          stream.x = Math.random() * width;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing subtle grid
      drawGrid();

      // 2. Draw network connections (nodes)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // 4. Draw data streams
      drawStreams();

      // 5. Draw mouse tracker glow aura
      if (mouseRef.current.x !== null) {
        const radGrd = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.radius
        );
        radGrd.addColorStop(0, "rgba(0, 229, 255, 0.05)");
        radGrd.addColorStop(1, "rgba(0, 229, 255, 0)");
        ctx.fillStyle = radGrd;
        ctx.beginPath();
        ctx.arc(
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default CyberWorldBackground;
