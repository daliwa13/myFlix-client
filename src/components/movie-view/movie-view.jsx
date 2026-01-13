import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";


export const MovieView = ({ movie, movies, onBackClick }) => {
  /*   const genreName = movie.genre.name;
    const similarMovies = movies.filter((film) => film.genre.name === genreName && film.id !== movie.id);
    console.log(similarMovies); */

  return (
    <div>
      <div>
        <img src={movie.imageURL} style={{ maxHeight: "600px" }} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      {/*       <br />
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
      <br /> */}
      <button onClick={onBackClick}>Back</button>
    </div>
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