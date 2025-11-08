import { useEffect, useState } from "react";
import "./sign_up_style.css";
import { Link, useNavigate } from "react-router-dom";
import StringInput from "../../shared/components/string_input";
import PrimaryButton from "../../shared/components/primary_button";
import FeatureCardsSlider from "../../shared/components/feature-cards-slider";
import app_colors from "../../shared/components/app_colors";
import AlertBanner from "../../shared/components/alert_banner";

import { isEmail, passwordMin, sanitizeText } from "../../utils/validator";
import AUTH_FEATURE_CARDS from "./cards";
import { useAuth } from "../../context/auth-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login() {
  useEffect(() => {
    document.title = "Login - Tree'd";
  }, []);

  const navigate = useNavigate();
  const { setAuthUser, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    error: true,
  });

  const passOk = passwordMin(5);

  useEffect(() => {
    if (user) {
      console.log("[Login] Authenticated user detected:", user.email);
      navigate("/home");
    }
  }, [user, navigate]);

  const onLogin = async () => {
    setShowErrors(true);
    if (!isEmail(email) || !passOk(password) || loading) return;

    setLoading(true);
    try {
      const cleanEmail = sanitizeText(email, { maxLen: 254 });
      const userCred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const firebaseUser = userCred.user;

      setAuthUser(firebaseUser);

      const token = await firebaseUser.getIdToken();
      localStorage.setItem("token", token);

      console.log("[Login] Login successful:", firebaseUser.email);
    } catch (e) {
      console.error("[Login Error]", e);
      let msg = e.message || "Login failed";
      if (msg.includes("auth/invalid-credential")) msg = "Invalid email or password.";
      if (msg.includes("auth/user-not-found")) msg = "No account found with this email.";
      if (msg.includes("auth/too-many-requests")) msg = "Too many attempts, please try later.";
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
        <img height={"auto"} width={"250px"} src="/assets/auth-logo.png"/>

        <div className={`sign_up_inputs ${showErrors ? "show-errors" : ""}`}>
          <StringInput
            title="Email"
            placeholder="user@example.com"
            onChange={setEmail}
            value={email}
            validate={isEmail}
          />
          <StringInput
            title="Password"
            isPassword
            placeholder="********"
            onChange={setPassword}
            value={password}
            validate={passOk}
          />
        </div>

        <div className="sign_up_footer">
          <PrimaryButton
            label={loading ? "Logging in..." : "Log in"}
            bgColor={app_colors.primary || "#3e4b53ff"}
            onClick={onLogin}
            disabled={loading}
            className="btn-register"
          />  

          <div className="or-divider">
            <span className="or-line"></span>
            <span className="or-text">OR</span>
            <span className="or-line"></span>
          </div>

          <Link to="/forgot-password" className="forgot-password-link">
            Forgot password?
          </Link>

          {/* <p className="sign_up_sure">
            Don't have an account? <Link to="/signup">Register</Link>
          </p> */}
        </div>
      </div>

      <div className="sign_up_right">
        <FeatureCardsSlider items={AUTH_FEATURE_CARDS} />
      </div>
    </div>
  );
}