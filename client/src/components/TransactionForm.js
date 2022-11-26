import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";

const initialForm = {
  amount: 0,
  description: "",
  date: new Date(),
};

function TransactionForm({ getAllTransactions, editTx, setEditTx }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editTx != initialForm) {
      setForm(editTx);
    }
  }, [editTx]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = editTx == initialForm ? await submit() : await update();
    if (res.ok) {
      setForm(initialForm);
      setEditTx(initialForm);
      getAllTransactions();
    }
  };
  const update = async () => {
    return await fetch(
      `${process.env.REACT_APP_URL}/transaction/${editTx._id}`,
      {
        method: "PUT",
        body: JSON.stringify(form),
        headers: {
          "Content-type": "Application/json",
        },
      }
    );
  };

  const submit = async () => {
    return await fetch(`${process.env.REACT_APP_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "Application/json",
      },
    });
  };

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5">Add New Transaction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ margin: "10px" }}
            size="small"
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={form.amount}
            name="amount"
            onChange={handleInput}
            type="number"
          />
          <TextField
            sx={{ margin: "10px" }}
            size="small"
            id="outlined-basic"
            label="Decription"
            variant="outlined"
            value={form.description}
            name="description"
            onChange={handleInput}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              renderInput={(params) => (
                <TextField {...params} sx={{ margin: "10px" }} size="small" />
              )}
              value={form.date}
              name="date"
              onChange={handleDate}
            />
          </LocalizationProvider>
          {editTx == initialForm && (
            <Button type="submit" variant="contained" sx={{ margin: "10px" }}>
              Submit
            </Button>
          )}
          {editTx != initialForm && (
            <Button type="submit" variant="secondary" sx={{ margin: "10px" }}>
              Update
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export { TransactionForm, initialForm };
