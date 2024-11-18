import React, { useState } from "react";

const AddMealForm = () => {
  const [meal, setMeal] = useState({
    title: "",
    description: "",
    price: "",
    maxReservations: "",
    tags: "",
    date: "",
    image: null,
  });
  const [preview, setPreview] = useState(null); // Для предпросмотра изображения

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeal({ ...meal, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setMeal({ ...meal, image: file });

    // Предпросмотр изображения
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", meal.title);
    formData.append("description", meal.description);
    formData.append("price", meal.price);
    formData.append("maxReservations", meal.maxReservations);
    formData.append("tags", meal.tags);
    formData.append("date", meal.date);
    formData.append("image", meal.image);

    try {
      const response = await fetch("http://localhost:3001/api/meals", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Meal added successfully!");
        setMeal({
          title: "",
          description: "",
          price: "",
          maxReservations: "",
          tags: "",
          date: "",
          image: null,
        });
        setPreview(null);
      } else {
        alert("Failed to add meal.");
      }
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  return (
    <div>
      <h2>Add Your Meal</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
        <input
          type="text"
          name="title"
          placeholder="Meal Title"
          value={meal.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={meal.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={meal.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="maxReservations"
          placeholder="Max Reservations"
          value={meal.maxReservations}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={meal.tags}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={meal.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        {preview && <img src={preview} alt="Preview" style={{ maxWidth: "100%" }} />}
        <button type="submit">Add Meal</button>
      </form>
    </div>
  );
};

export default AddMealForm;
