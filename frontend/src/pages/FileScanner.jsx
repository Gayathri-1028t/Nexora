import { useState } from "react";
import { Upload, ShieldCheck, FileWarning, Search, ChevronRight } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";

function FileScanner() {
  const [dragActive, setDragActive] = useState(false);
  const [hashQuery, setHashQuery] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    alert("Analyzing file in secure isolated sandbox... ✅");
  };

  return (
    <div style={{ padding: "2.5rem", position: "relative", zIndex: 1 }} className="container animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
          Sandbox File Integrity Inspector
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>
          Drag-and-drop suspicious binaries, log extracts, or executables into our isolated hypervisor container for dynamic runtime heuristics.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginBottom: "2.5rem" }}>
        {/* Drag and Drop Zone */}
        <div style={{ flex: "1 1 500px" }}>
          <Card
            glow={dragActive ? "primary" : "none"}
            hoverLift={false}
            style={{
              height: "280px",
              border: dragActive ? "2px dashed #00E5FF" : "1px dashed rgba(255,255,255,0.15)",
              background: dragActive ? "rgba(0, 229, 255, 0.05)" : "rgba(8, 12, 32, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem",
              cursor: "pointer",
            }}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(0, 229, 255, 0.08)",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00E5FF",
              }}
            >
              <Upload size={24} />
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "1rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
                Drag and Drop File to Sandbox
              </h3>
              <p style={{ color: "#64748B", fontSize: "0.8rem" }}>
                Supports exe, dll, dmg, sh, zip, and pdf. Max file size: 50MB.
              </p>
            </div>
            <Button variant="secondary" size="sm">
              Browse Local files
            </Button>
          </Card>
        </div>

        {/* Checksum Hash Database Lookup */}
        <Card glow="secondary" style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
              IOC / Hash Search
            </h3>
            <p style={{ color: "#94A3B8", fontSize: "0.8rem" }}>
              Search known Indicator of Compromise (IOC) checksum hashes (SHA-256 / MD5).
            </p>
          </div>

          <Input
            placeholder="Enter SHA-256 / SHA-1 / MD5 hash..."
            value={hashQuery}
            onChange={(e) => setHashQuery(e.target.value)}
            startIcon={Search}
          />

          <Button
            variant="primary"
            onClick={() => alert(`Searching IOC records for ${hashQuery}...`)}
            disabled={!hashQuery}
          >
            Inspect Database
          </Button>

          <div
            style={{
              padding: "0.75rem",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "10px",
              fontSize: "0.75rem",
              color: "#94A3B8",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <strong>Note:</strong> Integrates with VirusTotal database index queries and CrowdStrike Falcon indicators list.
          </div>
        </Card>
      </div>

      {/* Sandbox Integrity Feed */}
      <h2 style={{ fontSize: "1.2rem", color: "#F8FAFC", marginBottom: "1.25rem" }}>Recent Integrity Checks</h2>
      <Card glow="primary">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { file: "credential_dumper.x64.exe", path: "/var/tmp/", hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", rating: "CRITICAL", date: "Today 12:45" },
            { file: "apache_logger_util.sh", path: "/usr/local/bin/", hash: "8f4a3b7d1e0c9f8a8b8c2d1e0c2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f", rating: "SECURE", date: "Yesterday" },
            { file: "update_patch_agent.dmg", path: "/Users/admin/Downloads/", hash: "2d1c0f9e8d7c6b5a4a3b2b1a0f9e8d7c6b5a4a3b2b1a0f9e8d7c6b5a4a3b2b1a", rating: "SUSPICIOUS", date: "2 days ago" }
          ].map((item, index) => (
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
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: item.rating === "CRITICAL" ? "rgba(255, 77, 109, 0.08)" : item.rating === "SUSPICIOUS" ? "rgba(250, 204, 21, 0.08)" : "rgba(34, 197, 94, 0.08)",
                    border: `1px solid ${item.rating === "CRITICAL" ? "rgba(255, 77, 109, 0.2)" : item.rating === "SUSPICIOUS" ? "rgba(250, 204, 21, 0.2)" : "rgba(34, 197, 94, 0.2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.rating === "CRITICAL" ? "#FF4D6D" : item.rating === "SUSPICIOUS" ? "#FACC15" : "#22C55E",
                  }}
                >
                  {item.rating === "SECURE" ? <ShieldCheck size={18} /> : <FileWarning size={18} />}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
                  <strong style={{ color: "#F8FAFC", fontSize: "0.9rem" }}>{item.file}</strong>
                  <span style={{ color: "#64748B", fontSize: "0.75rem", fontFamily: "monospace" }}>SHA: {item.hash.substring(0, 24)}...</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748B" }}>{item.date}</span>
                <Badge variant={item.rating === "CRITICAL" ? "danger" : item.rating === "SUSPICIOUS" ? "warning" : "success"}>
                  {item.rating}
                </Badge>
                <ChevronRight size={16} style={{ color: "#64748B" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default FileScanner;
