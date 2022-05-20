import React, { useState } from "react";
import Input from "./Input";
import InputPhoto from "./InputPhoto";
import PositionRadio from "./PositionRadio";

let sendDisabled = true;

function Rest(props) {
  const styles = {
    hide: { display: "none" },
    show: { display: "block" },
  };

  const [display, setDisplay] = useState(styles.show);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [value, setValue] = useState("");
  const [position, setPosition] = useState("");
  const [file, setFile] = useState("");

  const send = {
    name: nameValue,
    email: emailValue,
    phone: phoneValue,
    position_id: position,
    photo: file,
  };

  const inputs = [
    {
      id: "name",
      name: "name",
      placeholder: "Your name",
      error: "Name should be 2-60 characters",
    },
    {
      id: "email",
      name: "email",
      placeholder: "Email",
      error: "example@gmail.com",
    },
    {
      id: "phone",
      name: "phone",
      placeholder: "Phone",
      error: "example +380501234567",
    },
  ];

  function getValue(data, id) {
    setValue(data);
    if (id === "name") return setNameValue(data);
    if (id === "email") return setEmailValue(data);
    if (id === "phone") return setPhoneValue(data);
  }

  function getRadio(id) {
    setPosition(id);
  }

  function getFile(file) {
    setFile(file);
  }

  if (!Object.values(send).includes("")) {
    sendDisabled = false;
  } else {
    sendDisabled = true;
  }

  function sendFile(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = "https://frontend-test-assignment-api.abz.agency/api/v1/users";

    sendData(url, formData).then(() => {
      props.userAdded(true);
      setDisplay(styles.hide);
    });
  }

  async function sendData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: { Token: props.token },
      body: data,
    });
    if (!response.ok) {
      throw new Error("ERROR: ", response);
    }
    return await response.json();
  }

  return (
    <section className="rest container" style={display} id="sign-up">
      <div className="rest__inner">
        <h2 className="rest__title">Working with POST request</h2>
        <form className="form" onSubmit={sendFile}>
          {inputs.map((input) => {
            return (
              <Input
                input={input}
                key={input.id}
                data={getValue}
                value={value}
              />
            );
          })}

          <div className="form__positions">
            <p>Select your position</p>
            <div className="radios">
              {props.positions.map((position) => {
                return (
                  <PositionRadio
                    position={position}
                    key={position.id}
                    getRadio={getRadio}
                  />
                );
              })}
            </div>
          </div>

          <InputPhoto getFile={getFile} />

          <button
            type="submit"
            className="button rest__button"
            disabled={sendDisabled}
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}

export default Rest;
