import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "Application/json",
      },
    });
    res = await res.json();
    console.log(res);
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
    </div>
  );
}

export default App;
