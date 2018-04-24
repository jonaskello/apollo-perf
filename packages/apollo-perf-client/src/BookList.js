import React from "react";
import * as Actions from "./Actions";

export function BookList({ data, olle, dispatch }) {
  return (
    <div>
      <h2>olle: {olle}</h2>
      <button onClick={() => dispatch(Actions.inc())}>inc</button>
      <button onClick={() => dispatch(Actions.dec())}>dec</button>
      <button onClick={() => dispatch(Actions.mutate())}>mutate</button>
      {data.books.slice(0, 9).map(({ id, title, authors }) => (
        <div key={id}>
          <p>{`${title}: ${authors[0].name}`}</p>
        </div>
      ))}
    </div>
  );
}
