import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import Badge from "./Badge";
import { Globe, Terminal } from "lucide-react";

function CyberAttackMap() {
  const canvasRef = useRef(null);
  const [feed, setFeed] = useState([
    { id: 1, action: "DDoS Attempt", src: "185.90.11.4", target: "Node-02", country: "RU" },
    { id: 2, action: "Port Scan", src: "45.12.44.89", target: "Gateway-East", country: "CN" },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 500);
    let height = (canvas.height = 280);

    // Continent coordinates (simplified dot-matrix layout)
    const worldDots = [
      // North America
      { x: 0.15, y: 0.3 }, { x: 0.2, y: 0.25 }, { x: 0.25, y: 0.22 }, { x: 0.18, y: 0.35 },
      { x: 0.22, y: 0.38 }, { x: 0.25, y: 0.4 }, { x: 0.28, y: 0.35 }, { x: 0.22, y: 0.48 },
      // South America
      { x: 0.32, y: 0.65 }, { x: 0.35, y: 0.72 }, { x: 0.38, y: 0.8 }, { x: 0.34, y: 0.58 },
      // Africa
      { x: 0.5, y: 0.55 }, { x: 0.52, y: 0.62 }, { x: 0.55, y: 0.7 }, { x: 0.58, y: 0.75 },
      { x: 0.48, y: 0.48 }, { x: 0.54, y: 0.52 },
      // Europe
      { x: 0.48, y: 0.25 }, { x: 0.52, y: 0.22 }, { x: 0.55, y: 0.28 }, { x: 0.5, y: 0.32 },
      { x: 0.45, y: 0.3 },
      // Asia
      { x: 0.62, y: 0.22 }, { x: 0.68, y: 0.25 }, { x: 0.72, y: 0.2 }, { x: 0.78, y: 0.18 },
      { x: 0.65, y: 0.32 }, { x: 0.7, y: 0.38 }, { x: 0.75, y: 0.35 }, { x: 0.82, y: 0.28 },
      { x: 0.68, y: 0.48 }, { x: 0.74, y: 0.45 }, { x: 0.72, y: 0.52 },
      // Australia
      { x: 0.82, y: 0.72 }, { x: 0.85, y: 0.76 }, { x: 0.88, y: 0.74 },
    ];

    // Major defense nodes
    const defenseNodes = [
      { x: width * 0.22, y: height * 0.38, name: "US-West-01", color: "#00E5FF" },
      { x: width * 0.52, y: height * 0.22, name: "EU-Central-02", color: "#7C3AED" },
      { x: width * 0.72, y: height * 0.42, name: "APAC-East-01", color: "#00E5FF" },
    ];

    // Attacks array
    const activeAttacks = [];

    const triggerAttack = () => {
      const sourceCountries = [
        { name: "China", code: "CN", x: 0.7, y: 0.3 },
        { name: "Russia", code: "RU", x: 0.68, y: 0.2 },
        { name: "Netherlands", code: "NL", x: 0.48, y: 0.26 },
        { name: "Ukraine", code: "UA", x: 0.54, y: 0.28 },
        { name: "Brazil", code: "BR", x: 0.35, y: 0.68 },
      ];
      
      const source = sourceCountries[Math.floor(Math.random() * sourceCountries.length)];
      const targetNode = defenseNodes[Math.floor(Math.random() * defenseNodes.length)];
      const actions = ["SQL Injection", "DDoS Burst", "Port Hijack", "Credential Stuffing", "Buffer Overflow"];

      const attack = {
        sx: width * source.x,
        sy: height * source.y,
        tx: targetNode.x,
        ty: targetNode.y,
        progress: 0,
        speed: Math.random() * 0.02 + 0.015,
        color: Math.random() > 0.4 ? "#FF4D6D" : "#FACC15",
        impactRadius: 0,
        impactMax: 18,
      };

      activeAttacks.push(attack);

      // Add to text feed state
      const ips = ["185.12.80.3", "45.90.1.18", "203.88.92.122", "94.22.184.55", "102.16.89.5"];
      setFeed((prev) => [
        {
          id: Date.now(),
          action: actions[Math.floor(Math.random() * actions.length)],
          src: ips[Math.floor(Math.random() * ips.length)],
          target: targetNode.name,
          country: source.code,
        },
        ...prev.slice(0, 4),
      ]);
    };

    // Trigger attacks periodically
    const timer = setInterval(triggerAttack, 2500);

    const drawMap = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      worldDots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x * width, dot.y * height, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawNodes = () => {
      defenseNodes.forEach((node) => {
        // Draw outer glow aura
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = node.color === "#00E5FF" ? "rgba(0, 229, 255, 0.15)" : "rgba(124, 58, 237, 0.15)";
        ctx.fill();

        // Draw inner dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });
    };

    const drawAttacks = () => {
      for (let i = activeAttacks.length - 1; i >= 0; i--) {
        const a = activeAttacks[i];
        
        if (a.progress < 1) {
          // Calculate projectile position along curve (quadratic bezier)
          const cx = (a.sx + a.tx) / 2;
          const cy = Math.min(a.sy, a.ty) - 50; // Arc peak

          const t = a.progress;
          // Bezier formula
          const x = (1 - t) * (1 - t) * a.sx + 2 * (1 - t) * t * cx + t * t * a.tx;
          const y = (1 - t) * (1 - t) * a.sy + 2 * (1 - t) * t * cy + t * t * a.ty;

          // Draw tracer line (fading bezier)
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.quadraticCurveTo(cx, cy, x, y);
          ctx.strokeStyle = `rgba(${a.color === "#FF4D6D" ? "255, 77, 109" : "250, 204, 21"}, 0.2)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Draw laser head
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = a.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = a.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          a.progress += a.speed;
        } else {
          // Impact animation ring
          if (a.impactRadius < a.impactMax) {
            ctx.beginPath();
            ctx.arc(a.tx, a.ty, a.impactRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${a.color === "#FF4D6D" ? "255, 77, 109" : "250, 204, 21"}, ${
              1 - a.impactRadius / a.impactMax
            })`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            a.impactRadius += 1.2;
          } else {
            // Remove attack
            activeAttacks.splice(i, 1);
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Background mesh lines
      ctx.strokeStyle = "rgba(0, 229, 255, 0.02)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      drawMap();
      drawNodes();
      drawAttacks();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 280;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Card
      glow="primary"
      hoverLift={false}
      style={{
        flex: "2 1 500px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: "380px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          paddingBottom: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Globe size={18} style={{ color: "#00E5FF" }} />
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.9rem",
              color: "#F8FAFC",
              letterSpacing: "0.05em",
            }}
          >
            LIVE CYBER ATTACK MATRIX MAP
          </h3>
        </div>
        <Badge variant="danger" showPulse>
          THREAT DETECTOR ACTIVE
        </Badge>
      </div>

      {/* Canvas World Area */}
      <div style={{ flex: 1, position: "relative", minHeight: "280px" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Terminal Mini Attack Feed */}
      <div
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.05)",
          padding: "0.625rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          fontFamily: "monospace",
          fontSize: "0.7rem",
          color: "#94A3B8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "#FF4D6D", fontWeight: "700" }}>
          <Terminal size={10} />
          <span>INTRUSION DETECTION LOGGER (LIVE FEED)</span>
        </div>
        {feed.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>
             <span>
               [SRC: <strong style={{ color: "#F8FAFC" }}>{item.src}</strong> ({item.country})] {"->"} Action:{" "}
               <strong style={{ color: "#FF4D6D" }}>{item.action}</strong>
             </span>
            <span style={{ color: "#00E5FF" }}>TARGET: {item.target}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default CyberAttackMap;
