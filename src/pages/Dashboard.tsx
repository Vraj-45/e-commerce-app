import { useState } from "react";
import type { User } from "../features/auth/types";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { updateProfile } from "../features/auth/authSlice";

export default function Dashboard() {
  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<User>>(user ?? {});

  if (!user) return null;

  const handleSave = () => {
    dispatch(updateProfile(form));
    setEditing(false);
  };

  const handleChangePassword = () => {
    alert("Password changed (demo).");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div>
        <div className="mb-4">
          <strong>Name: </strong> {user.firstName} {user.lastName}
        </div>
        <div className="mb-4">
          <strong>Username:</strong> {user.username}
        </div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2" onClick={() => setEditing(true)}>Edit Profile</button>
        <button className="bg-gray-600 text-white px-3 py-1 rounded" onClick={handleChangePassword}>Change Password</button>
      </div>

      {editing && (
        <div className="mt-4">
          <input className="border p-2 w-full mb-2" value={form.firstName || ""} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="First name" />
          <input className="border p-2 w-full mb-2" value={form.lastName || ""} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Last name" />
          <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Save</button>
          <button onClick={() => setEditing(false)} className="px-3 py-1 border rounded">Cancel</button>
        </div>
      )}
    </div>
  );
}
