import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
      medium_cover_image
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);

  console.log(data);
  if (error) {
    return <h1>Could not fetch :B</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="w-full">
      <article className="w-full h-[300px] bg-gradient-to-r from-[#f86e46] to-[#d957a3] flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Apollo Movies</h1>
      </article>
      <article className="w-full px-3 -translate-y-10">
        <section className="max-w-full w-[1200px] mx-auto grid grid-cols-4 gap-5">
          {data.allMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="w-full rounded-lg overflow-hidden"
            >
              <img
                src={
                  movie.medium_cover_image
                    ? movie.medium_cover_image
                    : "https://product-image.juniqe-production.juniqe.com/media/catalog/product/seo-cache/x800/471/36/471-36-101P/Null-typealive-Poster.jpg"
                }
                alt="img"
                className="object-cover w-full h-full"
              />
            </Link>
          ))}
        </section>
      </article>
    </div>
  );
}
