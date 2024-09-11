import React from "react";
import { MovieRecommendation } from "../../types";

interface MovieListProps {
  movies: MovieRecommendation[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="flex flex-col gap-5">
      {movies.map((movie, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
          <p className="text-gray-600">{movie.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
