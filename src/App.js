import { useState } from "react";
import Header from "./Component/Header";
import Main from "./Component/Main";
import tempMovieData from "./Component/tempMovieData";
import NumResults from "./Component/NumResults";
import Search from "./Component/Search";
import Box from "./Component/Box";
import MovieList from "./Component/MovieList";
import WatchedSummary from "./Component/WatchedSummary";
import WatchedMovieList from "./Component/WatchedMovieList";
import tempWatchedData from "./Component/tempWatchedData";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Header>
        <Search />
        <NumResults movies={movies} />
      </Header>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
