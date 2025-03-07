import { Link } from "react-router";

function HomeLinks() {
  return (
    <>
      <ul className="flex gap-7 justify-start items-center">
        <li>
          <img
            src="/usp.jpeg"
            alt="USP logo"
            className="w-20 h-20 rounded-full"
          />
        </li>
        <li className="link_menu_items">
          <Link to="/">Home</Link>
        </li>
        <li className="link_menu_items">
          <Link to="/about">About</Link>
        </li>
        <li className="link_menu_items">
          <Link to="/stats">Stats</Link>
        </li>
      </ul>
    </>
  );
}

export default HomeLinks;
