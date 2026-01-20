import { useEffect, useState } from "react";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateProfileForm } from "./update-form";
import { DeregisterUser } from "./deregister";
import PropTypes from "prop-types"
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


export const ProfileView = ({ movies }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = JSON.parse(localStorage.getItem("user")).username;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!username || !token) {
      setError("Not authenticated.");
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://my-flix-2a35e956c61d.herokuapp.com/users/${username}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username, token]);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <div className="profile-view">
      <h2>Profile</h2>
      < UserInfo name={user.username} email={user.email} birthDay={user.birthDate} />
      <h3>Favorite Movies</h3>
      <Row>
        < FavoriteMovies favoriteMoviesList={user.favoriteMovies} movies={movies} key={movies.id} />
      </Row>
      < UpdateProfileForm user={user} onUpdateSuccess={(updatedUser) => setUser(updatedUser)} />
      < DeregisterUser />
    </div >
  );
};

// Props constraints
ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
