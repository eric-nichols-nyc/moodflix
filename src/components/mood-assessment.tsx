import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
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
    } finally {
      setIsLoading(false);
    }
  };

  const getEmoji = (value: number) => {
    if (value < 100) return "😔";
    if (value < 200) return "😕";
    if (value < 300) return "😐";
    if (value < 400) return "🙂";
    return "😄";
  };

  return (
    <div className="container-desktop">
      <Card className="w-full mx-auto hover-scale">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Mood {getEmoji(moodValue)}</Label>
            <Slider
              min={0}
              max={500}
              step={1}
              value={[moodValue]}
              onValueChange={(value) => setMoodValue(value[0])}
              className="mb-2 custom-slider"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Sad</span>
              <span>Happy</span>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold">Anxiety Level {anxietyValue > 250 ? "😰" : "😌"}</Label>
            <Slider
              min={0}
              max={500}
              step={1}
              value={[anxietyValue]}
              onValueChange={(value) => setAnxietyValue(value[0])}
              className="mb-2 custom-slider"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Calm</span>
              <span>Anxious</span>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold">Energy Level {energyValue > 250 ? "⚡" : "🔋"}</Label>
            <Slider
              min={0}
              max={500}
              step={1}
              value={[energyValue]}
              onValueChange={(value) => setEnergyValue(value[0])}
              className="mb-2 custom-slider"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <Button
            onClick={handleSubmit}
            className="w-full custom-button"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Get Movie Recommendations"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodAssessment;
