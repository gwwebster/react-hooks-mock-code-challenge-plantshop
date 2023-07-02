import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=> {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(data => setPlants(data))
  }, [])

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function handleEditPrice(id, newPrice) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        price: newPrice
      })
    })
    .then(r => r.json())
    .then(data => {
      setPlants(plants.map(plant => {
        if (plant.id === id) return data
        return plant
    }))
    });
  }

  function handleDeletePlant(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    setPlants(plants.filter(plant => plant.id !== id));
  }

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search 
        search={search} 
        onSearch={setSearch} 
      />
      <PlantList 
        plants={plants} 
        search={search} 
        onDelete={handleDeletePlant} 
        onEditPrice={handleEditPrice}
      />
    </main>
  );
}

export default PlantPage;
