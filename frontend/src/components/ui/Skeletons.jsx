import Card from "./Card";

// Helper pulse item
const PulseBar = ({ width = "100%", height = "12px", borderRadius = "6px", style = {} }) => (
  <div
    className="skeleton-loader"
    style={{
      width,
      height,
      borderRadius,
      ...style,
    }}
  />
);

export function StatCardSkeleton() {
  return (
    <Card glow="none" hoverLift={false} style={{ flex: "1 1 220px", minHeight: "140px", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PulseBar width="45%" height="14px" />
        <PulseBar width="32px" height="32px" borderRadius="8px" />
      </div>
      <PulseBar width="60%" height="28px" />
      <PulseBar width="80%" height="12px" />
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card glow="none" hoverLift={false} style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <div>
          <PulseBar width="160px" height="16px" style={{ marginBottom: "0.35rem" }} />
          <PulseBar width="220px" height="10px" />
        </div>
        <PulseBar width="24px" height="24px" borderRadius="50%" />
      </div>
      {/* simulated chart area */}
      <div style={{ height: "280px", display: "flex", alignItems: "flex-end", gap: "0.5rem", padding: "1rem 0" }}>
        {[70, 45, 90, 55, 80, 40, 95, 60, 85, 30, 75, 50].map((h, i) => (
          <PulseBar key={i} width="100%" height={`${h}%`} style={{ opacity: 0.15 + (i % 3) * 0.1 }} />
        ))}
      </div>
    </Card>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <Card glow="none" hoverLift={false} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem" }}>
        <PulseBar width="24px" height="24px" borderRadius="6px" />
        <PulseBar width="220px" height="18px" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
            <PulseBar width="15%" height="12px" />
            <PulseBar width="40%" height="12px" />
            <PulseBar width="20%" height="12px" />
            <PulseBar width="10%" height="20px" borderRadius="6px" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function MapSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "550px",
        background: "rgba(8, 12, 32, 0.45)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="cyber-grid-scan" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1.5rem" }}>
        <PulseBar width="80px" height="80px" borderRadius="50%" />
        <PulseBar width="280px" height="20px" />
        <PulseBar width="180px" height="12px" />
      </div>
    </div>
  );
}

export function LoginSkeleton() {
  return (
    <div style={{ width: "100%", maxWidth: "460px", background: "rgba(8, 12, 32, 0.65)", backdropFilter: "blur(20px)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
        <PulseBar width="60px" height="60px" borderRadius="16px" />
        <PulseBar width="160px" height="24px" />
        <PulseBar width="240px" height="12px" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1rem" }}>
        <PulseBar width="100%" height="45px" borderRadius="12px" />
        <PulseBar width="100%" height="45px" borderRadius="12px" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <PulseBar width="40%" height="12px" />
          <PulseBar width="30%" height="12px" />
        </div>
        <PulseBar width="100%" height="45px" borderRadius="12px" />
      </div>
    </div>
  );
}

export function ReportsSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <PulseBar width="280px" height="32px" style={{ marginBottom: "0.5rem" }} />
        <PulseBar width="450px" height="16px" />
      </div>
      <div style={{ maxWidth: "650px" }}>
        <Card glow="none" hoverLift={false}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "1rem" }}>
            <PulseBar width="20px" height="20px" borderRadius="4px" />
            <PulseBar width="180px" height="18px" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <PulseBar width="100%" height="48px" />
            <PulseBar width="100%" height="80px" />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <PulseBar width="120px" height="42px" borderRadius="12px" />
              <PulseBar width="120px" height="42px" borderRadius="12px" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }} className="animate-fade-in">
      {/* Hero row mock */}
      <Card glow="none" hoverLift={false} style={{ padding: "2.25rem", background: "rgba(8, 12, 32, 0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
          <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <PulseBar width="120px" height="22px" borderRadius="6px" />
            <PulseBar width="70%" height="32px" />
            <PulseBar width="90%" height="16px" />
          </div>
          <PulseBar width="120px" height="120px" borderRadius="50%" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1.5rem", marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <PulseBar width="80%" height="10px" />
              <PulseBar width="50%" height="20px" />
            </div>
          ))}
        </div>
      </Card>

      {/* Map skeleton */}
      <MapSkeleton />

      {/* Stats Cards Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    </div>
  );
}
