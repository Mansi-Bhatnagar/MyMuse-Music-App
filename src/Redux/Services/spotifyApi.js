import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://spotify23.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "2be71c199emshd4cb42379ba9149p17ff99jsne561e4e0254f"
      );
      headers.set("X-RapidAPIHost", "spotify23.p.rapidapi.com");
    },
  }),
  endpoints: (builder) => ({
    getTopFiftyTracks: builder.query({
      query: (limit) =>
        `playlist_tracks/?id=4nNVfQ9eWidZXkBKZN5li4&offset=0&limit=${limit}`,
    }),
  }),
});
export const { useGetTopFiftyTracksQuery } = spotifyApi;
