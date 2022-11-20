import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }} margin="10px">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"} className="text-white">
              {" "}
              Expense-Tracker
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to={"/login"} className="text-white">
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
