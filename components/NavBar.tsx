import SearchBar from "./SearchBar";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Watch Store
        </Link>
      </div>
      <SearchBar />
    </div>
  );
};

export default NavBar;
