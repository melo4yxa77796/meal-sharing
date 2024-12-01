import React, { useEffect, useState, useRef } from "react";
import "./HomePage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Meal from "../../../frontend/components/Meal";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";



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
      <header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div className="text-column" style={{ flex: 1, marginRight: "20px" }}>
          <Typography variant="h1" gutterBottom sx={{
    fontSize: "5.5rem", 
    fontFamily: "'Dancing Script', cursive",
   
  }}>
            Welcome to Meal-Sharing
          </Typography>
          <Typography variant="h5" gutterBottom className="description" sx={{ fontSize: "1.35rem",}}>
            Discover delicious dishes from around the world! Enjoy exclusive
            discounts on your favorite meals and reserve a table at your
            preferred restaurant with ease. Experience the joy of enjoying
            culinary delights with special offers tailored just for you. Don’t
            wait, book your table now and savor in a world of flavors!
          </Typography>
          <section className="button-section" style={{ marginTop: "20px" }}>
            <Link to="/meals">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#fcd1cf",
                  color: "black",
                  marginRight: "30px",
                  "&:hover": {
                    backgroundColor: "#8cc7b4",
                    color:"white",
                  },
                }}
              >
                View All Meals
              </Button>
            </Link>
            <Link to="/contacts" style={{ marginLeft: "10px" }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#fcd1cf",
                  color: "black",
                  marginLeft: "30px",
                  width: "170px",
                  "&:hover": {
                    backgroundColor: "#8cc7b4",
                    color:"white",
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
            src="/uploads/newburger2.png"
            alt="Delicious meals"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              backgroundColor: "transparent",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>
      </header>

      <section className="meals-slider-section">
        <h2 style={{ textAlign: "center", padding: "30px",fontSize: "3em", color: "#333",
          fontFamily: "'Dancing Script', cursive",
         }}>Popular Meals</h2>
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
        <Link to="/meals" >
        
  
        <Box
  sx={{
    display: "grid",
    gridTemplateRows: "1fr auto", 
  }}
>
  <Box />
  <Box sx={{ textAlign: "center", padding: "30px" }}>
    <Button
      variant="contained"
      sx={{
        borderRadius: "10px",
        padding: "10px 20px",
      }}
    >
      View All Meals
    </Button>
  </Box>
</Box>


        </Link>
      </section>
    </div>
  );
}

export default HomePage;
