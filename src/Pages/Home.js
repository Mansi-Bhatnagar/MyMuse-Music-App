import Tracks from "../Components/Tracks/Tracks";
import Artists from "../Components/Artists/Artists";
import Albums from "../Components/Albums/Albums";
const Home = () => {
  return (
    <>
      <Tracks
        id={"4nNVfQ9eWidZXkBKZN5li4"}
        limit={9}
        title={"Trending Now"}
        path={"/allTracks"}
      />
      <Artists
        ids={
          "7H55rcKCfwqkyDFH9wpKM6,5wFpshVjY4ntIbIRNDJ5pj,1Cd373x8qzC7SNUg5IToqp,7vk5e3vY1uw9plTHJAMwjN,02yssJvjMJdJ3nueVhig4j"
        }
        number={5}
        title={"Popular Artists"}
        showAll={true}
      />
      <Albums
        ids={
          "3UBER54cmpemko0k0GsD1h,4p4Kv6WhDa0ZgJsTGZX7RK,71sb3x5BwKk87d7ZBOoSJY,4gCNyS7pidfK3rKWhB3JOY,0fwZXPXf41aF6H0CN3UtXV"
        }
        title={"Popular Albums"}
      />
      <Tracks
        id={"41vFrXQsGWLHn0ZjbcBj2C"}
        limit={9}
        title={"Old Classics"}
        path={"/allOldClassics"}
      />
      <Albums
        ids={
          "6l90z4V75K2dzBf765fG1P,0tRl5MSDeQYwKwhlWiyfZs,72vxVTlV4udkkEY5d6J3r1,1fm7CNqCCdnqOoxdb23VTs,0kyvJ67Fj5focQKittin8d"
        }
        title={"Music and Memories"}
      />
    </>
  );
};

export default Home;
