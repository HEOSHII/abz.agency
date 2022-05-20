import React from "react";

function Board() {
  return (
    <section className="board container">
      <div className="board__inner">
        <div className="board__content">
          <h1 className="board__title">
            Test assignment for front-end developer
          </h1>
          <p className="board__text">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
        </div>
        <button className="button board__button">Sign up</button>
      </div>
    </section>
  );
}

export default Board;
