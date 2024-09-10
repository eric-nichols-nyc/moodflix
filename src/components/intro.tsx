import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Intro: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="w-full md:w-1/2">
        <CardContent className="p-6">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">Placeholder Image</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Welcome to MoodFlix</h1>
          <p className="text-gray-600 dark:text-gray-300">
            MoodFlix is your personal movie recommendation engine that suggests films based on your current mood.
            Whether you&apos;re feeling energetic, relaxed, or somewhere in between, we&apos;ve got the perfect movie for you.
          </p>
        </CardContent>
      </Card>
      
      <Card className="w-full md:w-1/2">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">How it works</h2>
            <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 mb-6">
              <li>Assess your current mood</li>
              <li>Optionally select a genre</li>
              <li>Set your preferred release year range</li>
              <li>Get personalized movie recommendations</li>
            </ol>
          </div>
          <Button className="w-full">Explore Movies</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Intro;
