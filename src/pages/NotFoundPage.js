import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f3f3f3;
  .logo {
    display: inline-block;
    margin-bottom: 30px;
  }
  .heading {
    font-size: 80px;
    font-weight: bold;
  }
  .subHeading {
    font-size: 40px;
    margin-bottom: 10px;
  }

  .textHeading {
    margin-bottom: 20px;
    font-size: 20px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 8px;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to={"/"} className="logo">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" />
      </NavLink>
      <h1 className="heading">Oops</h1>
      <h2 className="subHeading">Something Went Wrong.</h2>
      <h3 className="textHeading">Error 404 Page Not Found</h3>
      <NavLink to={"/"} className="back">
        back to home
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
