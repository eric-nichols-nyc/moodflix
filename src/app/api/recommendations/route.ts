import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for the request body
const moodAssessmentSchema = z.object({
  mood: z.number().min(0).max(100),
  yearRange: z.tuple([z.number().min(1900).max(2024), z.number().min(1900).max(2024)]),
});

type MoodAssessment = z.infer<typeof moodAssessmentSchema>;

// Mock movie database
const mockMovies = [
  { id: 1, title: "Happy Go Lucky", year: 2008, mood: 80 },
  { id: 2, title: "The Shawshank Redemption", year: 1994, mood: 60 },
  { id: 3, title: "Inception", year: 2010, mood: 70 },
  { id: 4, title: "The Dark Knight", year: 2008, mood: 65 },
  { id: 5, title: "Forrest Gump", year: 1994, mood: 75 },
  { id: 6, title: "The Matrix", year: 1999, mood: 68 },
  { id: 7, title: "Pulp Fiction", year: 1994, mood: 72 },
  { id: 8, title: "Interstellar", year: 2014, mood: 85 },
  { id: 9, title: "The Avengers", year: 2012, mood: 78 },
  { id: 10, title: "Schindler's List", year: 1993, mood: 40 },
];

function getRecommendations(assessment: MoodAssessment) {
  const { mood, yearRange } = assessment;
  const [startYear, endYear] = yearRange;

  return mockMovies
    .filter(movie => 
      movie.year >= startYear && 
      movie.year <= endYear &&
      Math.abs(movie.mood - mood) <= 20
    )
    .sort((a, b) => Math.abs(a.mood - mood) - Math.abs(b.mood - mood))
    .slice(0, 5)
    .map(({ id, title, year }) => ({ id, title, year }));
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate the body against our schema
    const validatedData = moodAssessmentSchema.parse(body);

    // Get movie recommendations based on the mood assessment
    const recommendations = getRecommendations(validatedData);

    // Return the recommendations
    return NextResponse.json({
      message: "Recommendations processed successfully",
      recommendations,
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
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}