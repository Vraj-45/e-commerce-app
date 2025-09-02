import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { id: 1, username, firstName: "Demo", lastName: "User", email: `${username}@example.com` };
    const token = "demo-token-" + Date.now();
    dispatch(loginSuccess({ user, token }));
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input value={username} onChange={(e) => setUsername(e.target.value)} required
          className="w-full border px-3 py-2 rounded" placeholder="Username" />
        <input type="password" required className="w-full border px-3 py-2 rounded" placeholder="Password" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
