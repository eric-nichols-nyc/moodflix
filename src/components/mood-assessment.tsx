import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface MoodAssessmentProps {
  onMoodAssess: (assessment: {
    moodValue: number;
    anxietyValue: number;
    energyValue: number;
    choicesSummary: string;
  }) => void;
}

const MoodAssessment: React.FC<MoodAssessmentProps> = ({ onMoodAssess }) => {
  const [moodValue, setMoodValue] = useState(250);
  const [anxietyValue, setAnxietyValue] = useState(250);
  const [energyValue, setEnergyValue] = useState(250);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      // Simulating API call to get choicesSummary
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moodValue, anxietyValue, energyValue }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();

      onMoodAssess({ moodValue, anxietyValue, energyValue, choicesSummary: data.choicesSummary });
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Label>Mood</Label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[moodValue]}
          onValueChange={(value) => setMoodValue(value[0])}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Sad</span>
          <span>Happy</span>
        </div>
      </div>

      <div className="mb-4">
        <label>Anxiety</label>
        <Slider
          min={0}
          max={500}
          step={1}
          value={[anxietyValue]}
          onValueChange={(value) => setAnxietyValue(value[0])}
        />
      </div>

      <div className="mb-4">
        <label>Energy</label>
        <Slider
          min={0}
          max={500}
          step={1}
          value={[energyValue]}
          onValueChange={(value) => setEnergyValue(value[0])}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Analyze and Get Recommendations
      </button>
    </div>
  );
};

export default MoodAssessment;
