import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import toast from "react-hot-toast";

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const res = await fetch("http://coastal-travel-backend.onrender.com/api/plans");
      const data = await res.json();
      setPlans(data);
    } catch {
      toast.error("Failed to load plans");
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      const res = await fetch(
        `http://coastal-travel-backend.onrender.com/api/plans/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      toast.success("Plan deleted");
      fetchPlans();
    } catch {
      toast.error("Failed to delete plan");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminNavbar />

      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          Manage Plans
        </h2>

        {plans.length === 0 ? (
          <p className="dark:text-gray-300">No plans found</p>
        ) : (
          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold dark:text-white">
                    {plan.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {plan.duration} • ₹{plan.budget}
                  </p>
                </div>

                <button
                  onClick={() => deletePlan(plan._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPlans;
