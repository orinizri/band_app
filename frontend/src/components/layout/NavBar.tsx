import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from "@/assets/logo.png"; // use logo_mobile.png for mobile if needed

const NavBar = (): React.ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderBottom: "1px solid #ddd",
        px: { xs: 2, sm: 4 },
        py: 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: Logo */}

        <img
          src={logo}
          alt="JaMoveo"
          style={{
            height: isMobile ? 28 : 36,
            width: "auto",
          }}
        />
        {/* Right: Mobile Menu or Avatar */}
        {isMobile ? (
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            {/* Optional: Admin name or role */}
            {/* <Typography variant="body1" fontWeight={500}>Admin</Typography> */}
            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
