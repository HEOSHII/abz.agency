import React from "react";

function Header() {
  return (
    <section className="header">
      <div className="header__inner container">
        <a href="#" className="header__logo">
          <img src="./assets/logo.svg" />
        </a>
        <div className="header__buttons">
          <a className="button users-button" href="#users">
            Users
          </a>
          <a className="button sign-up-button" href="#sign-up">
            Sign up
          </a>
        </div>
      </div>
    </section>
  );
}

export default Header;
