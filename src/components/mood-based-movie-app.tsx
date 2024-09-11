"use client"
import React, { useState } from 'react';
import { Film, Search } from 'lucide-react';
import MovieList from './movie-list';
import MoodAssessment from './mood-assessment';
import Intro from './intro';
import { Assessment, MovieRecommendation, RecommendationResponse } from '../../types'

const MoodBasedMovieApp = () => {
  const [movies, setMovies] = useState<MovieRecommendation[]>([]);
  const [stateSummary, setStateSummary] = useState<string | null>(null);
  const [choicesSummary, setChoicesSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMoodAssess = async (assessment: Assessment) => {
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
      console.log(data);
      setMovies(data.recommendations || []);
      setStateSummary(data.stateSummary);
      setChoicesSummary(data.choicesSummary);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setMovies([]);
      setStateSummary(null);
      setChoicesSummary(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Film className="mr-2" /> MoodFlix
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            className="pl-10 pr-4 py-2 border rounded-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </header>
      
      <main>
        <section className="mb-8">
          <Intro />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
          <MoodAssessment onMoodAssess={handleMoodAssess} />
        </section>
        
        {error && (
          <section className="mb-8">
            <div className="text-red-500">{error}</div>
          </section>
        )}

        {stateSummary && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Your Current State</h2>
            <p className="text-lg">{stateSummary}</p>
          </section>
        )}

        {choicesSummary && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Movie Choices Summary</h2>
            <p className="text-lg">{choicesSummary}</p>
          </section>
        )}
        
        {movies.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Recommended Movies
            </h2>
            <MovieList movies={movies} />
          </section>
        )}
      </main>
    </div>
  );
};

export default MoodBasedMovieApp;