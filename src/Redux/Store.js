import { configureStore } from "@reduxjs/toolkit";
import { spotifyApi } from "./Services/spotifyApi";
import audioSlice from "./AudioSlice";
export const store = configureStore({
  reducer: {
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    currAudio: audioSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});
