import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
        <Header />
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default HomeLayout;
