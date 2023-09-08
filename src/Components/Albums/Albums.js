import { useEffect, useState } from "react";
import { useGetAlbumsByIdQuery } from "../../Redux/Services/spotifyApi";
import AlbumsCard from "./AlbumsCard";
import Skeleton from "react-loading-skeleton";
import classes from "./Albums.module.css";
const Albums = (props) => {
  const { ids, title, number } = props;
  const [albums, setAlbums] = useState();
  const {
    data: albumData,
    isFetching: albumFetching,
    error: albumError,
  } = useGetAlbumsByIdQuery(ids);
  useEffect(() => {
    if (!albumFetching && albumData) {
      setAlbums(
        albumData.albums.map((album) => {
          return (
            <AlbumsCard
              key={album.id}
              image={album.images[1].url}
              name={album.name}
              label={album.label}
              date={album.release_date}
              id={album.id}
            />
          );
        })
      );
    }
  }, [albumData, albumFetching]);
  const showSkeleton = (number = 5) => {
    return (
      <>
        {Array(number)
          .fill()
          .map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "270px",
                  borderRadius: "8px",
                  height: "320px",
                }}
              >
                <Skeleton
                  height={320}
                  baseColor={"#212529b2"}
                  highlightColor="#6c757d"
                />
              </div>
            );
          })}
      </>
    );
  };
  if (albumError) console.log(albumError);
  return (
    <div className={classes.container}>
      <h3>{title}</h3>
      <div className={classes.albumWrapper}>
        {albumFetching ? showSkeleton(number) : albums}
      </div>
    </div>
  );
};

export default Albums;
