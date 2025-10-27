import { useState, useEffect } from "react";
import "./sign_up_style.css"; // reuse your existing styling
import { Link } from "react-router-dom";
import StringInput from "../../shared/components/string_input";
import PrimaryButton from "../../shared/components/primary_button";
import FeatureCardsSlider from "../../shared/components/feature-cards-slider";
import app_colors from "../../shared/components/app_colors";
import AlertBanner from "../../shared/components/alert_banner";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { isEmail, sanitizeText } from "../../utils/validator";
import AUTH_FEATURE_CARDS from "./cards";

export default function ForgotPassword() {
  useEffect(() => {
    document.title = "Forgot Password - Tree'd";
  }, []);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    error: true,
  });

  const onResetPassword = async () => {
    setShowErrors(true);
    if (!isEmail(email) || loading) return;

    setLoading(true);
    try {
      const cleanEmail = sanitizeText(email, { maxLen: 254 });
      await sendPasswordResetEmail(auth, cleanEmail);
      setAlertState({
        open: true,
        message: "Password reset email sent! Check your inbox 📬",
        error: false,
      });
    } catch (e) {
      console.error("[Forgot Password Error]", e);
      let msg = e.message || "Failed to send reset email.";
      if (msg.includes("auth/user-not-found")) msg = "No account found with this email.";
      setAlertState({ open: true, message: msg, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign_up_container">
      <AlertBanner
        open={alertState.open}
        message={alertState.message}
        error={alertState.error}
        onClose={() => setAlertState((p) => ({ ...p, open: false }))}
      />

      <div className="sign_up_left">
        <h1 className="sign_up_header">Forgot your password?</h1>

        <div className={`sign_up_inputs ${showErrors ? "show-errors" : ""}`}>
          <StringInput
            title="Email"
            placeholder="student@example.com"
            onChange={setEmail}
            value={email}
            validate={isEmail}
          />
        </div>

        <div className="sign_up_footer">
          <PrimaryButton
            label={loading ? "Sending..." : "Send Email"}
            bgColor={app_colors.primary || "#3e4b53ff"}
            onClick={onResetPassword}
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
