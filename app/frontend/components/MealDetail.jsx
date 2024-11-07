import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/meals/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMeal(data);
      } catch (error) {
        console.error("Error fetching meal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      number_of_guests,
      contact_name,
      contact_phonenumber,
      contact_email,
    } = reservationData;

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

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      const result = await response.json();
      setSuccessMessage("Reservation successfully created!");
      setErrorMessage("");

      const updatedMealResponse = await fetch(
        `http://localhost:3001/api/meals/${id}`
      );
      const updatedMealData = await updatedMealResponse.json();
      setMeal(updatedMealData);

      setReservationData({
        number_of_guests: "",
        contact_name: "",
        contact_phonenumber: "",
        contact_email: "",
      });
    } catch (error) {
      console.error("Error creating reservation:", error);
      setErrorMessage("Failed to create reservation. Please try again.");
      setSuccessMessage("");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!meal) return <div>Meal not found.</div>;

  const { title, description, price, availableReservations } = meal;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Price: {price}</p>
      <p>Available Reservations: {availableReservations}</p>

      {availableReservations > 0 && (
        <form onSubmit={handleSubmit}>
          <h2>Make a Reservation</h2>
          <input
            type="number"
            name="number_of_guests"
            placeholder="Number of Guests"
            value={reservationData.number_of_guests}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="contact_name"
            placeholder="Your Name"
            value={reservationData.contact_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="contact_phonenumber"
            placeholder="Your Phone Number"
            value={reservationData.contact_phonenumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="contact_email"
            placeholder="Your Email"
            value={reservationData.contact_email}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Book Seat</button>
        </form>
      )}

      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default MealDetail;
