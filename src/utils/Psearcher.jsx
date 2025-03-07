import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currentConfig } from "../config/config"; // Import the currentConfig

function Psearcher({ search, setSearch, setResults }) {
  return (
    <>
      <div className="w-120 bg-amber-400 rounded-md shadow-lg z-10 search_bar">
        <div className="flex items-center justify-center p-2">
          <input
            type="text"
            placeholder="Enter Pincode to search"
            className="w-full rounded-md px-2 py-1 focus:outline-none 
            focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="w-60 bg-gray-800 text-white rounded-md px-4 py-2 ml-2 hover:bg-amber-900 transition-bg duration-300
            focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 link_menu_items"
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${currentConfig.apiUrl}/search`,
                  {
                    searchpin: search,
                  }
                );
                console.log("thatrespose", response.data);
                setResults(response.data);
                if (response.data.result.length <= 0) {
                  throw new Error("No results found");
                } else {
                  toast.success("Data fetched successfully");
                }
              } catch (error) {
                console.error("Error fetching data:", error);
                setResults({ result: [], error: "none" });
                toast.error("Error fetching data");
              }
            }}
          >
            📍Search
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Psearcher;
