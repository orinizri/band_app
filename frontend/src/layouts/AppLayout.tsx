import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import NavBar from "../components/layout/NavBar";

const AppLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Box component="main" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default AppLayout;
