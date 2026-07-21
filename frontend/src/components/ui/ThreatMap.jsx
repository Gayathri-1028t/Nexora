import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Shield, Terminal, Activity, Brain, RefreshCw } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { MapSkeleton } from "./Skeletons";
import "leaflet/dist/leaflet.css";

// 21 Active Enterprise SOC Threat Locations
const INITIAL_LOCATIONS = [
  { country: "USA", lat: 37.0902, lng: -95.7129, severity: "Critical", threatType: "Ransomware Breach", srcIP: "185.220.101.4", targetService: "auth-core-k8s", attackCount: 342, aiConfidence: 98.4, responseStatus: "ISOLATED", lastSeen: "Just now" },
  { country: "Canada", lat: 56.1304, lng: -106.3468, severity: "Low", threatType: "Port Scan", srcIP: "45.12.80.19", targetService: "web-ingress", attackCount: 45, aiConfidence: 89.2, responseStatus: "MITIGATED", lastSeen: "12s ago" },
  { country: "Mexico", lat: 23.6345, lng: -102.5528, severity: "Medium", threatType: "SQL Injection", srcIP: "201.140.92.3", targetService: "billing-db", attackCount: 112, aiConfidence: 92.1, responseStatus: "CONTAINED", lastSeen: "4s ago" },
  { country: "Brazil", lat: -14.2350, lng: -51.9253, severity: "High", threatType: "DDoS Burst", srcIP: "191.240.12.89", targetService: "cdn-edge-02", attackCount: 220, aiConfidence: 96.5, responseStatus: "BLOCK_PENDING", lastSeen: "2s ago" },
  { country: "UK", lat: 55.3781, lng: -3.4360, severity: "High", threatType: "Credential Stuffing", srcIP: "82.165.44.12", targetService: "ad-ldap-service", attackCount: 198, aiConfidence: 95.8, responseStatus: "CONTAINED", lastSeen: "1s ago" },
  { country: "Germany", lat: 51.1657, lng: 10.4515, severity: "Critical", threatType: "Zero-Day Exploit", srcIP: "109.230.220.11", targetService: "kernel-api-v3", attackCount: 412, aiConfidence: 99.1, responseStatus: "BLOCK_PENDING", lastSeen: "Just now" },
  { country: "France", lat: 46.2276, lng: 2.2137, severity: "Medium", threatType: "Phishing Payload", srcIP: "194.50.16.24", targetService: "mail-gateway", attackCount: 88, aiConfidence: 91.4, responseStatus: "MITIGATED", lastSeen: "6s ago" },
  { country: "Spain", lat: 40.4637, lng: -3.7492, severity: "Low", threatType: "Directory Traversal", srcIP: "85.214.90.150", targetService: "file-storage", attackCount: 31, aiConfidence: 87.5, responseStatus: "MITIGATED", lastSeen: "15s ago" },
  { country: "Russia", lat: 61.5240, lng: 105.3188, severity: "Critical", threatType: "Kernel call Hijack", srcIP: "95.108.21.32", targetService: "root-hypervisor", attackCount: 512, aiConfidence: 99.8, responseStatus: "ISOLATED", lastSeen: "Just now" },
  { country: "UAE", lat: 23.4241, lng: 53.8478, severity: "Medium", threatType: "XSS Infiltration", srcIP: "91.74.180.25", targetService: "customer-portal", attackCount: 105, aiConfidence: 93.2, responseStatus: "CONTAINED", lastSeen: "5s ago" },
  { country: "Saudi Arabia", lat: 23.8859, lng: 45.0792, severity: "High", threatType: "Brute Force Logins", srcIP: "37.220.114.5", targetService: "ssh-jump-host", attackCount: 265, aiConfidence: 97.2, responseStatus: "BLOCK_PENDING", lastSeen: "3s ago" },
  { country: "India", lat: 20.5937, lng: 78.9629, severity: "Critical", threatType: "API Rate Abuse", srcIP: "203.197.80.44", targetService: "payment-gateway", attackCount: 389, aiConfidence: 98.9, responseStatus: "CONTAINED", lastSeen: "Just now" },
  { country: "Pakistan", lat: 30.3753, lng: 69.3451, severity: "Medium", threatType: "SSRF Attempt", srcIP: "111.68.96.11", targetService: "internal-metadata", attackCount: 76, aiConfidence: 90.6, responseStatus: "MITIGATED", lastSeen: "8s ago" },
  { country: "China", lat: 35.8617, lng: 104.1954, severity: "Critical", threatType: "Data Exfiltration", srcIP: "220.181.108.4", targetService: "intel-property-db", attackCount: 489, aiConfidence: 99.4, responseStatus: "ISOLATED", lastSeen: "Just now" },
  { country: "Japan", lat: 36.2048, lng: 138.2529, severity: "High", threatType: "DNS Poisoning", srcIP: "210.140.10.12", targetService: "dns-resolver-dnsSEC", attackCount: 172, aiConfidence: 94.7, responseStatus: "CONTAINED", lastSeen: "3s ago" },
  { country: "South Korea", lat: 35.9078, lng: 127.7669, severity: "Medium", threatType: "HTTP Flood", srcIP: "112.170.80.33", targetService: "cdn-edge-09", attackCount: 143, aiConfidence: 93.9, responseStatus: "MITIGATED", lastSeen: "4s ago" },
  { country: "Singapore", lat: 1.3521, lng: 103.8198, severity: "High", threatType: "Token Hijack", srcIP: "180.240.5.15", targetService: "session-redis", attackCount: 215, aiConfidence: 96.0, responseStatus: "CONTAINED", lastSeen: "2s ago" },
  { country: "Indonesia", lat: -0.7893, lng: 113.9213, severity: "Low", threatType: "Ping sweep", srcIP: "114.120.44.5", targetService: "vpn-concentrator", attackCount: 39, aiConfidence: 86.4, responseStatus: "MITIGATED", lastSeen: "18s ago" },
  { country: "Australia", lat: -25.2744, lng: 133.7751, severity: "High", threatType: "BGP Hijack", srcIP: "139.130.4.5", targetService: "bgp-router-core", attackCount: 204, aiConfidence: 97.0, responseStatus: "CONTAINED", lastSeen: "1s ago" },
  { country: "South Africa", lat: -30.5595, lng: 22.9375, severity: "Medium", threatType: "LFI Intrusion", srcIP: "197.242.18.90", targetService: "hr-reporting", attackCount: 92, aiConfidence: 91.0, responseStatus: "MITIGATED", lastSeen: "7s ago" },
  { country: "Nigeria", lat: 9.0820, lng: 8.6753, severity: "Low", threatType: "Mail Spam Burst", srcIP: "102.164.88.2", targetService: "smtp-relay", attackCount: 52, aiConfidence: 88.0, responseStatus: "MITIGATED", lastSeen: "10s ago" }
];

