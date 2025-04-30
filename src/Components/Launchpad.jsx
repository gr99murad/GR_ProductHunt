import React from "react";

const Launchpad = () => {
  const upcomingProducts = [
    {
      id: 1,
      name: "AI Resume Builder",
      description: "Create ATS-friendly resumes using AI – launching soon!",
      launchDate: "May 15, 2025",
    },
    {
      id: 2,
      name: "HyperChat App",
      description: "Next-gen chat app for productivity teams.",
      launchDate: "June 5, 2025",
    },
  ];

  return (
    <section className="py-10 bg-gray-100 dark:bg-gray-800" id="launchpad">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          🚀 Launchpad: Coming Soon
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingProducts.map((product) => (
            <div
              key={product.id}
              className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
              <p className="mt-2 text-sm text-indigo-500">
                Launching: {product.launchDate}
              </p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Notify Me
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Launchpad;
