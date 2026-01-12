import { useState } from "react";

const Admin = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "Udupi",
    duration: "",
    budget: "",
    description: "",
    transport: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);
const [password, setPassword] = useState("");
    const ADMIN_PASSWORD = "admin123"; // Simple password for demo purposes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://coastal-travel-backend.onrender.com/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Plan added successfully!");
        setFormData({
          title: "",
          location: "Udupi",
          duration: "",
          budget: "",
          description: "",
          transport: "",
        });
      } else {
        alert("Error adding plan");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };
  if (!isAdmin) {
  return (
    <div className="max-w-sm mx-auto p-8">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-4"
      />
      <button
        onClick={() =>
          password === ADMIN_PASSWORD
            ? setIsAdmin(true)
            : alert("Wrong password")
        }
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}


  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Admin – Add Travel Plan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Plan Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Udupi</option>
          <option>Kundapura</option>
          <option>Honnavara</option>
        </select>

        <input
          name="duration"
          placeholder="Duration (e.g. 2 Days / 1 Night)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="budget"
          placeholder="Budget (₹)"
          value={formData.budget}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Plan Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="transport"
          placeholder="Transport details"
          value={formData.transport}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Plan
        </button>
      </form>
    </div>
  );
};

export default Admin;
