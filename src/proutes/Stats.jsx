function Stats() {
  const stats = [
    {
      title: "Total ZIP Codes",
      value: "41,702",
      description: "Active ZIP codes in the United States",
      icon: "📬",
    },
    {
      title: "First ZIP Code",
      value: "00601",
      description: "Adjuntas, Puerto Rico",
      icon: "🏆",
    },
    {
      title: "Highest ZIP!",
      value: "99950",
      description: "Ketchikan, Alaska",
      icon: "🗺️",
    },
    {
      title: "Most Common",
      value: "10001",
      description: "New York City, NY",
      icon: "🏙️",
    },
    {
      title: "Unique States",
      value: "50",
      description: "States with ZIP codes",
      icon: "🇺🇸",
    },
    {
      title: "Territories",
      value: "5",
      description: "US Territories with ZIP codes",
      icon: "🌊",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
          US ZIP Code Statistics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-amber-600 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-amber-800 mb-4">
            Interesting Facts
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              ZIP codes were introduced in 1963 by the USPS to improve mail
              delivery efficiency
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              ZIP stands for "Zone Improvement Plan"
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              The first digit of a ZIP code represents a group of US states
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              Some ZIP codes are reserved for specific organizations (like the
              White House: 20500)
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              The USPS processes over 472 million pieces of mail daily using ZIP
              codes
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 italic">
            "ZIP codes: The backbone of American mail delivery"
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
