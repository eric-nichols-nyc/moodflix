import React from "react";
import { MovieRecommendation } from "../../types";
import MovieCard from "./movie-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface MovieListProps {
  movies: MovieRecommendation[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6 text-center">
          <p className="text-lg text-muted-foreground">No movies found. Try adjusting your mood assessment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto relative overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
              <div className="p-1">
                <MovieCard movie={movie} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="custom-button absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full hidden sm:flex" />
        <CarouselNext className="custom-button absolute right-0 top-1/2 -translate-y-1/2 translate-x-full hidden sm:flex" />
      </Carousel>
      <div className="mt-4 flex justify-center sm:hidden">
        <p className="text-sm text-muted-foreground">Swipe to see more movies</p>
      </div>
    </div>
  );
};

export default MovieList;
