import bgImage from "../assets/coastal_bg.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 animate-hero">
        {/* Title */}
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-4"
          style={{
            WebkitTextStroke: "2px #000",
            textShadow: `
              0 2px 4px rgba(0,0,0,0.9),
              0 6px 15px rgba(0,0,0,0.9),
              0 12px 30px rgba(0,0,0,0.8)
            `,
          }}
        >
          Coastal Travel Planner
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl mb-10 max-w-3xl mx-auto"
          style={{
            textShadow: `
              0 2px 6px rgba(0,0,0,0.9),
              0 6px 16px rgba(0,0,0,0.85)
            `,
          }}
        >
          Discover curated day-wise travel plans across Udupi, Kundapura and
          Coastal Karnataka.
        </p>

        {/* Glowing Button */}
        <Link
          to="/plans"
          className="relative inline-block px-10 py-4 text-lg font-semibold rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 glow-btn"
        >
          Explore Plans
        </Link>
      </div>
    </div>
  );
}

export default Home;
