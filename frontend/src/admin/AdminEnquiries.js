import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("https://coastal-travel-planner.onrender.com/api/enquiries")
;
      const data = await res.json();
      setEnquiries(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch enquiries");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    await fetch(`http://coastal-travel-planner-backend.onrender.com/api/enquiries/${id}`, {
      method: "DELETE",
    });

    fetchEnquiries();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminNavbar />

      <div className="p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          User Enquiries
        </h2>

        {loading ? (
          <p className="text-center text-lg">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No enquiries yet.
          </p>
        ) : (
          <div className="space-y-6">
            {enquiries.map((e) => (
              <div
                key={e._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg dark:text-white">
                      {e.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {e.email}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteEnquiry(e._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-4 text-gray-800 dark:text-gray-200">
                  {e.message}
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  {new Date(e.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
