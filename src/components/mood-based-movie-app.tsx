"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import MovieList from './movie-list';
import MoodAssessment from './mood-assessment';
import Intro from './intro';
import Header from './header';
import { Assessment, MovieRecommendation, RecommendationResponse } from '../../types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MoodBasedMovieApp = () => {
  const [movies, setMovies] = useState<MovieRecommendation[]>([]);
  const [stateSummary, setStateSummary] = useState<string | null>(null);
  const [choicesSummary, setChoicesSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMoodAssess = async (assessment: Assessment) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get recommendations');
      }

      const data: RecommendationResponse = await response.json();
      setMovies(data.recommendations || []);
      setStateSummary(data.stateSummary);
      setChoicesSummary(data.choicesSummary);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setMovies([]);
      setStateSummary(null);
      setChoicesSummary(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header  />
      <div className="flex-1 overflow-y-auto content-below-header">
        <div className="container-desktop mx-auto py-8 space-y-8">
          <div className="relative w-full sm:w-64 mx-auto">
            <Input
              type="text"
              placeholder="Search movies..."
              className="pl-10 pr-4 py-2 w-full custom-button"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <main className="space-y-8">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Intro />
              </CardContent>
            </Card>

            <section className="transition-all duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold mb-4 gradient-text custom-gradient">How are you feeling today?</h2>
              <MoodAssessment onMoodAssess={handleMoodAssess} />
            </section>
            
            {error && (
              <Card className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700">
                <CardContent className="p-4">
                  <p className="text-red-600 dark:text-red-200">{error}</p>
                </CardContent>
              </Card>
            )}

            {isLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {stateSummary && (
              <Card className="hover-scale transition-all duration-300 ease-in-out">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold gradient-text custom-gradient">Your Current State</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{stateSummary}</p>
                </CardContent>
              </Card>
            )}

            {choicesSummary && (
              <Card className="hover-scale transition-all duration-300 ease-in-out">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold gradient-text custom-gradient">Movie Choices Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{choicesSummary}</p>
                </CardContent>
              </Card>
            )}
            
            {movies.length > 0 && (
              <section className="transition-all duration-300 ease-in-out">
                <h2 className="text-2xl font-semibold mb-4 gradient-text custom-gradient">
                  Recommended Movies
                </h2>
                <MovieList movies={movies} />
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MoodBasedMovieApp;
