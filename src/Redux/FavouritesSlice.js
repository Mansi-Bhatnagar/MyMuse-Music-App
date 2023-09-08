import { createSlice } from "@reduxjs/toolkit";
const favouriteSlice = createSlice({
  name: "favourite",
  initialState: { artists: [], albums: [], tracks: [] },
  reducers: {
    artistsChanged(state, action) {
      state.artists = action.payload;
    },
    albumsChanged(state, action) {
      state.albums = action.payload;
    },
    tracksChanged(state, action) {
      state.tracks = action.payload;
    },
  },
});
export const favouriteActions = favouriteSlice.actions;
export default favouriteSlice;
