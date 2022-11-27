import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Cookie from "js-cookie";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth";

const initialForm = {
  label: "",
  icon: "",
};

const icons = ["usrrrr"];

function CategoryForm({ edit, setEdit }) {
  const token = Cookie.get("token");
  const [form, setForm] = useState(initialForm);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.auth.user);

  const fetchCategories = async () => {
    let res = await fetch(`${process.env.REACT_APP_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      res = await res.json();
      dispatch(setUser(res.user));
    }
  };

  useEffect(() => {
    if (edit != initialForm) {
      setForm(edit);
    }
  }, [edit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = edit == initialForm ? await submit() : await update();
    if (res.ok) {
      setForm(initialForm);
      setEdit(initialForm);
      fetchCategories();
    }
  };

  const update = async () => {
    return await fetch(`${process.env.REACT_APP_URL}/categories/${edit._id}`, {
      method: "PUT",
      body: JSON.stringify(form),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "Application/json",
      },
    });
  };

  const submit = async () => {
    return await fetch(`${process.env.REACT_APP_URL}/categories`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "Application/json",
      },
    });
  };

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5">Add New Category</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            sx={{ margin: "10px" }}
            size="small"
            id="outlined-basic"
            label="Category Name"
            variant="outlined"
            value={form.label}
            name="label"
            onChange={handleInput}
          />

          <Autocomplete
            onChange={(event, newValue) => {
              setForm({ ...form, icon: newValue });
            }}
            value={form.icon}
            options={icons}
            id="combo-box-demo"
            sx={{ width: 200, margin: "10px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Icon"
                size="small"
                value={form.categoryId}
              />
            )}
          />
          {edit == initialForm && (
            <Button type="submit" variant="contained" sx={{ margin: "10px" }}>
              Submit
            </Button>
          )}
          {edit != initialForm && (
            <Button type="submit" variant="secondary" sx={{ margin: "10px" }}>
              Update
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export { CategoryForm, initialForm };
