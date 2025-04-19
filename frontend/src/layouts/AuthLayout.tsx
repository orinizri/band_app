import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, backgroundImage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",         // ✅ ensure it fills full screen
        overflow: "hidden",      // ✅ prevent image pushing height
      }}
    >
      {/* Left side (form) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          bgcolor: "#fff",
          height: "100%",        // ✅ force this column to fill parent height
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,       // control max width of form
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Right side (image) */}
      {!isMobile && backgroundImage && (
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",      // ✅ match left side height
          }}
        />
      )}
    </Box>
  );
};

export default AuthLayout;