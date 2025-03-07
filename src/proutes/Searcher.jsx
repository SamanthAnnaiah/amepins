import Psearcher from "../utils/Psearcher";
import { useContext, useEffect, useState } from "react";
import { Pcontext } from "../contexts/Pcontext";
import { useNavigate } from "react-router";

function Searcher() {
  const { search, setSearch, setResults, results, setQout } =
    useContext(Pcontext);
  const [divnf, setDivnf] = useState("No results found");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current results:", results);
    setDivnf("");
  }, [results]);

  return (
    <>
      <div className="w-[50%] m-auto mt-6">
        <Psearcher
          search={search}
          setSearch={setSearch}
          setResults={setResults}
        />
      </div>
      <div
        onClick={(e) => {
          const target = e.target;
          const pinCode = target.dataset.pincode;
          if (pinCode) {
            navigate(`/${pinCode}`);
          }
        }}
        className="w-[90%] m-auto mt-6 flex flex-row gap-3 justify-center items-center flex-wrap"
      >
        {console.log("Rendering with results:", results)}
        {!results.error?.startsWith("none") ? (
          <div className="text-center text-2xl font-bold">{divnf}</div>
        ) : (
          results.result?.map((result) => (
            <div
              key={result.cpin}
              data-pincode={result.cpin}
              className="text-center text-lg 
            font-bold text-black bg-amber-900/70 p-3 flex flex-col gap-2 justify-start items-start
            rounded-lg bshadow hover:bg-amber-700/90 transition-all duration-300 cursor-pointer"
            >
              <p className="text-left">
                <span className="text-white">City:</span> {result.city}
              </p>
              <p className="text-left">
                <span className="text-white">Pin Code:</span> {result.cpin}
              </p>
              <p className="text-left">
                <span className="text-white">State:</span> {result.state_name}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Searcher;
