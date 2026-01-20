import PropTypes from "prop-types";
import { Card, ListGroup, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../movie-card/favorite-button";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);
  const similarMovies = movies.filter((m) => m.genre.name === movie.genre.name && m.id !== movie.id);

  return (
    <Container>
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
      <h2 className="mt-3">Similar Movies</h2>
      <Row>
        {similarMovies.length === 0 ? (
          <p>No similar movies found.</p>
        ) : (
          similarMovies.map((sm) => (
            <Col xs={6} lg={4} className="mb-3" key={sm.id}>
              <MovieCard movie={sm} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};