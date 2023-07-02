import React, { useState } from "react";

function PlantCard({ plant, onDelete, onEditPrice }) {

  const {id, name, image, price} = plant;
  const [inStock, setInStock] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedPrice, setEditedPrice] = useState("");

  function handleEditSubmit(e) {
    e.preventDefault()
    onEditPrice(id, editedPrice)
    setEditedPrice("")
    setEditMode(editMode => !editMode);
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <div onClick={() => setInStock(inStock => !inStock)}>
        {inStock ? (
          <button className="primary">In Stock</button>
        ) : (
          <button>Out of Stock</button>
        )}
      </div>
        <button className="delete-button" onClick={() => onDelete(id)}>Delete 🗑️</button>
        <div className="edit">
            <button className="edit-button" onClick={() => setEditMode(editMode => !editMode)}>Edit Price ✏️</button>
          {editMode ? (
            <form onSubmit={handleEditSubmit}>
              <input 
                type="number"
                name="new-price"
                placeholder="New Price"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          ) : null}
        </div>
    </li>
  );
}

export default PlantCard;
