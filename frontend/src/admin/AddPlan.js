import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import toast from "react-hot-toast";

const AddPlan = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");

  const [days, setDays] = useState([
    { dayNumber: 1, places: [] },
  ]);

  // ➕ Add Day
  const addDay = () => {
    setDays([...days, { dayNumber: days.length + 1, places: [] }]);
  };

  // ➕ Add Place
  const addPlace = (dayIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].places.push({
      name: "",
      description: "",
      image: null,
      mapQuery: "",
    });
    setDays(updatedDays);
  };

  // ✏️ Update place field
  const updatePlace = (dayIndex, placeIndex, field, value) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].places[placeIndex][field] = value;
    setDays(updatedDays);
  };

  // 🚀 Submit Plan
  const submitPlan = async (e) => {
    e.preventDefault();
    console.log("SAVING DAYS:", days);

    if (!title || !duration || !budget) {
      toast.error("Please fill all plan details");
      return;
    }

    if (
  days.length === 0 ||
  days.every((day) => day.places.length === 0)
) {
  toast.error("Please add at least one place in a day");
  return;
}

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("duration", duration);
      formData.append("budget", budget);

      const preparedDays = days.map((day) => ({
        dayNumber: day.dayNumber,
        places: day.places.map((place) => ({
          name: place.name,
          description: place.description,
          image: place.image?.name || "",
          mapQuery: place.mapQuery,
        })),
      }));

      formData.append("days", JSON.stringify(preparedDays));

      days.forEach((day) =>
        day.places.forEach((place) => {
          if (place.image) {
            formData.append("images", place.image);
          }
        })
      );

      const res = await fetch("https://coastal-travel-planner-backend.onrender.com/api/plans", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to save plan");
        return;
      }

      toast.success("Plan added successfully!");

      setTitle("");
      setDuration("");
      setBudget("");
      setDays([{ dayNumber: 1, places: [] }]);

    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminNavbar />

      <form onSubmit={submitPlan} className="max-w-5xl mx-auto p-8">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">
          Add New Travel Plan
        </h2>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            placeholder="Plan Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded border"
          />
          <input
            placeholder="Duration (e.g. 1 Day)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-3 rounded border"
          />
          <input
            placeholder="Budget (₹)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="p-3 rounded border"
          />
        </div>

        {/* DAYS */}
        <div className="space-y-8">
          {days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
            >
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">
                Day {day.dayNumber}
              </h3>

              {day.places.map((place, placeIndex) => (
                <div key={placeIndex} className="border p-4 rounded-lg mb-4">
                  <input
                    placeholder="Place Name"
                    value={place.name}
                    onChange={(e) =>
                      updatePlace(dayIndex, placeIndex, "name", e.target.value)
                    }
                    className="w-full p-2 mb-2 border rounded"
                  />

                  <textarea
                    placeholder="Description"
                    value={place.description}
                    onChange={(e) =>
                      updatePlace(dayIndex, placeIndex, "description", e.target.value)
                    }
                    className="w-full p-2 mb-2 border rounded"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updatePlace(dayIndex, placeIndex, "image", e.target.files[0])
                    }
                    className="w-full p-2 mb-2 border rounded"
                  />

                  <input
                    placeholder="Google Map Search Text"
                    value={place.mapQuery}
                    onChange={(e) =>
                      updatePlace(dayIndex, placeIndex, "mapQuery", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => addPlace(dayIndex)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                + Add Place
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={addDay}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            + Add Day
          </button>

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Save Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlan;
