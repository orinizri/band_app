import React from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";

interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundImage: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  backgroundImage,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* Left: Form content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          py: 6,
        }}
      >
        <Container maxWidth="sm">{children}</Container>
      </Box>

      {/* Right: Image (hidden on mobile) */}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
    </Box>
  );
};

export default AuthLayout;
