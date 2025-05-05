"use client"
import React, { useState } from 'react';
import MovieList from './movie-list';
import MoodAssessment from './mood-assessment';
import Intro from './intro';
import Header from './header';
import { Assessment, MovieRecommendation, RecommendationResponse } from '../../types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the steps for the gallery/stepper
const STEPS = [
  'intro',
  'mood',
  'recommendations',
];

const MoodBasedMovieApp = () => {
  const [movies, setMovies] = useState<MovieRecommendation[]>([]);
  const [stateSummary, setStateSummary] = useState<string | null>(null);
  const [choicesSummary, setChoicesSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Helper to go to next step
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };
  // Helper to go to previous step
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // When mood is assessed, do not auto-advance; let user click Next
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
      // Do not auto-advance
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setMovies([]);
      setStateSummary(null);
      setChoicesSummary(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to reset all state and start over
  const handleStartOver = () => {
    setMovies([]);
    setStateSummary(null);
    setChoicesSummary(null);
    setError(null);
    setIsLoading(false);
    setCurrentStep(0);
  };

  // Render the current step
  const renderStep = () => {
    switch (STEPS[currentStep]) {
      case 'intro':
        return (
          <Card className="hover-scale">
            <CardContent className="pt-6">
              <Intro />
            </CardContent>
          </Card>
        );
      case 'mood':
        return (
          <section className="transition-all duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 gradient-text custom-gradient">How are you feeling today?</h2>
            {/* Show MoodAssessment only if not loading and summaries are not yet loaded */}
            {!isLoading && !(stateSummary || choicesSummary) && (
              <MoodAssessment onMoodAssess={handleMoodAssess} />
            )}
            {/* Show spinner while loading */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}
            {/* Show summaries below assessment if available and not loading */}
            {!isLoading && (stateSummary || choicesSummary) && (
              <div className="mt-8 space-y-6">
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
              </div>
            )}
          </section>
        );
      case 'recommendations':
        return movies.length > 0 ? (
          <section className="transition-all duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 gradient-text custom-gradient">
              Recommended Movies
            </h2>
            <MovieList movies={movies} />
          </section>
        ) : null;
      default:
        return null;
    }
  };

  // Determine if Next/Back buttons should be shown
  const showBack = currentStep > 0;
  // Only show Next if not on last step and, for 'mood', only after summaries are loaded
  const showNext =
    currentStep < STEPS.length - 1 &&
    ((STEPS[currentStep] !== 'mood') || ((stateSummary || choicesSummary) && STEPS[currentStep] === 'mood'));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto content-below-header">
        <div className="container-desktop mx-auto py-8 space-y-8">
          <main className="space-y-8">
            {error && (
              <Card className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700">
                <CardContent className="p-4">
                  <p className="text-red-600 dark:text-red-200">{error}</p>
                </CardContent>
              </Card>
            )}
            {renderStep()}
            <div className="flex justify-between mt-8">
              {showBack && (
                currentStep === STEPS.length - 1 ? (
                  <button
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={handleStartOver}
                    disabled={isLoading}
                  >
                    Start Over
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={prevStep}
                    disabled={isLoading}
                  >
                    Back
                  </button>
                )
              )}
              {showNext && (
                <button
                  className="ml-auto px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition"
                  onClick={nextStep}
                  disabled={isLoading}
                >
                  Next
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MoodBasedMovieApp;
