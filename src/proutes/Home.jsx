import HomeLinks from "../plinks/Homelinks";
import { Outlet } from "react-router";

export default function Home() {
  return (
    <>
      <HomeLinks />
      <Outlet />
    </>
  );
}
