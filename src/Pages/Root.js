import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import AudioPlayer from "../Components/Player/AudioPlayer";
const RootLayout = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main style={{ marginBottom: "50px" }}>
        <Outlet />
      </main>
      <AudioPlayer />
    </>
  );
};
export default RootLayout;
