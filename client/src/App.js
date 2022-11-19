import Appbar from "./components/AppBar.js";
import TransactionForm from "./components/TransactionForm.js";
import TransactionTable from "./components/TransactionTable.js";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    let res = await fetch("http://localhost:4000/transactions");
    res = await res.json();
    // const date =
    //   res.date.getDate() +
    //   "-" +
    //   parseInt(res.date.getMonth() + 1) +
    //   "-" +
    //   res.date.getFullYear();
    // res = { ...res, date: date };
    setTransactions(res);
  };
  return (
    <div>
      <Appbar />
      <br />
      <Container fixed>
        <TransactionForm getAllTransactions={getAllTransactions} />
        <TransactionTable transactionsList={transactions} />
      </Container>
    </div>
  );
}

export default App;
