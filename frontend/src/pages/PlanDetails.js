import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PlanDetails = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://coastal-travel-planner-backend.onrender.com/api/plans/${id}`)

      .then((res) => res.json())
      .then((data) => {
        setPlan(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading plan details...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">
          Failed to load plan details
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* PLAN HEADER */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-2 dark:text-white">
            {plan.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            {plan.duration} • ₹{plan.budget}
          </p>
        </motion.div>

        {/* DAY-WISE ITINERARY */}
        {plan.days.map((day) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">
              Day {day.day}
            </h2>

            <div className="space-y-8">
              {day.places.map((place, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  {/* PLACE IMAGE */}
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-72 object-cover"
                  />

                  {/* PLACE DETAILS */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 dark:text-white">
                      {place.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-5">
                      {place.description}
                    </p>

                    {/* GOOGLE MAP */}
                    <div className="w-full h-72 rounded-lg overflow-hidden border">
                      <iframe
                        title={place.name}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                          place.mapQuery
                        )}&output=embed`}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        allowFullScreen
                      ></iframe>
                    </div>

                    {/* OPEN IN MAPS */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        place.mapQuery
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PlanDetails;
