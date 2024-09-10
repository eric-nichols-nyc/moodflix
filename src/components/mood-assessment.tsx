import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface MoodAssessmentProps {
  onMoodAssess: (assessment: {
    mood: number;
    yearRange: [number, number];
  }) => void;
}

const MoodAssessment: React.FC<MoodAssessmentProps> = ({ onMoodAssess }) => {
  const [mood, setMood] = useState(50);
  const [releaseYear, setReleaseYear] = useState([1970, 2024]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      onMoodAssess({ mood, yearRange: releaseYear as [number, number] });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Mood</Label>
        <Slider 
          min={0} 
          max={100} 
          step={1} 
          value={[mood]}
          onValueChange={(value) => setMood(value[0])}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Sad</span>
          <span>Happy</span>
        </div>
      </div>

      <div>
        <Label>Release Year Range</Label>
        <Slider
          defaultValue={releaseYear}
          max={2024}
          min={1900}
          step={1}
          onValueChange={setReleaseYear}
        />
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>{releaseYear[0]}</span>
          <span>{releaseYear[1]}</span>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Get Movie Recommendations
      </button>
    </div>
  );
};

export default MoodAssessment;