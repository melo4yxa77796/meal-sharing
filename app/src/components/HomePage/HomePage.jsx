import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Meal from "../../../frontend/components/Meal";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/all-meals");
        const data = await response.json();

        const sanitizedData = data.map((meal) => ({
          ...meal,
          title: typeof meal.title === "string" ? meal.title : "Unknown Meal",
          price: meal.price || 0,
        }));

        setMeals(sanitizedData);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <header className="header">
        <Typography variant="h1" gutterBottom>
          Welcome to Meal-Sharing
        </Typography>
        <Typography variant="h5" gutterBottom>
          Discover delicious dishes from around the world!
        </Typography>
      </header>

      <section className="meals-slider-section">
        <h2 style={{ textAlign: "center" }}>Popular Meals</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={4}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          style={{
            padding: "30px",
          }}
        >
          {meals.slice(0, 8).map((meal) => (
            <SwiperSlide
              key={meal.id}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "250px" }}>
                <Meal meal={meal} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="meals-section">
        <Link to="/meals">
          <Button variant="contained" color="primary">
            View All Meals
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
