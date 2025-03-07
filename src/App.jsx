import { Routes } from "react-router";
import "./App.css";
import { Route } from "react-router";
import Home from "./proutes/Home";

import About from "./proutes/About";
import Stats from "./proutes/Stats";
import Searcher from "./proutes/Searcher";
import Searcherpin from "./proutes/Searcherpin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Searcher />} />
          <Route path="/:spin" element={<Searcherpin />} />
          <Route path="/about" element={<About />} />
          <Route path="/stats" element={<Stats />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
