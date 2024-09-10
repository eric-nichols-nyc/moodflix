import React from "react";
import MovieCard from "./movie-card";
import { Movie } from "../../types";


interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div>
      <div className="flex-col flex gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
