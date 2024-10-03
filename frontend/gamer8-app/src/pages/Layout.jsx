import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="relative h-screen w-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
