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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase"; // ✅ Firebase import

export default function SignUp() {
  useEffect(() => {
    document.title = "Sign Up - Tree'd";
  }, []);

  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const [email, setEmail] = useState("");
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

      // ✅ Create Firebase user
      const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      await updateProfile(userCred.user, { displayName: cleanName });

      // ✅ Add to context
      setAuthUser(userCred.user);

      // 🔁 Optional: Sync with backend
      // const token = await userCred.user.getIdToken();
      // await authFetch("http://localhost:8000/users/sync", {
      //   method: "POST",
      //   body: JSON.stringify({ email: cleanEmail, name: cleanName }),
      // });

      navigate("/"); // redirect anywhere after signup
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
      {/* 🔔 Alert Banner */}
      <AlertBanner
        open={alertState.open}
        message={alertState.message}
        error={alertState.error}
        onClose={() => setAlertState((p) => ({ ...p, open: false }))}
      />

      <div className="sign_up_left">
        <h1 className="sign_up_header">Register</h1>

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
            placeholder="student@example.com"
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
            label={loading ? "..." : "Sign Up"}
            bgColor={app_colors.heroPrimaryButton}
            onClick={onSignUp}
            disabled={loading}
            className="btn-register"
            style={{ width: "50%" }}
          />

          <p className="sign_up_sure">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>

      <div className="sign_up_right">
        <FeatureCardsSlider items={AUTH_FEATURE_CARDS} />
      </div>
    </div>
  );
}
