
import express from 'express';
import knex from '../database_client.js'; // Adjust the path if necessary

const reservationsRouter = express.Router();

// Retrieve all reservations
reservationsRouter.get("/", async (req, res) => {
  try {
    const reservations = await knex("Reservation").select('*'); // Retrieve all reservations
    res.json(reservations);
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    res.status(500).json({ error: "Server error while retrieving reservations." });
  }
});

  

// Create a new reservation
reservationsRouter.post("/", async (req, res) => {
    const { meal_id, number_of_guests, contact_name, contact_phonenumber, contact_email } = req.body;
  
    // Check for required fields
    if (!meal_id || !number_of_guests || !contact_name) {
      return res.status(400).json({ error: "meal_id, number_of_guests, and contact_name are required fields." });
    }
  
    try {
      const created_date = new Date().toISOString().slice(0, 10); // Current date
      const newReservation = await knex("Reservation").insert({
        meal_id,
        number_of_guests,
        created_date,
        contact_name,
        contact_phonenumber,
        contact_email
      });
  
      res.status(201).json({ id: newReservation[0] }); // Return the new reservation ID
    } catch (error) {
      console.error("Error creating reservation:", error);
      res.status(500).json({ error: "Server error while creating reservation." });
    }
  });
  

// Retrieve a reservation by ID
reservationsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await knex("Reservation").where({ id }).first(); // Retrieve reservation by ID
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }
    res.json(reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    res.status(500).json({ error: "Server error while retrieving reservation." });
  }
});


reservationsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { meal_id, number_of_guests, contact_name, contact_phonenumber, contact_email } = req.body;
  
    // Validate required fields
    if (!number_of_guests || !contact_name) {
      return res.status(400).json({ error: "Fields number_of_guests and contact_name are required." });
    }
  
    try {
      const updatedReservation = await knex("Reservation")
        .where({ id })
        .update({
          meal_id,
          number_of_guests,
          contact_name,
          contact_phonenumber,
          contact_email
        });
  
      if (updatedReservation === 0) {
        return res.status(404).json({ error: "Reservation not found." });
      }
  
      res.json({ message: "Reservation updated successfully." });
    } catch (error) {
      console.error("Error updating reservation:", error);
      res.status(500).json({ error: "Error updating reservation in the database." });
    }
  });
  
  reservationsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedReservation = await knex("Reservation").where({ id }).del();
  
      if (deletedReservation === 0) {
        return res.status(404).json({ error: "Reservation not found." });
      }
  
      res.json({ message: "Reservation deleted successfully." });
    } catch (error) {
      console.error("Error deleting reservation:", error);
      res.status(500).json({ error: "Error deleting reservation from the database." });
    }
  });
  

export default reservationsRouter;
