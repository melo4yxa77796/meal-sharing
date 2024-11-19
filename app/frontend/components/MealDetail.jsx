import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import ReviewsPage from "./ReviewsPage";


const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState({
    number_of_guests: "",
    contact_name: "",
    contact_phonenumber: "",
    contact_email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMeal = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/meals/${id}`);
      if (response.ok) {
        const data = await response.json();

        setMeal({
          ...data.meal,
          availableReservations: data.availableReservations,
        });
      } else {
        console.error("Failed to fetch meal data");
      }
    } catch (error) {
      console.error("Error fetching meal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, [id]);

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    const {
      number_of_guests,
      contact_name,
      contact_phonenumber,
      contact_email,
    } = reservationData;

    if (number_of_guests > meal.availableReservations) {
      alert("Number of guests exceeds available reservations.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: id,
          number_of_guests,
          contact_name,
          contact_phonenumber,
          contact_email,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Reservation successfully created!");
        setErrorMessage("");

        setReservationData({
          number_of_guests: "",
          contact_name: "",
          contact_phonenumber: "",
          contact_email: "",
        });

        fetchMeal();
      } else {
        setErrorMessage("Failed to create reservation.");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      setErrorMessage("Failed to create reservation. Please try again.");
      setSuccessMessage("");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!meal) return <div>Meal not found.</div>;

  return (
    
    <div className="meal-detail">
      <h1>{meal.title}</h1>
      <img
          src={`http://localhost:3001${meal.image_path}`}
          alt={meal.title}
          className="meal-image" 
        />
      <div className="meal-detail-container">
        <div className="meal-info">
          <Typography variant="h5" gutterBottom>
            Meal Information
          </Typography>
         
          <p>{meal.description}</p>
          <p>Price: ${meal.price}</p>
          <p>Available Reservations: {meal.availableReservations}</p>

          {meal.availableReservations > 0 ? (
            <form
              onSubmit={handleReservationSubmit}
              className="reservation-form"
            >
              <Typography variant="h6">Make a Reservation</Typography>

              <TextField
                label="Number of Guests"
                variant="outlined"
                fullWidth
                type="number"
                name="number_of_guests"
                value={reservationData.number_of_guests}
                onChange={handleReservationChange}
                required
                margin="normal"
                inputProps={{
                  max: meal.availableReservations,
                  min: 1,
                }}
              />

              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                name="contact_name"
                value={reservationData.contact_name}
                onChange={handleReservationChange}
                required
                margin="normal"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="contact_phonenumber"
                value={reservationData.contact_phonenumber}
                onChange={handleReservationChange}
                required
                margin="normal"
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="contact_email"
                value={reservationData.contact_email}
                onChange={handleReservationChange}
                required
                margin="normal"
              />
              <Button variant="contained" color="primary" type="submit">
                Book Seat
              </Button>
            </form>
          ) : (
            <Typography color="error">No available reservations</Typography>
          )}

          {successMessage && <div>{successMessage}</div>}
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>

        <div className="reviews-section">
          <ReviewsPage mealId={id} />
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
