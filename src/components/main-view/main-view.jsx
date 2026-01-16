import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import PropTypes from "prop-types";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // Fetching movies from the API
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://my-flix-2a35e956c61d.herokuapp.com/movies", {
      // fetch("http://localhost:8080/movies", { // for local testing
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  // If no user is logged in, show the login view
  if (!user) {
    return (
      <div>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </div>
    );
  }

  // If a movie is selected, show the movie view + similar movies
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
    return <div>The list is empty!</div>;
  }

  // Main view showing list of movies
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
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
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
  onBackClick: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};