import { useState } from "react";
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
import useMovies from "./Component/UseMovies";
import UseLocalStorageState from "./Component/UseLocalStorageState";
const KEY = "edd0b038";

export default function App() {
  const [query, setQuery] = useState("redemption");

  const [selectedId, setSelectedId] = useState(null);

  const { movies, isloading, error } = useMovies(query);

  const [watched, setWatched] = UseLocalStorageState([], "watched");

  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

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
