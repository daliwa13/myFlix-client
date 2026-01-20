import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FavoriteButton } from "./favorite-button";

export const MovieCard = ({ movie }) => {
  const favoriteMovieIds = JSON.parse(localStorage.getItem("user"))?.favoriteMovies || [];
  movie.isFavorite = favoriteMovieIds.includes(movie.id) || favoriteMovieIds.includes(movie._id);

  return (
    <Card className="h-100 border-primary">
      <Card.Img variant="top" src={movie.imageURL} />
      <Card.Body>
        <Card.Title className="text-primary">{movie.title}</Card.Title>
        <Card.Text>{movie.genre.name}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center bg-primary">
        <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="text-light">
          Open
        </Link>
        <br></br>
        <FavoriteButton movieId={movie.id} isFavorite={movie.isFavorite} />
      </Card.Footer>
    </Card>
  );
};

// Props constraints
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};