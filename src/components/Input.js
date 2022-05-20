import React, { useState } from "react";

function Input(props) {
  const styles = {
    hideTextError: { display: "none" },
    showTextError: { display: "block" },
    placeholderActive: { top: "0", fontSize: "12px", background: "#f8f8f8" },
    placeholderError: {
      top: "0",
      fontSize: "12px",
      background: "#f8f8f8",
      color: "#CB3D40",
    },
    borderError: {
      boxShadow: "0 0 1px 2px #CB3D40",
      borderRadius: "4px",
    },
    borderFocus: {
      boxShadow: "0 0 1px 2px #00bdd3",
      borderRadius: "4px",
    },
  };

  const RegExr = {
    phone: /^[\+]{0,1}380([0-9]{9})$/,
    email:
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
  };

  const [textError, setTextError] = useState(styles.hideTextError);
  const [placeholder, setPlaceholder] = useState({});
  const [border, setBorder] = useState({});

  function checkValid(event) {
    const value = event.target.value;
    const length = value.length;
    const id = event.target.id;
    if (id === "name") {
      checkNameValid(value, length, id);
    }
    if (id === "email") {
      checkEmailValid(value, length, id);
    }
    if (id === "phone") {
      event.target.value = event.target.value.replace(/[^+\d]/, "");
      checkPhoneValid(value, length, id);
    }
  }

  function checkNameValid(value, length, id) {
    if ((length < 2 && length > 0) || length > 60) {
      inputInvalid(id);
    } else {
      inputValid(value, id);
    }
  }

  function checkEmailValid(value, length, id) {
    if (length === 0) {
      inputValid(value, id);
      return;
    }
    value.match(RegExr.email) !== null
      ? inputValid(value, id)
      : inputInvalid(id);
  }

  function checkPhoneValid(value, length, id) {
    if (length === 0) {
      inputValid(value);
      return;
    }
    if (length > 13) {
      inputInvalid(id);
      return;
    }
    value.match(RegExr.phone) !== null
      ? inputValid(value, id)
      : inputInvalid(id);
  }

  function inputValid(value, id) {
    setTextError(styles.hideTextError);
    setBorder(styles.borderFocus);
    setPlaceholder(styles.placeholderActive);
    props.data(value, id);
  }

  function inputInvalid(id) {
    setTextError(styles.showTextError);
    setBorder(styles.borderError);
    setPlaceholder(styles.placeholderError);
    props.data("", id);
  }

  function onFocus(event) {
    setBorder(
      border.boxShadow === "0 0 1px 2px #CB3D40"
        ? styles.borderError
        : styles.borderFocus
    );
    if (event.target.id === "phone" && event.target.value.length === 0) {
      event.target.value = "+380";
    }
  }

  function onBlur(event) {
    if (event.target.value.length > 0) {
      setPlaceholder(styles.placeholderActive);
    } else {
      setPlaceholder({});
    }
    setBorder(
      border.boxShadow === "0 0 1px 2px #CB3D40" ? styles.borderError : {}
    );
    setPlaceholder(
      border.boxShadow === "0 0 1px 2px #CB3D40"
        ? styles.placeholderError
        : event.target.value.length > 0
        ? styles.placeholderActive
        : {}
    );
  }

  return (
    <div className="form__inputs" style={border}>
      <input
        name={props.input.name}
        className="form__input"
        type="text"
        id={props.input.id}
        onChange={checkValid}
        onFocus={onFocus}
        onBlur={(e) => onBlur(e)}
      />
      <p className="placeholder" style={placeholder}>
        {props.input.placeholder}
      </p>
      <p className="error-text" style={textError}>
        {props.input.error}
      </p>
    </div>
  );
}

export default Input;
