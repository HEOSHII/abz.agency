import React from "react";

function PositionRadio(props) {
  function handleRadio(event) {
    props.getRadio(event.target.id);
  }
  return (
    <div className="radios__item">
      <input
        type="radio"
        name="position_id"
        id={props.position.id}
        onChange={handleRadio}
        value={props.position.id}
      />
      <label htmlFor={props.position.id} className="radios__label">
        {props.position.name}
      </label>
    </div>
  );
}

export default PositionRadio;
