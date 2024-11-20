import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full px-3 h-[30px] bg-yellow-100 text-sm w-[10rem]  tablet:hover:w-[300px] tablet:focus:w-[300px] active:w-[300px]  duration-150 outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 placeholder: text-zinc-500 transition-all ease-in-out delay-200"
      />
    </form>
  );
}

export default SearchOrder;
