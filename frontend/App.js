import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users
  const getUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Add user
  const addUser = async () => {
    await axios.post("http://localhost:5000/users", { name, email });
    getUsers();
  };

  // Delete user
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    getUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management System</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={addUser}>Add</button>

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
