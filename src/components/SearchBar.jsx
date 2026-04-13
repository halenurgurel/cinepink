import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router";
import { useRef, useEffect } from "react";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    if (!location.search) {
      inputRef.current.value = "";
    } else {
      const params = new URLSearchParams(location.search);
      const query = params.get("query") || "";
      inputRef.current.value = query;
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    if (!query) return;
    navigate(`/search?query=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <SearchIcon className="absolute left-3 text-gray-400" />
      <input
        ref={inputRef}
        name="query"
        type="text"
        placeholder="Search"
        className="border-logo focus:border-darkPink w-32 rounded-full border-2 py-2 pr-4 pl-10 font-bold text-gray-400 outline-none sm:w-64"
      />
    </form>
  );
};
export default Search;
