import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Col } from "react-bootstrap";

export const FavoriteMovies = ({ favoriteMoviesList, movies }) => {
  const favoriteMovieObjects = favoriteMoviesList.map((movieId) => movies.find((m) => m.id === movieId || m._id === movieId));

  return (
    <>
      {favoriteMovieObjects.length === 0 ? (
        <p>You have no favorite movies.</p>
      ) : (
        <>
          {favoriteMovieObjects.map((movie) => {
            return movie ? (
              <Col md={6} lg={3} className="mb-3" key={movie.id}>
                <MovieCard key={movie.id} movie={movie} />
              </Col>
            ) : null;
          })}
        </>
      )
      }
    </>
  )
};

// Props constraints
FavoriteMovies.propTypes = {
  favoriteMoviesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
}