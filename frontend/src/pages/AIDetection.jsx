import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Sparkles, Activity, RefreshCw } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import PageTransition from "../components/ui/PageTransition";

function AIDetection() {
  return (
    <PageTransition>
      <div style={{ padding: "2.5rem", position: "relative", zIndex: 1 }} className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
            AI Threat Detection
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>
            Active heuristic scanner and predictive deep learning anomalies detector.
          </p>
        </div>
        <Button variant="primary" icon={RefreshCw}>
          Retrain Model
        </Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {/* Core Model Status */}
        <Card glow="primary" style={{ flex: "1 1 300px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Sparkles size={20} style={{ color: "#00E5FF" }} />
            <h3 style={{ fontSize: "1rem", color: "#F8FAFC" }}>AI Engine Status</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>Active Model:</span>
              <span style={{ color: "#F8FAFC", fontSize: "0.85rem", fontWeight: "600" }}>CognitiveShield-v4.1</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>Inference Latency:</span>
              <span style={{ color: "#22C55E", fontSize: "0.85rem", fontWeight: "600" }}>1.2ms</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>False Positive Rate:</span>
              <span style={{ color: "#00E5FF", fontSize: "0.85rem", fontWeight: "600" }}>&lt; 0.002%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>Agent Shield:</span>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
        </Card>

        {/* Cognitive Load */}
        <Card glow="secondary" style={{ flex: "1 1 300px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Activity size={20} style={{ color: "#7C3AED" }} />
            <h3 style={{ fontSize: "1rem", color: "#F8FAFC" }}>Cognitive Engine Load</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>CPU Core Allocation:</span>
              <span style={{ color: "#F8FAFC", fontSize: "0.85rem", fontWeight: "600" }}>16 Cores</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>VRAM Utilization:</span>
              <span style={{ color: "#7C3AED", fontSize: "0.85rem", fontWeight: "600" }}>42%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>Analyzed Events/sec:</span>
              <span style={{ color: "#00E5FF", fontSize: "0.85rem", fontWeight: "600" }}>48,290 /s</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>Health Indicator:</span>
              <Badge variant="primary">Stable</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Heuristic Scans Layout */}
      <h2 style={{ fontSize: "1.2rem", color: "#F8FAFC", marginBottom: "1.25rem" }}>Heuristic Layer Integrity</h2>
      <Card glow="primary">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { name: "Layer 1: Binary Hash Matching", rate: "100%", status: "Active", desc: "Instantly checks static malware indices against worldwide hashes." },
            { name: "Layer 2: Sandbox Emulation", rate: "99.8%", status: "Active", desc: "Runs suspicious packets through secure, micro-virtualized hosts." },
            { name: "Layer 3: NLP Sequence Analysis", rate: "98.7%", status: "Idle", desc: "Parses system logs and script streams using transformer neural architectures." },
            { name: "Layer 4: Zero-Day Heuristic", rate: "94.2%", status: "Active", desc: "Tracks operational deviations from baseline server signatures." }
          ].map((layer, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                padding: "1rem",
                background: "rgba(0,0,0,0.15)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "14px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", maxWidth: "450px" }}>
                <strong style={{ color: "#F8FAFC", fontSize: "0.9rem" }}>{layer.name}</strong>
                <span style={{ color: "#94A3B8", fontSize: "0.8rem" }}>{layer.desc}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748B" }}>Confidence Rate: <strong style={{ color: "#00E5FF" }}>{layer.rate}</strong></span>
                <Badge variant={layer.status === "Active" ? "success" : "info"}>{layer.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
      </div>
    </PageTransition>
  );
}

export default AIDetection;
