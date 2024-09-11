import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "../../types";
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
}

interface MovieDetails {
  title: string;
  year: number;
  genre: string;
  plot: string;
  poster: string;
  imdbRating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/api/moviedetails/${movie.title}`);
        const data = await response.json();
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response from server');
        }
        setMovieDetails(data);
        setImgSrc(data.poster);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching movie details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie.id]);

  const handleImageError = () => {
    setImgSrc('/images/intro.png'); // Make sure this placeholder image exists in your public folder
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-1/3 relative h-48">
          {imgSrc && (
            <Image
              src={imgSrc}
              alt={`${movieDetails?.title} poster`}
              layout="fill"
              objectFit="cover"
              onError={handleImageError}
            />
          )}
        </div>
        <CardContent className="w-2/3 p-4 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">{movieDetails?.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Year: {movieDetails?.year}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Genre: {movieDetails?.genre}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">IMDb Rating: {movieDetails?.imdbRating}</p>
          {movieDetails?.plot && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{movieDetails.plot}</p>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default MovieCard;