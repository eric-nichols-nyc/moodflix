import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MovieRecommendation } from "../../types";
import Image from 'next/image';

interface MovieCardProps {
  movie: MovieRecommendation;
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
        const response = await fetch(`/api/moviedetails/${encodeURIComponent(movie.title)}`);
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
  }, [movie.title]);

  const handleImageError = () => {
    setImgSrc('/images/intro.png'); // Make sure this placeholder image exists in your public folder
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden w-full max-w-sm mx-auto bg-gray-100 dark:bg-gray-800 animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
        <CardContent className="p-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <Card className="overflow-hidden w-full max-w-sm mx-auto hover-scale shadow-lg">
      <div className="flex flex-col">
        <div className="relative h-64 w-full">
          {imgSrc && (
            <Image
              src={imgSrc}
              alt={`${movieDetails?.title} poster`}
              layout="fill"
              objectFit="cover"
              onError={handleImageError}
              className="transition-opacity duration-300 ease-in-out"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <CardContent className="p-4 flex flex-col bg-card text-card-foreground">
          <h3 className="text-xl font-semibold mb-2 gradient-text">{movie.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{movie.description}</p>
          {movieDetails && (
            <div className="mt-2 space-y-1">
              <p className="text-sm"><span className="font-medium">Year:</span> {movieDetails.year}</p>
              <p className="text-sm"><span className="font-medium">Genre:</span> {movieDetails.genre}</p>
              <p className="text-sm">
                <span className="font-medium">IMDb:</span> 
                <span className="ml-1 px-2 py-1 bg-yellow-400 text-black rounded-full text-xs font-bold">
                  {movieDetails.imdbRating}
                </span>
              </p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default MovieCard;