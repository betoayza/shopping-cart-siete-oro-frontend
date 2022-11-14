import React from "react";
import userImage from "../img/user-svg-model.jpeg";

export const UserCard = ({ user }) => {
  return (
    <div
      className={"card p-2 m-1 border"}
      style={{ width: "200px", height: "auto" }}
    >
      <img
        src={userImage}
        className={"card-img-top img-fluid"}
        alt={"Usuario"}
      />
      <div className={"card-body"}>
        <h5 className={"card-title"}>{user.name + " " + user.lastName}</h5>
        <p className={"card-text"}>{user.code}</p>
        <p className={"card-text"}>{user.email}</p>
        <p className={"card-text"}>{user.status}</p>
        <a href={"#"} className={"btn btn-primary"}>
          @{user.username}
        </a>
      </div>
    </div>
  );
};
