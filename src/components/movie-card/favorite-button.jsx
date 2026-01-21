import { useState } from "react";
import { Button } from "react-bootstrap";

export const FavoriteButton = ({ movieId, isFavorite: initialIsFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  const username = JSON.parse(localStorage.getItem("user")).username;

  const toggleFavorite = async () => {
    if (!token || !username) return;

    setIsLoading(true);

    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://my-flix-2a35e956c61d.herokuapp.com/users/${username}/movies/${movieId}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }

      // Update localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      let favoriteMovies = user.favoriteMovies || [];
      if (isFavorite) {
        favoriteMovies = favoriteMovies.filter((id) => id !== movieId);
      } else {
        favoriteMovies.push(movieId);
      }
      user.favoriteMovies = favoriteMovies;
      localStorage.setItem("user", JSON.stringify(user));
      setIsFavorite((prev) => !prev);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isFavorite ? "danger" : "light"}
      size="sm"
      onClick={toggleFavorite}
      disabled={isLoading}
      className="mt-2"
    >
      {isLoading
        ? "Updating..."
        : isFavorite
          ? "Remove from Favorites"
          : "Add to Favorites"}
    </Button>
  );
};
