import React from "react";
import UserCard from "./UserCard";

function CardsList(props) {
  return (
    <ul className="cards__users">
      {props.users.map((user) => {
        return <UserCard user={user} key={user.id} />;
      })}
    </ul>
  )
}

export default CardsList;
