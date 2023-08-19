import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/Root";
import HomePage from "./Pages/Home";
import Tracks from "./Components/Tracks/Tracks";
import Artists from "./Components/Artists/Artists";
import TrackDetail from "./Components/Tracks/TrackDetail";
import ArtistDetail from "./Components/Artists/ArtistDetail";
import AlbumDetail from "./Components/Albums/AlbumDetail";
const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "allTracks", element: <Tracks /> },
      { path: "allOldClassics", element: <Tracks /> },
      { path: "allArtists", element: <Artists /> },
      { path: "tracks/:id", element: <TrackDetail /> },
      { path: "artist/:id", element: <ArtistDetail /> },
      { path: "album/:id", element: <AlbumDetail /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
