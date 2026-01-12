import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const linkClass = (path) =>
    `hover:text-blue-500 transition ${
      location.pathname === path ? "text-blue-600 font-semibold" : ""
    }`;

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Coastal Travel Planner
        </h1>

        <div className="flex gap-6 items-center">
          <Link className={linkClass("/")} to="/">Home</Link>
          <Link className={linkClass("/plans")} to="/plans">Plans</Link>
          <Link className={linkClass("/contact")} to="/contact">Contact</Link>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
