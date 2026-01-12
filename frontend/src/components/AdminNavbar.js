import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>

      <div className="space-x-6">
        <Link to="/admin/dashboard">Plans</Link>
        <Link to="/admin/add-plan">Add Plan</Link>
        <Link to="/admin/enquiries">Enquiries</Link>
        <button
          onClick={logout}
          className="bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
