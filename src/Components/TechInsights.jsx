import React from "react";

const TechInsights = () => {
  const articles = [
    {
      id: 1,
      title: "5 Startup Mistakes to Avoid in 2025",
      excerpt: "Learn from real founders how to avoid costly early mistakes.",
    },
    {
      id: 2,
      title: "Top 10 AI Tools for Developers",
      excerpt: "Boost your productivity with these must-try AI-powered apps.",
    },
  ];

  return (
    <section className="py-10 bg-white dark:bg-gray-900" id="tech-insights">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          🧠 Tech Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {article.excerpt}
              </p>
              <a
                href="#"
                className="mt-4 inline-block text-indigo-600 hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechInsights;
