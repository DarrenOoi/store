import React, { useState } from "react";
import { useRouter } from "next/router";

// interface SearchProps {
//   handleSearch: void;
//   handleQuery: (query: string) => void;
// }

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search/${query}`);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search..."
        className="input input-bordered md:w-auto"
      />
    </div>
  );
};

export default SearchBar;
