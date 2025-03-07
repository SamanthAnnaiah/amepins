// API Configuration
const config = {
  development: {
    apiUrl: "http://127.0.0.1:3000/api/v2",
    weatherApi: {
      apiKey: "753f2f8914ee460186f161536250403",
    },
  },
  production: {
    apiUrl: "https://usazipcodes.onrender.com/", // Replace with your production URL
    weatherApi: {
      apiKey: "753f2f8914ee460186f161536250403",
    },
  },
};

// Get current environment
const environment = import.meta.env.MODE || "development";

// Export the current environment's config
export const currentConfig = config[environment];
