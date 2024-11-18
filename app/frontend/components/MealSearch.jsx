import React, { useState } from "react";

function MealSearch({ meals, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filtered = meals.filter((meal) =>
      meal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilter(filtered);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a meal..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default MealSearch;
 