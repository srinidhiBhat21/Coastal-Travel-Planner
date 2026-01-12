const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 transition">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xl rounded-2xl p-10 max-w-xl w-full text-center">
        <h2 className="text-4xl font-bold mb-8">
          Contact Me
        </h2>

        <div className="space-y-5 text-lg">
          {/* LOCATION */}
          <p className="flex items-center justify-center gap-3">
            📍 <span>Coastal Karnataka</span>
          </p>

          {/* PHONE */}
          <p className="flex items-center justify-center gap-3">
            📞
            <a
              href="tel:+91 6360035551"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              +91 6360035551
            </a>
          </p>

          {/* EMAIL */}
          <p className="flex items-center justify-center gap-3">
            📧
            <a
              href="mailto:srinidhisrinibhat@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              srinidhisrinibhat@gmail.com
            </a>
          </p>
        </div>

        <p className="mt-8 text-gray-600 dark:text-gray-300">
          Reach out for custom travel plans, bookings & itinerary support.
        </p>

        {/* OPTIONAL WHATSAPP BUTTON */}
        <a
          href="https://wa.me/916360035551"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          💬 Chat on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default Contact;
