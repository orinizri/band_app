import React from "react";
import { Box } from "@mui/material";

interface AppLayoutProps {
  children: React.ReactNode; // ✅ declare children
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Box component="main" sx={{ py: 4 }}>
        {children}
      </Box>
    </>
  );
};

export default AppLayout;
