import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/auth";

export default function Appbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    Cookie.remove("token");
    dispatch(removeUser());
    navigate("/login");
  };

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
          <Button color="inherit">
            <Link to={"/register"} className="text-white">
              Register
            </Link>
          </Button>
          <Button color="inherit" className="text-white" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
