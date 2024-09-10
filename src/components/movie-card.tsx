import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "../../types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-1/3 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500">Poster</span>
        </div>
        <CardContent className="w-2/3 p-4 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Year: {movie.year}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Rating: {movie?.rating}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default MovieCard;