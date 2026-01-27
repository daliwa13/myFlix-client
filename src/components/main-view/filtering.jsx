import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const Filtering = ({ searchTerm, onSearchChange, genreFilter, onGenreChange, genres }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Search title"
              className="bg-light text-primary border-primary border-2"
              htmlSize={70}
              aria-label="Search title"
              value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />

            <InputGroup.Text
              role="button"
              type="submit"
              variant="light"
              className="bg-light text-primary border-primary border-2"
              style={{ cursor: "pointer" }}
            >
              Search
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            className="bg-light text-primary border-primary border-2"
            aria-label="Filter by genre"
            value={genreFilter}
            onChange={(e) => onGenreChange(e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}

          </Form.Select>
        </Col>
      </Row>
    </Form>
  )
}

// PropTypes validation
Filtering.propTypes = {
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  genreFilter: PropTypes.string,
  onGenreChange: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};