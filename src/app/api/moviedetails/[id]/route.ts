import { NextRequest, NextResponse } from "next/server";

const OMDB_API_KEY = process.env.OMDB_API_KEY;

if (!OMDB_API_KEY) {
  throw new Error("OMDB_API_KEY is not set in the environment variables");
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movieData = await response.json();

    if (movieData.Error) {
      return NextResponse.json({ error: movieData.Error }, { status: 404 });
    }

    const { Title: title, Year: year, Genre: genre, Plot: plot, Poster: poster, imdbRating } = movieData;

    return NextResponse.json({ title, year, genre, plot, poster, imdbRating });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 });
  }
}