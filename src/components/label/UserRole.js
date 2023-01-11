import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelRoleStyles = styled.span`
  display: inline-block;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;

/**
 *
 * @returns type - "default" "success" "warning" "danger"
 * @returns
 */

const UserRole = ({ children, role = "" }) => {
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (role) {
    case "admin":
      styleClassName = "text-green-500 bg-green-100";
      break;
    case "moderator":
      styleClassName = "text-orange-500 bg-orange-100";
      break;
    case "editor":
      styleClassName = "text-red-500 bg-red-100";
      break;
    case "user":
      styleClassName = "text-blue-500 bg-blue-100";
      break;
    default:
      break;
  }
  return (
    <LabelRoleStyles className={styleClassName}>{children}</LabelRoleStyles>
  );
};

UserRole.propTypes = {
  children: PropTypes.node,
  role: PropTypes.oneOf(["admin", "moderator", "editor", "user"]).isRequired,
};

export default UserRole;
