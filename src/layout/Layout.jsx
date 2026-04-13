import { Outlet } from "react-router";
import Navigation from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet /> {/* the component of the active route goes here */}
      </main>
    </div>
  );
};
export default Layout;
