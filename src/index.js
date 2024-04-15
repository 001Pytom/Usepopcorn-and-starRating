import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";
import ShowMoreCollapse from "./showmore";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movies was rated {movieRating} stars</p>;
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />
    <StarRating
      maxRating={5}
      color="red"
      size={20}
      messages={["Terrible", "Bad", "Okay", "Good", "Amaing"]}
      defaultRating={3}
    />
    <StarRating maxRating={10} color="red" size={20} defaultRating={5} />'
    <Test />
    {/* <ShowMoreCollapse
      maxLength={2}
      text={`<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>`}
    /> */}
  </React.StrictMode>
);
