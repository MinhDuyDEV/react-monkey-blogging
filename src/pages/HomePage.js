import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase-config";

const HomePageStyles = styled.div``;

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HomePageStyles>
      <button onClick={handleSignOut}>Sign out</button>
    </HomePageStyles>
  );
};

export default HomePage;
