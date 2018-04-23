import React from "react";
import { connect } from "react-redux";
import * as Actions from "./Actions";

export function BookListInternal({ data, olle, dispatch }) {
  return (
    <div>
      <h2>olle: {olle}</h2>
      <button onClick={() => dispatch(Actions.inc())}>inc</button>
      <button onClick={() => dispatch(Actions.dec())}>dec</button>
      {data.books.slice(0, 9).map(({ id, title, authors }) => (
        <div key={id}>
          <p>{`${title}: ${authors.length}`}</p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    olle: state.olle
  };
};

export const BookList = connect(mapStateToProps)(BookListInternal);
