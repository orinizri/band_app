import React from "react";
import { Container } from "@mui/material";
import "../styles/global.scss";

const HomePage: React.FC = () => {
  return (
    <>
      <Container maxWidth="md">
        <div className="page-wrapper">
          <h1>Welcome to JaMoveo 🎶</h1>
          <p>Collaborate. Jam. Perform. All from your phone 🎸🎤</p>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
