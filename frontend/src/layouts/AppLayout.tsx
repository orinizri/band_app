import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "../components/layout/NavBar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </>
  );
};

export default AppLayout;