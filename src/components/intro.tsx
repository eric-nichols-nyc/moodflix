import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

const Intro: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 intro-component">
      <Card className="w-full md:w-1/2">
        <CardContent className="p-6">
          <div className="aspect-square rounded-lg mb-4 overflow-hidden">
            <Image
              src="/images/intro.png"
              alt="MoodFlix Intro"
              width={640}
              height={360}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4 gradient-text custom-gradient">Welcome to MoodFlix</h1>
          <p className="text-gray-700 dark:text-gray-200">
            MoodFlix is your personal movie recommendation engine that suggests films based on your current mood.
            Whether you&apos;re feeling energetic, relaxed, or somewhere in between, we&apos;ve got the perfect movie for you.
          </p>
        </CardContent>
      </Card>
      
      <Card className="w-full md:w-1/2">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">How it works</h2>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-200 mb-6">
              <li>Assess your current mood</li>
              <li>Set your preferred release year range</li>
              <li>Get personalized movie recommendations</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Intro;
