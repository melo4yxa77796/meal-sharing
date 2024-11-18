import React, { useState, useEffect } from "react";
import "./Meal.css";
import { Link } from "react-router-dom";

const Meal = ({ meal }) => {
  const [availableSpots, setAvailableSpots] = useState(null); // Состояние для оставшихся мест
  const price =
    typeof meal.price === "string" ? parseFloat(meal.price) : meal.price;

  useEffect(() => {
    const fetchAvailableSpots = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/meals/${meal.id}/spots`);
        // Запрос к эндпоинту
        const data = await response.json();
        setAvailableSpots(data.availableSpots);
      } catch (error) {
        console.error("Error fetching available spots:", error);
      }
    };

    fetchAvailableSpots();

    // Обновление данных каждые 5 секунд
    const interval = setInterval(() => {
      fetchAvailableSpots();
    }, 5000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [meal.id]);

  return (
    <Link to={`/meals/${meal.id}`} className="meal-card">
      <h3 className="meal-title">{meal.title}</h3>
      <p className="meal-description">{meal.description}</p>
      <p className="meal-price">Price: ${price.toFixed(2)}</p>
      {/* Добавляем индикатор оставшихся мест */}
      <p className="meal-spots">
        Available Spots: {availableSpots !== null ? availableSpots : "Loading..."}
      </p>
    </Link>
  );
};

export default Meal;

