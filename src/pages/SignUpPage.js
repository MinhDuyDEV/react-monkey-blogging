import React from "react";
import styled from "styled-components";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .field {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    align-items: flex-start;
  }
  .label {
    color: ${(props) => props.theme.grayDark};
    font-weight: 600;
    cursor: pointer;
  }
  .input {
    padding: 20px;
    width: 100%;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    border: 1px solid transparent;
    transition: all 0.2s linear;
  }
  .input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  .input::-webkit-input-placeholder {
    color: #84878b;
  }
  .input::-moz-input-placeholder {
    color: #84878b;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form className="form">
          <div className="field">
            <label htmlFor="fullName" className="label">
              Full Name
            </label>
            <input
              type="text"
              className="input"
              placeholder="Enter your full name"
              id="fullName"
              autoComplete="off"
            />
          </div>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
