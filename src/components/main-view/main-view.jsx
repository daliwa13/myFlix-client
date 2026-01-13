import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://my-flix-2a35e956c61d.herokuapp.com/movies")
      .then((res) => res.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            imageURL: movie.imageURL,
            genre: { name: movie.genre.name, description: movie.genre.description },
            director: {
              name: movie.director.name, bio: movie.director.bio, birthYear: movie.director.birthYear, deathYear: movie.director.deathYear
            }
          };
        });
        setMovies(moviesFromApi);
      })
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    const genreName = selectedMovie.genre.name;
    const similarMovies = movies.filter((film) => film.genre.name === genreName && film.id !== selectedMovie.id);

    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <br />
        <h2>Similar Movies</h2>

        <div>
          {similarMovies.map((movie) =>
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          )}
        </div>
      </div>
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

// Props constraints
MainView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birthYear: PropTypes.number,
      deathYear: PropTypes.number
    }).isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};