import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PlanCard = ({ plan }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card overflow-hidden"
    >
      <img
        src={plan.days?.[0]?.places?.[0]?.image}
        alt={plan.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">
          {plan.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {plan.duration} • ₹{plan.budget}
        </p>

        <Link to={`/plans/${plan._id}`} className="btn-primary">
          View Details →
        </Link>
      </div>
    </motion.div>
  );
};

export default PlanCard;
