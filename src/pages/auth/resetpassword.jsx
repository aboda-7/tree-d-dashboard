import { useState, useEffect } from "react";
import "./sign_up_style.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import StringInput from "../../shared/components/string_input";
import PrimaryButton from "../../shared/components/primary_button";
import FeatureCardsSlider from "../../shared/components/feature-cards-slider";
import app_colors from "../../shared/components/app_colors";
import AlertBanner from "../../shared/components/alert_banner";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../../firebase";
import AUTH_FEATURE_CARDS from "./cards";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const oobCode = searchParams.get("oobCode");

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [showErrors, setShowErrors] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    error: true,
  });

  // ✅ verify link is valid + get email
  useEffect(() => {
    const verifyCode = async () => {
      try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        setEmail(email);
        setLoading(false);
      } catch (err) {
        console.error("[ResetPassword] Invalid/expired link:", err);
        setAlertState({
          open: true,
          message: "This reset link is invalid or expired. Please try again.",
          error: true,
        });
        setLoading(false);
      }
    };

    if (oobCode) verifyCode();
  }, [oobCode]);

  const handleReset = async () => {
    setShowErrors(true);

    // 🔍 validation
    if (!password || password.length < 6) {
      return setAlertState({
        open: true,
        message: "Password must be at least 6 characters long.",
        error: true,
      });
    }

    if (password !== confirmPass) {
      return setAlertState({
        open: true,
        message: "Passwords do not match!",
        error: true,
      });
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setAlertState({
        open: true,
        message: "✅ Password reset successfully! Redirecting to login...",
        error: false,
      });
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      console.error("[ResetPassword Error]", err);
      setAlertState({
        open: true,
        message: "Failed to reset password. Try again later.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="sign_up_container">
        <h1 style={{ textAlign: "center", width: "100%" }}>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="sign_up_container">
      {/* 🔔 alert banner */}
      <AlertBanner
        open={alertState.open}
        message={alertState.message}
        error={alertState.error}
        onClose={() => setAlertState((p) => ({ ...p, open: false }))}
      />

      <div className="sign_up_left">
        <h1 className="sign_up_header">Reset Password</h1>

        <div className={`sign_up_inputs ${showErrors ? "show-errors" : ""}`}>
          <StringInput
            title="New Password"
            placeholder="Enter new password"
            isPassword
            value={password}
            onChange={setPassword}
            validate={(v) => v.length >= 6}
          />
          <StringInput
            title="Confirm Password"
            placeholder="Re-enter new password"
            isPassword
            value={confirmPass}
            onChange={setConfirmPass}
            validate={(v) => v === password}
          />
        </div>

        <div className="sign_up_footer">
          <PrimaryButton
            label={loading ? "Resetting..." : "Reset Password"}
            bgColor={app_colors.primary || "#3e4b53ff"}
            onClick={handleReset}
            disabled={loading}
            className="btn-register"
            style={{ width: "100%" }}
          />

          <p className="sign_up_sure">
            Remembered your password? <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>

      <div className="sign_up_right">
        <FeatureCardsSlider items={AUTH_FEATURE_CARDS} />
      </div>
    </div>
  );
}
