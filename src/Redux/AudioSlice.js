import { createSlice } from "@reduxjs/toolkit";
const audioSlice = createSlice({
  name: "currAudio",
  initialState: { trackImage: "", trackName: "", url: "" },
  reducers: {
    displayTrackImage(state, action) {
      state.trackImage = action.payload;
    },
    displayTrackName(state, action) {
      state.trackName = action.payload;
    },
    getUrl(state, action) {
      state.url = action.payload;
    },
  },
});
export const audioActions = audioSlice.actions;
export default audioSlice;
