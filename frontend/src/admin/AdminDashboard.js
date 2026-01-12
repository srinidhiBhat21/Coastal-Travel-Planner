import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // TEMP DEMO DATA (replace with backend later)
    setPlans([
      { id: 1, title: "Udupi Beach Escape" },
      { id: 2, title: "Kundapura Coastal Ride" },
    ]);
  }, []);

 const deletePlan = async (id) => {
  if (!window.confirm("Are you sure you want to delete this plan?")) return;

  try {
    await fetch(`http://coastal-travel-backend.onrender.com/api/plans/${id}`, {
      method: "DELETE",
    });

    // 🔥 update UI immediately
    setPlans((prevPlans) => prevPlans.filter((p) => p._id !== id));
  } catch (err) {
    alert("Failed to delete plan");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminNavbar />

      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          All Plans
        </h2>

        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white dark:bg-gray-800 p-4 rounded flex justify-between items-center"
            >
              <span className="dark:text-white">{plan.title}</span>
              <button
                onClick={() => deletePlan(plan._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
