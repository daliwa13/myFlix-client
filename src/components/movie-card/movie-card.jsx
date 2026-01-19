import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100 border-primary">
      <Card.Img variant="top" src={movie.imageURL} />
      <Card.Body>
        <Card.Title className="text-primary">{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center bg-primary">
        <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="text-light">
          Open
        </Link>
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