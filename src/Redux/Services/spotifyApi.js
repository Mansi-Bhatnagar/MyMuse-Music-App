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
      query: ({ limit, id }) =>
        `playlist_tracks/?id=${id}&offset=0&limit=${limit}`,
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
    getAlbumsById: builder.query({
      query: (id) => `albums/?ids=${id}`,
    }),
    getAlbumMetadataById: builder.query({
      query: (id) => `album_metadata/?id=${id}`,
    }),
    getAlbumTracksById: builder.query({
      query: ({ limit, id }) =>
        `album_tracks/?id=${id}&offset=0&limit=${limit}`,
    }),
    search: builder.query({
      query: ({ limit, query }) =>
        `search/?q=${query}&type=multi&offset=0&limit=${limit}&numberOfTopResults=5`,
    }),
  }),
});
export const {
  useGetTopFiftyTracksQuery,
  useGetTrackByIdQuery,
  useGetLyricsByIdQuery,
  useGetArtistsByIdQuery,
  useGetArtistOverviewByIdQuery,
  useGetAlbumsByIdQuery,
  useGetAlbumMetadataByIdQuery,
  useGetAlbumTracksByIdQuery,
  useSearchQuery,
} = spotifyApi;
