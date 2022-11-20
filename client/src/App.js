import Appbar from "./components/AppBar.js";
import { TransactionForm, initialForm } from "./components/TransactionForm.js";
import TransactionTable from "./components/TransactionTable.js";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(initialForm);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    let res = await fetch("http://localhost:4000/transactions");
    res = await res.json();
    setTransactions(res);
  };
  return (
    <div>
      <Appbar />
      <br />
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
    </div>
  );
}

export default App;
