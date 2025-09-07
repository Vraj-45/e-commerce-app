import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { updateProfile, changePassword } from "../features/auth/authSlice";

export default function Dashboard() {
  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ username: user?.username || "", password: "" });

  if (!user) return null;

  const handleSave = () => {
    if (form.username) {
      dispatch(updateProfile({ username: form.username }));
    }
    if (form.password) {
      dispatch(changePassword(form.password));
    }
    setEditing(false);
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="mb-4">
        <strong>Username: </strong> {user.username}
      </div>

      <button
        className="bg-blue-600 text-white px-3 py-1 rounded"
        onClick={() => setEditing(true)}
      >
        Edit Profile
      </button>

      {editing && (
        <div className="mt-4 space-y-2">
          <input
            className="border p-2 w-full"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="New Username"
          />
          <input
            type="password"
            className="border p-2 w-full"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="New Password"
          />
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
