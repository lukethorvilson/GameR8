import { Outlet } from 'react-router-dom';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
// import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="relative flex h-[100dvh] w-[100dvw] flex-col overflow-x-hidden">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
