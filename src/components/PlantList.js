import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, search, onDelete, onEditPrice }) {

  const plantsToDisplay = plants.filter(plant => plant.name.toLowerCase().includes(search))
  .map(plant => (
    <PlantCard key={plant.id} plant={plant} onDelete={onDelete} onEditPrice={onEditPrice} />
  ));

  return (
    <ul className="cards">
      {plantsToDisplay}
    </ul>
  );
}

export default PlantList;
