import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Filtering } from "./filtering";
import PropTypes from "prop-types";
import { Row, Button, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("All genres");
  const genres = ["All genres", ...new Set(movies.map((movie) => movie.genre.name))];

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

  const filteredMovies = movies.filter(({ title, genre }) => {
    const machesTitle = title.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesGenre = genreFilter === "All genres" || genre.name === genreFilter;
    return machesTitle && matchesGenre;
  });

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={
                      (user, token) => {
                        setUser(user);
                        setToken(token)
                      }
                    } />
                  </Col>
                )
                }
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (

                  <Col md={8} lg={10}>
                    <MovieView movies={movies} />
                  </Col>
                )
                }
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <Filtering
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      genreFilter={genreFilter}
                      onGenreChange={setGenreFilter}
                      genres={genres}
                    />
                    {filteredMovies.map((movie) => (
                      <Col md={6} lg={3} key={movie.id} className="mb-3">
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col className="ms-3 me-3">
                    <ProfileView movies={movies} />
                  </Col>
                )
                }
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

// Props constraints
MainView.propTypes = {};