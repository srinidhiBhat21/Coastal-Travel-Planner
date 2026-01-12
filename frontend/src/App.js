import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import PlanDetails from "./pages/PlanDetails";
import Contact from "./pages/Contact";
import AdminEnquiries from "./admin/AdminEnquiries";
import AdminPlans from "./admin/AdminPlans";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddPlan from "./admin/AddPlan";

const isAdmin = () => localStorage.getItem("adminAuth") === "true";

function App() {
  return (
    <Router>
      <Routes>

        {/* USER ROUTES */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/plans"
          element={
            <>
              <Navbar />
              <Plans />
            </>
          }
        />

        <Route
          path="/plans/:id"
          element={
            <>
              <Navbar />
              <PlanDetails />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={isAdmin() ? <AdminDashboard /> : <AdminLogin />}
        />
        <Route
  path="/admin/enquiries"
  element={isAdmin() ? <AdminEnquiries /> : <AdminLogin />}
/>


        <Route
          path="/admin/add-plan"
          element={isAdmin() ? <AddPlan /> : <AdminLogin />}
        />
        <Route
  path="/admin/plans"
  element={isAdmin() ? <AdminPlans /> : <AdminLogin />}
/>


      </Routes>
    </Router>
  );
}

export default App;
