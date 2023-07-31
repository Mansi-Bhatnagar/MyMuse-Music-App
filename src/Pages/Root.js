import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
const RootLayout = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default RootLayout;
