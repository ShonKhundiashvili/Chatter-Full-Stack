import React, { useState } from "react";

export default function Register() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>Register</h1>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