// Helper styles
const panelItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.2)",
  padding: "0.4rem 0.625rem",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.04)"
};

const panelLabelStyle = {
  fontSize: "0.58rem",
  color: "#64748B",
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: "0.04em",
  fontWeight: "700"
};

// Helper to create glowing HTML map marker DivIcon
const createCustomIcon = (severity) => {
  const severityClass = `marker-${severity.toLowerCase()}`;
  return L.divIcon({
    className: `map-marker-pulse ${severityClass}`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
    html: `<div style="width: 10px; height: 10px; border-radius: 50%; background: inherit; border: 1px solid rgba(255,255,255,0.4);"></div>`
  });
};

// Component to handle map zooming and panning dynamically
function MapFocusController({ focusedLocation }) {
  const map = useMap();
  useEffect(() => {
    if (focusedLocation) {
      map.flyTo([focusedLocation.lat, focusedLocation.lng], 5, {
        animate: true,
        duration: 1.5
      });
    } else {
      map.flyTo([20, 0], 2, {
        animate: true,
        duration: 1.5
      });
    }
  }, [focusedLocation, map]);
  return null;
}

// Component to render animated curved SVG attack paths on top of Leaflet map
function AttackLinesOverlay({ attacks, locations }) {
  const map = useMap();
  const [coords, setCoords] = useState([]);

  const updateCoordinates = () => {
    const lines = attacks.map(attack => {
      const sourceLoc = locations.find(l => l.country === attack.from);
      const targetLoc = locations.find(l => l.country === attack.to);
      if (!sourceLoc || !targetLoc) return null;

      const sourcePoint = map.latLngToContainerPoint([sourceLoc.lat, sourceLoc.lng]);
      const targetPoint = map.latLngToContainerPoint([targetLoc.lat, targetLoc.lng]);

      return {
        id: attack.id,
        x1: sourcePoint.x,
        y1: sourcePoint.y,
        x2: targetPoint.x,
        y2: targetPoint.y,
        color: attack.color
      };
    }).filter(Boolean);

    setCoords(lines);
  };

  useEffect(() => {
    updateCoordinates();
    
    // Bind to Leaflet view change events to keep SVG synced
    map.on("zoomend", updateCoordinates);
    map.on("move", updateCoordinates);
    map.on("moveend", updateCoordinates);
    map.on("resize", updateCoordinates);
    map.on("viewreset", updateCoordinates);

    return () => {
      map.off("zoomend", updateCoordinates);
      map.off("move", updateCoordinates);
      map.off("moveend", updateCoordinates);
      map.off("resize", updateCoordinates);
      map.off("viewreset", updateCoordinates);
    };
  }, [attacks, locations, map]);

  return (
    <svg style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 500
    }}>
      <defs>
        <filter id="cyanBeamGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {coords.map((line) => {
        const dx = line.x2 - line.x1;
        const dy = line.y2 - line.y1;
        
        // Bend the SVG paths upwards in a nice arc depending on distance
        const cx = (line.x1 + line.x2) / 2 - (dy * 0.15);
        const cy = (line.y1 + line.y2) / 2 + (dx * 0.15);

        const pathD = `M${line.x1},${line.y1} Q${cx},${cy} ${line.x2},${line.y2}`;

        return (
          <g key={line.id}>
            {/* Glowing background halo path */}
            <path
              d={pathD}
              fill="none"
              stroke={line.color}
              strokeWidth="3.5"
              strokeOpacity="0.12"
              style={{ filter: "blur(2px)" }}
            />
            {/* Core tracer line */}
            <path
              d={pathD}
              fill="none"
              stroke={line.color}
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />
            {/* Real-time moving packet dot */}
            <circle r="3.5" fill="#00E5FF" style={{ filter: "url(#cyanBeamGlow)" }}>
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                path={pathD}
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

// Custom Tooltip component
const TooltipContent = ({ location }) => {
  const severityColors = {
    Critical: "#FF4D6D",
    High: "#F97316",
    Medium: "#FACC15",
    Low: "#22C55E"
  };

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      color: "#F8FAFC",
      fontSize: "0.775rem",
      minWidth: "220px",
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        paddingBottom: "0.4rem",
        marginBottom: "0.2rem"
      }}>
        <span style={{ fontWeight: "700", fontFamily: "'Orbitron', sans-serif", display: "flex", alignItems: "center", gap: "0.38rem" }}>
          <Globe size={12} style={{ color: "#00E5FF" }} />
          {location.country.toUpperCase()}
        </span>
        <span style={{
          fontSize: "0.625rem",
          fontWeight: "800",
          color: severityColors[location.severity],
          background: `${severityColors[location.severity]}15`,
          border: `1px solid ${severityColors[location.severity]}40`,
          padding: "2px 6px",
          borderRadius: "4px",
          fontFamily: "'Orbitron', sans-serif"
        }}>
          {location.severity.toUpperCase()}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94A3B8" }}>Threat Type:</span>
          <span style={{ fontWeight: "600", color: "#FF4D6D" }}>{location.threatType}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94A3B8" }}>Source IP:</span>
          <span style={{ fontFamily: "monospace", color: "#00E5FF", fontWeight: "600" }}>{location.srcIP}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94A3B8" }}>Target:</span>
          <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>{location.targetService}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94A3B8" }}>Attacks:</span>
          <span style={{ fontWeight: "700", color: "#F8FAFC" }}>{location.attackCount}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94A3B8" }}>AI Confidence:</span>
          <span style={{ fontWeight: "700", color: "#22C55E" }}>{location.aiConfidence}%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94A3B8" }}>Response:</span>
          <span style={{
            fontWeight: "800",
            color: location.responseStatus === "CONTAINED" || location.responseStatus === "MITIGATED" ? "#22C55E" : "#F97316",
            fontSize: "0.65rem",
            letterSpacing: "0.05em",
            fontFamily: "'Orbitron', sans-serif"
          }}>{location.responseStatus}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "0.3rem", marginTop: "0.2rem", color: "#64748B" }}>
          <span>Last Telemetry:</span>
          <span>{location.lastSeen}</span>
        </div>
      </div>
    </div>
  );
};

