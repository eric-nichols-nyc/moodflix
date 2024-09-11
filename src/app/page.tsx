import MoodBasedMovieApp from "@/components/mood-based-movie-app";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <MoodBasedMovieApp />
      </main>
    </div>
  );
}
