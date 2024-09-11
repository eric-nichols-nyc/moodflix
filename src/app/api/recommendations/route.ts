import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';

// Define the schema for the request body
const moodAssessmentSchema = z.object({
  moodValue: z.number().min(0).max(500),
  anxietyValue: z.number().min(0).max(500),
  energyValue: z.number().min(0).max(500),
});

// Define the schema for the AI-generated response
const movieRecommendationsSchema = z.object({
  stateSummary: z.string(),
  recommendations: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })),
  choicesSumnmary: z.string(),
});

type MoodAssessment = z.infer<typeof moodAssessmentSchema>;

function analyzeState(moodValue: number, anxietyValue: number, energyValue: number): string {
  const mood = analyzeMood(moodValue);
  const anxiety = analyzeAnxiety(anxietyValue);
  const energy = analyzeEnergy(energyValue);
  return `Mood: ${mood}, Anxiety: ${anxiety}, Energy: ${energy}`;
}

function analyzeMood(value: number): string {
  if (value < 100) return "Very sad";
  if (value < 200) return "Sad";
  if (value < 300) return "Neutral";
  if (value < 400) return "Happy";
  return "Very happy";
}

function analyzeAnxiety(value: number): string {
  if (value < 100) return "Very calm";
  if (value < 200) return "Calm";
  if (value < 300) return "Neutral";
  if (value < 400) return "Anxious";
  return "Very anxious";
}

function analyzeEnergy(value: number): string {
  if (value < 100) return "Very low energy";
  if (value < 200) return "Low energy";
  if (value < 300) return "Moderate energy";
  if (value < 400) return "High energy";
  return "Very high energy";
}

async function getMovieRecommendations(assessment: MoodAssessment) {
  const { moodValue, anxietyValue, energyValue } = assessment;
  const stateDescription = analyzeState(moodValue, anxietyValue, energyValue);

  const prompt = `
    Analyze the following emotional state and provide a friendly and personal response:
    1. Explain in a friendly, conversational tone the overall state, but don't use the word energy or anxiety (1-2 sentence)
    2. A list of 4 movie recommendations that match this state
    3. Explain in a friendly, conversational tone why the following movies are recommended: (1 sentence each)
    4. Provide a brief summary (about 3-4 sentences) that connects the movie choices to the user's mood.
    Emotional state: "${stateDescription}"
  `;

  const { object } = await generateObject({
    model: openai('gpt-3.5-turbo-1106'),
    schema: movieRecommendationsSchema,
    prompt: prompt,
  });

  return object;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate the body against our schema
    const validatedData = moodAssessmentSchema.parse(body);

    // Get AI-powered state analysis and movie recommendations
    const result = await getMovieRecommendations(validatedData);

    // Return the recommendations
    return NextResponse.json({
      message: "Emotional state analyzed and recommendations generated successfully",
      ...result,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      // If it's a validation error, return the error details
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    // For any other error, return a generic error message
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}