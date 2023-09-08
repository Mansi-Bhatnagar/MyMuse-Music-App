import { createSlice } from "@reduxjs/toolkit";
const audioSlice = createSlice({
  name: "currAudio",
  initialState: { trackImage: "", trackName: "", url: "", id: "" },
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
    getId(state, action) {
      state.id = action.payload;
    },
  },
});
export const audioActions = audioSlice.actions;
export default audioSlice;
