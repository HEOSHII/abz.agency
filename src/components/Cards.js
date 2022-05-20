import React, { useState } from "react";
import CardsList from "./CardsList";

function Cards(props) {
  const styles = { display: "block" };

  props.disabled ? (styles.display = "none") : (styles.display = "block");
  return (
    <section className="cards container" id="users">
      <div className="cards__inner">
        <h2 className="cards__title">Working with GET request</h2>
        <CardsList users={props.users} />
        <button
          className="button cards__button"
          onClick={() => props.nextPage()}
          style={styles}
          disabled={props.disabled}
        >
          Show more
        </button>
      </div>
    </section>
  );
}

export default Cards;
