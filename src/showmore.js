import React, { useState } from "react";

function ShowMoreCollapse({ text, maxLength }) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div>
      {showFullText || text.length <= maxLength ? (
        <div>
          {text}
          {text.length > maxLength && (
            <button onClick={toggleShowMore}>Collapse</button>
          )}
        </div>
      ) : (
        <div>
          {text.slice(0, maxLength)}
          <button onClick={toggleShowMore}>Show More</button>
        </div>
      )}
    </div>
  );
}

export default ShowMoreCollapse;
