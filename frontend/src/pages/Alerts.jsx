import { ShieldAlert, RefreshCw } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import PageTransition from "../components/ui/PageTransition";

function Alerts() {
  return (
    <PageTransition>
      <div style={{ position: "relative", zIndex: 1 }} className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
            Threat Alerts Center
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>
            Real-time kernel level compromise notifications and sandbox reports.
          </p>
        </div>
        <Button variant="secondary" icon={RefreshCw}>
          Clear Mitigated
        </Button>
      </div>

      <Card glow="danger">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <ShieldAlert size={20} style={{ color: "#FF4D6D" }} />
          <h3 style={{ fontSize: "1.1rem", color: "#F8FAFC" }}>Incident Monitoring Status</h3>
        </div>
        <p style={{ color: "#E2E8F0", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "1.25rem" }}>
          The alerts management system aggregates file integrity alerts from the active SQLite logger. Please review the live telemetry stream on the main dashboard console for detailed path tracing.
        </p>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Badge variant="danger" showPulse>
            High Threat Watch Active
          </Badge>
          <Badge variant="info">
            Syslog Sink: Operational
          </Badge>
        </div>
      </Card>
      </div>
    </PageTransition>
  );
}

export default Alerts;
