import React from "react";
import { Box } from "@mui/material";

interface AppLayoutProps {
  children: React.ReactNode; // ✅ declare children
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }): React.ReactElement => {
  return (
    <>
      <Box component="main" sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
        {children}
      </Box>
    </>
  );
};

export default AppLayout;
