function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-8 mt-2">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
          About US ZIP Code Explorer
        </h1>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-800 mb-4">
            What We Do
          </h2>
          <p className="text-gray-700 mb-4">
            US ZIP Code Explorer is your comprehensive tool for discovering
            detailed information about any location in the United States. Simply
            enter a ZIP code, and we'll provide you with:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>City and State information</li>
            <li>Current weather conditions</li>
            <li>Interactive map visualization</li>
            <li>Local insights and community information</li>
            <li>Real-time weather data</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">
              Features
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Instant ZIP code lookup</li>
              <li>• Detailed location information</li>
              <li>• Interactive maps</li>
              <li>• Real-time weather updates</li>
              <li>• Community insights</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">
              How It Works
            </h3>
            <ol className="space-y-2 text-gray-700">
              <li>1. Enter any US ZIP code</li>
              <li>2. Get instant location details</li>
              <li>3. View interactive map</li>
              <li>4. Check current weather</li>
              <li>5. Explore local information</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 italic">
            "Discover America, one ZIP code at a time"
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
