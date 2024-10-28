import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="relative flex flex-col h-[100dvh] w-[100dvw] overflow-x-hidden">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
