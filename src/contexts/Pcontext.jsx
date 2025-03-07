import { createContext, useState } from "react";
export const Pcontext = createContext({
  search: "",
  setSearch: () => {},
  results: { results: [] },
  setResults: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  qout: {},
  setQout: () => {},
  comments: [],
  setComments: () => {},
});

export function PcontextProvider({ children }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qout, setQout] = useState({});
  const [comments, setComments] = useState([]);

  return (
    <Pcontext.Provider
      value={{
        search,
        setSearch,
        results,
        setResults,
        loading,
        setLoading,
        error,
        setError,
        qout,
        setQout,
        comments,
        setComments,
      }}
    >
      {children}
    </Pcontext.Provider>
  );
}
