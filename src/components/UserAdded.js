import React, { useState } from "react";

function UserAdded(props) {
  const styles = {
    hide: { display: "none" },
    show: { display: "flex" },
  };
  let display = styles.hide;
  props.successfull ? (display = styles.show) : (display = styles.hide);

  return (
    <section className="user-added" style={display}>
      <h2>User successfully registered</h2>
      <img src="./assets/success-image.svg" />
    </section>
  );
}

export default UserAdded;
