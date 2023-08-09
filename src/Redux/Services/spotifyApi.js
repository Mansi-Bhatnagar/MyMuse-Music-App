import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://spotify23.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", process.env.REACT_APP_API_KEY);
      headers.set("X-RapidAPIHost", "spotify23.p.rapidapi.com");
    },
  }),
  endpoints: (builder) => ({
    getTopFiftyTracks: builder.query({
      query: (limit) =>
        `playlist_tracks/?id=4nNVfQ9eWidZXkBKZN5li4&offset=0&limit=${limit}`,
    }),
    getTrackById: builder.query({
      query: (id) => `tracks/?ids=${id}`,
    }),
    getLyricsById: builder.query({
      query: (id) => `track_lyrics/?id=${id}`,
    }),
    getArtistsById: builder.query({
      query: (id) => `artists/?ids=${id}`,
    }),
    getArtistOverviewById: builder.query({
      query: (id) => `artist_overview/?id=${id}`,
    }),
  }),
});
export const {
  useGetTopFiftyTracksQuery,
  useGetTrackByIdQuery,
  useGetLyricsByIdQuery,
  useGetArtistsByIdQuery,
  useGetArtistOverviewByIdQuery,
} = spotifyApi;
