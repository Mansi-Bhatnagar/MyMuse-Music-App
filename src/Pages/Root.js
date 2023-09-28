import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import AudioPlayer from "../Components/Player/AudioPlayer";
import Search from "./Search";
const RootLayout = () => {
  const url = useSelector((state) => state.currAudio.url);
  return (
    <>
      <Sidebar />
      <Navbar />
      <main style={{ marginBottom: "80px" }}>
        <Outlet />
      </main>
      {url ? <AudioPlayer /> : ""}
    </>
  );
};
export default RootLayout;
