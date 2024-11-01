"use client";

import React, {useEffect, useState} from 'react';

function MealsList() {
    const [meals, setMeals] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/all-meals');
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h2>Meals</h2>
            {meals.length > 0 ? (
                meals.map((meal, index) => (
                    <div key={index}>
                        <h3>{meal.title}</h3>
                        <p>{meal.description}</p>
                        <p>{meal.price}</p>
                    </div>
                ))
            ) : (
                <p>Loading meals...</p>
            )}
        </>
    )
}

export default MealsList;