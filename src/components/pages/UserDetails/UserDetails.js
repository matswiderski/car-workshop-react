import React from "react";
import axios from "../../../api/axios";
function UserDetails() {
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "get",
        url: "user/details",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit1}>
      <button type="submit">Ok</button>
    </form>
  );
}

export default UserDetails;
