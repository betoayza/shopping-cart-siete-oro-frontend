import React, { useState } from "react";

export const SelectUsersCodes = ({
  users,
  setUserCode,
  setModal,
  setModalSearchUser,
}) => {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
    setUserCode(e.target.value);
    setModal(true);
    setModalSearchUser(true);
  };

  return (
    <div>
      <label>
        Buscar:{" "}
        <select
          className={"form-select"}
          value={selected}
          onChange={handleChange}
        >
          <option value="">---</option>
          {users &&
            users.map((user) => (
              <option key={user._id} value={user.code}>
                {user.code}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};
