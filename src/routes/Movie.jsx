import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      large_cover_image
      rating
      isLiked @client
    }
  }
`; //movie = resolvers로 만들어놨음

export default function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  if (loading) return <div>loading...</div>;

  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment movieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    }); //fragment는 타입의 일부다 cache에서 수정하고 싶은 객체가 뭔지 알아내야 한다.
  };
  return (
    <div className="bg-gradient-to-r min-h-screen p-3 from-[#f86e46] to-[#d957a3] w-full grid grid-cols-2">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold text-white">{data.movie.title}</h1>
        <p className="text-white">🧡 {data?.movie?.rating}</p>
        <button
          onClick={onClick}
          className="bg-white px-5 py-3 mt-3 rounded-full text-red-500"
        >
          {data?.movie?.isLiked ? "UnLike movie" : "like movie"}
        </button>
      </div>
      <img
        className="rounded-lg"
        src={data.movie.large_cover_image}
        alt="img"
      />
    </div>
  );
}
