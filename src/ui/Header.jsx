import { Link } from "react-router-dom";
import SearchOrder from "../features/Order/SearchOrder";
import User from "../features/User/User";

function Header() {
  return (
    <header className="bg-yellow-400 text-transform: uppercase px-3 py-4 border-b-2 border-zinc-300 sm:px-6 flex flex-row justify-between content-center items-center">
      <Link to="/" className="tracking-[0.25em] content-center font-sans">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
