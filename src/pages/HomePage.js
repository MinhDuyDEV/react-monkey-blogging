import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import Layout from "../components/layouts/Layout";
import { auth } from "../firebase/firebase-config";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";

const HomePageStyles = styled.div``;

const handleSignOut = async () => {
  await signOut(auth);
  console.log("🚀 ~ file: HomePage.js:11 ~ handleSignOut ~ auth", auth);
};

const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
      <button onClick={handleSignOut}>Sign out</button>
    </HomePageStyles>
  );
};

export default HomePage;
