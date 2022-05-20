import React from "react";

function UserCard(props) {
  return (
    <li className="user">
      <img className="user__photo" src={props.user.photo}></img>
      <p className="user__name">{props.user.name}</p>
      <div className="user__info">
        <p className="user__position">{props.user.position}</p>
        <p className="user__mail">{props.user.email}</p>
        <p className="user__phone-number">{props.user.phone}</p>
      </div>
    </li>
  );
}

export default UserCard;
