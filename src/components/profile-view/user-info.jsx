import React from "react";
import PropTypes from "prop-types";

export const UserInfo = ({ email, name, birthDay }) => {
  return (
    <>
      <p><strong>Username: </strong> {name}</p>
      <p><strong>Email: </strong> {email}</p>
      <p><strong>Birth Day: </strong>
        {(birthDay) ? birthDay.split('T')[0] : ' unknown'}
      </p>
    </>
  );
};

// Props constraints
UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthDay: PropTypes.string
};