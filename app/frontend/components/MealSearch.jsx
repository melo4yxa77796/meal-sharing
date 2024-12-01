import React, { useState } from "react";
import "./MealSearch.css";

function MealSearch({ meals, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filtered = meals.filter((meal) =>
      meal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilter(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a meal..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
}

export default MealSearch;
