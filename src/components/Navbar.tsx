import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type{ RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyShop</Link>
        <div className="flex items-center gap-4">
          
          {user ? (
            <>
              <Link to="/product">Products</Link>
              <Link to="/dashboard" className="hidden sm:inline">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
              <span className="ml-2 text-sm">Hi, {user.firstName || user.username}</span>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-3 py-1 rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
