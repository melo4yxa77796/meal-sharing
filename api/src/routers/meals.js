import express from 'express';
import knex from '../database_client.js'; 

const mealsRouter = express.Router();


  mealsRouter.get("/", async (req, res) => {
    try {
      const meals = await knex("Meal").select("*"); // Select all columns from the Meal table
      res.json(meals);
    } catch (error) {
      console.error("Error retrieving meals:", error);
      res.status(500).json({ error: "Error retrieving meals from the database." });
    }
  });
  
  

  mealsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const meal = await knex("Meal").where({ id }).first(); // Select meal by ID
      if (!meal) {
        return res.status(404).json({ error: "Meal not found." });
      }
      res.json(meal);
    } catch (error) {
      console.error("Error retrieving meal by ID:", error);
      res.status(500).json({ error: "Error retrieving meal from the database." });
    }
  });
  
  mealsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedMeal = await knex("Meal").where({ id }).del();
      
      if (deletedMeal === 0) {
        return res.status(404).json({ error: "Meal not found." });
      }
  
      res.json({ message: "Meal deleted successfully." });
    } catch (error) {
      console.error("Error deleting meal:", error);
      res.status(500).json({ error: "Error deleting meal from the database." });
    }
  });
  
 
  
  mealsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, location, when, max_reservations, price } = req.body;
  
    try {
      const updatedMeal = await knex("Meal")
        .where({ id })
        .update({
          title,
          description,
          location,
          when: new Date(when),
          max_reservations,
          price,
        });
  
      if (updatedMeal === 0) {
        return res.status(404).json({ error: "Meal not found." });
      }
  
      res.json({ message: "Meal updated successfully." });
    } catch (error) {
      console.error("Error updating meal:", error);
      res.status(500).json({ error: "Error updating meal in the database." });
    }
  });
  
  

// Add a new meal
mealsRouter.post("/", async (req, res) => {
  const { title, description, location, when, max_reservations, price } = req.body;

  // Check for required fields
  if (!title || !when || !max_reservations || !price) {
    return res.status(400).json({ error: "Fields title, when, max_reservations, and price are required." });
  }

  try {
    // Normalize the date format
    const formattedDate = new Date(when);
    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    const newMeal = await knex("Meal").insert({
      title,
      description,
      location,
      when: formattedDate, // Store the normalized date
      max_reservations,
      price,
      created_date: new Date().toISOString().slice(0, 10) // Set current date
    });
    
    res.status(201).json({ id: newMeal[0] }); // Return only the created ID
  } catch (error) {
    console.error("Error while adding meal:", error);
    res.status(500).json({ error: "Server error while adding meal." });
  }
});

export default mealsRouter;
