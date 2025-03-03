import React from "react";
import materials from "../data/materials.json";

const MaterialsPage = () => {
  return (
    <div>
      <h2>Теоретические материалы</h2>
      {materials.map((material, index) => (
        <div key={index}>
          <h3>{material.title}</h3>
          <p>{material.content}</p>
          <p>Источник: {material.source}</p>
        </div>
      ))}
    </div>
  );
};

export default MaterialsPage;
