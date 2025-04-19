import React from "react"
import { AppBar, Box, Toolbar, Typography, Button, Container } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none"
            }}
          >
            🎶 JaMoveo
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={RouterLink} to="/login" color="primary" variant="text">
              Login
            </Button>
            <Button component={RouterLink} to="/register" color="primary" variant="outlined">
              Register
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar