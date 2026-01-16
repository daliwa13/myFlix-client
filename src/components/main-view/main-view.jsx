import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import PropTypes from "prop-types";
import { Row, Button, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const similarMovies = selectedMovie
    ? movies.filter(
      (film) => film.genre.name === selectedMovie.genre.name && film.id !== selectedMovie.id
    ).slice(0, 3)
    : [];

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

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
          <br />
          <h2>Similar Movies</h2>
          <Row className="mt-3">
            {similarMovies.length === 0 ? (
              <Col>No similar movies found.</Col>
            ) : (
              similarMovies.map((movie) => (
                <Col md={4} key={movie.id} className="mb-3">
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) =>
            <Col md={3} key={movie.id} className="mb-3">
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          )}
          <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
        </>
      )
      }
    </Row>
  );
};

// Props constraints
MainView.propTypes = {};