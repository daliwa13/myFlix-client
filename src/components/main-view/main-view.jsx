import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Pulp Fiction",
      year: 1994,
      genre: "Crime",
      image: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      director: "Quentin Tarantino"
    },
    {
      id: 2,
      title: "Lion King",
      year: 1994,
      genre: "Animation",
      image: "https://m.media-amazon.com/images/M/MV5BZjY3NjhkZjUtMzFiYS00MDQzLThhMDYtYjRkZDI1ODhmZDVkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      director: "Roger Allers"
    },
    {
      id: 3,
      title: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
      director: "Christopher Nolan"
    },
    {
      id: 4,
      title: "Lost in Translation",
      year: 2003,
      genre: "Drama",
      image: "https://m.media-amazon.com/images/M/MV5BMTUxMzk0NDg1MV5BMl5BanBnXkFtZTgwNDg0NjkxMDI@._V1_FMjpg_UX1000_.jpg",
      director: "Sofia Coppola"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is emppty!</div>;
  }

  return (
    <div>
      {movies.map((movie) =>
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      )}
    </div>
  );
};
