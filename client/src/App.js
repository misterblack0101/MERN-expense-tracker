import { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "Application/json",
      },
    });
    if (res.ok) {
      setForm({ amount: 0, description: "", date: "" });
      getAllTransactions();
    }
  };

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          onChange={handleInput}
          value={form.amount}
          placeholder="Enter transaction amount"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Enter transaction details"
        />
        <input
          type="date"
          name="date"
          onChange={handleInput}
          value={form.date}
        />
        <button type="submit"> Submit</button>
      </form>
      <br />
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
