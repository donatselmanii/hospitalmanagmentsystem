import React, { useState } from "react";

const MedicalReport = () => {
  const [code, setCode] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 6;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    setCode(result);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <div>
      <div>
        <label>ID Number:</label>
        <input type="text" value={id} onChange={handleIdChange} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </div>
      <div>
        <label>Option:</label>
        <select value={option} onChange={handleOptionChange}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div>
        <button onClick={generateCode}>Generate Code</button>
        <input type="text" value={code} readOnly />
      </div>
    </div>
  );
};

export default MedicalReport;
