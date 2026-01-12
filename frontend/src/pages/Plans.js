import { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";

const Plans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("https://coastal-travel-planner.onrender.com/api/plans")
      .then(res => res.json())
      .then(data => setPlans(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Travel Plans
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map(plan => (
          <PlanCard key={plan._id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Plans;
