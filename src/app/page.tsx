import MoodBasedMovieApp from "@/components/mood-based-movie-app";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 ">
      <Header />
      <main className="flex-grow">
        <MoodBasedMovieApp />
      </main>
      <Footer />
    </div>
  );
}
