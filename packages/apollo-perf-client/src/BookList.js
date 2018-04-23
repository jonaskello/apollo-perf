import React from "react";

export function BookList({ data }) {
  return data.books.slice(0, 9).map(({ title, author }) => (
    <div key={title}>
      <p>{`${title}: ${author}`}</p>
    </div>
  ));
}
