import { useEffect, useState } from "react";
import Header from "./Component/Header";
import Main from "./Component/Main";
// import tempMovieData from "./Component/tempMovieData";
import NumResults from "./Component/NumResults";
import Search from "./Component/Search";
import Box from "./Component/Box";
import MovieList from "./Component/MovieList";
import WatchedSummary from "./Component/WatchedSummary";
import WatchedMovieList from "./Component/WatchedMovieList";
// import tempWatchedData from "./Component/tempWatchedData";
import MovieDetails from "./Component/MovieDetails";
const KEY = "edd0b038";

export default function App() {
  const [query, setQuery] = useState("redemption");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      // abort contrller
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
          // console.  log(data);
          // setIsLoading(false);
        } catch (err) {
          console.log(err);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Header>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Header>

      <Main>
        <Box>
          {isloading && <Loader />}
          {!isloading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
          {/* {isloading ? <Loader /> : <MovieList movies={movies} />} */}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              KEY={KEY}
              onAddWatched={handleAddWatch}
              watched={watched}
              movies={movies}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error"> {message}</p>;
}
