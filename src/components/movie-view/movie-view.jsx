import PropTypes from "prop-types";
import { Card, Button, ListGroup } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {

  return (
    <Card className="border-primary">
      <Card.Img src={movie.imageURL} className="w-100" />
      <Card.Body>
        <Card.Title className="text-primary">
          <span>Title: </span>
          <span>{movie.title}</span>
        </Card.Title>

        <Card.Text>
          <span>Description: </span>
          <span>{movie.description}</span>
        </Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>Director: {movie.director.name}</ListGroup.Item>
        <ListGroup.Item>Genre: {movie.genre.name}</ListGroup.Item>
      </ListGroup>
      <Card.Footer
        className="text-center bg-primary text-white"
        onClick={onBackClick}
        style={{ cursor: "pointer" }}>
        Back
      </Card.Footer>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};