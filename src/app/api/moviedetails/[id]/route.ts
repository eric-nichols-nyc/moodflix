import { NextRequest, NextResponse } from "next/server";

// Updated mock movie database
const mockMovies = [
  { 
    id: 1, 
    title: "Happy Go Lucky", 
    year: 2008, 
    genre: "Comedy, Drama",
    plot: "A cheerful primary school teacher maintains her optimism despite a mugging, a terrible driving instructor, and a cynical flatmate.", 
    poster: "https://example.com/happy-go-lucky-poster.jpg",
    imdbRating: 7.5 
  },
  { 
    id: 2, 
    title: "The Shawshank Redemption", 
    year: 1994, 
    genre: "Drama",
    plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", 
    poster: "https://example.com/shawshank-redemption-poster.jpg",
    imdbRating: 9.3 
  },
  { 
    id: 3, 
    title: "Inception", 
    year: 2010, 
    genre: "Action, Adventure, Sci-Fi",
    plot: "A thief who enters the dreams of others to steal secrets from their subconscious is offered a chance to regain his old life as payment for a task considered to be impossible: inception.", 
    poster: "https://example.com/inception-poster.jpg",
    imdbRating: 8.8 
  },
  { 
    id: 4, 
    title: "The Dark Knight", 
    year: 2008, 
    genre: "Action, Crime, Drama",
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", 
    poster: "https://example.com/dark-knight-poster.jpg",
    imdbRating: 9.0 
  },
  { 
    id: 5, 
    title: "Forrest Gump", 
    year: 1994, 
    genre: "Drama, Romance",
    plot: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.", 
    poster: "https://example.com/forrest-gump-poster.jpg",
    imdbRating: 8.8 
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const movie = mockMovies.find(m => m.id === id);

  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  const { title, year, genre, plot, poster, imdbRating } = movie;

  return NextResponse.json({ title, year, genre, plot, poster, imdbRating });
}