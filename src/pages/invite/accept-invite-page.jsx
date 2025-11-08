import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/invite/validate?token=${token}`
        );
        const data = await res.json();
        if (res.ok) {
          // Redirect to signup page with invite data
          navigate(`/signup?token=${token}&email=${encodeURIComponent(data.email)}&team=${encodeURIComponent(data.team_name || '')}`);
        } else {
          setStatus(data.detail || "Invalid or expired invite.");
        }
      } catch (err) {
        setStatus("Failed to validate invite.");
      } finally {
        setLoading(false);
      }
    };
    fetchInvite();
  }, [token, navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Validating invite...</p>
    </div>
  );
  
  if (status) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-xl text-red-600 mb-4">{status}</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Go to Login
        </button>
      </div>
    </div>
  );

  return null;
}