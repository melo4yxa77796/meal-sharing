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
      <header className="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px" }}>
  
  <div className="text-column" style={{ flex: 1, marginRight: "20px" }}>
    <Typography variant="h1" gutterBottom>
      Welcome to Meal-Sharing
    </Typography>
    <Typography variant="h5" gutterBottom>
      Discover delicious dishes from around the world!
      Enjoy exclusive discounts on your favorite meals and reserve a table at your preferred restaurant with ease.
      Experience the joy of enjoying culinary delights with special offers tailored just for you. 
      Don’t wait, book your table now and savor in a world of flavors!
    </Typography>
    <section className="meals-section" style={{ marginTop: "20px" }}>
      <Link to="/meals">
        <Button
          variant="contained"
          className="view-all-meals-button"
          sx={{
            borderRadius: "10px",
            backgroundColor: "#fcd1cf",
            color: "white",
            "&:hover": {
              backgroundColor: "#8cc7b4",
            },
          }}
        >
          View All Meals
        </Button>
      </Link>
      <Link to="/contacts" style={{ marginLeft: "10px" }}>
        <Button
          variant="contained"
          className="view-all-meals-button"
          sx={{
            borderRadius: "10px",
            backgroundColor: "#fcd1cf",
            color: "white",
            "&:hover": {
              backgroundColor: "#8cc7b4",
            },
          }}
        >
          Get More
        </Button>
      </Link>
    </section>
  </div>

  
  <div className="image-column" style={{ flex: 1 }}>
    <img
      src="/upload/burger.jpeg" 
      alt="Delicious meals"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "10px",
        objectFit: "cover",
      }}
    />
  </div>
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
          <Button variant="contained" className="view-all-meals-button">
            View All Meals
          </Button>
        </Link>
      </section>
     
    </div>
  );
}

export default HomePage;
