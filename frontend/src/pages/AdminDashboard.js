const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome Admin! You can manage plans and view enquiries.</p>
    </div>
  );
};
const deletePlan = async (id) => {
  await fetch(`http://coastal-travel-backend.onrender.com/api/plans/${id}`, {
    method: "DELETE",
  });
  fetchPlans(); // refresh list
};


export default AdminDashboard;
