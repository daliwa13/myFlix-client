import PropTypes from "prop-types";
import { Card, Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../movie-card/favorite-button";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

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
        style={{ cursor: "pointer" }}>
        <Link to={'/'} className="text-light">
          Back
        </Link>
        <br></br>
        <FavoriteButton movieId={movie.id} isFavorite={movie.isFavorite} />
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