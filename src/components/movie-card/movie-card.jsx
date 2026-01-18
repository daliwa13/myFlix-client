import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 border-primary" style={{ cursor: "pointer" }}
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <Card.Img variant="top" src={movie.imageURL} />
      <Card.Body>
        <Card.Title className="text-primary">{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center bg-primary text-white">
        Open
      </Card.Footer>
    </Card>
  );
};

// Props constraints
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};