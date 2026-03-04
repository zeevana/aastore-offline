import { useState } from "react";

const EventMLBB = () => {
  const [form, setForm] = useState({
    nickname: "",
    userId: "",
    serverId: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/register-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Berhasil daftar event!");
  };

  return (
    <div className="container mt-5">
      <h2>Daftar Event MLBB Starlight</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="nickname"
          placeholder="Nickname ML"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="userId"
          placeholder="User ID ML"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="serverId"
          placeholder="Server ID"
          onChange={handleChange}
          required
        />

        <button type="submit">Daftar</button>

      </form>
    </div>
  );
};

export default EventMLBB;