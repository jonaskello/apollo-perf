import React from "react";

export function BookList({ data, olle, updateOlle }) {
  return (
    <div>
      <h2 onClick={updateOlle}>olle: {olle}</h2>
      {data.books.slice(0, 9).map(({ title, author }) => (
        <div key={title}>
          <p>{`${title}: ${author}`}</p>
        </div>
      ))}
    </div>
  );
}
