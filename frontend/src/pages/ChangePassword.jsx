import { useState } from "react";
import { toast } from "react-toastify";
import { KeyRound, ShieldCheck } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PageTransition from "../components/ui/PageTransition";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);

    toast.success("🔐 Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <PageTransition>
      <div style={{ position: "relative", zIndex: 1 }} className="container">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
          Security Administration
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>
          Update key access permissions and change credentials.
        </p>
      </div>

      <div style={{ maxWidth: "550px" }}>
        <Card glow="secondary">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.75rem" }}>
            <KeyRound size={20} style={{ color: "#7C3AED" }} />
            <h3 style={{ fontSize: "1.1rem", color: "#F8FAFC", fontFamily: "'Orbitron', sans-serif" }}>Update Operator Credentials</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <Input
              type="password"
              placeholder="Current Secure Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              label="CURRENT PASSWORD"
            />

            <Input
              type="password"
              placeholder="New Secure Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="NEW PASSWORD"
            />

            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="CONFIRM PASSWORD"
            />

            <div style={{ marginTop: "0.5rem" }}>
              <Button 
                variant="primary" 
                onClick={handleChangePassword} 
                loading={loading}
                style={{ width: "100%" }}
              >
                Change Credentials
              </Button>
            </div>
          </div>
        </Card>
      </div>
      </div>
    </PageTransition>
  );
}

export default ChangePassword;
