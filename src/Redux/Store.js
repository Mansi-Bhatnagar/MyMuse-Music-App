import { configureStore } from "@reduxjs/toolkit";
import { spotifyApi } from "./Services/spotifyApi";
import audioSlice from "./AudioSlice";
import favouriteSlice from "./FavouritesSlice";
export const store = configureStore({
  reducer: {
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    currAudio: audioSlice.reducer,
    favourite: favouriteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});