// Sub-component: AI Risk Score Circular Progress gauge
const RiskMeter = ({ score }) => {
  const radius = 22;
  const stroke = 3.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getRiskColor = (s) => {
    if (s > 75) return "#FF4D6D"; // Red
    if (s > 50) return "#F97316"; // Orange
    if (s > 25) return "#FACC15"; // Yellow
    return "#22C55E"; // Green
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
      background: "rgba(8, 12, 32, 0.5)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "16px",
      padding: "0.4rem 1rem",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
    }}>
      <div style={{ position: "relative", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg height="42" width="42" style={{ transform: "rotate(-90deg)" }}>
          <circle
            stroke="rgba(255, 255, 255, 0.04)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="21"
            cy="21"
          />
          <motion.circle
            stroke={getRiskColor(score)}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx="21"
            cy="21"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <span style={{
          position: "absolute",
          fontSize: "0.8rem",
          fontWeight: "800",
          fontFamily: "'Orbitron', sans-serif",
          color: getRiskColor(score),
          textShadow: `0 0 6px ${getRiskColor(score)}40`
        }}>{score}%</span>
      </div>
      <div>
        <div style={{ fontSize: "0.58rem", color: "#64748B", fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.05em", fontWeight: "700" }}>
          AI GLOBAL RISK RATING
        </div>
        <div style={{ fontSize: "0.825rem", fontWeight: "700", fontFamily: "'Orbitron', sans-serif", color: "#F8FAFC" }}>
          {score > 75 ? "CRITICAL ALERT" : score > 50 ? "ELEVATED LEVEL" : "GUARDED"}
        </div>
      </div>
    </div>
  );
};

// Sub-component: Floating Left Panel (Country Statistics)
const LeftStatsPanel = ({ topTargeted, totalCountries, stats, nested }) => {
  return (
    <div style={nested ? {} : {
      position: "absolute",
      top: "15px",
      left: "15px",
      zIndex: 600,
      width: "250px",
      pointerEvents: "auto"
    }}>
      <div style={{
        background: "rgba(8, 12, 32, 0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "1rem",
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.6)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", borderBottom: "1px solid rgba(255,255,0.06)", paddingBottom: "0.5rem" }}>
          <Brain size={14} style={{ color: "#7C3AED" }} />
          <span style={{ fontSize: "0.75rem", fontFamily: "'Orbitron', sans-serif", fontWeight: "700", color: "#F8FAFC", letterSpacing: "0.05em" }}>
            COUNTRY TELEMETRY
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>TOP TARGETED</span>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#FF4D6D", fontFamily: "'Orbitron', sans-serif" }}>
              {topTargeted ? topTargeted.country : "N/A"}
            </span>
          </div>

          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>HIGHEST THREAT REGION</span>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#F97316", fontFamily: "'Orbitron', sans-serif" }}>
              APAC-EAST
            </span>
          </div>

          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>ACTIVE HOST COUNTRIES</span>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#F8FAFC", fontFamily: "monospace" }}>
              <AnimatedCounter value={totalCountries} />
            </span>
          </div>

          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>BLOCKED ATTACKS TODAY</span>
            <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#22C55E", fontFamily: "monospace", textShadow: "0 0 6px rgba(34,197,94,0.3)" }}>
              <AnimatedCounter value={stats.blockedAttacks} />
            </span>
          </div>

          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>AI DETECTION ACCURACY</span>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#00E5FF", fontFamily: "monospace" }}>
              <AnimatedCounter value={stats.accuracy} type="float" />%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component: Floating Right Panel (Live SOC status)
const RightSocPanel = ({ stats, criticalCount, nested }) => {
  return (
    <div style={nested ? {} : {
      position: "absolute",
      top: "15px",
      right: "15px",
      zIndex: 600,
      width: "250px",
      pointerEvents: "auto"
    }}>
      <div style={{
        background: "rgba(8, 12, 32, 0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "1rem",
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.6)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Activity size={14} style={{ color: "#00E5FF" }} />
            <span style={{ fontSize: "0.75rem", fontFamily: "'Orbitron', sans-serif", fontWeight: "700", color: "#F8FAFC", letterSpacing: "0.05em" }}>
              LIVE SOC STREAM
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              boxShadow: "0 0 8px #22C55E",
              animation: "pulse 1.2s infinite"
            }} />
            <span style={{ fontSize: "0.58rem", color: "#22C55E", fontWeight: "800", fontFamily: "'Orbitron', sans-serif" }}>LIVE</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>CYBER POLLING INTERVAL</span>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#00E5FF", fontFamily: "'Orbitron', sans-serif" }}>
              EVERY 5s
            </span>
          </div>

          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>COUNTRIES MONITORED</span>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#F8FAFC", fontFamily: "monospace" }}>
              <AnimatedCounter value={21} /> Nodes
            </span>
          </div>

          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>TOTAL THREATS LOGGED</span>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#FACC15", fontFamily: "monospace" }}>
              <AnimatedCounter value={stats.threatsToday} />
            </span>
          </div>

          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>CRITICAL SEVERITY STRIKES</span>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#FF4D6D", fontFamily: "monospace" }}>
              <AnimatedCounter value={criticalCount} /> Active
            </span>
          </div>

          <div style={panelItemStyle}>
            <span style={panelLabelStyle}>COGNITIVE HEURISTICS</span>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#22C55E", fontFamily: "'Orbitron', sans-serif" }}>
              OPTIMIZED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component: Bottom Right Legend
const MapLegend = () => {
  const items = [
    { label: "Critical", color: "#FF4D6D" },
    { label: "High", color: "#F97316" },
    { label: "Medium", color: "#FACC15" },
    { label: "Low", color: "#22C55E" }
  ];

  return (
    <div style={{
      background: "rgba(8, 12, 32, 0.8)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      padding: "0.5rem 0.75rem",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
      display: "flex",
      gap: "0.75rem",
      alignItems: "center"
    }}>
      {items.map((item, idx) => (
        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <span style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: item.color,
            boxShadow: `0 0 6px ${item.color}`,
            display: "inline-block"
          }} />
          <span style={{ fontSize: "0.625rem", color: "#94A3B8", fontFamily: "'Orbitron', sans-serif", fontWeight: "600" }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// Main Export Component
export default function ThreatMap() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Scanning world...");
  
  // Real-time states
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [attacks, setAttacks] = useState([
    { id: 1, from: "Russia", to: "USA", color: "#FF4D6D", severity: "Critical" },
    { id: 2, from: "China", to: "Germany", color: "#FF4D6D", severity: "Critical" },
    { id: 3, from: "Brazil", to: "Singapore", color: "#F97316", severity: "High" },
    { id: 4, from: "Saudi Arabia", to: "Australia", color: "#F97316", severity: "High" }
  ]);
  
  const [stats, setStats] = useState({
    blockedAttacks: 14285,
    threatsToday: 1380,
    criticalAlerts: 5,
    accuracy: 99.98
  });

  // Global Risk Index calculator (out of 100)
  const [globalRiskScore, setGlobalRiskScore] = useState(74);

  // Auto-scanning controls
  const [isAutoFocused, setIsAutoFocused] = useState(true);
  const [focusedLocation, setFocusedLocation] = useState(null);
  const autoFocusIndexRef = useRef(-1);

  // Responsive device tracker
  const [isMobile, setIsMobile] = useState(false);

  // 1. Loading screen simulation
  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === "Scanning world...") return "Initializing SOC...";
        if (prev === "Initializing SOC...") return "Loading threat intelligence...";
        return "Scanning world...";
      });
    }, 600);

    const loadTimer = setTimeout(() => {
      setLoading(false);
      clearInterval(textInterval);
    }, 1800);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(textInterval);
    };
  }, []);

  // 2. Responsive viewport check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3. Live attacks and stats updates (Every 5 seconds)
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      // Ticking stats slightly
      setStats(prev => {
        const increment = Math.floor(Math.random() * 5) + 1;
        const threatsInc = Math.random() > 0.45 ? 1 : 0;
        return {
          ...prev,
          blockedAttacks: prev.blockedAttacks + increment,
          threatsToday: prev.threatsToday + threatsInc
        };
      });

      // Update randomly 2-3 locations' counts & status
      setLocations(prevLocs => {
        return prevLocs.map((loc) => {
          if (Math.random() > 0.8) {
            const addedCount = Math.floor(Math.random() * 15) + 2;
            const updatedSeen = "Just now";
            return {
              ...loc,
              attackCount: loc.attackCount + addedCount,
              lastSeen: updatedSeen
            };
          }
          // Age last seen string slightly if not updated
          if (loc.lastSeen === "Just now") {
            return { ...loc, lastSeen: "3s ago" };
          } else if (loc.lastSeen === "2s ago") {
            return { ...loc, lastSeen: "7s ago" };
          } else if (loc.lastSeen === "3s ago") {
            return { ...loc, lastSeen: "8s ago" };
          }
          return loc;
        });
      });

      // Trigger a new attack route occasionally
      if (Math.random() > 0.5) {
        setAttacks(prevAttacks => {
          const fromLoc = INITIAL_LOCATIONS[Math.floor(Math.random() * INITIAL_LOCATIONS.length)];
          let toLoc = INITIAL_LOCATIONS[Math.floor(Math.random() * INITIAL_LOCATIONS.length)];
          while (fromLoc.country === toLoc.country) {
            toLoc = INITIAL_LOCATIONS[Math.floor(Math.random() * INITIAL_LOCATIONS.length)];
          }

          const colors = { Critical: "#FF4D6D", High: "#F97316", Medium: "#FACC15", Low: "#22C55E" };
          const color = colors[fromLoc.severity] || "#00E5FF";

          const newAttack = {
            id: Date.now(),
            from: fromLoc.country,
            to: toLoc.country,
            color,
            severity: fromLoc.severity
          };

          // Limit total animated paths in overlay to 5
          const newHistory = [newAttack, ...prevAttacks];
          if (newHistory.length > 5) {
            newHistory.pop();
          }
          return newHistory;
        });
      }

      // Slightly fluctuate global risk index based on active threat density
      setGlobalRiskScore(prev => {
        const offset = Math.floor(Math.random() * 5) - 2;
        const newScore = prev + offset;
        return Math.min(Math.max(newScore, 68), 88);
      });

    }, 5000);

    return () => clearInterval(interval);
  }, [loading]);

  // 4. Auto-Focus threat rotation system (Every 6 seconds)
  useEffect(() => {
    if (loading || !isAutoFocused) return;

    const runFocusCycle = () => {
      const activeThreatLocs = locations.filter(loc => loc.severity === "Critical" || loc.severity === "High");
      if (activeThreatLocs.length === 0) return;
      
      const nextIdx = (autoFocusIndexRef.current + 1) % activeThreatLocs.length;
      autoFocusIndexRef.current = nextIdx;
      
      const target = activeThreatLocs[nextIdx];
      setFocusedLocation(target);

      // Reset focus back to overview after showing details for 3.5 seconds
      setTimeout(() => {
        if (isAutoFocused) {
          setFocusedLocation(null);
        }
      }, 3500);
    };

    // Run first step immediately
    runFocusCycle();

    const interval = setInterval(runFocusCycle, 6000);

    return () => clearInterval(interval);
  }, [loading, isAutoFocused, locations]);

  // Left Stats Panel Calculations
  const topTargeted = locations.reduce((max, loc) => loc.attackCount > max.attackCount ? loc : max, locations[0]);
  const criticalCount = locations.filter(loc => loc.severity === "Critical").length;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: "650px",
        background: "rgba(5, 8, 22, 0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(0, 229, 255, 0.15)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 229, 255, 0.05)",
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <MapSkeleton key="loading" />
        ) : (
          // Main Enterprise SOC Interface
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", flex: 1, position: "relative" }}
          >
            {/* Header: Title and Circular AI Risk Meter */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.5rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              flexWrap: "wrap",
              gap: "1rem",
              position: "relative",
              zIndex: 10
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  background: "rgba(0, 229, 255, 0.1)",
                  padding: "0.5rem",
                  borderRadius: "12px",
                  border: "1px solid rgba(0, 229, 255, 0.25)"
                }}>
                  <Shield size={20} style={{ color: "#00E5FF" }} />
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: "800",
                    color: "#F8FAFC",
                    letterSpacing: "0.05em",
                    textShadow: "0 0 12px rgba(0, 229, 255, 0.2)"
                  }}>
                    GLOBAL SEC-OPS REAL-TIME INTELLIGENCE
                  </h2>
                  <p style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: "0.1rem" }}>
                    AI-Driven Containment Map & Hostility Analytics Stream
                  </p>
                </div>
              </div>

              {/* AI Risk Score gauge */}
              <RiskMeter score={globalRiskScore} />
            </div>

            {/* Sub-Header / Controls */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(0, 0, 0, 0.2)",
              padding: "0.625rem 1.5rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              zIndex: 10
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.725rem", color: "#94A3B8" }}>
                <Terminal size={12} style={{ color: "#FF4D6D" }} />
                <span>INTELLIGENCE STREAM FEED: <strong style={{ color: "#FF4D6D" }}>ACTIVE</strong></span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => setIsAutoFocused(prev => !prev)}
                  style={{
                    background: isAutoFocused ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 77, 109, 0.15)",
                    border: `1px solid ${isAutoFocused ? "rgba(34, 197, 94, 0.4)" : "rgba(255, 77, 109, 0.4)"}`,
                    color: isAutoFocused ? "#22C55E" : "#FF4D6D",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontSize: "0.675rem",
                    fontWeight: "700",
                    fontFamily: "'Orbitron', sans-serif",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    transition: "all 0.2s"
                  }}
                >
                  <RefreshCw size={10} style={{ animation: isAutoFocused ? "spin 3s linear infinite" : "none" }} />
                  {isAutoFocused ? "AUTO-SCAN: ACTIVE" : "AUTO-SCAN: IDLE"}
                </button>
              </div>
            </div>

            {/* Main Interactive Map & Panel Area */}
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              flex: 1,
              position: "relative",
              height: isMobile ? "auto" : "550px"
            }}>
              
              {/* Map Container */}
              <div style={{ flex: 1, height: "100%", position: "relative" }}>
                <MapContainer
                  center={[20, 0]}
                  zoom={2}
                  minZoom={2}
                  maxZoom={8}
                  style={{ height: "100%", width: "100%" }}
                  zoomControl={false}
                  className="cyber-leaflet-map"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                  />
                  
                  {/* Focus Manager component */}
                  <MapFocusController focusedLocation={focusedLocation} />

                  {/* SVG Attack Lines Overlaid */}
                  <AttackLinesOverlay attacks={attacks} locations={locations} />

                  {/* Render Markers */}
                  {locations.map((loc, idx) => (
                    <Marker
                      key={idx}
                      position={[loc.lat, loc.lng]}
                      icon={createCustomIcon(loc.severity)}
                      eventHandlers={{
                        click: () => {
                          // Pause auto scan to let operator audit manually
                          setIsAutoFocused(false);
                          setFocusedLocation(null);
                        }
                      }}
                    >
                      <Popup>
                        <TooltipContent location={loc} />
                      </Popup>
                    </Marker>
                  ))}

                  {/* Single Floating Popup for Auto-Focus scanning detail */}
                  {focusedLocation && isAutoFocused && (
                    <Popup
                      position={[focusedLocation.lat, focusedLocation.lng]}
                      closeButton={false}
                      autoClose={false}
                      closeOnClick={false}
                    >
                      <TooltipContent location={focusedLocation} />
                    </Popup>
                  )}
                </MapContainer>

                {/* Floating Left Panel: Country Stats (Desktop only, rendered below on mobile) */}
                {!isMobile && <LeftStatsPanel topTargeted={topTargeted} totalCountries={locations.length} stats={stats} />}

                {/* Floating Right Panel: Live SOC status (Desktop only, rendered below on mobile) */}
                {!isMobile && <RightSocPanel stats={stats} criticalCount={criticalCount} />}

                {/* Floating Bottom-Right Panel: Map Legend */}
                <div style={{
                  position: "absolute",
                  bottom: "15px",
                  right: "15px",
                  zIndex: 600,
                  pointerEvents: "auto"
                }}>
                  <MapLegend />
                </div>
              </div>

              {/* Mobile Fallback: Panels stack below the map */}
              {isMobile && (
                <div style={{
                  background: "rgba(5, 8, 22, 0.9)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem"
                }}>
                  <LeftStatsPanel topTargeted={topTargeted} totalCountries={locations.length} stats={stats} nested />
                  <RightSocPanel stats={stats} criticalCount={criticalCount} nested />
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
