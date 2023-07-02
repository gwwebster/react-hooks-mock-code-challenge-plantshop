import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {

  const [newPlant, setNewPlant] = useState({
    name: "",
    image: "",
    price: ""
  });

  function handleSubmit(e) {
    e.preventDefault()
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
    .then(r => r.json())
    .then(data => onAddPlant(data))
    setNewPlant({
      name: "",
      image: "",
      price: ""
    });
  }

  function handleChange(e) {
    const key = e.target.name
    setNewPlant({
      ...newPlant,
      [key]: e.target.value
    });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name" 
          value={newPlant.name}
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={newPlant.image}
          onChange={handleChange}
        />
        <input 
          type="number" 
          name="price" step="0.01" 
          placeholder="Price" 
          value={newPlant.price} 
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
