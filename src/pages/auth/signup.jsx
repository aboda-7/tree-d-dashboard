import { useEffect, useState } from "react";
import "./sign_up_style.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import StringInput from "../../shared/components/string_input";
import PrimaryButton from "../../shared/components/primary_button";
import FeatureCardsSlider from "../../shared/components/feature-cards-slider";
import app_colors from "../../shared/components/app_colors";
import AlertBanner from "../../shared/components/alert_banner";

import { isEmail, passwordMin, sanitizeText } from "../../utils/validator";
import AUTH_FEATURE_CARDS from "./cards";
import { useAuth } from "../../context/auth-context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("token");
  const inviteEmail = searchParams.get("email");
  const teamName = searchParams.get("team");

  useEffect(() => {
    document.title = inviteToken ? "Accept Invite - Tree'd" : "Sign Up - Tree'd";
  }, [inviteToken]);

  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const [email, setEmail] = useState(inviteEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    error: true,
  });

  const passOk = passwordMin(6);

  const onSignUp = async () => {
    setShowErrors(true);

    if (
      !isEmail(email) ||
      !passOk(password) ||
      password !== confirmPass ||
      !firstName.trim() ||
      !lastName.trim() ||
      loading
    )
      return;

    setLoading(true);
    try {
      const cleanEmail = sanitizeText(email, { maxLen: 254 });
      const cleanName = `${sanitizeText(firstName)} ${sanitizeText(lastName)}`;

      const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      await updateProfile(userCred.user, { displayName: cleanName });

      // If this is an invite signup, accept the invite
      if (inviteToken) {
        const idToken = await userCred.user.getIdToken();
        
        const res = await fetch(`http://localhost:8000/invite/accept/${inviteToken}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Failed to accept invite");
        }
      }

      setAuthUser(userCred.user);
      navigate("/home");
    } catch (e) {
      console.error("[SignUp Error]", e);
      let msg = e.message || "Sign up failed";
      if (msg.includes("auth/email-already-in-use")) msg = "That email is already registered.";
      if (msg.includes("auth/invalid-email")) msg = "Invalid email address.";
      if (msg.includes("auth/weak-password")) msg = "Password should be at least 6 characters.";
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

        {inviteToken && teamName && (
          <div className="invite-banner" style={{
            backgroundColor: "#e8f5e9",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            <p style={{ margin: 0, color: "#2e7d32", fontWeight: "500" }}>
              You're joining: <strong>{teamName}</strong>
            </p>
          </div>
        )}

        <div className={`sign_up_inputs ${showErrors ? "show-errors" : ""}`}>
          <div style={{ display: "flex", gap: 10 }}>
            <StringInput
              title="First Name"
              placeholder="John"
              onChange={setFirstName}
              value={firstName}
              validate={(v) => v.trim().length > 0}
            />
            <StringInput
              title="Last Name"
              placeholder="Doe"
              onChange={setLastName}
              value={lastName}
              validate={(v) => v.trim().length > 0}
            />
          </div>

          <StringInput
            title="Email"
            placeholder="user@example.com"
            onChange={setEmail}
            value={email}
            validate={isEmail}
            disabled={!!inviteEmail}
          />
          <StringInput
            title="Password"
            isPassword
            placeholder="********"
            onChange={setPassword}
            value={password}
            validate={passOk}
          />
          <StringInput
            title="Confirm Password"
            isPassword
            placeholder="********"
            onChange={setConfirmPass}
            value={confirmPass}
            validate={(v) => v === password}
          />
        </div>

        <div className="sign_up_footer">
          <PrimaryButton
            label={loading ? (inviteToken ? "Joining..." : "Signing Up...") : (inviteToken ? "Join Team" : "Sign Up")}
            bgColor={"#3e4b53ff"}
            onClick={onSignUp}
            disabled={loading}
            className="btn-register"
          />

          {!inviteToken && (
            <>
              {/* <div className="or-divider">
                <span className="or-line"></span>
                <span className="or-text">OR</span>
                <span className="or-line"></span>
              </div>

              <p className="sign_up_sure">
                Already have an account? <Link to="/login">Log in</Link>
              </p> */}
            </>
          )}
        </div>
      </div>

      <div className="sign_up_right">
        <FeatureCardsSlider items={AUTH_FEATURE_CARDS} />
      </div>
    </div>
  );
}