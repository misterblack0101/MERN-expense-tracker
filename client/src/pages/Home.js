import React from "react";
import { useState, useEffect } from "react";
import { TransactionForm, initialForm } from "../components/TransactionForm.js";
import TransactionTable from "../components/TransactionTable.js";
import Container from "@mui/material/Container";
import Cookie from "js-cookie";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(initialForm);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    const token = Cookie.get("token");

    let res = await fetch(`${process.env.REACT_APP_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res = await res.json();
    setTransactions(res);
  };
  return (
    <Container fixed>
      <TransactionForm
        getAllTransactions={getAllTransactions}
        editTx={editTx}
        setEditTx={setEditTx}
      />
      <TransactionTable
        transactionsList={transactions}
        getAllTransactions={getAllTransactions}
        setEditTX={setEditTx}
      />
    </Container>
  );
}

export default Home;
