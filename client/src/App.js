import { useState, useEffect } from "react";
import Appbar from "./components/AppBar.js";
import TransactionForm from "./components/TransactionForm.js";
function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    let res = await fetch("http://localhost:4000/transactions");
    res = await res.json();
    setTransactions(res);
    console.log(transactions);
  };

  return (
    <div>
      <Appbar />

      <br />
      <TransactionForm getAllTransactions={getAllTransactions} />
      <section>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => (
              <tr key={item._id}>
                <td>{item.amount}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
