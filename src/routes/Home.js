import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_MOVIES);
  console.log(loading, error, data);
  if (loading) return "loading";
  if (data && data.movies) {
    return data.movies.map((movie) => <h3>{movie.id}</h3>);
  }
  return <h1>Home</h1>;
}

export default Home;
