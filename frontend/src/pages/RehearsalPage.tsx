import React from "react";
import { Container } from "@mui/material";
import RehearsalWaitingView from "../components/rehearsal/RehearsalWaitingView";

const RehearsalPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <RehearsalWaitingView />
    </Container>
  );
};

export default RehearsalPage;