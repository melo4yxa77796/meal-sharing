
/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MealDetail = () => {
  const { id } = useParams(); // Получаем ID из параметров URL
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '' });
  const [reservationError, setReservationError] = useState(null);

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
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: id,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to make reservation");
      }

      alert("Reservation successful!");
      setFormData({ name: '', phoneNumber: '', email: '' }); // Очистка формы
    } catch (error) {
      setReservationError(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!meal) return <div>No meal found.</div>;

  return (
    <div>
      <h1>{meal.title}</h1>
      <p>{meal.description}</p>
      <p>Price: {meal.price}</p>
      <p>Available Reservations: {meal.max_reservations - meal.reservations_count}</p>

      {meal.reservations_count < meal.max_reservations && (
        <form onSubmit={handleReservation}>
          <h2>Book a Seat</h2>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="tel" 
            name="phoneNumber" 
            placeholder="Phone Number" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <button type="submit">Book Seat</button>
          {reservationError && <p style={{ color: 'red' }}>{reservationError}</p>}
        </form>
      )}
    </div>
  );
};

export default MealDetail;*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MealDetail = () => {
  const { id } = useParams(); // Получаем mealId из параметров URL
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState({
    number_of_guests: '',
    contact_name: '',
    contact_phonenumber: '',
    contact_email: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/meals/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMeal(data);
      } catch (error) {
        console.error('Error fetching meal:', error);
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
    const { number_of_guests, contact_name, contact_phonenumber, contact_email } = reservationData;

    try {
      const response = await fetch('http://localhost:3001/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meal_id: id, // Передаем meal_id
          number_of_guests, // Передаем количество гостей
          contact_name, // Передаем имя контакта
          contact_phonenumber, // Передаем номер телефона контакта
          contact_email // Передаем email контакта
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      const result = await response.json();
      setSuccessMessage('Reservation successfully created!'); // Сообщение об успешном резервировании
      setErrorMessage(''); // Очистить сообщения об ошибках

      // После успешного бронирования, обновляем количество доступных мест
      const updatedMealResponse = await fetch(`http://localhost:3001/api/meals/${id}`);
      const updatedMealData = await updatedMealResponse.json();
      setMeal(updatedMealData); // Обновляем состояние с новыми данными о блюде

      // Очистить форму после успешного резервирования
      setReservationData({
        number_of_guests: '',
        contact_name: '',
        contact_phonenumber: '',
        contact_email: ''
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      setErrorMessage('Failed to create reservation. Please try again.'); // Сообщение об ошибке
      setSuccessMessage(''); // Очистить успешное сообщение
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

      {/* Отобразите форму только если есть доступные бронирования */}
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

      {/* Сообщения об успехе и ошибках */}
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default MealDetail;